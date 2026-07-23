export const PROTOCOLS = {
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
};

/** Compact English action guides for FaceGPT context. */
const ACTION_GUIDES = {
  gentleCleanser: "Gentle cleanser AM/PM — CeraVe Hydrating or foaming gel if oily; 60s massage.",
  dailySpf: "SPF50 every morning — La Roche-Posay Anthelios / ISDIN; 2 finger lengths.",
  moisturizerBasic: "Barrier moisturizer AM/PM — CeraVe PM, Cicaplast, Avène Cicalfate.",
  introduceRetinoid: "Beginner retinol 0.2–0.3% 2–3 nights/week; buffer with moisturizer; SPF next day.",
  niacinamide: "Niacinamide 5–10% serum after cleanse — The Ordinary / Paula's Choice.",
  guaShaFace: "Full-face gua sha 3–5×/week with squalane; drain neck first, then jaw, then cheeks.",
  guaShaLymph: "Jaw gua sha lymphatic drainage 4–5×/week; oil + stone; light-medium pressure.",
  guaShaCheek: "Cheek/midface gua sha strokes up-out toward temples; avoid eye socket.",
  mewingDaily: "Tongue tip behind front teeth, full tongue on palate, lips closed, nose breathe.",
  tonguePosture: "10-min mewing drills 2×/day before all-day habit.",
  jawExercises: "Sugar-free hard gum 10–15 min 3×/week + masseter release massage.",
  hardChewing: "Balanced chew both sides; stop at soreness; skip if TMJ.",
  chinTucks: "Chin tuck 3×10 daily — glide chin straight back, hold 5s.",
  neckPosture: "Chin tucks + wall posture + raise screen to eye level.",
  caffeineTopical: "Morning caffeine eye serum on orbital bone — The Ordinary Caffeine 5%.",
  eyeCream: "Night peptide/repair eye cream — rice grain on orbital bone only.",
  lymphaticDrain: "Feather-light under-eye gua sha inward→temple→neck.",
  coldCompress: "Cool spoons/mask 5–10 min on puffy mornings.",
  learnTechnique: "Mirror practice: tip landmark, full palate seal, nose-only breathing.",
  nasalBreathing: "Lips sealed, tongue up; saline/nasal strips if blocked.",
  facialHair: "Map jaw line, clean neckline, light beard oil if dry.",
  browGroom: "Brush up, trim long strays, keep natural shape + clear gel.",
  haircutUpdate: "Bring refs; ask for cut that frames jaw/cheekbones; avoid heavy fringe."
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
      return {
        key: actionKey,
        done: !!progress[actionKey],
        guide: ACTION_GUIDES[actionKey] || null
      };
    }),
    startedAt: journey.startedAt || null
  };
}
