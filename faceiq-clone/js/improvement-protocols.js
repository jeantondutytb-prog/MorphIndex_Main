(function () {
  /**
   * Structural protocol data — display text lives in i18n (dashboard.protocols.*)
   * and detailed how-to / products / exercises in protocol-catalog.js.
   */
  var PROTOCOLS = {
    jawlineDefinition: {
      pillar: "angularity",
      totalWeeks: 12,
      phases: [
        {
          id: "foundation",
          weekStart: 1,
          weekEnd: 4,
          actions: ["baselinePhotos", "bodyFat", "tonguePosture", "chinTucks", "guaShaLymph"]
        },
        {
          id: "training",
          weekStart: 5,
          weekEnd: 8,
          actions: ["mewingDaily", "jawExercises", "neckPosture", "hardChewing", "weeklyPhotos"]
        },
        {
          id: "refinement",
          weekStart: 9,
          weekEnd: 12,
          actions: ["photoCompare", "rescan", "adjustFocus"]
        }
      ],
      avoid: ["unsupervisedSurgery", "excessiveMewing"],
      consultWhen: ["tmjPain", "suddenAsymmetry"]
    },
    midfaceBalance: {
      pillar: "harmony",
      totalWeeks: 12,
      phases: [
        {
          id: "foundation",
          weekStart: 1,
          weekEnd: 4,
          actions: ["baselinePhotos", "consistentAngles", "sleepPosition", "hydration"]
        },
        {
          id: "training",
          weekStart: 5,
          weekEnd: 8,
          actions: ["cheekExercises", "guaShaCheek", "midfaceAwareness", "weeklyPhotos"]
        },
        {
          id: "refinement",
          weekStart: 9,
          weekEnd: 12,
          actions: ["photoCompare", "rescan", "adjustFocus"]
        }
      ],
      avoid: ["fillerWithoutConsult", "extremeContouring"],
      consultWhen: ["swelling", "persistentAsymmetry"]
    },
    skinRoutine: {
      pillar: "features",
      totalWeeks: 12,
      phases: [
        {
          id: "foundation",
          weekStart: 1,
          weekEnd: 4,
          actions: ["patchTest", "gentleCleanser", "moisturizerBasic", "dailySpf", "baselinePhotos"]
        },
        {
          id: "training",
          weekStart: 5,
          weekEnd: 8,
          actions: ["niacinamide", "introduceRetinoid", "moisturize", "guaShaFace", "weeklyPhotos"]
        },
        {
          id: "refinement",
          weekStart: 9,
          weekEnd: 12,
          actions: ["photoCompare", "rescan", "adjustFocus"]
        }
      ],
      avoid: ["stackingActives", "skippingSpf"],
      consultWhen: ["irritation", "acneWorsening"]
    },
    underEyeCare: {
      pillar: "features",
      totalWeeks: 8,
      phases: [
        {
          id: "foundation",
          weekStart: 1,
          weekEnd: 3,
          actions: ["sleepSchedule", "hydration", "coldCompress", "baselinePhotos"]
        },
        {
          id: "training",
          weekStart: 4,
          weekEnd: 6,
          actions: ["caffeineTopical", "eyeCream", "lymphaticDrain", "weeklyPhotos"]
        },
        {
          id: "refinement",
          weekStart: 7,
          weekEnd: 8,
          actions: ["photoCompare", "rescan", "adjustFocus"]
        }
      ],
      avoid: ["harshScrubs", "allergicProducts"],
      consultWhen: ["persistentDarkCircles", "swelling"]
    },
    postureMewing: {
      pillar: "angularity",
      totalWeeks: 12,
      phases: [
        {
          id: "foundation",
          weekStart: 1,
          weekEnd: 4,
          actions: ["learnTechnique", "nasalBreathing", "postureChecks", "reminderSetup"]
        },
        {
          id: "training",
          weekStart: 5,
          weekEnd: 8,
          actions: ["dailyBlocks", "neckAlignment", "mewingDaily", "weeklyPhotos"]
        },
        {
          id: "refinement",
          weekStart: 9,
          weekEnd: 12,
          actions: ["habitReview", "rescan", "adjustFocus"]
        }
      ],
      avoid: ["forcefulPressure", "ignoringPain"],
      consultWhen: ["tmjPain", "breathingDifficulty"]
    },
    grooming: {
      pillar: "dimorphism",
      totalWeeks: 8,
      phases: [
        {
          id: "foundation",
          weekStart: 1,
          weekEnd: 3,
          actions: ["styleAudit", "referencePhotos", "baselinePhotos"]
        },
        {
          id: "training",
          weekStart: 4,
          weekEnd: 6,
          actions: ["haircutUpdate", "facialHair", "browGroom", "weeklyPhotos"]
        },
        {
          id: "refinement",
          weekStart: 7,
          weekEnd: 8,
          actions: ["refineLook", "rescan", "adjustFocus"]
        }
      ],
      avoid: ["drasticChanges", "ignoringFaceShape"],
      consultWhen: ["skinReaction", "hairLoss"]
    }
  };

  function getProtocol(key) {
    return PROTOCOLS[key] || null;
  }

  function getProtocolForPlanItem(item) {
    if (!item || !item.key) return null;
    return getProtocol(item.key);
  }

  function listPhaseActions(protocol, phaseIndex) {
    if (!protocol || !protocol.phases) return [];
    var phase = protocol.phases[phaseIndex];
    return phase && Array.isArray(phase.actions) ? phase.actions.slice() : [];
  }

  function countTotalActions(protocol) {
    if (!protocol || !protocol.phases) return 0;
    var total = 0;
    protocol.phases.forEach(function (phase) {
      total += (phase.actions || []).length;
    });
    return total;
  }

  function countCompletedActions(protocol, actionProgress) {
    if (!protocol || !actionProgress) return 0;
    var done = 0;
    protocol.phases.forEach(function (phase) {
      (phase.actions || []).forEach(function (actionKey) {
        if (actionProgress[actionKey]) done += 1;
      });
    });
    return done;
  }

  function isPhaseComplete(protocol, phaseIndex, actionProgress) {
    var actions = listPhaseActions(protocol, phaseIndex);
    if (!actions.length) return false;
    return actions.every(function (key) {
      return !!actionProgress[key];
    });
  }

  function getCurrentWeek(journey, protocol) {
    if (!journey || !journey.startedAt || !protocol) return 1;
    var start = new Date(journey.startedAt).getTime();
    if (isNaN(start)) return 1;
    var elapsed = Math.max(0, Date.now() - start);
    var week = Math.floor(elapsed / (7 * 24 * 60 * 60 * 1000)) + 1;
    return Math.min(week, protocol.totalWeeks || 12);
  }

  function resolvePhaseIndex(journey, protocol) {
    if (!protocol || !protocol.phases) return 0;
    var stored = journey && typeof journey.phaseIndex === "number" ? journey.phaseIndex : 0;
    var maxIndex = protocol.phases.length - 1;
    var index = Math.max(0, Math.min(stored, maxIndex));

    while (index < maxIndex && isPhaseComplete(protocol, index, (journey && journey.actionProgress) || {})) {
      index += 1;
    }
    return index;
  }

  window.ImprovementProtocols = {
    PROTOCOLS: PROTOCOLS,
    getProtocol: getProtocol,
    getProtocolForPlanItem: getProtocolForPlanItem,
    listPhaseActions: listPhaseActions,
    countTotalActions: countTotalActions,
    countCompletedActions: countCompletedActions,
    isPhaseComplete: isPhaseComplete,
    getCurrentWeek: getCurrentWeek,
    resolvePhaseIndex: resolvePhaseIndex
  };
})();
