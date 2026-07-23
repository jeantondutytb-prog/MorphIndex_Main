const METRIC_KEYS = {
  harmony: [
    "facialThirds",
    "facialWidthHeight",
    "midfaceRatio",
    "symmetryDeviation",
    "ipdRatio",
    "canthalTilt",
    "noseChinRatio"
  ],
  angularity: [
    "jawAngle",
    "gonialAngle",
    "jawDefinition",
    "cheekboneProminence",
    "chinProjection",
    "mandibleWidth"
  ],
  dimorphism: ["browRidge", "jawRobustness", "facialHairline", "lipFullness", "noseSize"],
  features: ["skinClarity", "underEyeQuality", "acneScarring", "poreVisibility", "lipHealth", "hairDensity"]
};

const PLAN_KEYS = [
  "jawlineDefinition",
  "midfaceBalance",
  "skinRoutine",
  "underEyeCare",
  "postureMewing",
  "grooming"
];

function round1(n) {
  return Math.round(Number(n) * 10) / 10;
}

function clampScore(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return 6.5;
  return round1(Math.max(4, Math.min(9.5, n)));
}

function normalizeStatus(status) {
  if (status === "good" || status === "average" || status === "focus") return status;
  return "average";
}

function normalizeImpact(impact) {
  if (impact === "high" || impact === "medium" || impact === "low") return impact;
  return "medium";
}

function normalizeMetric(metric, fallbackKey) {
  return {
    key: metric && metric.key ? metric.key : fallbackKey,
    value: metric && metric.value != null ? String(metric.value) : "—",
    ideal: metric && metric.ideal != null ? String(metric.ideal) : "—",
    status: normalizeStatus(metric && metric.status)
  };
}

function normalizePillar(pillarName, pillar, scoreValue) {
  const keys = METRIC_KEYS[pillarName] || [];
  const metrics = keys.map(function (key, index) {
    const fromAi = pillar && Array.isArray(pillar.metrics) ? pillar.metrics[index] : null;
    const matched = pillar && Array.isArray(pillar.metrics)
      ? pillar.metrics.find(function (item) {
          return item && item.key === key;
        })
      : null;
    return normalizeMetric(matched || fromAi, key);
  });

  return {
    score: clampScore(scoreValue != null ? scoreValue : pillar && pillar.score),
    metrics: metrics
  };
}

export function normalizeAnalysis(raw, userId) {
  const scores = raw && raw.scores ? raw.scores : {};
  const harmony = clampScore(scores.harmony);
  const angularity = clampScore(scores.angularity);
  const dimorphism = clampScore(scores.dimorphism);
  const features = clampScore(scores.features);
  const overall = clampScore(
    scores.overall != null ? scores.overall : (harmony + angularity + dimorphism + features) / 4
  );

  const pillars = raw && raw.pillars ? raw.pillars : {};
  const normalizedPillars = {
    harmony: normalizePillar("harmony", pillars.harmony, harmony),
    angularity: normalizePillar("angularity", pillars.angularity, angularity),
    dimorphism: normalizePillar("dimorphism", pillars.dimorphism, dimorphism),
    features: normalizePillar("features", pillars.features, features)
  };

  const summary = raw && raw.summary ? raw.summary : {};
  const harmonyMetrics = normalizedPillars.harmony.metrics;
  const angularityMetrics = normalizedPillars.angularity.metrics;

  const plan = Array.isArray(raw && raw.plan)
    ? raw.plan
        .filter(function (item) {
          return item && PLAN_KEYS.indexOf(item.key) !== -1;
        })
        .slice(0, 5)
        .map(function (item) {
          return {
            key: item.key,
            pillar: item.pillar || "features",
            impact: normalizeImpact(item.impact),
            weeks: Math.max(4, Math.min(24, Number(item.weeks) || 12))
          };
        })
    : [];

  const fallbackPlan = [
    { key: "skinRoutine", pillar: "features", impact: "medium", weeks: 8 },
    { key: "jawlineDefinition", pillar: "angularity", impact: "high", weeks: 12 },
    { key: "underEyeCare", pillar: "features", impact: "medium", weeks: 10 }
  ];

  const potentialOverall = clampScore(
    raw && raw.potential && raw.potential.overall != null
      ? raw.potential.overall
      : Math.min(9.4, overall + 0.8)
  );

  const percentile = Math.max(
    5,
    Math.min(95, Math.round(Number(raw && raw.percentile != null ? raw.percentile : 100 - overall * 10)))
  );

  return {
    scores: {
      overall: overall,
      harmony: harmony,
      angularity: angularity,
      dimorphism: dimorphism,
      features: features
    },
    potential: { overall: potentialOverall },
    percentile: percentile,
    pillars: normalizedPillars,
    summary: {
      facialThirds: summary.facialThirds || harmonyMetrics[0].value,
      jawAngle: summary.jawAngle || angularityMetrics[0].value,
      symmetryDeviation: summary.symmetryDeviation || harmonyMetrics[3].value,
      ipdRatio: summary.ipdRatio || harmonyMetrics[4].value
    },
    plan: plan.length ? plan : fallbackPlan,
    analyzedAt: new Date().toISOString(),
    source: "anthropic",
    userId: userId || null
  };
}
