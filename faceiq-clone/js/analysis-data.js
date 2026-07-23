(function () {
  function seededRandom(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function round1(n) {
    return Math.round(n * 10) / 10;
  }

  function score(min, max, seed) {
    return round1(min + seededRandom(seed) * (max - min));
  }

  function metricValue(min, max, seed, decimals) {
    var val = min + seededRandom(seed) * (max - min);
    return decimals === 0 ? Math.round(val) : val.toFixed(decimals || 2);
  }

  function statusFromDelta(delta) {
    if (delta <= 0.05) return "good";
    if (delta <= 0.15) return "average";
    return "focus";
  }

  function generateScores(seedBase) {
    var harmony = score(5.8, 8.8, seedBase + 1);
    var angularity = score(5.5, 8.5, seedBase + 2);
    var dimorphism = score(6.0, 8.2, seedBase + 3);
    var features = score(6.3, 8.6, seedBase + 4);
    var overall = round1((harmony + angularity + dimorphism + features) / 4);
    return { overall: overall, harmony: harmony, angularity: angularity, dimorphism: dimorphism, features: features };
  }

  function buildPillarMetrics(pillar, seedBase) {
    var defs = {
      harmony: [
        { key: "facialThirds", ideal: "1.00", unit: "", min: 0.95, max: 1.12, decimals: 2 },
        { key: "facialWidthHeight", ideal: "1.80", unit: "", min: 1.65, max: 1.95, decimals: 2 },
        { key: "midfaceRatio", ideal: "1.00", unit: "", min: 0.88, max: 1.08, decimals: 2 },
        { key: "symmetryDeviation", ideal: "0%", unit: "%", min: 1.2, max: 4.8, decimals: 1 },
        { key: "ipdRatio", ideal: "0.46", unit: "", min: 0.42, max: 0.50, decimals: 2 },
        { key: "canthalTilt", ideal: "6°", unit: "°", min: 2, max: 10, decimals: 0 },
        { key: "noseChinRatio", ideal: "0.67", unit: "", min: 0.58, max: 0.76, decimals: 2 }
      ],
      angularity: [
        { key: "jawAngle", ideal: "125°", unit: "°", min: 118, max: 138, decimals: 0 },
        { key: "gonialAngle", ideal: "120°", unit: "°", min: 110, max: 132, decimals: 0 },
        { key: "jawDefinition", ideal: "8.0", unit: "/10", min: 5.5, max: 8.8, decimals: 1 },
        { key: "cheekboneProminence", ideal: "7.5", unit: "/10", min: 5.0, max: 8.5, decimals: 1 },
        { key: "chinProjection", ideal: "1.00", unit: "", min: 0.82, max: 1.08, decimals: 2 },
        { key: "mandibleWidth", ideal: "1.00", unit: "", min: 0.88, max: 1.10, decimals: 2 }
      ],
      dimorphism: [
        { key: "browRidge", ideal: "7.0", unit: "/10", min: 5.0, max: 8.5, decimals: 1 },
        { key: "jawRobustness", ideal: "7.5", unit: "/10", min: 5.2, max: 8.8, decimals: 1 },
        { key: "facialHairline", ideal: "7.0", unit: "/10", min: 5.0, max: 8.2, decimals: 1 },
        { key: "lipFullness", ideal: "6.5", unit: "/10", min: 4.8, max: 7.8, decimals: 1 },
        { key: "noseSize", ideal: "6.8", unit: "/10", min: 5.0, max: 8.0, decimals: 1 }
      ],
      features: [
        { key: "skinClarity", ideal: "8.0", unit: "/10", min: 5.5, max: 8.8, decimals: 1 },
        { key: "underEyeQuality", ideal: "7.5", unit: "/10", min: 5.0, max: 8.5, decimals: 1 },
        { key: "acneScarring", ideal: "8.5", unit: "/10", min: 6.0, max: 9.2, decimals: 1 },
        { key: "poreVisibility", ideal: "7.5", unit: "/10", min: 5.5, max: 8.5, decimals: 1 },
        { key: "lipHealth", ideal: "7.8", unit: "/10", min: 6.0, max: 8.8, decimals: 1 },
        { key: "hairDensity", ideal: "7.5", unit: "/10", min: 5.5, max: 8.8, decimals: 1 }
      ]
    };

    return (defs[pillar] || []).map(function (def, i) {
      var raw = metricValue(def.min, def.max, seedBase + i * 7, def.decimals);
      var idealNum = parseFloat(def.ideal);
      var valueNum = parseFloat(raw);
      var delta = isNaN(idealNum) || isNaN(valueNum) ? 0.1 : Math.abs(valueNum - idealNum) / (idealNum || 1);
      return {
        key: def.key,
        value: raw + def.unit.replace("/10", "").replace("°", "°"),
        ideal: def.ideal,
        status: statusFromDelta(delta)
      };
    });
  }

  function buildPlan(scores, seedBase) {
    var items = [
      { key: "jawlineDefinition", pillar: "angularity", impact: "high", priority: scores.angularity < 7 ? 1 : 4 },
      { key: "midfaceBalance", pillar: "harmony", impact: "high", priority: scores.harmony < 7 ? 2 : 5 },
      { key: "skinRoutine", pillar: "features", impact: "medium", priority: scores.features < 7.2 ? 3 : 6 },
      { key: "underEyeCare", pillar: "features", impact: "medium", priority: 4 },
      { key: "postureMewing", pillar: "angularity", impact: "medium", priority: 5 },
      { key: "grooming", pillar: "dimorphism", impact: "low", priority: 6 }
    ];

    return items
      .sort(function (a, b) { return a.priority - b.priority; })
      .slice(0, 5)
      .map(function (item, i) {
        return {
          key: item.key,
          pillar: item.pillar,
          impact: item.impact,
          weeks: Math.round(4 + seededRandom(seedBase + i * 11) * 16)
        };
      });
  }

  function generateAnalysis(userId) {
    var seedBase = 0;
    if (userId) {
      for (var i = 0; i < userId.length; i++) {
        seedBase += userId.charCodeAt(i) * (i + 1);
      }
    } else {
      seedBase = Date.now() % 10000;
    }

    var scores = generateScores(seedBase);
    var potentialOverall = round1(Math.min(9.4, scores.overall + 0.6 + seededRandom(seedBase + 99) * 1.2));
    var percentile = Math.round(100 - scores.overall * 10 + seededRandom(seedBase + 50) * 8);

    var harmonyMetrics = buildPillarMetrics("harmony", seedBase + 100);
    var angularityMetrics = buildPillarMetrics("angularity", seedBase + 200);
    var dimorphismMetrics = buildPillarMetrics("dimorphism", seedBase + 300);
    var featuresMetrics = buildPillarMetrics("features", seedBase + 400);

    return {
      scores: scores,
      potential: { overall: potentialOverall },
      percentile: Math.max(5, Math.min(95, percentile)),
      pillars: {
        harmony: { score: scores.harmony, metrics: harmonyMetrics },
        angularity: { score: scores.angularity, metrics: angularityMetrics },
        dimorphism: { score: scores.dimorphism, metrics: dimorphismMetrics },
        features: { score: scores.features, metrics: featuresMetrics }
      },
      summary: {
        facialThirds: harmonyMetrics[0].value,
        jawAngle: angularityMetrics[0].value,
        symmetryDeviation: harmonyMetrics[3].value,
        ipdRatio: harmonyMetrics[4].value
      },
      plan: buildPlan(scores, seedBase + 500),
      analyzedAt: new Date().toISOString()
    };
  }

  function ensureAnalysis(state, userId) {
    if (state.analysis && state.analysis.scores) {
      return state.analysis;
    }
    if (state.scores) {
      var analysis = generateAnalysis(userId);
      analysis.scores = state.scores;
      analysis.potential.overall = round1(Math.min(9.4, state.scores.overall + 0.8));
      ["harmony", "angularity", "dimorphism", "features"].forEach(function (pillar) {
        analysis.pillars[pillar].score = state.scores[pillar];
      });
      return analysis;
    }
    return generateAnalysis(userId);
  }

  window.AnalysisData = {
    generateAnalysis: generateAnalysis,
    ensureAnalysis: ensureAnalysis
  };
})();
