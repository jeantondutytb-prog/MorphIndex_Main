(function () {
  /**
   * Structured catalogs for detailed plan actions.
   * Display copy lives in i18n:
   *   dashboard.catalog.products.<id>.*
   *   dashboard.catalog.exercises.<id>.*
   *   dashboard.catalog.actions.<id>.*
   */

  var PRODUCTS = {
    cleanserCeramide: { category: "cleanser", examples: ["CeraVe Hydrating Cleanser", "La Roche-Posay Toleriane"] },
    cleanserGel: { category: "cleanser", examples: ["CeraVe Foaming Cleanser", "Bioderma Sébium Gel"] },
    spfMineral: { category: "spf", examples: ["La Roche-Posay Anthelios Invisible Fluid SPF50+", "ISDIN Fusion Water SPF50"] },
    moisturizerBarrier: { category: "moisturizer", examples: ["CeraVe PM", "Avène Cicalfate+", "La Roche-Posay Cicaplast"] },
    retinoidBeginner: { category: "retinoid", examples: ["The Ordinary Retinol 0.2% in Squalane", "CeraVe Resurfacing Retinol Serum"] },
    niacinamideSerum: { category: "serum", examples: ["The Ordinary Niacinamide 10% + Zinc 1%", "Paula's Choice 10% Niacinamide"] },
    eyeCaffeine: { category: "eye", examples: ["The Ordinary Caffeine Solution 5% + EGCG", "The Inkey List Caffeine Eye Cream"] },
    eyePeptide: { category: "eye", examples: ["The Ordinary Multi-Peptide Eye Serum", "CeraVe Eye Repair Cream"] },
    guaShaOil: { category: "oil", examples: ["The Ordinary 100% Plant-Derived Squalane", "rosehip or jojoba oil"] },
    guaShaTool: { category: "tool", examples: ["rose-quartz or stainless gua sha", "jade roller (optional)"] },
    lipBalm: { category: "lip", examples: ["CeraVe Healing Ointment", "Aquaphor", "Laneige Lip Sleeping Mask"] },
    browGel: { category: "grooming", examples: ["clear brow gel", "spoolie + trim scissors"] },
    beardOil: { category: "grooming", examples: ["light beard oil", "beard balm for shape"] },
    chewingGum: { category: "jaw", examples: ["sugar-free xylitol gum (Falim-style / Extra)"] },
    nasalStrip: { category: "breathing", examples: ["nasal strips (Breathe Right-style)", "saline rinse"] }
  };

  var EXERCISES = {
    mewingBasic: { durationMin: 5, sets: "continuous" },
    mewingSwallow: { durationMin: 3, sets: "10 swallows" },
    chinTuck: { durationMin: 3, sets: "3×10" },
    wallPosture: { durationMin: 2, sets: "3 holds" },
    masseterRelease: { durationMin: 4, sets: "2 min/side" },
    jawlineChew: { durationMin: 10, sets: "10–15 min" },
    guaShaJaw: { durationMin: 5, sets: "8–10 strokes/side" },
    guaShaCheek: { durationMin: 5, sets: "8–10 strokes/side" },
    guaShaUnderEye: { durationMin: 3, sets: "6 soft strokes/side" },
    cheekLiftHold: { durationMin: 5, sets: "3×20s" },
    neckExtension: { durationMin: 3, sets: "3×8" },
    lymphaticFace: { durationMin: 4, sets: "1 pass each area" }
  };

  var ACTIONS = {
    baselinePhotos: {
      frequency: "once",
      duration: "10 min",
      steps: ["sameLight", "frontAndSide", "noFilter", "saveFolder"],
      products: [],
      exercises: []
    },
    weeklyPhotos: {
      frequency: "1× / week",
      duration: "5 min",
      steps: ["sameSetup", "sameTime", "compareLast"],
      products: [],
      exercises: []
    },
    photoCompare: {
      frequency: "end of phase",
      duration: "10 min",
      steps: ["sideBySide", "noteChanges", "decideNext"],
      products: [],
      exercises: []
    },
    rescan: {
      frequency: "end of focus",
      duration: "5 min",
      steps: ["openScan", "sameAngle", "reviewScores"],
      products: [],
      exercises: []
    },
    adjustFocus: {
      frequency: "after rescan",
      duration: "5 min",
      steps: ["checkWeakPillars", "pickNextFocus", "resetChecklist"],
      products: [],
      exercises: []
    },
    bodyFat: {
      frequency: "daily habit",
      duration: "ongoing",
      steps: ["proteinTarget", "walkDaily", "sleepCut", "trackWaist"],
      products: [],
      exercises: []
    },
    tonguePosture: {
      frequency: "2× / day",
      duration: "10 min",
      steps: ["tipSpot", "fullTongueUp", "lipsClosed", "noseBreathe"],
      products: [],
      exercises: ["mewingBasic"]
    },
    mewingDaily: {
      frequency: "all day",
      duration: "continuous",
      steps: ["restingPosture", "softSwallow", "checkReminders", "noForce"],
      products: [],
      exercises: ["mewingBasic", "mewingSwallow"]
    },
    jawExercises: {
      frequency: "3× / week",
      duration: "12 min",
      steps: ["warmFace", "chewEqual", "releaseMasseter", "stopIfPain"],
      products: ["chewingGum"],
      exercises: ["jawlineChew", "masseterRelease"]
    },
    neckPosture: {
      frequency: "daily",
      duration: "8 min",
      steps: ["chinTuckDrill", "wallReset", "phoneHeight"],
      products: [],
      exercises: ["chinTuck", "wallPosture", "neckExtension"]
    },
    chinTucks: {
      frequency: "daily",
      duration: "5 min",
      steps: ["sitTall", "tuckChin", "holdBreathe", "repeatSets"],
      products: [],
      exercises: ["chinTuck"]
    },
    guaShaLymph: {
      frequency: "4–5× / week",
      duration: "6 min",
      steps: ["oilFace", "neckDownFirst", "jawStrokes", "cleanTool"],
      products: ["guaShaOil", "guaShaTool"],
      exercises: ["guaShaJaw", "lymphaticFace"]
    },
    hardChewing: {
      frequency: "3× / week",
      duration: "10–15 min",
      steps: ["sugarFreeGum", "bothSides", "stopSoreness", "hydrateAfter"],
      products: ["chewingGum"],
      exercises: ["jawlineChew"]
    },
    consistentAngles: {
      frequency: "weekly",
      duration: "5 min",
      steps: ["markFloor", "sameFocal", "neutralFace"],
      products: [],
      exercises: []
    },
    sleepPosition: {
      frequency: "nightly",
      duration: "sleep",
      steps: ["backOrSide", "extraPillow", "avoidFaceDown"],
      products: [],
      exercises: []
    },
    hydration: {
      frequency: "daily",
      duration: "ongoing",
      steps: ["waterTarget", "cutLateSalt", "limitAlcohol"],
      products: [],
      exercises: []
    },
    cheekExercises: {
      frequency: "daily",
      duration: "5 min",
      steps: ["smileHold", "cheekLift", "relaxJaw"],
      products: [],
      exercises: ["cheekLiftHold"]
    },
    midfaceAwareness: {
      frequency: "daily checks",
      duration: "2 min",
      steps: ["dropShoulders", "unclenchJaw", "softSmileRest"],
      products: [],
      exercises: []
    },
    guaShaCheek: {
      frequency: "4× / week",
      duration: "5 min",
      steps: ["oilMidface", "strokeUpOut", "avoidEyes", "gentlePressure"],
      products: ["guaShaOil", "guaShaTool"],
      exercises: ["guaShaCheek"]
    },
    patchTest: {
      frequency: "before new product",
      duration: "24–48 h",
      steps: ["innerArm", "waitDay", "checkRedness", "thenFace"],
      products: [],
      exercises: []
    },
    gentleCleanser: {
      frequency: "morning + night",
      duration: "60 s",
      steps: ["lukewarmWater", "peaSize", "massage60", "patDry"],
      products: ["cleanserCeramide", "cleanserGel"],
      exercises: []
    },
    dailySpf: {
      frequency: "every morning",
      duration: "2 min",
      steps: ["afterMoisturizer", "twoFingers", "reapplyOutdoors", "yearRound"],
      products: ["spfMineral"],
      exercises: []
    },
    moisturizerBasic: {
      frequency: "morning + night",
      duration: "1 min",
      steps: ["dampSkin", "peaToDime", "sealBarrier"],
      products: ["moisturizerBarrier"],
      exercises: []
    },
    introduceRetinoid: {
      frequency: "2–3 nights / week",
      duration: "night routine",
      steps: ["cleanDry", "peaRetinol", "bufferMoisturizer", "spfNextDay"],
      products: ["retinoidBeginner", "moisturizerBarrier", "spfMineral"],
      exercises: []
    },
    niacinamide: {
      frequency: "daily AM or PM",
      duration: "1 min",
      steps: ["afterCleanse", "threeDrops", "thenMoisturizer", "okWithSpf"],
      products: ["niacinamideSerum"],
      exercises: []
    },
    moisturize: {
      frequency: "after actives",
      duration: "1 min",
      steps: ["waitAbsorb", "layerMoisturizer", "addOcclusiveIfDry"],
      products: ["moisturizerBarrier"],
      exercises: []
    },
    guaShaFace: {
      frequency: "3–5× / week",
      duration: "7 min",
      steps: ["oilWholeFace", "neckFirst", "jawThenCheeks", "noDragSkin"],
      products: ["guaShaOil", "guaShaTool"],
      exercises: ["guaShaJaw", "guaShaCheek", "lymphaticFace"]
    },
    sleepSchedule: {
      frequency: "nightly",
      duration: "7–8 h",
      steps: ["fixedBedtime", "noScreens30", "darkCoolRoom"],
      products: [],
      exercises: []
    },
    caffeineTopical: {
      frequency: "every morning",
      duration: "1 min",
      steps: ["peaEye", "tapBone", "avoidRubbing", "thenSpf"],
      products: ["eyeCaffeine"],
      exercises: []
    },
    eyeCream: {
      frequency: "night",
      duration: "1 min",
      steps: ["riceGrain", "orbitalBone", "noStretch"],
      products: ["eyePeptide"],
      exercises: []
    },
    coldCompress: {
      frequency: "puffy mornings",
      duration: "5–10 min",
      steps: ["coolSpoonOrMask", "closedEyes", "followEyeCream"],
      products: [],
      exercises: []
    },
    lymphaticDrain: {
      frequency: "daily AM",
      duration: "3 min",
      steps: ["softOil", "underEyeOut", "toTemple", "downNeck"],
      products: ["guaShaOil", "guaShaTool"],
      exercises: ["guaShaUnderEye", "lymphaticFace"]
    },
    learnTechnique: {
      frequency: "days 1–3",
      duration: "15 min learn",
      steps: ["mirrorPractice", "tipLandmark", "fullSeal", "noseOnly"],
      products: ["nasalStrip"],
      exercises: ["mewingBasic"]
    },
    nasalBreathing: {
      frequency: "all day",
      duration: "ongoing",
      steps: ["lipsSeal", "tongueUp", "salineIfBlocked", "stripAtNight"],
      products: ["nasalStrip"],
      exercises: []
    },
    postureChecks: {
      frequency: "3× / day",
      duration: "30 s",
      steps: ["phoneAlarm", "resetTongue", "resetShoulders"],
      products: [],
      exercises: ["chinTuck"]
    },
    reminderSetup: {
      frequency: "once setup",
      duration: "10 min",
      steps: ["deskNote", "mirrorNote", "calendarAlarms"],
      products: [],
      exercises: []
    },
    dailyBlocks: {
      frequency: "2× / day",
      duration: "5 min each",
      steps: ["timerOn", "fullMewing", "swallowPractice"],
      products: [],
      exercises: ["mewingBasic", "mewingSwallow"]
    },
    neckAlignment: {
      frequency: "daily",
      duration: "6 min",
      steps: ["chinTucks", "wallStand", "screenHeight"],
      products: [],
      exercises: ["chinTuck", "wallPosture", "neckExtension"]
    },
    habitReview: {
      frequency: "weekly",
      duration: "10 min",
      steps: ["findTriggers", "fixOneTrigger", "keepStreak"],
      products: [],
      exercises: []
    },
    styleAudit: {
      frequency: "once",
      duration: "20 min",
      steps: ["frontSidePhotos", "noteFaceShape", "listWhatHidesJaw"],
      products: [],
      exercises: []
    },
    referencePhotos: {
      frequency: "once",
      duration: "15 min",
      steps: ["pick3Refs", "sameHairColor", "realisticGoals"],
      products: [],
      exercises: []
    },
    haircutUpdate: {
      frequency: "every 3–5 weeks",
      duration: "appointment",
      steps: ["bringRefs", "askForJawFrame", "avoidHeavyFringe"],
      products: [],
      exercises: []
    },
    facialHair: {
      frequency: "2–3× / week groom",
      duration: "10 min",
      steps: ["mapJawLine", "trimNeck", "oilIfDry"],
      products: ["beardOil"],
      exercises: []
    },
    browGroom: {
      frequency: "weekly",
      duration: "5 min",
      steps: ["brushUp", "trimLongHairs", "keepNaturalShape"],
      products: ["browGel"],
      exercises: []
    },
    refineLook: {
      frequency: "weekly",
      duration: "15 min",
      steps: ["checkPhotos", "microAdjust", "keepConsistent"],
      products: ["lipBalm", "beardOil", "browGel"],
      exercises: []
    }
  };

  function getProduct(id) {
    return PRODUCTS[id] || null;
  }

  function getExercise(id) {
    return EXERCISES[id] || null;
  }

  function getActionDetail(actionKey) {
    var detail = ACTIONS[actionKey];
    if (!detail) {
      return {
        frequency: "",
        duration: "",
        steps: [],
        products: [],
        exercises: []
      };
    }
    return {
      frequency: detail.frequency,
      duration: detail.duration,
      steps: (detail.steps || []).slice(),
      products: (detail.products || []).slice(),
      exercises: (detail.exercises || []).slice()
    };
  }

  window.ProtocolCatalog = {
    PRODUCTS: PRODUCTS,
    EXERCISES: EXERCISES,
    ACTIONS: ACTIONS,
    getProduct: getProduct,
    getExercise: getExercise,
    getActionDetail: getActionDetail
  };
})();
