export const PROTOCOLS = {
  jawlineDefinition: {
    pillar: "angularity",
    totalWeeks: 12,
    phases: [
      { id: "foundation", weekStart: 1, weekEnd: 4, actions: ["baselinePhotos", "bodyFat", "tonguePosture"] },
      { id: "training", weekStart: 5, weekEnd: 8, actions: ["mewingDaily", "jawExercises", "neckPosture"] },
      { id: "refinement", weekStart: 9, weekEnd: 12, actions: ["photoCompare", "rescan", "adjustFocus"] }
    ]
  },
  midfaceBalance: {
    pillar: "harmony",
    totalWeeks: 12,
    phases: [
      { id: "foundation", weekStart: 1, weekEnd: 4, actions: ["consistentAngles", "sleepPosition", "hydration"] },
      { id: "training", weekStart: 5, weekEnd: 8, actions: ["cheekExercises", "midfaceAwareness", "weeklyPhotos"] },
      { id: "refinement", weekStart: 9, weekEnd: 12, actions: ["photoCompare", "rescan", "adjustFocus"] }
    ]
  },
  skinRoutine: {
    pillar: "features",
    totalWeeks: 12,
    phases: [
      { id: "foundation", weekStart: 1, weekEnd: 4, actions: ["gentleCleanser", "dailySpf", "baselinePhotos"] },
      { id: "training", weekStart: 5, weekEnd: 8, actions: ["introduceRetinoid", "moisturize", "weeklyPhotos"] },
      { id: "refinement", weekStart: 9, weekEnd: 12, actions: ["photoCompare", "rescan", "adjustFocus"] }
    ]
  },
  underEyeCare: {
    pillar: "features",
    totalWeeks: 8,
    phases: [
      { id: "foundation", weekStart: 1, weekEnd: 3, actions: ["sleepSchedule", "hydration", "baselinePhotos"] },
      { id: "training", weekStart: 4, weekEnd: 6, actions: ["caffeineTopical", "coldCompress", "weeklyPhotos"] },
      { id: "refinement", weekStart: 7, weekEnd: 8, actions: ["photoCompare", "rescan", "adjustFocus"] }
    ]
  },
  postureMewing: {
    pillar: "angularity",
    totalWeeks: 12,
    phases: [
      { id: "foundation", weekStart: 1, weekEnd: 4, actions: ["learnTechnique", "postureChecks", "reminderSetup"] },
      { id: "training", weekStart: 5, weekEnd: 8, actions: ["dailyBlocks", "neckAlignment", "weeklyPhotos"] },
      { id: "refinement", weekStart: 9, weekEnd: 12, actions: ["habitReview", "rescan", "adjustFocus"] }
    ]
  },
  grooming: {
    pillar: "dimorphism",
    totalWeeks: 8,
    phases: [
      { id: "foundation", weekStart: 1, weekEnd: 3, actions: ["styleAudit", "referencePhotos", "baselinePhotos"] },
      { id: "training", weekStart: 4, weekEnd: 6, actions: ["haircutUpdate", "facialHair", "weeklyPhotos"] },
      { id: "refinement", weekStart: 7, weekEnd: 8, actions: ["refineLook", "rescan", "adjustFocus"] }
    ]
  }
};

export function getProtocol(key) {
  return PROTOCOLS[key] || null;
}

export function listPhaseActions(protocol, phaseIndex) {
  if (!protocol || !protocol.phases) return [];
  const phase = protocol.phases[phaseIndex];
  return phase && Array.isArray(phase.actions) ? phase.actions.slice() : [];
}

export function isPhaseComplete(protocol, phaseIndex, actionProgress) {
  const actions = listPhaseActions(protocol, phaseIndex);
  if (!actions.length) return false;
  return actions.every(function (key) {
    return !!(actionProgress && actionProgress[key]);
  });
}

export function resolvePhaseIndex(journey, protocol) {
  if (!protocol || !protocol.phases) return 0;
  const stored = journey && typeof journey.phaseIndex === "number" ? journey.phaseIndex : 0;
  const maxIndex = protocol.phases.length - 1;
  let index = Math.max(0, Math.min(stored, maxIndex));
  const progress = (journey && journey.actionProgress) || {};

  while (index < maxIndex && isPhaseComplete(protocol, index, progress)) {
    index += 1;
  }
  return index;
}

export function buildJourneyContext(journey) {
  if (!journey || !journey.activeFocusKey) return null;

  const protocol = getProtocol(journey.activeFocusKey);
  if (!protocol) {
    return { activeFocusKey: journey.activeFocusKey };
  }

  const phaseIndex = resolvePhaseIndex(journey, protocol);
  const phase = protocol.phases[phaseIndex];
  const actions = listPhaseActions(protocol, phaseIndex);
  const progress = journey.actionProgress || {};

  return {
    activeFocusKey: journey.activeFocusKey,
    pillar: protocol.pillar,
    phaseId: phase ? phase.id : null,
    phaseWeeks: phase ? phase.weekStart + "-" + phase.weekEnd : null,
    phaseIndex: phaseIndex,
    currentActions: actions.map(function (actionKey) {
      return { key: actionKey, done: !!progress[actionKey] };
    }),
    startedAt: journey.startedAt || null
  };
}
