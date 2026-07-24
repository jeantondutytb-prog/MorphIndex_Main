(function () {
  var COPY = {
    en: {
      ui: {
        steps: "How to do it",
        products: "Recommended products",
        exercises: "Exercises",
        examples: "Examples",
        frequency: "Frequency",
        duration: "Time",
        showDetail: "Show details",
        hideDetail: "Hide details",
        why: "Why",
        caution: "Caution"
      },
      products: {
        cleanserCeramide: {
          name: "Gentle ceramide cleanser",
          why: "Cleans without stripping the barrier — base of every skin plan."
        },
        cleanserGel: {
          name: "Foaming gel cleanser (oily skin)",
          why: "Better if you get shiny T-zone or clogged pores."
        },
        spfMineral: {
          name: "Daily SPF 50",
          why: "Protects against UV damage and retinoid sensitivity."
        },
        moisturizerBarrier: {
          name: "Barrier repair moisturizer",
          why: "Keeps skin calm while you add actives."
        },
        retinoidBeginner: {
          name: "Beginner retinol (0.2–0.3%)",
          why: "Improves texture, pores, and clarity over 8–12 weeks."
        },
        niacinamideSerum: {
          name: "Niacinamide 5–10% serum",
          why: "Helps oil control, pores, and redness with low irritation."
        },
        eyeCaffeine: {
          name: "Caffeine eye serum",
          why: "Temporarily reduces morning puffiness."
        },
        eyePeptide: {
          name: "Peptide / repair eye cream",
          why: "Supports the thin under-eye barrier at night."
        },
        guaShaOil: {
          name: "Slip oil (squalane / jojoba)",
          why: "Needed so the tool glides without tugging skin."
        },
        guaShaTool: {
          name: "Gua sha stone",
          why: "For lymphatic drainage along jaw and cheeks."
        },
        lipBalm: {
          name: "Occlusive lip balm",
          why: "Keeps lips healthy so proportions photograph better."
        },
        browGel: {
          name: "Clear brow gel + spoolie",
          why: "Neat brows sharpen the upper-third frame."
        },
        beardOil: {
          name: "Light beard oil / balm",
          why: "Softens hair and helps a clean jawline shape."
        },
        chewingGum: {
          name: "Sugar-free hard gum",
          why: "Light masseter work — never through pain."
        },
        nasalStrip: {
          name: "Nasal strips / saline",
          why: "Supports nose breathing for proper mewing posture."
        }
      },
      exercises: {
        mewingBasic: {
          title: "Basic mewing hold",
          caution: "Stop if you feel jaw, tooth, or TMJ pain.",
          steps: [
            "Place the tongue tip on the spot just behind the front teeth (not on the teeth).",
            "Suck the whole tongue up so it seals against the palate.",
            "Close lips, teeth lightly apart or gently together — breathe through the nose.",
            "Hold for 5 minutes while sitting upright."
          ]
        },
        mewingSwallow: {
          title: "Correct swallow practice",
          caution: "No forceful pressing.",
          steps: [
            "Keep the full tongue on the palate.",
            "Swallow slowly without moving the tongue tip forward.",
            "Feel the back of the tongue press up as you swallow.",
            "Repeat 10 controlled swallows."
          ]
        },
        chinTuck: {
          title: "Chin tuck",
          caution: "Move small — this is neck alignment, not a stretch contest.",
          steps: [
            "Sit tall, eyes forward.",
            "Glide your chin straight back (like making a double chin).",
            "Hold 5 seconds, release.",
            "Do 3 sets of 10."
          ]
        },
        wallPosture: {
          title: "Wall posture reset",
          caution: "Keep breathing easy.",
          steps: [
            "Stand with back against a wall: head, shoulders, and hips touching.",
            "Tuck chin slightly and lengthen the neck.",
            "Hold 20–30 seconds.",
            "Repeat 3 times."
          ]
        },
        masseterRelease: {
          title: "Masseter release",
          caution: "Use gentle pressure only.",
          steps: [
            "Place two fingers on the masseter (cheek near the jaw angle).",
            "Clench lightly to feel the muscle, then relax.",
            "Massage in small circles for 2 minutes per side.",
            "Finish with a slow jaw open/close ×10."
          ]
        },
        jawlineChew: {
          title: "Balanced chew session",
          caution: "Skip if you have TMJ issues.",
          steps: [
            "Chew sugar-free gum evenly on both sides.",
            "Keep tongue posture up while chewing when possible.",
            "Stop at the first sign of soreness.",
            "10–15 minutes max, 3× per week."
          ]
        },
        guaShaJaw: {
          title: "Gua sha — jawline",
          caution: "Never scrape dry skin; keep pressure light-medium.",
          steps: [
            "Apply slip oil to jaw and neck.",
            "Drain the neck downward first (chin → collarbone), 5 strokes.",
            "From chin along the jawline toward the ear, 8–10 strokes per side.",
            "Wipe oil, clean the tool with soap."
          ]
        },
        guaShaCheek: {
          title: "Gua sha — cheeks / midface",
          caution: "Avoid the eye socket bone.",
          steps: [
            "Oil the cheeks.",
            "Stroke from nose wing upward/out toward the temple, 8–10 times.",
            "Then from mouth corner toward the ear.",
            "Finish with neck drainage downward."
          ]
        },
        guaShaUnderEye: {
          title: "Gua sha — under-eye drain",
          caution: "Feather-light pressure only.",
          steps: [
            "Use a tiny amount of oil under the eyes.",
            "With the tool flat, stroke from the inner corner outward to the temple.",
            "6 soft strokes per side.",
            "Continue down the side of the face to the neck."
          ]
        },
        cheekLiftHold: {
          title: "Cheek lift holds",
          caution: "Keep the jaw relaxed.",
          steps: [
            "Smile with lips closed until cheeks lift.",
            "Place fingers lightly on the upper cheeks and hold the lift.",
            "Hold 20 seconds, relax.",
            "Repeat 3 times."
          ]
        },
        neckExtension: {
          title: "Gentle neck extension",
          caution: "No aggressive cracking.",
          steps: [
            "Sit tall, tuck chin slightly.",
            "Lift the crown as if growing taller (not tipping head back hard).",
            "Hold 5 seconds.",
            "Do 3 sets of 8."
          ]
        },
        lymphaticFace: {
          title: "Face lymphatic pass",
          caution: "Soft strokes toward drainage points only.",
          steps: [
            "Oil face and neck lightly.",
            "Stroke forehead center → temples → down in front of ears → neck.",
            "Stroke cheeks → jaw angle → neck.",
            "Always finish draining down the neck."
          ]
        }
      },
      steps: {
        sameLight: "Use the same lighting and distance every time",
        frontAndSide: "Capture a true front photo and a true side profile",
        noFilter: "No filters, makeup heavy contour, or beauty mode",
        saveFolder: "Save photos in a dated folder for comparison",
        sameSetup: "Reuse the exact same camera setup as baseline",
        sameTime: "Shoot at the same time of day (morning is best)",
        compareLast: "Quickly compare with last week before saving",
        sideBySide: "Put week-1 and current photos side by side",
        noteChanges: "Write 3 visible changes (or no-change notes)",
        decideNext: "Decide: continue this focus or switch after rescan",
        openScan: "Start a new MorphIndex scan from the app",
        sameAngle: "Match your original scan angles as closely as possible",
        reviewScores: "Review overall + pillar score changes",
        checkWeakPillars: "Identify the weakest pillar and plan item",
        pickNextFocus: "Set the next active focus in Plan",
        resetChecklist: "Begin the new focus checklist from phase 1",
        proteinTarget: "Hit a high-protein target each day",
        walkDaily: "Walk 8–10k steps or train 3–5× / week",
        sleepCut: "Sleep 7–8h — poor sleep hides jaw definition",
        trackWaist: "Track waist/cheek puff weekly, not only scale weight",
        tipSpot: "Find the tongue tip spot behind the front teeth",
        fullTongueUp: "Seal the entire tongue to the palate",
        lipsClosed: "Lips closed, teeth lightly together or slightly apart",
        noseBreathe: "Breathe only through the nose during the drill",
        restingPosture: "Keep resting mewing posture during desk work",
        softSwallow: "Practice soft correct swallows hourly",
        checkReminders: "Use 3 daily reminders to reset posture",
        noForce: "Never force the tongue — mild engagement only",
        warmFace: "Warm the face with clean hands 30 seconds",
        chewEqual: "Chew equally left/right",
        releaseMasseter: "Release masseters after chewing",
        stopIfPain: "Stop immediately if pain or clicking appears",
        chinTuckDrill: "Perform chin-tuck sets",
        wallReset: "Do a wall posture reset",
        phoneHeight: "Raise phone/screen to eye level",
        sitTall: "Sit or stand tall before starting",
        tuckChin: "Glide chin straight back",
        holdBreathe: "Hold while breathing through the nose",
        repeatSets: "Complete all sets without rushing",
        oilFace: "Apply a thin slip oil to jaw and neck",
        neckDownFirst: "Always drain the neck downward first",
        jawStrokes: "Stroke chin → ear along the jawline",
        cleanTool: "Wash the gua sha tool after every use",
        sugarFreeGum: "Use sugar-free hard gum only",
        bothSides: "Alternate sides every minute",
        stopSoreness: "End the session at first soreness",
        hydrateAfter: "Drink water after the session",
        markFloor: "Mark foot position so distance stays identical",
        sameFocal: "Use the same focal length / phone lens",
        neutralFace: "Neutral expression, no posing smile",
        backOrSide: "Sleep on your back or side",
        extraPillow: "Use a pillow that keeps the neck neutral",
        avoidFaceDown: "Avoid sleeping face-down",
        waterTarget: "Aim for clear/pale urine most of the day",
        cutLateSalt: "Cut salty late-night meals",
        limitAlcohol: "Limit alcohol (it inflates the face)",
        smileHold: "Closed-mouth smile to lift cheeks",
        cheekLift: "Hold the lifted cheek position",
        relaxJaw: "Keep masseters soft — no clenching",
        dropShoulders: "Drop shoulders away from ears",
        unclenchJaw: "Unclench teeth; tongue to palate",
        softSmileRest: "Rest with a soft neutral face",
        oilMidface: "Oil the midface lightly",
        strokeUpOut: "Stroke up and out toward the temples",
        avoidEyes: "Stay below the eye socket",
        gentlePressure: "Use gentle, even pressure",
        innerArm: "Apply a pea of product on the inner forearm",
        waitDay: "Wait 24–48 hours",
        checkRedness: "Check for redness, itch, or burning",
        thenFace: "Only then use it on the face",
        lukewarmWater: "Wet face with lukewarm water",
        peaSize: "Use a pea-sized amount of cleanser",
        massage60: "Massage 60 seconds — don’t scrub hard",
        patDry: "Pat dry with a clean towel",
        afterMoisturizer: "Apply SPF as the last morning step",
        twoFingers: "Use two finger-lengths of SPF for the face",
        reapplyOutdoors: "Reapply if outdoors >2 hours",
        yearRound: "Wear SPF every day, including cloudy days",
        dampSkin: "Apply on slightly damp skin",
        peaToDime: "Use pea-to-dime amount",
        sealBarrier: "Seal the whole face including neck",
        cleanDry: "Start on clean, fully dry skin",
        peaRetinol: "Pea-sized retinol — not more",
        bufferMoisturizer: "Sandwich with moisturizer if sensitive",
        spfNextDay: "Mandatory SPF the next morning",
        afterCleanse: "Apply after cleansing",
        threeDrops: "Use 3–4 drops across the face",
        thenMoisturizer: "Follow with moisturizer",
        okWithSpf: "Works well under SPF in the morning",
        waitAbsorb: "Wait ~60s after serum/retinoid",
        layerMoisturizer: "Layer moisturizer evenly",
        addOcclusiveIfDry: "Add a richer layer on dry zones if needed",
        oilWholeFace: "Oil the whole face thinly",
        neckFirst: "Drain neck first every session",
        jawThenCheeks: "Do jawline, then cheeks",
        noDragSkin: "Tool should glide — never drag dry skin",
        fixedBedtime: "Fix bedtime and wake time (±30 min)",
        noScreens30: "No screens 30 minutes before bed",
        darkCoolRoom: "Dark, cool room helps deep sleep",
        peaEye: "Rice-grain of caffeine product per eye",
        tapBone: "Tap on the orbital bone — not the eyelid",
        avoidRubbing: "Don’t rub or pull the skin",
        thenSpf: "Continue with moisturizer + SPF",
        riceGrain: "Rice-grain amount only",
        orbitalBone: "Apply on the bone under the eye",
        noStretch: "Never stretch the under-eye skin",
        coolSpoonOrMask: "Use cooled spoons or a cool eye mask",
        closedEyes: "Keep eyes closed for 5–10 minutes",
        followEyeCream: "Follow with eye cream afterward",
        softOil: "Use a tiny amount of oil",
        underEyeOut: "Stroke under-eye inward → outward",
        toTemple: "Continue to the temple",
        downNeck: "Finish down the neck",
        mirrorPractice: "Practice in a mirror for the first 3 days",
        tipLandmark: "Lock the tip landmark behind front teeth",
        fullSeal: "Achieve a full tongue-to-palate seal",
        noseOnly: "Confirm you can breathe only through the nose",
        lipsSeal: "Keep lips sealed during the day when possible",
        tongueUp: "Keep tongue up at rest",
        salineIfBlocked: "Use saline rinse if nose is blocked",
        stripAtNight: "Try a nasal strip at night if needed",
        phoneAlarm: "Set 3 phone alarms labeled “reset posture”",
        resetTongue: "On each alarm: tongue up, lips closed",
        resetShoulders: "Drop shoulders + chin tuck once",
        deskNote: "Put a sticky note on your monitor",
        mirrorNote: "Put a cue on your bathroom mirror",
        calendarAlarms: "Add recurring calendar reminders",
        timerOn: "Start a 5-minute timer",
        fullMewing: "Hold full mewing posture the whole timer",
        swallowPractice: "Add 5 correct swallows at the end",
        chinTucks: "Do your chin-tuck sets",
        wallStand: "Do wall posture holds",
        screenHeight: "Raise screens to eye level",
        findTriggers: "List moments you lose posture (phone, gaming, stress)",
        fixOneTrigger: "Fix one trigger this week",
        keepStreak: "Track a simple daily streak",
        frontSidePhotos: "Take clear front + side photos of your current look",
        noteFaceShape: "Note face shape and where hair hides the jaw",
        listWhatHidesJaw: "List styles that hide your jawline",
        pick3Refs: "Pick 3 realistic reference looks",
        sameHairColor: "Prefer refs with similar hair density/color",
        realisticGoals: "Avoid celebrity goals that need different bone structure",
        bringRefs: "Bring references to the barber/stylist",
        askForJawFrame: "Ask for a cut that frames the jaw and cheekbones",
        avoidHeavyFringe: "Avoid heavy fringe that shortens the midface badly",
        mapJawLine: "Map a clean cheek/jaw line before trimming",
        trimNeck: "Keep the neckline clean under the jaw",
        oilIfDry: "Oil beard hair if dry or wiry",
        brushUp: "Brush brows upward",
        trimLongHairs: "Trim only the longest stray hairs",
        keepNaturalShape: "Keep a natural shape — no thin lines",
        checkPhotos: "Check this week’s photos vs references",
        microAdjust: "Make one micro-adjustment (length, line, product)",
        keepConsistent: "Stay consistent for 2 weeks before changing again"
      }
    },
    fr: {
      ui: {
        steps: "Comment faire",
        products: "Produits recommandés",
        exercises: "Exercices",
        examples: "Exemples",
        frequency: "Fréquence",
        duration: "Durée",
        showDetail: "Voir le détail",
        hideDetail: "Masquer le détail",
        why: "Pourquoi",
        caution: "Attention"
      },
      products: {
        cleanserCeramide: {
          name: "Nettoyant doux aux céramides",
          why: "Nettoie sans abîmer la barrière — base de toute routine."
        },
        cleanserGel: {
          name: "Gel nettoyant moussant (peau grasse)",
          why: "Mieux si zone T brillante ou pores bouchés."
        },
        spfMineral: {
          name: "SPF 50 quotidien",
          why: "Protège des UV et de la sensibilité liée aux rétinoïdes."
        },
        moisturizerBarrier: {
          name: "Crème barrière / réparation",
          why: "Garde la peau calme pendant l’ajout d’actifs."
        },
        retinoidBeginner: {
          name: "Rétinol débutant (0,2–0,3%)",
          why: "Améliore texture, pores et clarté en 8–12 semaines."
        },
        niacinamideSerum: {
          name: "Sérum niacinamide 5–10%",
          why: "Aide gras, pores et rougeurs avec peu d’irritation."
        },
        eyeCaffeine: {
          name: "Sérum yeux caféine",
          why: "Réduit temporairement le gonflement du matin."
        },
        eyePeptide: {
          name: "Crème yeux peptides / réparation",
          why: "Soutient la barrière fine du contour des yeux le soir."
        },
        guaShaOil: {
          name: "Huile glissante (squalane / jojoba)",
          why: "Indispensable pour que l’outil glisse sans tirer la peau."
        },
        guaShaTool: {
          name: "Pierre gua sha",
          why: "Pour le drainage lymphatique mâchoire et joues."
        },
        lipBalm: {
          name: "Baume lèvres occlusif",
          why: "Des lèvres saines photographient mieux les proportions."
        },
        browGel: {
          name: "Gel sourcils transparent + spoolie",
          why: "Des sourcils nets structurent le tiers supérieur."
        },
        beardOil: {
          name: "Huile / baume barbe léger",
          why: "Assouplit le poil et aide un tracé de mâchoire propre."
        },
        chewingGum: {
          name: "Chewing-gum dur sans sucre",
          why: "Travail léger des masséters — jamais dans la douleur."
        },
        nasalStrip: {
          name: "Bandes nasales / sérum physiologique",
          why: "Aide la respiration nasale pour un mewing correct."
        }
      },
      exercises: {
        mewingBasic: {
          title: "Mewing — maintien de base",
          caution: "Arrêtez si douleur de mâchoire, dents ou ATM.",
          steps: [
            "Placez la pointe de la langue juste derrière les incisives (pas sur les dents).",
            "Aspirez toute la langue pour qu’elle colle au palais.",
            "Lèvres fermées, dents légèrement jointes ou écartées — respirez par le nez.",
            "Tenez 5 minutes assis bien droit."
          ]
        },
        mewingSwallow: {
          title: "Déglutition correcte",
          caution: "Pas de pression forcée.",
          steps: [
            "Gardez toute la langue au palais.",
            "Avalez lentement sans avancer la pointe de langue.",
            "Sentez l’arrière de la langue monter en avalant.",
            "Répétez 10 déglutitions contrôlées."
          ]
        },
        chinTuck: {
          title: "Rétraction du menton (chin tuck)",
          caution: "Petit mouvement — alignement cervical, pas un défi de stretch.",
          steps: [
            "Assis droit, regard devant.",
            "Glissez le menton droit vers l’arrière (double menton léger).",
            "Tenez 5 secondes, relâchez.",
            "3 séries de 10."
          ]
        },
        wallPosture: {
          title: "Reset posture au mur",
          caution: "Respirez tranquillement.",
          steps: [
            "Dos au mur : tête, épaules et hanches en contact.",
            "Rentrez légèrement le menton et allongez le cou.",
            "Tenez 20–30 secondes.",
            "Répétez 3 fois."
          ]
        },
        masseterRelease: {
          title: "Relâchement des masséters",
          caution: "Pression douce uniquement.",
          steps: [
            "Deux doigts sur le masséter (joue près de l’angle de mâchoire).",
            "Serrez légèrement pour sentir le muscle, puis relâchez.",
            "Massages circulaires 2 minutes par côté.",
            "Finissez par 10 ouvertures/fermetures lentes."
          ]
        },
        jawlineChew: {
          title: "Session de mastication équilibrée",
          caution: "À éviter en cas de problèmes d’ATM.",
          steps: [
            "Mâchez un gum sans sucre également des deux côtés.",
            "Gardez la posture linguale quand c’est possible.",
            "Arrêtez au premier signe de courbature.",
            "10–15 minutes max, 3× / semaine."
          ]
        },
        guaShaJaw: {
          title: "Gua sha — mâchoire",
          caution: "Jamais à sec ; pression légère à moyenne.",
          steps: [
            "Appliquez une huile glissante sur mâchoire et cou.",
            "Drainez d’abord le cou vers le bas (menton → clavicule), 5 passages.",
            "Du menton vers l’oreille le long de la mâchoire, 8–10 passages / côté.",
            "Nettoyez l’outil au savon."
          ]
        },
        guaShaCheek: {
          title: "Gua sha — joues / midface",
          caution: "Évitez l’os de l’orbite.",
          steps: [
            "Huilez les joues.",
            "Du nez vers la tempe vers le haut/extérieur, 8–10 fois.",
            "Puis du coin de la bouche vers l’oreille.",
            "Finissez en drainant le cou vers le bas."
          ]
        },
        guaShaUnderEye: {
          title: "Gua sha — drainage sous les yeux",
          caution: "Pression plume uniquement.",
          steps: [
            "Très peu d’huile sous les yeux.",
            "Outil à plat, du coin interne vers la tempe.",
            "6 passages doux par côté.",
            "Continuez sur le côté du visage jusqu’au cou."
          ]
        },
        cheekLiftHold: {
          title: "Maintien lift des joues",
          caution: "Mâchoire détendue.",
          steps: [
            "Sourire lèvres fermées jusqu’à lever les joues.",
            "Doigts légers sur le haut des joues, maintenez.",
            "20 secondes, relâchez.",
            "3 répétitions."
          ]
        },
        neckExtension: {
          title: "Extension cervicale douce",
          caution: "Pas de craquements forcés.",
          steps: [
            "Assis droit, menton légèrement rentré.",
            "Grandissez-vous par le sommet du crâne (sans casser la tête en arrière).",
            "Tenez 5 secondes.",
            "3 séries de 8."
          ]
        },
        lymphaticFace: {
          title: "Passage lymphatique du visage",
          caution: "Trajets doux vers les zones de drainage seulement.",
          steps: [
            "Huile légère visage + cou.",
            "Front centre → tempes → devant les oreilles → cou.",
            "Joues → angle de mâchoire → cou.",
            "Toujours finir en drainant le cou vers le bas."
          ]
        }
      },
      steps: {
        sameLight: "Même lumière et même distance à chaque fois",
        frontAndSide: "Une vraie photo de face + un vrai profil",
        noFilter: "Sans filtre, contouring lourd ni beauty mode",
        saveFolder: "Classez les photos dans un dossier daté",
        sameSetup: "Reprenez exactement le setup de la baseline",
        sameTime: "Photographiez à la même heure (matin idéal)",
        compareLast: "Comparez vite avec la semaine précédente",
        sideBySide: "Mettez semaine 1 et aujourd’hui côte à côte",
        noteChanges: "Notez 3 changements visibles (ou l’absence)",
        decideNext: "Décidez : continuer ce focus ou changer après rescan",
        openScan: "Lancez un nouveau scan MorphIndex",
        sameAngle: "Reproduisez les angles du scan initial",
        reviewScores: "Comparez score global + piliers",
        checkWeakPillars: "Identifiez le pilier et l’item les plus faibles",
        pickNextFocus: "Définissez le prochain focus actif dans Plan",
        resetChecklist: "Repartez de la phase 1 du nouveau focus",
        proteinTarget: "Atteignez un objectif protéines chaque jour",
        walkDaily: "8–10k pas ou sport 3–5× / semaine",
        sleepCut: "7–8h de sommeil — le manque cache la mâchoire",
        trackWaist: "Suivez taille / gonflement des joues, pas seulement la balance",
        tipSpot: "Trouvez le point de langue derrière les incisives",
        fullTongueUp: "Scellez toute la langue au palais",
        lipsClosed: "Lèvres fermées, dents légères",
        noseBreathe: "Respirez uniquement par le nez pendant l’exo",
        restingPosture: "Gardez le mewing au repos devant l’écran",
        softSwallow: "Pratiquez des déglutitions correctes chaque heure",
        checkReminders: "3 rappels / jour pour reset posture",
        noForce: "Jamais forcer la langue — engagement léger",
        warmFace: "Échauffez le visage 30 secondes mains propres",
        chewEqual: "Mastiquez gauche/droite à parts égales",
        releaseMasseter: "Relâchez les masséters après",
        stopIfPain: "Stop immédiat si douleur ou clic",
        chinTuckDrill: "Faites vos séries de chin tucks",
        wallReset: "Faites un reset posture au mur",
        phoneHeight: "Écran / téléphone à hauteur des yeux",
        sitTall: "Asseyez-vous ou tenez-vous droit",
        tuckChin: "Glissez le menton droit en arrière",
        holdBreathe: "Tenez en respirant par le nez",
        repeatSets: "Terminez toutes les séries sans précipitation",
        oilFace: "Huile fine sur mâchoire et cou",
        neckDownFirst: "Toujours drainer le cou vers le bas d’abord",
        jawStrokes: "Passages menton → oreille le long de la mâchoire",
        cleanTool: "Lavez le gua sha après chaque usage",
        sugarFreeGum: "Gum dur sans sucre uniquement",
        bothSides: "Alternez les côtés chaque minute",
        stopSoreness: "Arrêtez à la première courbature",
        hydrateAfter: "Buvez de l’eau après la session",
        markFloor: "Marquez la position des pieds au sol",
        sameFocal: "Même focale / même lentille téléphone",
        neutralFace: "Expression neutre, pas de pose",
        backOrSide: "Dormez sur le dos ou le côté",
        extraPillow: "Oreiller qui garde le cou neutre",
        avoidFaceDown: "Évitez de dormir sur le ventre",
        waterTarget: "Visez une urine claire la plupart du temps",
        cutLateSalt: "Réduisez le sel le soir",
        limitAlcohol: "Limitez l’alcool (gonfle le visage)",
        smileHold: "Sourire lèvres fermées pour lever les joues",
        cheekLift: "Maintenez la position liftée",
        relaxJaw: "Masséters souples — pas de serrage",
        dropShoulders: "Épaules loin des oreilles",
        unclenchJaw: "Dents desserrées ; langue au palais",
        softSmileRest: "Repos avec un visage neutre",
        oilMidface: "Huilez légèrement le midface",
        strokeUpOut: "Passez vers le haut et l’extérieur (tempes)",
        avoidEyes: "Restez sous l’orbite",
        gentlePressure: "Pression douce et régulière",
        innerArm: "Pois de produit sur l’avant-bras interne",
        waitDay: "Attendez 24–48 h",
        checkRedness: "Vérifiez rougeur, démangeaison, brûlure",
        thenFace: "Seulement ensuite sur le visage",
        lukewarmWater: "Mouillez à l’eau tiède",
        peaSize: "Une noisette de nettoyant",
        massage60: "Massez 60 secondes — sans frotter fort",
        patDry: "Séchez en tamponnant",
        afterMoisturizer: "SPF en dernière étape du matin",
        twoFingers: "Deux longueurs de doigt de SPF pour le visage",
        reapplyOutdoors: "Réappliquez dehors >2 h",
        yearRound: "SPF tous les jours, même couvert",
        dampSkin: "Sur peau légèrement humide",
        peaToDime: "Quantité pois à pièce",
        sealBarrier: "Scellez tout le visage + cou",
        cleanDry: "Peau propre et bien sèche",
        peaRetinol: "Pois de rétinol — pas plus",
        bufferMoisturizer: "Sandwich crème si peau sensible",
        spfNextDay: "SPF obligatoire le lendemain matin",
        afterCleanse: "Après le nettoyage",
        threeDrops: "3–4 gouttes sur le visage",
        thenMoisturizer: "Puis crème hydratante",
        okWithSpf: "OK sous SPF le matin",
        waitAbsorb: "Attendez ~60 s après sérum/rétinol",
        layerMoisturizer: "Couche de crème uniforme",
        addOcclusiveIfDry: "Couche plus riche sur zones sèches si besoin",
        oilWholeFace: "Huilez tout le visage finement",
        neckFirst: "Drainez le cou en premier à chaque session",
        jawThenCheeks: "Mâchoire puis joues",
        noDragSkin: "L’outil doit glisser — jamais tirer à sec",
        fixedBedtime: "Heure de coucher/réveil fixes (±30 min)",
        noScreens30: "Pas d’écran 30 min avant le lit",
        darkCoolRoom: "Pièce sombre et fraîche",
        peaEye: "Grain de riz de produit caféine par œil",
        tapBone: "Tamponnez sur l’os orbital — pas la paupière",
        avoidRubbing: "Ne frottez pas / ne tirez pas",
        thenSpf: "Puis crème + SPF",
        riceGrain: "Quantité grain de riz seulement",
        orbitalBone: "Sur l’os sous l’œil",
        noStretch: "Ne jamais étirer la peau sous l’œil",
        coolSpoonOrMask: "Cuillères froides ou masque froid",
        closedEyes: "Yeux fermés 5–10 minutes",
        followEyeCream: "Puis crème yeux",
        softOil: "Très peu d’huile",
        underEyeOut: "Sous l’œil de l’intérieur vers l’extérieur",
        toTemple: "Jusqu’à la tempe",
        downNeck: "Finir vers le bas du cou",
        mirrorPractice: "Entraînez-vous devant un miroir 3 jours",
        tipLandmark: "Verrouillez le point derrière les incisives",
        fullSeal: "Obtenez un joint langue–palais complet",
        noseOnly: "Vérifiez que vous respirez seulement par le nez",
        lipsSeal: "Lèvres jointes dans la journée si possible",
        tongueUp: "Langue haute au repos",
        salineIfBlocked: "Sérum phy si nez bouché",
        stripAtNight: "Bande nasale la nuit si besoin",
        phoneAlarm: "3 alarmes « reset posture »",
        resetTongue: "À chaque alarme : langue haute, lèvres fermées",
        resetShoulders: "Épaules basses + un chin tuck",
        deskNote: "Post-it sur l’écran",
        mirrorNote: "Rappel sur le miroir de la salle de bain",
        calendarAlarms: "Rappels calendrier récurrents",
        timerOn: "Lancez un timer de 5 minutes",
        fullMewing: "Mewing complet pendant tout le timer",
        swallowPractice: "5 déglutitions correctes à la fin",
        chinTucks: "Vos séries de chin tucks",
        wallStand: "Maintiens posture au mur",
        screenHeight: "Écrans à hauteur des yeux",
        findTriggers: "Listez quand vous perdez la posture (tel, stress…)",
        fixOneTrigger: "Corrigez un trigger cette semaine",
        keepStreak: "Tenez un streak quotidien simple",
        frontSidePhotos: "Photos face + profil de votre look actuel",
        noteFaceShape: "Notez la forme du visage et ce qui cache la mâchoire",
        listWhatHidesJaw: "Listez les styles qui masquent la jawline",
        pick3Refs: "Choisissez 3 références réalistes",
        sameHairColor: "Préférez des refs à densité/couleur proches",
        realisticGoals: "Évitez les goals impossibles sans autre ossature",
        bringRefs: "Apportez les refs au coiffeur/barbier",
        askForJawFrame: "Demandez une coupe qui cadre mâchoire et pommettes",
        avoidHeavyFringe: "Évitez une frange lourde qui raccourcit trop le midface",
        mapJawLine: "Tracez une ligne joue/mâchoire avant de couper",
        trimNeck: "Gardez le cou propre sous la mâchoire",
        oilIfDry: "Huilez si barbe sèche ou rêches",
        brushUp: "Brossez les sourcils vers le haut",
        trimLongHairs: "Coupez seulement les poils trop longs",
        keepNaturalShape: "Gardez une forme naturelle — pas de traits fins",
        checkPhotos: "Comparez photos de la semaine vs références",
        microAdjust: "Un micro-ajustement (longueur, ligne, produit)",
        keepConsistent: "Restez stable 2 semaines avant de changer"
      }
    }
  };

  // Spanish falls back to English for missing keys via t().
  COPY.es = JSON.parse(JSON.stringify(COPY.en));
  COPY.es.ui = {
    steps: "Cómo hacerlo",
    products: "Productos recomendados",
    exercises: "Ejercicios",
    examples: "Ejemplos",
    frequency: "Frecuencia",
    duration: "Tiempo",
    showDetail: "Ver detalle",
    hideDetail: "Ocultar detalle",
    why: "Por qué",
    caution: "Precaución"
  };

  function lang() {
    return document.documentElement.getAttribute("lang") || "en";
  }

  function t(path) {
    var parts = path.split(".");
    var langs = [lang(), "en"];
    for (var li = 0; li < langs.length; li++) {
      var node = COPY[langs[li]];
      if (!node) continue;
      var ok = true;
      for (var i = 0; i < parts.length; i++) {
        if (!node || node[parts[i]] == null) {
          ok = false;
          break;
        }
        node = node[parts[i]];
      }
      if (ok) return node;
    }
    return path;
  }

  window.CatalogCopy = { COPY: COPY, t: t };
})();
