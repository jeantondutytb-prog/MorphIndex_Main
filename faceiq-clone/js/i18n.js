(function () {
  var LANGS = ["en", "fr", "es"];
  var LANG_LABELS = { en: "EN", fr: "FR", es: "ES" };

  var T = {
    en: {
      meta: {
        title: "MorphIndex — Your Morphology, Quantified",
        description: "MorphIndex turns facial photos into structured metrics, a personalized roadmap, and measurable progress over time."
      },
      a11y: { theme: "Toggle theme", language: "Change language", menu: "Open menu", stars: "5 stars", prev: "Previous", next: "Next", close: "Close" },
      nav: { celebs: "Profiles", creators: "Community", login: "Login", cta: "Try MorphIndex", ctaShort: "Try MorphIndex" },
      hero: {
        users: "active users", analyses: "scans completed",
        title: "Decode your structure.<br>Track what changes.",
        subtitle: "MorphIndex turns your facial photos into a living scorecard — structured metrics, a prioritized roadmap, and proof of progress as you go.",
        cta: "Run my first scan", link: "See how it works",
        note: "For people who prefer data over opinions.",
        tabFront: "Front scan", tabSide: "Side scan"
      },
      transform: {
        eyebrow: "Case study", title: "Two years, one trajectory",
        subtitle: "Disciplined habits, logged scans, visible index growth — documented month by month.",
        before: "Day one", after: "Today",
        scoreLabel: "Index growth over 24 months of consistent effort",
        p1t: "Baseline & habits", p1d: "Months 0–8 · establishing routines",
        p2t: "Early signals", p2d: "Months 8–14 · first measurable shifts",
        p3t: "Structural momentum", p3d: "Months 14–26 · deeper contour changes",
        p4t: "Peak window", p4d: "Months 26–30 · consolidating gains",
        q1: "Progress isn't accidental — it's the product of showing up.",
        q2: "Members who gain the most treat every scan as a checkpoint, not a verdict. MorphIndex keeps that rhythm alive."
      },
      pillars: {
        eyebrow: "Scoring model", title: "Four scores, one overall rating",
        subtitle: "Every scan rates you on harmony, jawline, traits, and skin.",
        p1: "Harmony", p1d: "Symmetry, proportions, and facial balance", p1m: "ratios",
        p2: "Jawline", p2d: "Jaw definition, angles, and bone structure", p2m: "structure",
        p3: "Traits", p3d: "Masculine or feminine facial character", p3m: "character",
        p4: "Skin", p4d: "Complexion, under-eyes, pores, and hair health", p4m: "quality"
      },
      banner: "Built on quantitative facial research — for anyone who treats appearance improvement as a measurable discipline.",
      testimonials: {
        title: "What members say", subtitle: "Unfiltered feedback from people who scan regularly.",
        t1: "\"No hype, just numbers I can act on. Whether I'm optimizing or simply understanding my structure, MorphIndex is the most consistent tool I've used.\"",
        t2: "\"I knew my weak spots vaguely — MorphIndex quantified them. Replacing guesswork with metrics completely changed how I approach improvement.\"",
        t3: "\"My composite score looked fine, but I needed detail on texture and under-eye volume. MorphIndex was the first app to give me specifics I could actually use.\"",
        t4: "\"Strengths, gaps, priorities — laid out clearly. That alone justified signing up.\"",
        t5: "\"Every re-scan surfaces something I missed. The personalized plans keep me accountable without feeling generic.\"",
        t6: "\"Clinical options plus daily habits — all ranked by impact. I haven't found anything else this precise.\"",
        t7: "\"I tried MorphIndex out of curiosity. The depth of the recommendations led me to book a specialist — the app genuinely shifted my approach.\""
      },
      platform: {
        title: "One workspace for the full picture",
        subtitle: "Beyond the initial scan: your score, plan, progress, and AI coach — in one place.",
        f1t: "Your score", f1d: "One overall rating from your scan — easy to track over time.",
        f2t: "Coach", f2d: "Ask questions about your face and get clear, actionable answers.",
        f3t: "See your potential", f3d: "Preview your look in 6 months or simulate cosmetic changes.",
        f4t: "Action plan", f4d: "A simple checklist ranked by what will move your score most.",
        f5t: "Progress tracker", f5d: "Re-scan over time and watch your score climb.",
        new: "New"
      },
      showcase: {
        tag1: "AI Coach", tag2: "Simulator",
        title: "Inside the analysis engine",
        subtitle: "Each scan surfaces granular detail — from skin vitality to zone-by-zone proportional ratios.",
        highlight: "100+ tracked variables per session"
      },
      steps: {
        eyebrow: "The method",
        title: "From photo to progress in four moves",
        subtitle: "Scan, understand, plan, repeat — each cycle sharpens your index.",
        s1t: "Upload", s1d: "Add a front photo and a side profile — that's all MorphIndex needs to start.",
        s2t: "Analyze",         s2d: "Get your scores across harmony, jawline, traits, and skin.",
        s3t: "Prioritize", s3d: "Receive simple tips ranked by what will improve your score most.",
        s4t: "Iterate", s4d: "Follow your plan, preview your potential, and re-scan to track progress.",
        note: "Side-profile analysis included with every scan."
      },
      projection: {
        eyebrow: "Growth model", title: "Small gains compound",
        subtitle: "MorphIndex models where your score could land if you follow the recommended path.",
        today: "Today", potential: "Potential", btn: "Explore my trajectory"
      },
      audience: {
        eyebrow: "Built for", title: "The committed, not the curious",
        p1: "A score alone changes nothing. The members who transform treat MorphIndex as a starting line — then do the work between scans.",
        p2: "If that sounds like you, you're in the right place."
      },
      cta: {
        title: "Your baseline starts here",
        subtitle: "Join 120,000+ members who measure before they optimize.",
        btn: "Create my profile", note: "One scan. Full picture. No guesswork."
      },
      footer: { join: "Join Us", privacy: "Privacy", terms: "Terms", copy: "© 2026 MorphIndex" },
      auth: {
        loginTitle: "Log in",
        registerTitle: "Create your account",
        loginSubmit: "Log in",
        registerSubmit: "Continue",
        emailPlaceholder: "name@example.com",
        passwordPlaceholder: "*********",
        or: "or",
        google: "Continue with Google",
        showPassword: "Show password",
        hidePassword: "Hide password",
        switchToLogin: "Already have an account?",
        switchToLoginLink: "Log in",
        switchToRegister: "Don't have an account?",
        switchToRegisterLink: "Sign up",
        legal: "By continuing, you agree to our Terms of Service and Privacy Policy.",
        back: "Back to home",
        loginMeta: {
          title: "MorphIndex — Log in",
          description: "Log in to your MorphIndex account."
        },
        registerMeta: {
          title: "MorphIndex — Create your account",
          description: "Create your MorphIndex account and start your transformation journey."
        }
      },
      app: {
        eyebrow: "Your account",
        welcome: "Welcome back",
        subtitle: "You're signed in. Your analysis dashboard will be available here soon.",
        startAnalysis: "Start your analysis",
        viewResults: "View my results",
        backHome: "Back to home",
        signOut: "Sign out",
        welcomeTour: {
          aria: "Welcome tour",
          skip: "Skip tour",
          stepOf: "Step {current} of {total}",
          step0: {
            title: "Welcome to MorphIndex!",
            body: "Your analysis is unlocked. Here's a quick tour of your dashboard."
          },
          step1: {
            title: "Home",
            body: "Your global score, next action, and a snapshot of your progress."
          },
          step2: {
            title: "Plan",
            body: "Your personalized week-by-week improvement plan with actions to check off."
          },
          step3: {
            title: "Progress",
            body: "Track your metrics over time and see what moves your score."
          },
          step4: {
            title: "AI Coach",
            body: "Ask questions anytime — your coach knows your analysis and plan."
          }
        },
        meta: {
          title: "MorphIndex — Dashboard",
          description: "Your full facial analysis dashboard with scores, metrics, and improvement plan."
        }
      },
      dashboard: {
        eyebrow: "Your analysis",
        title: "Dashboard",
        nav: {
          label: "Main navigation",
          backToApp: "Back to home",
          overview: "Home",
          preview: "Preview",
          metrics: "Progress",
          plan: "Plan",
          chat: "Coach",
          simulate: "Simulate"
        },
        pages: {
          overview: {
            title: "Home",
            description: "Your score, current focus, and what to do next."
          },
          preview: {
            title: "6-month preview",
            description: "AI projection of your results if you follow your improvement plan."
          },
          metrics: {
            title: "Progress",
            description: "Score history and detailed metrics across all pillars."
          },
          plan: {
            title: "Your plan",
            description: "This week's actions for your active focus."
          },
          chat: {
            title: "Coach",
            description: "Ask Coach about your analysis and improvement plan."
          },
          simulate: {
            title: "Simulations",
            description: "Preview cosmetic procedure effects on your photo with adjustable intensity."
          },
          potential: {
            title: "Your potential",
            description: "6-month preview and procedure simulations in one place.",
            tabPreview: "6-month preview",
            tabSimulate: "Simulate changes"
          }
        },
        nextStep: {
          eyebrow: "Do this next",
          doNext: "Next action:",
          cta: "Open my plan",
          allDone: "All actions done for this phase — keep going or start a new scan."
        },
        split: {
          label: "Strengths and focus areas",
          strengths: "Strengths",
          strengthsDesc: "Your strongest pillars right now.",
          weaknesses: "Focus areas",
          weaknessesDesc: "Where improvement will move your score most.",
          focusLabel: "Priority targets"
        },
        tools: {
          label: "Tools",
          potential: "See my potential",
          rescan: "New scan"
        },
        metricsView: {
          top5Title: "Top 5 to improve",
          top5Subtitle: "Start here — these areas will move your score the most.",
          showAll: "Show all metrics",
          showTop: "Show top 5 only"
        },
        coachFab: {
          label: "Ask Coach",
          aria: "Open AI coach"
        },
        overall: "Overall score",
        potential: "Potential score",
        percentile: "Top {n}% of users",
        photoFront: "Front",
        photoSide: "Side profile",
        ideal: "Ideal",
        yourResult: "Your result",
        statusLabel: "Status",
        howToImprove: "How to improve:",
        planTitle: "Your improvement plan",
        planSubtitle: "Follow one focus at a time with weekly actions you can check off.",
        planProgress: "{done}/{total} done",
        weeks: "{n} weeks",
        journey: {
          eyebrow: "Your journey",
          currentFocus: "Current focus",
          thisWeek: "This week — your actions",
          weekOf: "Week {current} of {total}",
          phaseRange: "Weeks {start}–{end}",
          phaseProgress: "{done}/{total} actions this phase",
          overallProgress: "{done}/{total} total",
          phases: {
            foundation: "Foundation",
            training: "Build habits",
            refinement: "Measure & adjust"
          },
          switchFocus: "Set as active focus",
          activeBadge: "Active",
          allPriorities: "All priorities",
          rescanReminder: "You're nearing the end of this focus. Run a new scan to measure progress and unlock your next priority.",
          rescanCta: "Start a new scan",
          avoidTitle: "Avoid",
          consultTitle: "When to consult a professional",
          disclaimer: "Aesthetic self-improvement guidance only — not medical advice."
        },
        disclaimer: "Scores are for self-improvement guidance only — not medical advice.",
        rescanConfirm: "Start a new scan? Your current photos will be replaced.",
        empty: {
          title: "Scan data missing",
          desc: "Your photos aren't available on this device. Run a new scan to restore your dashboard.",
          cta: "Start a new scan"
        },
        quickActions: {
          label: "Quick navigation",
          preview: "6-month preview",
          previewDesc: "See your projected transformation",
          metrics: "Detailed metrics",
          metricsDesc: "100+ ratios across 4 pillars",
          plan: "Improvement plan",
          planDesc: "Prioritized actions for your goals",
          rescan: "New scan",
          rescanDesc: "Track progress with a fresh analysis"
        },
        history: {
          title: "Score history",
          subtitle: "Track how your overall score changes across scans."
        },
        chat: {
          subtitle: "Ask Coach about your scores, metrics, or improvement plan — answers follow your active protocol.",
          placeholder: "Ask about your analysis…",
          send: "Send",
          empty: "Start a conversation — ask about your scores or what to focus on first.",
          error: "Coach is unavailable right now. Please try again.",
          limitReached: "You've reached today's Coach message limit. Check your Plan page for this week's actions and try again tomorrow.",
          promptThisWeek: "What should I do this week?",
          promptWhyFocus: "Why is this my current focus?",
          promptNextStep: "What is my next step?",
          prompts: {
            thisWeek: "Based on my current journey phase, what should I focus on this week? List the checklist actions I should complete.",
            whyFocus: "Why is my current active focus the right priority given my analysis scores?",
            nextStep: "Looking at my journey progress, what is the single most important next step I should take?"
          }
        },
        simulate: {
          subtitle: "Preview how a cosmetic adjustment might look on your photo.",
          intensity: "Intensity",
          generate: "Generate simulation",
          generating: "Generating…",
          after: "Simulated",
          disclaimer: "Simulations are illustrative only — not medical advice or guarantees.",
          error: "Simulation failed. Please try again.",
          procedures: {
            jawline: "Jawline",
            nose: "Nose",
            cheeks: "Cheeks",
            chin: "Chin",
            lips: "Lips"
          }
        },
        preview: {
          title: "Your 6-month preview",
          subtitle: "AI projection of your results if you follow your improvement plan.",
          before: "Today",
          after: "In 6 months",
          generating: "Generating your preview…",
          dragHint: "Drag to compare before and after",
          error: "Preview unavailable right now. Reload this page to try again.",
          scoreNote: "Projected overall score: {current} → {potential}/10"
        },
        status: { good: "On target", average: "Average", focus: "Focus area" },
        impact: { high: "High impact", medium: "Medium impact", low: "Low impact" },
        summary: {
          facialThirds: "Facial thirds ratio",
          jawAngle: "Jaw angle",
          symmetryDeviation: "Symmetry deviation",
          ipdRatio: "IPD ratio"
        },
        metrics: {
          facialThirds: "Facial thirds ratio",
          facialWidthHeight: "Facial width-to-height",
          midfaceRatio: "Midface ratio",
          symmetryDeviation: "Symmetry deviation",
          ipdRatio: "Interpupillary distance ratio",
          canthalTilt: "Canthal tilt",
          noseChinRatio: "Nose-to-chin ratio",
          jawAngle: "Gonial angle",
          gonialAngle: "Mandibular angle",
          jawDefinition: "Jawline definition",
          cheekboneProminence: "Cheekbone prominence",
          chinProjection: "Chin projection",
          mandibleWidth: "Mandible width",
          browRidge: "Brow ridge prominence",
          jawRobustness: "Jaw robustness",
          facialHairline: "Hairline shape",
          lipFullness: "Lip fullness",
          noseSize: "Nose size balance",
          skinClarity: "Skin clarity",
          underEyeQuality: "Under-eye quality",
          acneScarring: "Acne & scarring",
          poreVisibility: "Pore visibility",
          lipHealth: "Lip health",
          hairDensity: "Hair density"
        },
        metricDetails: {
          facialThirds: {
            desc: "Compares the upper, middle, and lower thirds of your face. Balanced thirds create a more harmonious vertical structure.",
            tip: "Track front photos at the same angle; posture and chin position can improve perceived balance over time."
          },
          facialWidthHeight: {
            desc: "Measures face width relative to height. This ratio strongly influences how compact or elongated your face appears.",
            tip: "Hairstyle length and facial hair can visually adjust width/height balance while you work on body fat and posture."
          },
          midfaceRatio: {
            desc: "Evaluates midface length and proportions between the eyes and upper lip area.",
            tip: "Keep photo distance consistent and focus on cheek support through sleep, training, and body composition."
          },
          symmetryDeviation: {
            desc: "Estimates left/right facial asymmetry. Small deviations are normal; larger ones affect overall harmony.",
            tip: "Use even lighting and a true front-facing angle in scans; posture and habitual chewing side can also play a role."
          },
          ipdRatio: {
            desc: "Interpupillary distance relative to facial width — a key cue for eye spacing balance.",
            tip: "This is largely structural; framing with brows/hair and eyewear choice can improve perceived balance."
          },
          canthalTilt: {
            desc: "The angle of the eye axis from inner to outer corner. A slight positive tilt is often preferred.",
            tip: "Brow grooming and sleep quality can subtly influence eye appearance; structural change is limited without procedures."
          },
          noseChinRatio: {
            desc: "Balance between nose length and chin projection in the lower facial third.",
            tip: "Improve chin support with posture and body fat reduction; avoid extreme camera angles that distort this ratio."
          },
          jawAngle: {
            desc: "The visible jaw angle at the mandibular corner. Cleaner angles read as more defined and angular.",
            tip: "Lower body fat, train masseters carefully, and maintain tongue/neck posture to sharpen the jaw contour."
          },
          gonialAngle: {
            desc: "The mandibular corner angle that shapes lower-face geometry and jaw presence.",
            tip: "Consistency with mewing posture and leaner facial fat often improves how this angle photographs."
          },
          jawDefinition: {
            desc: "How clearly the jawline separates from the neck and cheeks.",
            tip: "Prioritize fat loss, hydration, and posture; track progress with consistent side-profile photos."
          },
          cheekboneProminence: {
            desc: "How projected and structured the cheekbones appear relative to soft tissue.",
            tip: "Reduce facial bloating (sleep, sodium, alcohol) and keep lighting consistent when comparing scans."
          },
          chinProjection: {
            desc: "Forward projection of the chin relative to ideal facial balance.",
            tip: "Neck posture and lower-face fat reduction can improve chin presence in profile views."
          },
          mandibleWidth: {
            desc: "Lower jaw width relative to overall facial width — contributes to a stronger or narrower base.",
            tip: "Facial hair styling can widen or soften the base; structural width changes slowly without intervention."
          },
          browRidge: {
            desc: "Prominence of the brow bone — a classic masculine dimorphism cue.",
            tip: "Brow shape and fringe length can emphasize or soften ridge visibility in photos."
          },
          jawRobustness: {
            desc: "Overall strength and density impression of the jaw structure.",
            tip: "Lean body composition and masseter tone make robustness read more clearly on camera."
          },
          facialHairline: {
            desc: "Hairline shape and framing of the upper face.",
            tip: "A tailored cut/part and scalp care can improve framing while you monitor density over time."
          },
          lipFullness: {
            desc: "Perceived upper/lower lip volume relative to balanced facial aesthetics.",
            tip: "Hydration and lip care improve appearance; avoid dehydrated photos that understate volume."
          },
          noseSize: {
            desc: "Nose size and projection relative to surrounding facial features.",
            tip: "Camera distance matters — compare only same-angle scans; grooming around the midface can refine balance."
          },
          skinClarity: {
            desc: "Overall evenness and clarity of skin tone and texture.",
            tip: "Daily SPF, gentle cleansing, and a simple retinoid routine usually deliver the biggest clarity gains."
          },
          underEyeQuality: {
            desc: "Dark circles, hollowness, and puffiness under the eyes.",
            tip: "Prioritize sleep consistency, reduce salt/alcohol before scans, and consider caffeine-based topical care."
          },
          acneScarring: {
            desc: "Visible acne activity and residual scarring impact on skin quality.",
            tip: "Keep a consistent acne-safe routine and avoid picking; professional treatments can help persistent marks."
          },
          poreVisibility: {
            desc: "How visible pores appear in the T-zone and cheeks.",
            tip: "Use niacinamide/retinoids and non-comedogenic moisturizers; photograph in diffuse light for fair comparisons."
          },
          lipHealth: {
            desc: "Lip texture, dryness, and overall healthy appearance.",
            tip: "Daily balm + SPF lip protection and hydration keep lips smoother between scans."
          },
          hairDensity: {
            desc: "Perceived density and coverage of hair at the scalp and hairline.",
            tip: "Track with consistent top-down photos; consider proven density routines early if thinning is progressive."
          }
        },
        plan: {
          jawlineDefinition: { title: "Improve jawline definition", desc: "Focus on body fat reduction, mewing posture, and masseter training." },
          midfaceBalance: { title: "Balance midface proportions", desc: "Track cheek volume and midface length with consistent photo angles." },
          skinRoutine: { title: "Optimize skincare routine", desc: "Target clarity and pore visibility with retinoids and SPF daily." },
          underEyeCare: { title: "Address under-eye area", desc: "Improve sleep consistency and consider caffeine-based topical care." },
          postureMewing: { title: "Posture & tongue posture", desc: "Maintain proper oral posture and neck alignment for jaw support." },
          grooming: { title: "Refine grooming", desc: "Optimize hairstyle and facial hair to enhance dimorphic traits." }
        },
        protocols: {
          _shared: {
            actions: {
              baselinePhotos: "Take baseline photos (same angle, lighting, and distance)",
              weeklyPhotos: "Take weekly progress photos with the same setup",
              photoCompare: "Compare week-1 and current photos side by side",
              rescan: "Run a new MorphIndex scan to update your scores",
              adjustFocus: "Review metrics and decide whether to continue or switch focus"
            }
          },
          jawlineDefinition: {
            actions: {
              bodyFat: "Body composition: keep facial fat lower so the jaw shows",
              tonguePosture: "Learn tongue posture (10 min drills)",
              mewingDaily: "Hold mewing posture during the day",
              jawExercises: "Masseter work + release (3× / week)",
              neckPosture: "Neck alignment drills (chin tuck, wall posture)",
              chinTucks: "Daily chin-tuck sets for neck/jaw support",
              guaShaLymph: "Gua sha lymphatic drainage for the jawline",
              hardChewing: "Balanced hard-gum chew sessions (optional)"
            },
            avoid: {
              unsupervisedSurgery: "Booking procedures without a qualified professional",
              excessiveMewing: "Forceful or painful mewing that strains the jaw"
            },
            consultWhen: {
              tmjPain: "Jaw pain, clicking, or TMJ discomfort",
              suddenAsymmetry: "Sudden or worsening facial asymmetry"
            }
          },
          midfaceBalance: {
            actions: {
              consistentAngles: "Weekly photos at identical front / ¾ angles",
              sleepPosition: "Sleep position: avoid face-down puffiness",
              hydration: "Hydration + lower late salt to reduce midface bloat",
              cheekExercises: "Cheek lift holds (5 min/day)",
              midfaceAwareness: "Catch posture/tension that collapses midface support",
              guaShaCheek: "Gua sha for cheeks / midface lift appearance"
            },
            avoid: {
              fillerWithoutConsult: "DIY fillers or unlicensed injectables",
              extremeContouring: "Heavy makeup contouring instead of structural habits"
            },
            consultWhen: {
              swelling: "Persistent facial swelling without clear cause",
              persistentAsymmetry: "Asymmetry that does not improve with basics"
            }
          },
          skinRoutine: {
            actions: {
              patchTest: "Patch-test every new product (24–48h)",
              gentleCleanser: "Gentle cleanser morning and night",
              moisturizerBasic: "Barrier moisturizer morning and night",
              dailySpf: "SPF 50 every morning (non-negotiable)",
              niacinamide: "Add niacinamide serum for pores / oil",
              introduceRetinoid: "Introduce beginner retinol 2–3 nights/week",
              moisturize: "Moisturize after every active",
              guaShaFace: "Full-face gua sha + lymphatic drainage"
            },
            avoid: {
              stackingActives: "Using multiple strong actives on the same night",
              skippingSpf: "Skipping sunscreen while using retinoids"
            },
            consultWhen: {
              irritation: "Burning, peeling, or persistent redness",
              acneWorsening: "Acne that worsens after 4+ weeks"
            }
          },
          underEyeCare: {
            actions: {
              sleepSchedule: "Fixed 7–8h sleep schedule",
              hydration: "Hydration + cut late salt/alcohol",
              caffeineTopical: "Morning caffeine eye serum",
              eyeCream: "Night peptide / repair eye cream",
              coldCompress: "Cool compress on puffy mornings",
              lymphaticDrain: "Under-eye lymphatic gua sha drain"
            },
            avoid: {
              harshScrubs: "Aggressive scrubs or strong acids on the under-eye area",
              allergicProducts: "New products without a patch test"
            },
            consultWhen: {
              persistentDarkCircles: "Dark circles unchanged after 8 weeks of basics",
              swelling: "Sudden or one-sided under-eye swelling"
            }
          },
          postureMewing: {
            actions: {
              learnTechnique: "Learn correct mewing technique in the mirror",
              nasalBreathing: "Build all-day nasal breathing habit",
              postureChecks: "3 daily posture reset alarms",
              reminderSetup: "Desk + mirror visual cues",
              dailyBlocks: "Two 5-minute focused mewing blocks",
              neckAlignment: "Chin tucks + wall posture daily",
              mewingDaily: "Keep resting tongue posture all day",
              habitReview: "Weekly review of posture triggers"
            },
            avoid: {
              forcefulPressure: "Pressing the tongue with excessive force",
              ignoringPain: "Continuing if you feel jaw or tooth pain"
            },
            consultWhen: {
              tmjPain: "TMJ pain, headaches, or bite changes",
              breathingDifficulty: "Difficulty breathing through the nose"
            }
          },
          grooming: {
            actions: {
              styleAudit: "Audit haircut / facial hair vs face shape",
              referencePhotos: "Collect 3 realistic reference looks",
              haircutUpdate: "Haircut that frames jaw + cheekbones",
              facialHair: "Shape facial hair to sharpen the jawline",
              browGroom: "Weekly brow grooming for upper-third frame",
              refineLook: "Weekly micro-adjustments (lines, length, product)"
            },
            avoid: {
              drasticChanges: "Extreme style changes before tracking baseline photos",
              ignoringFaceShape: "Copying trends that fight your bone structure"
            },
            consultWhen: {
              skinReaction: "Irritation from dyes, bleaches, or products",
              hairLoss: "Sudden thinning or patchy hair loss"
            }
          }
        }
      },
      onboarding: {
        step: "Step",
        back: "Back",
        continue: "Continue",
        uploadPhoto: "Upload photo",
        capturePhoto: "Capture photo",
        useGallery: "Gallery",
        retake: "Retake",
        storageError: "Unable to save your photo on this device. Try a smaller image or clear browser storage.",
        camera: {
          loading: "Starting camera…",
          searching: "Position your face in the oval",
          closer: "Move closer",
          farther: "Move back",
          center: "Center your head in the oval",
          angleFront: "Look straight at the camera",
          angleSide: "Turn your head to show your profile",
          aligned: "Perfect — hold still…",
          capturing: "Capturing…",
          captured: "Photo captured",
          denied: "Camera unavailable — use gallery instead"
        },
        cameraAccess: {
          title: "Enable your camera",
          subtitle: "We only scan your face — not your body or background. Your photos stay private until analysis.",
          tip1: "Hold the phone at eye level",
          tip2: "Move close so your head fills the oval — closer is better for analysis",
          tip3: "Use good, even lighting",
          grant: "Allow camera access",
          skip: "Use gallery instead",
          denied: "Camera access was denied. You can still use the gallery."
        },
        welcome: {
          eyebrow: "Getting started",
          title: "Welcome to MorphIndex",
          subtitle: "Let's analyze your face across 100+ metrics and build your personalized improvement plan.",
          item1: "Take a front and side photo",
          item2: "Get your scores across harmony, jawline, traits, and skin",
          item3: "Unlock your full results and personalized plan",
          note: "Takes about 2 minutes. Your photos stay private."
        },
        consent: {
          eyebrow: "Before we start",
          title: "Your data, your control",
          subtitle: "We need your consent to analyze your facial photos and store your results securely.",
          photos: "I agree to upload photos for AI facial analysis",
          storage: "I agree to secure storage of my photos and analysis results",
          disclaimer: "I understand this is not medical advice",
          legal: "Read our Privacy Policy and Terms of Service for full details."
        },
        photos: {
          phaseFront: "1 of 2 — Front photo",
          phaseSide: "2 of 2 — Side profile"
        },
        front: {
          eyebrow: "Front photo",
          title: "Take a front-facing photo",
          subtitle: "Look straight at the camera with a neutral expression. Good lighting, no obstructions.",
          guide: "Center your face in the frame",
          tip1: "Face the camera directly",
          tip2: "Use natural, even lighting",
          tip3: "Remove glasses and keep hair off your face"
        },
        side: {
          eyebrow: "Side profile",
          title: "Take a side profile photo",
          subtitle: "Turn your head 90° to show your profile. Keep your chin level and look straight ahead.",
          guide: "Show your full profile",
          tip1: "Turn exactly 90° from the camera",
          tip2: "Keep your jawline visible",
          tip3: "Same lighting as your front photo"
        },
        analyzing: {
          title: "Analyzing your face…",
          subtitle: "Measuring 100+ facial metrics across 4 pillars.",
          harmony: "Mapping facial harmony ratios",
          angularity: "Measuring jawline & bone structure",
          dimorphism: "Evaluating dimorphic traits",
          features: "Analyzing skin & feature quality"
        },
        results: {
          eyebrow: "Analysis complete",
          title: "Your results are ready",
          subtitle: "Here's a preview — subscribe to unlock the full breakdown and your plan.",
          overall: "Overall score",
          teaser: "Your detailed breakdown is below",
          metric1: "Facial thirds ratio",
          metric2: "Jaw angle",
          metric3: "Symmetry deviation",
          metric4: "IPD ratio",
          lock: "Subscribe to unlock your full results",
          unlock: "Unlock my results"
        },
        paywall: {
          eyebrow: "MorphIndex Pro",
          title: "Unlock your full analysis",
          subtitle: "Get access to your complete results, personalized plan, and progress tracking.",
          f1: "Full analysis across 100+ metrics",
          f2: "Personalized improvement plan",
          f3: "Coach — AI expert guidance",
          f4: "Progress tracking & re-scans",
          yearly: "Yearly",
          yearlyPrice: "€59.99/year",
          monthly: "Monthly",
          monthlyPrice: "€9.99/month",
          bestValue: "Best value",
          subscribe: "Subscribe now",
          legal: "Cancel anytime. Secure payment via Stripe.",
          verifying: "Confirming your payment…",
          verifyingSubscription: "Activating your subscription…",
          checkoutError: "Unable to start checkout. Please try again.",
          checkoutLoading: "Redirecting to checkout…",
          cancelled: "Payment cancelled. Subscribe to unlock your full results."
        },
        meta: {
          title: "MorphIndex — Onboarding",
          description: "Complete your first facial analysis with MorphIndex."
        }
      }
    },
    fr: {
      meta: {
        title: "MorphIndex — Votre morphologie, chiffrée",
        description: "MorphIndex transforme vos photos faciales en métriques structurées, un parcours personnalisé et des progrès mesurables dans le temps."
      },
      a11y: { theme: "Changer le thème", language: "Changer la langue", menu: "Ouvrir le menu", stars: "5 étoiles", prev: "Précédent", next: "Suivant", close: "Fermer" },
      nav: { celebs: "Profils", creators: "Communauté", login: "Connexion", cta: "Essayer MorphIndex", ctaShort: "Essayer" },
      hero: {
        users: "utilisateurs actifs", analyses: "analyses réalisées",
        title: "Décryptez votre structure.<br>Suivez ce qui évolue.",
        subtitle: "MorphIndex transforme vos photos en tableau de bord vivant — métriques structurées, feuille de route priorisée et preuves de progression au fil du temps.",
        cta: "Lancer mon premier scan", link: "Voir comment ça marche",
        note: "Pour ceux qui préfèrent les données aux avis.",
        tabFront: "Scan de face", tabSide: "Scan de profil"
      },
      transform: {
        eyebrow: "Étude de cas", title: "Deux ans, une trajectoire",
        subtitle: "Habitudes disciplinées, scans enregistrés, progression visible — documentée mois après mois.",
        before: "Jour 1", after: "Aujourd'hui",
        scoreLabel: "Progression de l'index sur 24 mois d'efforts réguliers",
        p1t: "Base & habitudes", p1d: "Mois 0–8 · mise en place des routines",
        p2t: "Premiers signaux", p2d: "Mois 8–14 · premiers changements mesurables",
        p3t: "Élan structurel", p3d: "Mois 14–26 · modifications plus profondes",
        p4t: "Fenêtre optimale", p4d: "Mois 26–30 · consolidation des gains",
        q1: "La progression n'est pas un hasard — c'est le fruit de la constance.",
        q2: "Les membres qui progressent le plus traitent chaque scan comme un point de contrôle, pas un jugement. MorphIndex entretient ce rythme."
      },
      pillars: {
        eyebrow: "Modèle de notation", title: "Quatre scores, une note globale",
        subtitle: "Chaque scan évalue harmonie, mâchoire, traits et peau.",
        p1: "Harmonie", p1d: "Symétrie, proportions et équilibre du visage", p1m: "ratios",
        p2: "Mâchoire", p2d: "Définition de la mâchoire, angles et structure osseuse", p2m: "structure",
        p3: "Traits", p3d: "Caractère masculin ou féminin du visage", p3m: "caractère",
        p4: "Peau", p4d: "Teint, cernes, pores et santé des cheveux", p4m: "qualité"
      },
      banner: "Fondé sur la recherche faciale quantitative — pour tous ceux qui abordent l'amélioration de l'apparence comme une discipline mesurable.",
      testimonials: {
        title: "Ce que disent les membres", subtitle: "Retours sans filtre de personnes qui scannent régulièrement.",
        t1: "\"Pas de blabla, juste des chiffres sur lesquels agir. Que j'optimise ou que je comprenne ma structure, MorphIndex est l'outil le plus fiable que j'utilise.\"",
        t2: "\"Je connaissais vaguement mes points faibles — MorphIndex les a quantifiés. Remplacer les suppositions par des métriques a tout changé.\"",
        t3: "\"Mon score composite était correct, mais j'avais besoin de détails sur la texture et le creux sous les yeux. MorphIndex a été la première app à me donner des éléments exploitables.\"",
        t4: "\"Forces, lacunes, priorités — tout est clair. Ça seul valait l'inscription.\"",
        t5: "\"Chaque re-scan révèle quelque chose que j'avais manqué. Les plans personnalisés me responsabilisent sans paraître génériques.\"",
        t6: "\"Options cliniques et habitudes quotidiennes — tout classé par impact. Je n'ai rien trouvé d'aussi précis ailleurs.\"",
        t7: "\"J'ai testé MorphIndex par curiosité. La profondeur des recommandations m'a poussé à consulter un spécialiste — l'app a vraiment changé mon approche.\""
      },
      platform: {
        title: "Un espace de travail pour la vue d'ensemble",
        subtitle: "Au-delà du scan : score, plan, progrès et coach IA — au même endroit.",
        f1t: "Votre score", f1d: "Une note globale facile à suivre dans le temps.",
        f2t: "Coach", f2d: "Posez vos questions et obtenez des réponses claires.",
        f3t: "Voir votre potentiel", f3d: "Aperçu à 6 mois et simulations de changements.",
        f4t: "Plan d'action", f4d: "Une checklist simple classée par impact.",
        f5t: "Suivi de progression", f5d: "Re-scannez et voyez votre score évoluer.",
        new: "Nouveau"
      },
      showcase: {
        tag1: "Coach IA", tag2: "Simulateur",
        title: "Au cœur du moteur d'analyse",
        subtitle: "Chaque scan révèle des détails granulaires — de la vitalité de la peau aux ratios proportionnels zone par zone.",
        highlight: "Plus de 100 variables suivies par session"
      },
      steps: {
        eyebrow: "La méthode",
        title: "De la photo à la progression en quatre étapes",
        subtitle: "Scanner, comprendre, planifier, recommencer — chaque cycle affine votre index.",
        s1t: "Importer", s1d: "Ajoutez une photo de face et une de profil — c'est tout ce dont MorphIndex a besoin.",
        s2t: "Analyser",         s2d: "Recevez vos scores harmonie, mâchoire, traits et peau.",
        s3t: "Prioriser", s3d: "Obtenez des conseils simples classés par impact sur votre score.",
        s4t: "Itérer", s4d: "Suivez votre plan, visualisez votre potentiel et re-scannez pour suivre vos progrès.",
        note: "L'analyse de profil est incluse à chaque scan."
      },
      projection: {
        eyebrow: "Modèle de croissance", title: "Les petits gains s'accumulent",
        subtitle: "MorphIndex modélise où votre score pourrait atterrir si vous suivez le parcours recommandé.",
        today: "Aujourd'hui", potential: "Potentiel", btn: "Explorer ma trajectoire"
      },
      audience: {
        eyebrow: "Conçu pour", title: "Les engagés, pas les curieux",
        p1: "Un score seul ne change rien. Les membres qui se transforment traitent MorphIndex comme une ligne de départ — puis font le travail entre les scans.",
        p2: "Si cela vous ressemble, vous êtes au bon endroit."
      },
      cta: {
        title: "Votre base de départ, ici",
        subtitle: "Rejoignez plus de 120 000 membres qui mesurent avant d'optimiser.",
        btn: "Créer mon profil", note: "Un scan. Vue complète. Zéro approximation."
      },
      footer: { join: "Nous rejoindre", privacy: "Confidentialité", terms: "Conditions", copy: "© 2026 MorphIndex" },
      auth: {
        loginTitle: "Connexion",
        registerTitle: "Créer votre compte",
        loginSubmit: "Se connecter",
        registerSubmit: "Continuer",
        emailPlaceholder: "nom@exemple.com",
        passwordPlaceholder: "*********",
        or: "ou",
        google: "Continuer avec Google",
        showPassword: "Afficher le mot de passe",
        hidePassword: "Masquer le mot de passe",
        switchToLogin: "Vous avez déjà un compte ?",
        switchToLoginLink: "Se connecter",
        switchToRegister: "Pas encore de compte ?",
        switchToRegisterLink: "S'inscrire",
        legal: "En continuant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité.",
        back: "Retour à l'accueil",
        loginMeta: {
          title: "MorphIndex — Connexion",
          description: "Connectez-vous à votre compte MorphIndex."
        },
        registerMeta: {
          title: "MorphIndex — Créer votre compte",
          description: "Créez votre compte MorphIndex et commencez votre parcours de transformation."
        }
      },
      app: {
        eyebrow: "Votre compte",
        welcome: "Bon retour",
        subtitle: "Vous êtes connecté. Votre tableau de bord d'analyse sera bientôt disponible ici.",
        startAnalysis: "Commencer votre analyse",
        viewResults: "Voir mes résultats",
        backHome: "Retour à l'accueil",
        signOut: "Se déconnecter",
        welcomeTour: {
          aria: "Visite guidée",
          skip: "Passer la visite",
          stepOf: "Étape {current} sur {total}",
          step0: {
            title: "Bienvenue sur MorphIndex !",
            body: "Votre analyse est débloquée. Voici un tour rapide de votre espace."
          },
          step1: {
            title: "Accueil",
            body: "Votre score global, la prochaine action et un aperçu de vos progrès."
          },
          step2: {
            title: "Plan",
            body: "Votre plan personnalisé semaine par semaine, avec des actions à cocher."
          },
          step3: {
            title: "Progrès",
            body: "Suivez vos métriques dans le temps et voyez ce qui fait monter votre score."
          },
          step4: {
            title: "Coach IA",
            body: "Posez vos questions à tout moment — le coach connaît votre analyse et votre plan."
          }
        },
        meta: {
          title: "MorphIndex — Tableau de bord",
          description: "Votre tableau de bord complet avec scores, métriques et plan d'amélioration."
        }
      },
      dashboard: {
        eyebrow: "Votre analyse",
        title: "Tableau de bord",
        nav: {
          label: "Navigation principale",
          backToApp: "Retour à l'accueil",
          overview: "Accueil",
          preview: "6 mois",
          metrics: "Progrès",
          plan: "Plan",
          chat: "Coach",
          simulate: "Simuler"
        },
        pages: {
          overview: {
            title: "Accueil",
            description: "Votre score, votre focus actuel et la prochaine action."
          },
          preview: {
            title: "Aperçu à 6 mois",
            description: "Projection IA de vos résultats si vous suivez votre plan d'amélioration."
          },
          metrics: {
            title: "Progrès",
            description: "Historique des scores et métriques détaillées."
          },
          plan: {
            title: "Votre plan",
            description: "Les actions de cette semaine pour votre focus actif."
          },
          chat: {
            title: "Coach",
            description: "Posez vos questions à Coach sur votre analyse et votre plan."
          },
          simulate: {
            title: "Simulations",
            description: "Prévisualisez l'effet de procédures esthétiques sur votre photo."
          },
          potential: {
            title: "Votre potentiel",
            description: "Aperçu à 6 mois et simulations au même endroit.",
            tabPreview: "Aperçu 6 mois",
            tabSimulate: "Simuler des changements"
          }
        },
        nextStep: {
          eyebrow: "À faire ensuite",
          doNext: "Prochaine action :",
          cta: "Ouvrir mon plan",
          allDone: "Toutes les actions de cette phase sont faites — continuez ou lancez un nouveau scan."
        },
        split: {
          label: "Forces et axes de travail",
          strengths: "Forces",
          strengthsDesc: "Vos piliers les plus solides actuellement.",
          weaknesses: "À travailler",
          weaknessesDesc: "Là où progresser fera le plus monter votre score.",
          focusLabel: "Priorités"
        },
        tools: {
          label: "Outils",
          potential: "Voir mon potentiel",
          rescan: "Nouveau scan"
        },
        metricsView: {
          top5Title: "Top 5 à améliorer",
          top5Subtitle: "Commencez ici — ces points feront le plus monter votre score.",
          showAll: "Voir toutes les métriques",
          showTop: "Voir le top 5 seulement"
        },
        coachFab: {
          label: "Demander au Coach",
          aria: "Ouvrir le coach IA"
        },
        overall: "Score global",
        potential: "Score potentiel",
        percentile: "Top {n}% des utilisateurs",
        photoFront: "Face",
        photoSide: "Profil",
        ideal: "Idéal",
        yourResult: "Votre résultat",
        statusLabel: "Statut",
        howToImprove: "Comment progresser :",
        planTitle: "Votre plan d'amélioration",
        planSubtitle: "Un focus à la fois, avec des actions hebdomadaires à cocher.",
        planProgress: "{done}/{total} terminées",
        weeks: "{n} semaines",
        journey: {
          eyebrow: "Votre parcours",
          currentFocus: "Focus actuel",
          thisWeek: "Cette semaine — vos actions",
          weekOf: "Semaine {current} sur {total}",
          phaseRange: "Semaines {start}–{end}",
          phaseProgress: "{done}/{total} actions cette phase",
          overallProgress: "{done}/{total} au total",
          phases: {
            foundation: "Fondations",
            training: "Installer les habitudes",
            refinement: "Mesurer et ajuster"
          },
          switchFocus: "Définir comme focus actif",
          activeBadge: "Actif",
          allPriorities: "Toutes les priorités",
          rescanReminder: "Vous approchez de la fin de ce focus. Lancez un nouveau scan pour mesurer vos progrès et débloquer la priorité suivante.",
          rescanCta: "Lancer un nouveau scan",
          avoidTitle: "À éviter",
          consultTitle: "Quand consulter un professionnel",
          disclaimer: "Guidance esthétique d'auto-amélioration — pas un avis médical."
        },
        disclaimer: "Les scores sont indicatifs pour l'auto-amélioration — pas un avis médical.",
        rescanConfirm: "Lancer un nouveau scan ? Vos photos actuelles seront remplacées.",
        empty: {
          title: "Données de scan manquantes",
          desc: "Vos photos ne sont pas disponibles sur cet appareil. Lancez un nouveau scan pour restaurer votre tableau de bord.",
          cta: "Lancer un nouveau scan"
        },
        quickActions: {
          label: "Navigation rapide",
          preview: "Aperçu 6 mois",
          previewDesc: "Voir votre transformation projetée",
          metrics: "Métriques détaillées",
          metricsDesc: "100+ ratios sur 4 piliers",
          plan: "Plan d'amélioration",
          planDesc: "Actions prioritaires pour vos objectifs",
          rescan: "Nouveau scan",
          rescanDesc: "Suivre vos progrès avec une nouvelle analyse"
        },
        history: {
          title: "Historique des scores",
          subtitle: "Suivez l'évolution de votre score global entre les scans."
        },
        chat: {
          subtitle: "Posez à Coach vos questions — les réponses suivent votre protocole actif.",
          placeholder: "Posez une question sur votre analyse…",
          send: "Envoyer",
          empty: "Commencez la conversation — demandez par quoi commencer.",
          error: "Coach est indisponible pour le moment. Réessayez.",
          limitReached: "Vous avez atteint la limite de messages Coach pour aujourd'hui. Consultez votre Plan pour les actions de la semaine et réessayez demain.",
          promptThisWeek: "Que faire cette semaine ?",
          promptWhyFocus: "Pourquoi ce focus ?",
          promptNextStep: "Quelle est ma prochaine étape ?",
          prompts: {
            thisWeek: "Selon ma phase actuelle du parcours, sur quoi dois-je me concentrer cette semaine ? Liste les actions à cocher.",
            whyFocus: "Pourquoi mon focus actif est-il la bonne priorité compte tenu de mes scores ?",
            nextStep: "En regardant ma progression, quelle est la prochaine étape la plus importante ?"
          }
        },
        simulate: {
          subtitle: "Prévisualisez l'effet d'un ajustement esthétique sur votre photo.",
          intensity: "Intensité",
          generate: "Générer la simulation",
          generating: "Génération…",
          after: "Simulé",
          disclaimer: "Les simulations sont indicatives — pas un avis médical ni une garantie.",
          error: "Échec de la simulation. Réessayez.",
          procedures: {
            jawline: "Mâchoire",
            nose: "Nez",
            cheeks: "Joues",
            chin: "Menton",
            lips: "Lèvres"
          }
        },
        preview: {
          title: "Votre aperçu à 6 mois",
          subtitle: "Projection IA de vos résultats si vous suivez votre plan d'amélioration.",
          before: "Aujourd'hui",
          after: "Dans 6 mois",
          generating: "Génération de votre aperçu…",
          dragHint: "Glissez pour comparer avant et après",
          error: "Aperçu indisponible pour le moment. Rechargez la page pour réessayer.",
          scoreNote: "Score global projeté : {current} → {potential}/10"
        },
        status: { good: "Dans la cible", average: "Moyen", focus: "À travailler" },
        impact: { high: "Impact élevé", medium: "Impact moyen", low: "Impact faible" },
        summary: {
          facialThirds: "Ratio des tiers faciaux",
          jawAngle: "Angle de la mâchoire",
          symmetryDeviation: "Écart de symétrie",
          ipdRatio: "Ratio IPD"
        },
        metrics: {
          facialThirds: "Ratio des tiers faciaux",
          facialWidthHeight: "Ratio largeur/hauteur du visage",
          midfaceRatio: "Ratio du midface",
          symmetryDeviation: "Écart de symétrie",
          ipdRatio: "Distance interpupillaire",
          canthalTilt: "Inclinaison canthale",
          noseChinRatio: "Ratio nez-menton",
          jawAngle: "Angle gonial",
          gonialAngle: "Angle mandibulaire",
          jawDefinition: "Définition de la mâchoire",
          cheekboneProminence: "Proéminence des pommettes",
          chinProjection: "Projection du menton",
          mandibleWidth: "Largeur mandibulaire",
          browRidge: "Proéminence de l'arcade sourcilière",
          jawRobustness: "Robustesse de la mâchoire",
          facialHairline: "Forme de la ligne capillaire",
          lipFullness: "Volume des lèvres",
          noseSize: "Équilibre du nez",
          skinClarity: "Clarté de la peau",
          underEyeQuality: "Qualité sous les yeux",
          acneScarring: "Acné et cicatrices",
          poreVisibility: "Visibilité des pores",
          lipHealth: "Santé des lèvres",
          hairDensity: "Densité capillaire"
        },
        metricDetails: {
          facialThirds: {
            desc: "Compare les tiers supérieur, médian et inférieur du visage. Des tiers équilibrés renforcent l'harmonie verticale.",
            tip: "Comparez des photos de face au même angle ; la posture et la position du menton influencent l'équilibre perçu."
          },
          facialWidthHeight: {
            desc: "Mesure la largeur du visage par rapport à sa hauteur. Ce ratio change l'impression de visage compact ou allongé.",
            tip: "Coiffure et pilosité peuvent ajuster visuellement le ratio pendant que vous travaillez gras corporel et posture."
          },
          midfaceRatio: {
            desc: "Évalue la longueur et les proportions du midface entre les yeux et la lèvre supérieure.",
            tip: "Gardez une distance photo constante et soutenez les joues via sommeil, entraînement et composition corporelle."
          },
          symmetryDeviation: {
            desc: "Estime l'asymétrie gauche/droite. De petits écarts sont normaux ; les plus grands affectent l'harmonie.",
            tip: "Utilisez un éclairage uniforme et un angle parfaitement de face ; posture et mastication unilatérale comptent aussi."
          },
          ipdRatio: {
            desc: "Distance interpupillaire par rapport à la largeur du visage — indicateur clé de l'écartement des yeux.",
            tip: "C'est surtout structurel ; sourcils, cheveux et lunettes peuvent améliorer l'équilibre perçu."
          },
          canthalTilt: {
            desc: "Angle de l'axe des yeux du coin interne au coin externe. Une légère inclinaison positive est souvent préférée.",
            tip: "Le grooming des sourcils et le sommeil influencent l'apparence ; les changements structurels restent limités."
          },
          noseChinRatio: {
            desc: "Équilibre entre la longueur du nez et la projection du menton dans le tiers inférieur.",
            tip: "Améliorez le soutien du menton via posture et réduction de gras ; évitez les angles caméra extrêmes."
          },
          jawAngle: {
            desc: "Angle visible de la mâchoire au coin mandibulaire. Un angle net se lit comme plus défini.",
            tip: "Réduisez le gras facial, entraînez prudemment les masséters et maintenez posture linguale/cervicale."
          },
          gonialAngle: {
            desc: "Angle du coin mandibulaire qui structure le bas du visage et la présence de la mâchoire.",
            tip: "Posture linguale régulière et visage plus sec améliorent souvent le rendu photo de cet angle."
          },
          jawDefinition: {
            desc: "Clarté de la séparation entre mâchoire, cou et joues.",
            tip: "Priorisez perte de gras, hydratation et posture ; suivez avec des photos de profil cohérentes."
          },
          cheekboneProminence: {
            desc: "Projection et structure des pommettes par rapport aux tissus mous.",
            tip: "Réduisez le gonflement facial (sommeil, sel, alcool) et comparez sous un éclairage constant."
          },
          chinProjection: {
            desc: "Projection avant du menton par rapport à l'équilibre facial idéal.",
            tip: "Posture du cou et réduction du gras du bas du visage renforcent la présence du menton de profil."
          },
          mandibleWidth: {
            desc: "Largeur de la mâchoire inférieure par rapport à la largeur totale du visage.",
            tip: "La barbe peut élargir ou adoucir la base ; la largeur osseuse évolue peu sans intervention."
          },
          browRidge: {
            desc: "Proéminence de l'os sourcilier — signal classique de dimorphisme masculin.",
            tip: "Forme des sourcils et longueur de frange peuvent accentuer ou adoucir l'arcade en photo."
          },
          jawRobustness: {
            desc: "Impression de force et de densité de la structure mandibulaire.",
            tip: "Composition corporelle sèche et tonus des masséters rendent cette robustesse plus lisible."
          },
          facialHairline: {
            desc: "Forme de la ligne capillaire et cadrage du haut du visage.",
            tip: "Une coupe/raie adaptée et le soin du cuir chevelu améliorent le cadrage tout en suivant la densité."
          },
          lipFullness: {
            desc: "Volume perçu des lèvres par rapport à une esthétique faciale équilibrée.",
            tip: "Hydratation et soins des lèvres aident ; évitez les photos déshydratées qui sous-estiment le volume."
          },
          noseSize: {
            desc: "Taille et projection du nez par rapport aux traits voisins.",
            tip: "La distance caméra compte — comparez seulement des scans au même angle ; le grooming midface affine l'équilibre."
          },
          skinClarity: {
            desc: "Uniformité et clarté globale du teint et de la texture.",
            tip: "SPF quotidien, nettoyage doux et rétinoïde simple offrent souvent les meilleurs gains de clarté."
          },
          underEyeQuality: {
            desc: "Cernes, creux et poches sous les yeux.",
            tip: "Priorisez un sommeil régulier, réduisez sel/alcool avant les scans, et envisagez des soins à la caféine."
          },
          acneScarring: {
            desc: "Impact de l'acné active et des cicatrices résiduelles sur la qualité de peau.",
            tip: "Routine anti-acné constante et pas de grattage ; des soins pro peuvent aider les marques persistantes."
          },
          poreVisibility: {
            desc: "Visibilité des pores sur la zone T et les joues.",
            tip: "Niacinamide/rétinoïdes et hydratants non comédogènes ; photographiez en lumière diffuse pour comparer."
          },
          lipHealth: {
            desc: "Texture, sécheresse et aspect sain des lèvres.",
            tip: "Baume + SPF lèvres au quotidien et bonne hydratation pour des lèvres plus lisses entre les scans."
          },
          hairDensity: {
            desc: "Densité et couverture perçues des cheveux au niveau du cuir chevelu et de la ligne.",
            tip: "Suivez avec des photos dessus-tête constantes ; agissez tôt si l'éclaircissement progresse."
          }
        },
        plan: {
          jawlineDefinition: { title: "Améliorer la définition de la mâchoire", desc: "Réduire le gras corporel, posture linguale et entraînement des masséters." },
          midfaceBalance: { title: "Équilibrer le midface", desc: "Suivre le volume des joues et la longueur du midface avec des photos cohérentes." },
          skinRoutine: { title: "Optimiser la routine skincare", desc: "Cibler clarté et pores avec rétinoïdes et SPF quotidien." },
          underEyeCare: { title: "Traiter la zone sous les yeux", desc: "Améliorer le sommeil et envisager des soins à base de caféine." },
          postureMewing: { title: "Posture et posture linguale", desc: "Maintenir une posture orale et cervicale correcte pour soutenir la mâchoire." },
          grooming: { title: "Affiner le grooming", desc: "Optimiser coiffure et pilosité faciale pour renforcer les traits dimorphiques." }
        },
        protocols: {
          _shared: {
            actions: {
              baselinePhotos: "Prendre des photos de référence (même angle, lumière et distance)",
              weeklyPhotos: "Prendre des photos hebdomadaires avec le même setup",
              photoCompare: "Comparer les photos semaine 1 et actuelles côte à côte",
              rescan: "Lancer un nouveau scan MorphIndex pour mettre à jour vos scores",
              adjustFocus: "Revoir les métriques et décider de continuer ou changer de focus"
            }
          },
          jawlineDefinition: {
            actions: {
              bodyFat: "Composition corporelle : moins de gras facial pour révéler la mâchoire",
              tonguePosture: "Apprendre la posture linguale (drills 10 min)",
              mewingDaily: "Maintenir le mewing dans la journée",
              jawExercises: "Travail masséters + relâchement (3× / semaine)",
              neckPosture: "Alignement cervical (chin tuck, mur)",
              chinTucks: "Séries quotidiennes de chin tucks",
              guaShaLymph: "Gua sha lymphatique pour la mâchoire",
              hardChewing: "Sessions de chewing-gum dur équilibrées (optionnel)"
            },
            avoid: {
              unsupervisedSurgery: "Réserver des procédures sans professionnel qualifié",
              excessiveMewing: "Mewing forcé ou douloureux qui fatigue la mâchoire"
            },
            consultWhen: {
              tmjPain: "Douleur mâchoire, claquements ou inconfort ATM",
              suddenAsymmetry: "Asymétrie soudaine ou qui s'aggrave"
            }
          },
          midfaceBalance: {
            actions: {
              consistentAngles: "Photos hebdo aux mêmes angles face / ¾",
              sleepPosition: "Position de sommeil : éviter le ventre",
              hydration: "Hydratation + moins de sel le soir",
              cheekExercises: "Maintiens lift des joues (5 min/jour)",
              midfaceAwareness: "Repérer posture/tensions qui affaissent le midface",
              guaShaCheek: "Gua sha joues / midface"
            },
            avoid: {
              fillerWithoutConsult: "Fillers en DIY ou injectables non licenciés",
              extremeContouring: "Contour makeup extrême au lieu d'habitudes structurelles"
            },
            consultWhen: {
              swelling: "Gonflement facial persistant sans cause claire",
              persistentAsymmetry: "Asymétrie qui ne s'améliore pas avec les bases"
            }
          },
          skinRoutine: {
            actions: {
              patchTest: "Test cutané de chaque nouveau produit (24–48 h)",
              gentleCleanser: "Nettoyant doux matin et soir",
              moisturizerBasic: "Crème barrière matin et soir",
              dailySpf: "SPF 50 chaque matin (non négociable)",
              niacinamide: "Ajouter un sérum niacinamide (pores / gras)",
              introduceRetinoid: "Introduire un rétinol débutant 2–3 soirs/semaine",
              moisturize: "Hydrater après chaque actif",
              guaShaFace: "Gua sha visage complet + drainage lymphatique"
            },
            avoid: {
              stackingActives: "Superposer plusieurs actifs forts le même soir",
              skippingSpf: "Oublier la protection solaire avec les rétinoïdes"
            },
            consultWhen: {
              irritation: "Brûlures, desquamation ou rougeurs persistantes",
              acneWorsening: "Acné qui empire après 4+ semaines"
            }
          },
          underEyeCare: {
            actions: {
              sleepSchedule: "Sommeil fixe 7–8 h",
              hydration: "Hydratation + moins de sel/alcool le soir",
              caffeineTopical: "Sérum yeux caféine le matin",
              eyeCream: "Crème yeux peptides / réparation le soir",
              coldCompress: "Compresses froides les matins gonflés",
              lymphaticDrain: "Drainage gua sha sous les yeux"
            },
            avoid: {
              harshScrubs: "Gommages agressifs ou acides forts sur le contour des yeux",
              allergicProducts: "Nouveaux produits sans test cutané"
            },
            consultWhen: {
              persistentDarkCircles: "Cernes inchangés après 8 semaines de bases",
              swelling: "Gonflement soudain ou unilatéral sous les yeux"
            }
          },
          postureMewing: {
            actions: {
              learnTechnique: "Apprendre le mewing correct devant le miroir",
              nasalBreathing: "Habitude de respiration nasale toute la journée",
              postureChecks: "3 alarmes quotidiennes de reset posture",
              reminderSetup: "Rappels visuels bureau + miroir",
              dailyBlocks: "Deux blocs mewing de 5 minutes",
              neckAlignment: "Chin tucks + posture au mur chaque jour",
              mewingDaily: "Posture linguale au repos toute la journée",
              habitReview: "Revue hebdo des triggers de mauvaise posture"
            },
            avoid: {
              forcefulPressure: "Appuyer la langue avec une force excessive",
              ignoringPain: "Continuer en cas de douleur mâchoire ou dentaire"
            },
            consultWhen: {
              tmjPain: "Douleur ATM, maux de tête ou changement de morsure",
              breathingDifficulty: "Difficulté à respirer par le nez"
            }
          },
          grooming: {
            actions: {
              styleAudit: "Audit coupe / pilosité vs forme du visage",
              referencePhotos: "Collecter 3 références réalistes",
              haircutUpdate: "Coupe qui cadre mâchoire + pommettes",
              facialHair: "Façonner la barbe pour affiner la jawline",
              browGroom: "Grooming sourcils hebdo (tiers supérieur)",
              refineLook: "Micro-ajustements hebdo (lignes, longueur, produit)"
            },
            avoid: {
              drasticChanges: "Changements extrêmes avant les photos de référence",
              ignoringFaceShape: "Copier des tendances qui contredisent votre structure osseuse"
            },
            consultWhen: {
              skinReaction: "Irritation due aux colorations ou produits",
              hairLoss: "Éclaircissement soudain ou perte de cheveux en plaques"
            }
          }
        }
      },
      onboarding: {
        step: "Étape",
        back: "Retour",
        continue: "Continuer",
        uploadPhoto: "Importer une photo",
        capturePhoto: "Prendre la photo",
        useGallery: "Galerie",
        retake: "Reprendre",
        storageError: "Impossible d'enregistrer votre photo sur cet appareil. Essayez une image plus petite ou libérez de l'espace.",
        camera: {
          loading: "Démarrage de la caméra…",
          searching: "Placez votre tête dans l'ovale",
          closer: "Avancez-vous",
          farther: "Reculez",
          center: "Centrez votre tête dans l'ovale",
          angleFront: "Regardez droit la caméra",
          angleSide: "Tournez la tête pour montrer votre profil",
          aligned: "Parfait — ne bougez plus…",
          capturing: "Capture en cours…",
          captured: "Photo capturée",
          denied: "Caméra indisponible — utilisez la galerie"
        },
        cameraAccess: {
          title: "Autoriser la caméra",
          subtitle: "On scanne uniquement votre visage — pas votre corps ni l'arrière-plan. Vos photos restent privées jusqu'à l'analyse.",
          tip1: "Tenez le téléphone à hauteur des yeux",
          tip2: "Approchez-vous pour que votre tête remplisse l'ovale — plus près, c'est mieux",
          tip3: "Utilisez un éclairage uniforme",
          grant: "Autoriser l'accès à la caméra",
          skip: "Utiliser la galerie",
          denied: "Accès caméra refusé. Vous pouvez utiliser la galerie."
        },
        welcome: {
          eyebrow: "Premiers pas",
          title: "Bienvenue sur MorphIndex",
          subtitle: "Analysons votre visage selon plus de 100 métriques et construisons votre plan d'amélioration personnalisé.",
          item1: "Prenez une photo de face et de profil",
          item2: "Obtenez vos scores harmonie, mâchoire, traits et peau",
          item3: "Débloquez vos résultats complets et votre plan personnalisé",
          note: "Environ 2 minutes. Vos photos restent privées."
        },
        consent: {
          eyebrow: "Avant de commencer",
          title: "Vos données, votre contrôle",
          subtitle: "Nous avons besoin de votre consentement pour analyser vos photos et stocker vos résultats en toute sécurité.",
          photos: "J'accepte d'importer des photos pour l'analyse faciale par IA",
          storage: "J'accepte le stockage sécurisé de mes photos et résultats d'analyse",
          disclaimer: "Je comprends que ce n'est pas un avis médical",
          legal: "Consultez notre Politique de confidentialité et nos Conditions d'utilisation."
        },
        photos: {
          phaseFront: "1 sur 2 — Photo de face",
          phaseSide: "2 sur 2 — Photo de profil"
        },
        front: {
          eyebrow: "Photo de face",
          title: "Prenez une photo de face",
          subtitle: "Regardez droit la caméra avec une expression neutre. Bon éclairage, sans obstruction.",
          guide: "Centrez votre visage dans le cadre",
          tip1: "Faites face à la caméra",
          tip2: "Utilisez un éclairage naturel et uniforme",
          tip3: "Retirez vos lunettes et dégagez votre visage"
        },
        side: {
          eyebrow: "Photo de profil",
          title: "Prenez une photo de profil",
          subtitle: "Tournez la tête à 90° pour montrer votre profil. Gardez le menton à niveau.",
          guide: "Montrez votre profil complet",
          tip1: "Tournez exactement à 90° de la caméra",
          tip2: "Gardez la mâchoire visible",
          tip3: "Même éclairage que la photo de face"
        },
        analyzing: {
          title: "Analyse de votre visage…",
          subtitle: "Mesure de plus de 100 métriques faciales sur 4 piliers.",
          harmony: "Cartographie des ratios d'harmonie faciale",
          angularity: "Mesure de la mâchoire et de la structure osseuse",
          dimorphism: "Évaluation des traits dimorphiques",
          features: "Analyse de la peau et des traits"
        },
        results: {
          eyebrow: "Analyse terminée",
          title: "Vos résultats sont prêts",
          subtitle: "Voici un aperçu — abonnez-vous pour débloquer l'analyse complète et votre plan.",
          overall: "Score global",
          teaser: "Votre analyse détaillée est ci-dessous",
          metric1: "Ratio des tiers faciaux",
          metric2: "Angle de la mâchoire",
          metric3: "Déviation de symétrie",
          metric4: "Ratio IPD",
          lock: "Abonnez-vous pour débloquer vos résultats",
          unlock: "Débloquer mes résultats"
        },
        paywall: {
          eyebrow: "MorphIndex Pro",
          title: "Débloquez votre analyse complète",
          subtitle: "Accédez à vos résultats complets, votre plan personnalisé et le suivi de vos progrès.",
          f1: "Analyse complète sur plus de 100 métriques",
          f2: "Plan d'amélioration personnalisé",
          f3: "Coach — conseils d'expert par IA",
          f4: "Suivi des progrès et re-scans",
          yearly: "Annuel",
          yearlyPrice: "59,99 €/an",
          monthly: "Mensuel",
          monthlyPrice: "9,99 €/mois",
          bestValue: "Meilleur choix",
          subscribe: "S'abonner maintenant",
          legal: "Annulation à tout moment. Paiement sécurisé via Stripe.",
          verifying: "Confirmation de votre paiement…",
          verifyingSubscription: "Activation de votre abonnement…",
          checkoutError: "Impossible de démarrer le paiement. Réessayez.",
          checkoutLoading: "Redirection vers le paiement…",
          cancelled: "Paiement annulé. Abonnez-vous pour débloquer vos résultats."
        },
        meta: {
          title: "MorphIndex — Onboarding",
          description: "Complétez votre première analyse faciale avec MorphIndex."
        }
      }
    },
    es: {
      meta: {
        title: "MorphIndex — Tu morfología, cuantificada",
        description: "MorphIndex convierte fotos faciales en métricas estructuradas, una hoja de ruta personalizada y progreso medible a lo largo del tiempo."
      },
      a11y: { theme: "Cambiar tema", language: "Cambiar idioma", menu: "Abrir menú", stars: "5 estrellas", prev: "Anterior", next: "Siguiente", close: "Cerrar" },
      nav: { celebs: "Perfiles", creators: "Comunidad", login: "Iniciar sesión", cta: "Probar MorphIndex", ctaShort: "Probar" },
      hero: {
        users: "usuarios activos", analyses: "análisis completados",
        title: "Descifra tu estructura.<br>Rastrea lo que cambia.",
        subtitle: "MorphIndex convierte tus fotos en un panel vivo — métricas estructuradas, hoja de ruta priorizada y prueba de progreso a medida que avanzas.",
        cta: "Hacer mi primer escaneo", link: "Ver cómo funciona",
        note: "Para quienes prefieren datos antes que opiniones.",
        tabFront: "Escaneo frontal", tabSide: "Escaneo lateral"
      },
      transform: {
        eyebrow: "Caso de estudio", title: "Dos años, una trayectoria",
        subtitle: "Hábitos disciplinados, escaneos registrados, crecimiento visible del índice — documentado mes a mes.",
        before: "Día uno", after: "Hoy",
        scoreLabel: "Crecimiento del índice en 24 meses de esfuerzo constante",
        p1t: "Base y hábitos", p1d: "Meses 0–8 · estableciendo rutinas",
        p2t: "Primeras señales", p2d: "Meses 8–14 · primeros cambios medibles",
        p3t: "Impulso estructural", p3d: "Meses 14–26 · cambios de contorno más profundos",
        p4t: "Ventana óptima", p4d: "Meses 26–30 · consolidando ganancias",
        q1: "El progreso no es casualidad — es el resultado de la constancia.",
        q2: "Los miembros que más avanzan tratan cada escaneo como un punto de control, no un veredicto. MorphIndex mantiene ese ritmo."
      },
      pillars: {
        eyebrow: "Modelo de puntuación", title: "Cuatro puntuaciones, una nota global",
        subtitle: "Cada escaneo evalúa armonía, mandíbula, rasgos y piel.",
        p1: "Armonía", p1d: "Simetría, proporciones y equilibrio facial", p1m: "ratios",
        p2: "Mandíbula", p2d: "Definición mandibular, ángulos y estructura ósea", p2m: "estructura",
        p3: "Rasgos", p3d: "Carácter masculino o femenino del rostro", p3m: "carácter",
        p4: "Piel", p4d: "Tez, ojeras, poros y salud del cabello", p4m: "calidad"
      },
      banner: "Basado en investigación facial cuantitativa — para quienes tratan la mejora de apariencia como una disciplina medible.",
      testimonials: {
        title: "Lo que dicen los miembros", subtitle: "Opiniones sin filtro de personas que escanean con regularidad.",
        t1: "\"Sin exageraciones, solo números sobre los que puedo actuar. Ya sea optimizando o entendiendo mi estructura, MorphIndex es la herramienta más consistente que he usado.\"",
        t2: "\"Conocía vagamente mis puntos débiles — MorphIndex los cuantificó. Reemplazar suposiciones por métricas cambió por completo mi enfoque.\"",
        t3: "\"Mi puntuación compuesta parecía bien, pero necesitaba detalle sobre textura y volumen bajo los ojos. MorphIndex fue la primera app en darme datos que realmente puedo usar.\"",
        t4: "\"Fortalezas, carencias, prioridades — todo claro. Eso solo ya justificó registrarme.\"",
        t5: "\"Cada re-escaneo revela algo que pasé por alto. Los planes personalizados me mantienen responsable sin sentirse genéricos.\"",
        t6: "\"Opciones clínicas más hábitos diarios — todo clasificado por impacto. No he encontrado nada tan preciso.\"",
        t7: "\"Probé MorphIndex por curiosidad. La profundidad de las recomendaciones me llevó a consultar a un especialista — la app cambió genuinamente mi enfoque.\""
      },
      platform: {
        title: "Un espacio de trabajo para el panorama completo",
        subtitle: "Más allá del escaneo: puntuación, plan, progreso y coach IA — en un solo lugar.",
        f1t: "Tu puntuación", f1d: "Una nota global fácil de seguir en el tiempo.",
        f2t: "Coach", f2d: "Haz preguntas y obtén respuestas claras.",
        f3t: "Ver tu potencial", f3d: "Vista previa a 6 meses y simulaciones de cambios.",
        f4t: "Plan de acción", f4d: "Una checklist simple clasificada por impacto.",
        f5t: "Seguimiento de progreso", f5d: "Vuelve a escanear y observa tu evolución.",
        new: "Nuevo"
      },
      showcase: {
        tag1: "Coach IA", tag2: "Simulador",
        title: "Dentro del motor de análisis",
        subtitle: "Cada escaneo revela detalle granular — desde vitalidad de piel hasta ratios proporcionales por zona.",
        highlight: "Más de 100 variables rastreadas por sesión"
      },
      steps: {
        eyebrow: "El método",
        title: "De la foto al progreso en cuatro pasos",
        subtitle: "Escanear, entender, planificar, repetir — cada ciclo afina tu índice.",
        s1t: "Subir", s1d: "Añade una foto frontal y una de perfil — eso es todo lo que MorphIndex necesita.",
        s2t: "Analizar", s2d: "Recibe un desglose completo en vitalidad, proporciones, definición y rasgos.",
        s3t: "Priorizar", s3d: "Obtén opciones de estilo de vida y clínicas clasificadas por impacto esperado en tu perfil.",
        s4t: "Iterar", s4d: "Ejecuta tu plan, simula resultados con Coach y vuelve a escanear para confirmar ganancias.",
        note: "El análisis de perfil está incluido en cada escaneo."
      },
      projection: {
        eyebrow: "Modelo de crecimiento", title: "Las pequeñas ganancias se acumulan",
        subtitle: "MorphIndex modela dónde podría llegar tu puntuación si sigues el camino recomendado.",
        today: "Hoy", potential: "Potencial", btn: "Explorar mi trayectoria"
      },
      audience: {
        eyebrow: "Creado para", title: "Los comprometidos, no los curiosos",
        p1: "Una puntuación sola no cambia nada. Los miembros que se transforman tratan MorphIndex como línea de salida — y hacen el trabajo entre escaneos.",
        p2: "Si eso te describe, estás en el lugar correcto."
      },
      cta: {
        title: "Tu línea base empieza aquí",
        subtitle: "Únete a más de 120.000 miembros que miden antes de optimizar.",
        btn: "Crear mi perfil", note: "Un escaneo. Panorama completo. Sin suposiciones."
      },
      footer: { join: "Únete", privacy: "Privacidad", terms: "Términos", copy: "© 2026 MorphIndex" },
      auth: {
        loginTitle: "Iniciar sesión",
        registerTitle: "Crear tu cuenta",
        loginSubmit: "Iniciar sesión",
        registerSubmit: "Continuar",
        emailPlaceholder: "nombre@ejemplo.com",
        passwordPlaceholder: "*********",
        or: "o",
        google: "Continuar con Google",
        showPassword: "Mostrar contraseña",
        hidePassword: "Ocultar contraseña",
        switchToLogin: "¿Ya tienes una cuenta?",
        switchToLoginLink: "Iniciar sesión",
        switchToRegister: "¿No tienes cuenta?",
        switchToRegisterLink: "Registrarse",
        legal: "Al continuar, aceptas nuestros Términos de servicio y Política de privacidad.",
        back: "Volver al inicio",
        loginMeta: {
          title: "MorphIndex — Iniciar sesión",
          description: "Inicia sesión en tu cuenta de MorphIndex."
        },
        registerMeta: {
          title: "MorphIndex — Crear tu cuenta",
          description: "Crea tu cuenta de MorphIndex y comienza tu viaje de transformación."
        }
      },
      app: {
        eyebrow: "Tu cuenta",
        welcome: "Bienvenido de nuevo",
        subtitle: "Has iniciado sesión. Tu panel de análisis estará disponible aquí pronto.",
        startAnalysis: "Comenzar tu análisis",
        viewResults: "Ver mis resultados",
        backHome: "Volver al inicio",
        signOut: "Cerrar sesión",
        welcomeTour: {
          aria: "Tour de bienvenida",
          skip: "Saltar tour",
          stepOf: "Paso {current} de {total}",
          step0: {
            title: "¡Bienvenido a MorphIndex!",
            body: "Tu análisis está desbloqueado. Aquí tienes un tour rápido de tu panel."
          },
          step1: {
            title: "Inicio",
            body: "Tu puntuación global, la siguiente acción y un resumen de tu progreso."
          },
          step2: {
            title: "Plan",
            body: "Tu plan personalizado semana a semana con acciones para marcar."
          },
          step3: {
            title: "Progreso",
            body: "Sigue tus métricas en el tiempo y mira qué sube tu puntuación."
          },
          step4: {
            title: "Coach IA",
            body: "Pregunta cuando quieras — el coach conoce tu análisis y tu plan."
          }
        },
        meta: {
          title: "MorphIndex — Panel",
          description: "Tu panel completo con puntuaciones, métricas y plan de mejora."
        }
      },
      dashboard: {
        eyebrow: "Tu análisis",
        title: "Panel",
        nav: {
          label: "Navegación principal",
          backToApp: "Volver al inicio",
          overview: "Inicio",
          preview: "Vista",
          metrics: "Progreso",
          plan: "Plan",
          chat: "Coach",
          simulate: "Simular"
        },
        pages: {
          overview: {
            title: "Inicio",
            description: "Tu puntuación, foco actual y siguiente acción."
          },
          preview: {
            title: "Vista previa a 6 meses",
            description: "Proyección IA de tus resultados si sigues tu plan de mejora."
          },
          metrics: {
            title: "Progreso",
            description: "Historial de puntuaciones y métricas detalladas."
          },
          plan: {
            title: "Tu plan",
            description: "Las acciones de esta semana para tu foco activo."
          },
          chat: {
            title: "Coach",
            description: "Pregunta a Coach sobre tu análisis y plan de mejora."
          },
          simulate: {
            title: "Simulaciones",
            description: "Previsualiza efectos de procedimientos estéticos en tu foto."
          },
          potential: {
            title: "Tu potencial",
            description: "Vista previa a 6 meses y simulaciones en un solo lugar.",
            tabPreview: "Vista previa 6 meses",
            tabSimulate: "Simular cambios"
          }
        },
        nextStep: {
          eyebrow: "Haz esto ahora",
          doNext: "Siguiente acción:",
          cta: "Abrir mi plan",
          allDone: "Todas las acciones de esta fase están hechas — sigue o inicia un nuevo escaneo."
        },
        split: {
          label: "Fortalezas y áreas de foco",
          strengths: "Fortalezas",
          strengthsDesc: "Tus pilares más sólidos ahora.",
          weaknesses: "A mejorar",
          weaknessesDesc: "Donde progresar subirá más tu puntuación.",
          focusLabel: "Prioridades"
        },
        tools: {
          label: "Herramientas",
          potential: "Ver mi potencial",
          rescan: "Nuevo escaneo"
        },
        metricsView: {
          top5Title: "Top 5 a mejorar",
          top5Subtitle: "Empieza aquí — estas áreas moverán más tu puntuación.",
          showAll: "Ver todas las métricas",
          showTop: "Ver solo el top 5"
        },
        coachFab: {
          label: "Preguntar al Coach",
          aria: "Abrir coach IA"
        },
        overall: "Puntuación global",
        potential: "Puntuación potencial",
        percentile: "Top {n}% de usuarios",
        photoFront: "Frontal",
        photoSide: "Perfil",
        ideal: "Ideal",
        yourResult: "Tu resultado",
        statusLabel: "Estado",
        howToImprove: "Cómo mejorar:",
        planTitle: "Tu plan de mejora",
        planSubtitle: "Un foco a la vez, con acciones semanales que puedes marcar.",
        planProgress: "{done}/{total} completadas",
        weeks: "{n} semanas",
        journey: {
          eyebrow: "Tu recorrido",
          currentFocus: "Foco actual",
          thisWeek: "Esta semana — tus acciones",
          weekOf: "Semana {current} de {total}",
          phaseRange: "Semanas {start}–{end}",
          phaseProgress: "{done}/{total} acciones en esta fase",
          overallProgress: "{done}/{total} en total",
          phases: {
            foundation: "Fundamentos",
            training: "Crear hábitos",
            refinement: "Medir y ajustar"
          },
          switchFocus: "Establecer como foco activo",
          activeBadge: "Activo",
          allPriorities: "Todas las prioridades",
          rescanReminder: "Te acercas al final de este foco. Haz un nuevo escaneo para medir el progreso y desbloquear la siguiente prioridad.",
          rescanCta: "Iniciar nuevo escaneo",
          avoidTitle: "Evitar",
          consultTitle: "Cuándo consultar a un profesional",
          disclaimer: "Orientación estética de auto-mejora — no es consejo médico."
        },
        disclaimer: "Las puntuaciones son orientativas para la auto-mejora — no son consejo médico.",
        rescanConfirm: "¿Iniciar un nuevo escaneo? Tus fotos actuales serán reemplazadas.",
        empty: {
          title: "Faltan datos del escaneo",
          desc: "Tus fotos no están disponibles en este dispositivo. Haz un nuevo escaneo para restaurar tu panel.",
          cta: "Iniciar nuevo escaneo"
        },
        quickActions: {
          label: "Navegación rápida",
          preview: "Vista previa 6 meses",
          previewDesc: "Mira tu transformación proyectada",
          metrics: "Métricas detalladas",
          metricsDesc: "Más de 100 ratios en 4 pilares",
          plan: "Plan de mejora",
          planDesc: "Acciones prioritarias para tus objetivos",
          rescan: "Nuevo escaneo",
          rescanDesc: "Sigue tu progreso con un análisis nuevo"
        },
        history: {
          title: "Historial de puntuación",
          subtitle: "Sigue cómo cambia tu puntuación global entre escaneos."
        },
        chat: {
          subtitle: "Pregunta a Coach — las respuestas siguen tu protocolo activo.",
          placeholder: "Pregunta sobre tu análisis…",
          send: "Enviar",
          empty: "Empieza la conversación — pregunta por dónde empezar.",
          error: "Coach no está disponible ahora. Inténtalo de nuevo.",
          limitReached: "Has alcanzado el límite diario de mensajes de Coach. Revisa tu Plan para las acciones de esta semana e inténtalo mañana.",
          promptThisWeek: "¿Qué debo hacer esta semana?",
          promptWhyFocus: "¿Por qué este foco?",
          promptNextStep: "¿Cuál es mi siguiente paso?",
          prompts: {
            thisWeek: "Según mi fase actual del recorrido, ¿en qué debo centrarme esta semana? Lista las acciones de la checklist.",
            whyFocus: "¿Por qué mi foco activo es la prioridad correcta según mis puntuaciones?",
            nextStep: "Mirando mi progreso, ¿cuál es el siguiente paso más importante?"
          }
        },
        simulate: {
          subtitle: "Previsualiza cómo podría verse un ajuste estético en tu foto.",
          intensity: "Intensidad",
          generate: "Generar simulación",
          generating: "Generando…",
          after: "Simulado",
          disclaimer: "Las simulaciones son ilustrativas — no son consejo médico ni garantía.",
          error: "Error en la simulación. Inténtalo de nuevo.",
          procedures: {
            jawline: "Mandíbula",
            nose: "Nariz",
            cheeks: "Mejillas",
            chin: "Mentón",
            lips: "Labios"
          }
        },
        preview: {
          title: "Tu vista previa a 6 meses",
          subtitle: "Proyección IA de tus resultados si sigues tu plan de mejora.",
          before: "Hoy",
          after: "En 6 meses",
          generating: "Generando tu vista previa…",
          dragHint: "Arrastra para comparar antes y después",
          error: "Vista previa no disponible ahora. Recarga la página para intentarlo de nuevo.",
          scoreNote: "Puntuación global proyectada: {current} → {potential}/10"
        },
        status: { good: "En objetivo", average: "Promedio", focus: "A mejorar" },
        impact: { high: "Alto impacto", medium: "Impacto medio", low: "Bajo impacto" },
        summary: {
          facialThirds: "Ratio de tercios faciales",
          jawAngle: "Ángulo mandibular",
          symmetryDeviation: "Desviación de simetría",
          ipdRatio: "Ratio IPD"
        },
        metrics: {
          facialThirds: "Ratio de tercios faciales",
          facialWidthHeight: "Ratio ancho/alto facial",
          midfaceRatio: "Ratio del midface",
          symmetryDeviation: "Desviación de simetría",
          ipdRatio: "Distancia interpupilar",
          canthalTilt: "Inclinación cantal",
          noseChinRatio: "Ratio nariz-mentón",
          jawAngle: "Ángulo gonial",
          gonialAngle: "Ángulo mandibular",
          jawDefinition: "Definición mandibular",
          cheekboneProminence: "Prominencia de pómulos",
          chinProjection: "Proyección del mentón",
          mandibleWidth: "Ancho mandibular",
          browRidge: "Prominencia del arco supraciliar",
          jawRobustness: "Robustez mandibular",
          facialHairline: "Forma de la línea capilar",
          lipFullness: "Volumen labial",
          noseSize: "Equilibrio nasal",
          skinClarity: "Claridad de la piel",
          underEyeQuality: "Calidad bajo los ojos",
          acneScarring: "Acné y cicatrices",
          poreVisibility: "Visibilidad de poros",
          lipHealth: "Salud labial",
          hairDensity: "Densidad capilar"
        },
        metricDetails: {
          facialThirds: {
            desc: "Compara los tercios superior, medio e inferior del rostro. Tercios equilibrados mejoran la armonía vertical.",
            tip: "Compara fotos frontales con el mismo ángulo; la postura y la posición del mentón influyen en el equilibrio percibido."
          },
          facialWidthHeight: {
            desc: "Mide el ancho facial respecto a la altura. Este ratio cambia si el rostro se ve compacto o alargado.",
            tip: "Peinado y vello facial pueden ajustar visualmente el ratio mientras trabajas grasa corporal y postura."
          },
          midfaceRatio: {
            desc: "Evalúa la longitud y proporciones del midface entre los ojos y el labio superior.",
            tip: "Mantén distancia fotográfica constante y apoya las mejillas con sueño, entrenamiento y composición corporal."
          },
          symmetryDeviation: {
            desc: "Estima la asimetría izquierda/derecha. Pequeñas desviaciones son normales; las mayores afectan la armonía.",
            tip: "Usa luz uniforme y un ángulo frontal real; la postura y masticar de un solo lado también influyen."
          },
          ipdRatio: {
            desc: "Distancia interpupilar respecto al ancho facial: clave para el equilibrio del espaciado ocular.",
            tip: "Es sobre todo estructural; cejas, cabello y gafas pueden mejorar el equilibrio percibido."
          },
          canthalTilt: {
            desc: "Ángulo del eje ocular del lagrimal al extremo externo. Una ligera inclinación positiva suele preferirse.",
            tip: "El grooming de cejas y el sueño influyen en la apariencia; el cambio estructural es limitado."
          },
          noseChinRatio: {
            desc: "Equilibrio entre longitud nasal y proyección del mentón en el tercio inferior.",
            tip: "Mejora el soporte del mentón con postura y menos grasa facial; evita ángulos de cámara extremos."
          },
          jawAngle: {
            desc: "Ángulo visible de la mandíbula en la esquina mandibular. Un ángulo limpio se lee más definido.",
            tip: "Baja grasa facial, entrena maseteros con cuidado y mantén postura lingual/cervical."
          },
          gonialAngle: {
            desc: "Ángulo de la esquina mandibular que define la geometría del tercio inferior.",
            tip: "Postura lingual constante y un rostro más seco suelen mejorar cómo se ve este ángulo en fotos."
          },
          jawDefinition: {
            desc: "Qué tan clara es la separación entre mandíbula, cuello y mejillas.",
            tip: "Prioriza pérdida de grasa, hidratación y postura; sigue el progreso con perfiles consistentes."
          },
          cheekboneProminence: {
            desc: "Proyección y estructura de los pómulos respecto al tejido blando.",
            tip: "Reduce hinchazón facial (sueño, sal, alcohol) y compara con la misma iluminación."
          },
          chinProjection: {
            desc: "Proyección hacia adelante del mentón respecto al equilibrio facial ideal.",
            tip: "La postura del cuello y menos grasa en el tercio inferior refuerzan la presencia del mentón de perfil."
          },
          mandibleWidth: {
            desc: "Ancho de la mandíbula inferior respecto al ancho total del rostro.",
            tip: "El vello facial puede ensanchar o suavizar la base; el ancho óseo cambia poco sin intervención."
          },
          browRidge: {
            desc: "Prominencia del hueso superciliar: señal clásica de dimorfismo masculino.",
            tip: "Forma de cejas y flequillo pueden enfatizar o suavizar el arco en las fotos."
          },
          jawRobustness: {
            desc: "Impresión de fuerza y densidad de la estructura mandibular.",
            tip: "Composición corporal magra y tono de maseteros hacen más legible esta robustez."
          },
          facialHairline: {
            desc: "Forma de la línea capilar y encuadre de la parte superior del rostro.",
            tip: "Un corte/partido adecuado y cuidado del cuero cabelludo mejoran el encuadre mientras sigues la densidad."
          },
          lipFullness: {
            desc: "Volumen percibido de los labios respecto a una estética facial equilibrada.",
            tip: "Hidratación y cuidado labial ayudan; evita fotos deshidratadas que restan volumen."
          },
          noseSize: {
            desc: "Tamaño y proyección de la nariz respecto a los rasgos vecinos.",
            tip: "La distancia de cámara importa: compara solo escaneos al mismo ángulo; el grooming midface afina el equilibrio."
          },
          skinClarity: {
            desc: "Uniformidad y claridad general del tono y la textura de la piel.",
            tip: "SPF diario, limpieza suave y un retinoide simple suelen dar las mayores mejoras de claridad."
          },
          underEyeQuality: {
            desc: "Ojeras, hundimiento e hinchazón bajo los ojos.",
            tip: "Prioriza sueño constante, reduce sal/alcohol antes de escanear y considera cuidados con cafeína."
          },
          acneScarring: {
            desc: "Impacto del acné activo y las cicatrices residuales en la calidad de piel.",
            tip: "Rutina antiacné constante y no manipular granos; tratamientos profesionales ayudan en marcas persistentes."
          },
          poreVisibility: {
            desc: "Qué tan visibles son los poros en la zona T y las mejillas.",
            tip: "Niacinamida/retinoides e hidratantes no comedogénicos; fotografía con luz difusa para comparar."
          },
          lipHealth: {
            desc: "Textura, sequedad y aspecto saludable de los labios.",
            tip: "Bálsamo + SPF labial diario e hidratación para labios más suaves entre escaneos."
          },
          hairDensity: {
            desc: "Densidad y cobertura percibida del cabello en cuero cabelludo y línea capilar.",
            tip: "Sigue con fotos cenitales consistentes; actúa pronto si el adelgazamiento progresa."
          }
        },
        plan: {
          jawlineDefinition: { title: "Mejorar definición mandibular", desc: "Reducir grasa corporal, postura lingual y entrenamiento de maseteros." },
          midfaceBalance: { title: "Equilibrar el midface", desc: "Seguir volumen de mejillas y longitud del midface con fotos consistentes." },
          skinRoutine: { title: "Optimizar rutina de skincare", desc: "Mejorar claridad y poros con retinoides y SPF diario." },
          underEyeCare: { title: "Tratar zona bajo los ojos", desc: "Mejorar el sueño y considerar cuidados con cafeína." },
          postureMewing: { title: "Postura y postura lingual", desc: "Mantener postura oral y cervical correcta para apoyar la mandíbula." },
          grooming: { title: "Refinar el grooming", desc: "Optimizar peinado y vello facial para realzar rasgos dimórficos." }
        },
        protocols: {
          _shared: {
            actions: {
              baselinePhotos: "Tomar fotos de referencia (mismo ángulo, luz y distancia)",
              weeklyPhotos: "Tomar fotos semanales con la misma configuración",
              photoCompare: "Comparar fotos de la semana 1 y actuales lado a lado",
              rescan: "Hacer un nuevo escaneo MorphIndex para actualizar tus puntuaciones",
              adjustFocus: "Revisar métricas y decidir si continuar o cambiar de foco"
            }
          },
          jawlineDefinition: {
            actions: {
              bodyFat: "Composición corporal: menos grasa facial para revelar la mandíbula",
              tonguePosture: "Aprender postura lingual (drills 10 min)",
              mewingDaily: "Mantener mewing durante el día",
              jawExercises: "Trabajo de maseteros + liberación (3× / semana)",
              neckPosture: "Alineación cervical (chin tuck, pared)",
              chinTucks: "Series diarias de chin tucks",
              guaShaLymph: "Gua sha linfático para la mandíbula",
              hardChewing: "Sesiones de chicle duro equilibradas (opcional)"
            },
            avoid: {
              unsupervisedSurgery: "Reservar procedimientos sin un profesional cualificado",
              excessiveMewing: "Mewing forzado o doloroso que tensiona la mandíbula"
            },
            consultWhen: {
              tmjPain: "Dolor mandibular, chasquidos o molestia ATM",
              suddenAsymmetry: "Asimetría súbita o que empeora"
            }
          },
          midfaceBalance: {
            actions: {
              consistentAngles: "Fotos semanales con los mismos ángulos frontal / ¾",
              sleepPosition: "Posición al dormir: evitar boca abajo",
              hydration: "Hidratación + menos sal por la noche",
              cheekExercises: "Mantenimientos de lift de mejillas (5 min/día)",
              midfaceAwareness: "Detectar postura/tensión que colapsa el midface",
              guaShaCheek: "Gua sha de mejillas / midface"
            },
            avoid: {
              fillerWithoutConsult: "Rellenos caseros o inyectables sin licencia",
              extremeContouring: "Contorno de maquillaje extremo en lugar de hábitos estructurales"
            },
            consultWhen: {
              swelling: "Hinchazón facial persistente sin causa clara",
              persistentAsymmetry: "Asimetría que no mejora con lo básico"
            }
          },
          skinRoutine: {
            actions: {
              patchTest: "Prueba de parche de cada producto nuevo (24–48 h)",
              gentleCleanser: "Limpiador suave mañana y noche",
              moisturizerBasic: "Crema barrera mañana y noche",
              dailySpf: "SPF 50 cada mañana (no negociable)",
              niacinamide: "Añadir serum niacinamida (poros / grasa)",
              introduceRetinoid: "Introducir retinol principiante 2–3 noches/semana",
              moisturize: "Hidratar después de cada activo",
              guaShaFace: "Gua sha facial completo + drenaje linfático"
            },
            avoid: {
              stackingActives: "Combinar varios activos fuertes la misma noche",
              skippingSpf: "Omitir protector solar con retinoides"
            },
            consultWhen: {
              irritation: "Ardor, descamación o enrojecimiento persistente",
              acneWorsening: "Acné que empeora tras 4+ semanas"
            }
          },
          underEyeCare: {
            actions: {
              sleepSchedule: "Horario fijo de sueño 7–8 h",
              hydration: "Hidratación + menos sal/alcohol por la noche",
              caffeineTopical: "Serum ojos con cafeína por la mañana",
              eyeCream: "Crema ojos péptidos / reparación por la noche",
              coldCompress: "Compresa fría en mañanas hinchadas",
              lymphaticDrain: "Drenaje gua sha bajo los ojos"
            },
            avoid: {
              harshScrubs: "Exfoliantes agresivos o ácidos fuertes en el contorno de ojos",
              allergicProducts: "Productos nuevos sin prueba de parche"
            },
            consultWhen: {
              persistentDarkCircles: "Ojeras sin cambio tras 8 semanas de lo básico",
              swelling: "Hinchazón súbita o unilateral bajo los ojos"
            }
          },
          postureMewing: {
            actions: {
              learnTechnique: "Aprender mewing correcto frente al espejo",
              nasalBreathing: "Hábito de respiración nasal todo el día",
              postureChecks: "3 alarmas diarias de reset de postura",
              reminderSetup: "Recordatorios visuales escritorio + espejo",
              dailyBlocks: "Dos bloques de mewing de 5 minutos",
              neckAlignment: "Chin tucks + postura en pared a diario",
              mewingDaily: "Postura lingual en reposo todo el día",
              habitReview: "Revisión semanal de detonantes de mala postura"
            },
            avoid: {
              forcefulPressure: "Presionar la lengua con fuerza excesiva",
              ignoringPain: "Continuar si hay dolor mandibular o dental"
            },
            consultWhen: {
              tmjPain: "Dolor ATM, dolores de cabeza o cambios en la mordida",
              breathingDifficulty: "Dificultad para respirar por la nariz"
            }
          },
          grooming: {
            actions: {
              styleAudit: "Auditar corte / vello vs forma del rostro",
              referencePhotos: "Recopilar 3 referencias realistas",
              haircutUpdate: "Corte que enmarque mandíbula + pómulos",
              browGroom: "Grooming semanal de cejas (tercio superior)",
              facialHair: "Perfilar o dejar crecer vello facial para realzar la mandíbula",
              refineLook: "Refinar el grooming semanalmente (líneas, longitud, producto)"
            },
            avoid: {
              drasticChanges: "Cambios extremos antes de las fotos de referencia",
              ignoringFaceShape: "Copiar tendencias que contradicen tu estructura ósea"
            },
            consultWhen: {
              skinReaction: "Irritación por tintes, decolorantes o productos",
              hairLoss: "Adelgazamiento súbito o pérdida de cabello en parches"
            }
          }
        }
      },
      onboarding: {
        step: "Paso",
        back: "Volver",
        continue: "Continuar",
        uploadPhoto: "Subir foto",
        capturePhoto: "Capturar foto",
        useGallery: "Galería",
        retake: "Repetir",
        storageError: "No se pudo guardar tu foto en este dispositivo. Prueba con una imagen más pequeña o libera espacio.",
        camera: {
          loading: "Iniciando cámara…",
          searching: "Coloca tu cabeza en el óvalo",
          closer: "Acércate",
          farther: "Aléjate",
          center: "Centra tu cabeza en el óvalo",
          angleFront: "Mira directamente a la cámara",
          angleSide: "Gira la cabeza para mostrar tu perfil",
          aligned: "Perfecto — quédate quieto…",
          capturing: "Capturando…",
          captured: "Foto capturada",
          denied: "Cámara no disponible — usa la galería"
        },
        cameraAccess: {
          title: "Activar la cámara",
          subtitle: "Solo escaneamos tu rostro — no tu cuerpo ni el fondo. Tus fotos son privadas hasta el análisis.",
          tip1: "Sostén el teléfono a la altura de los ojos",
          tip2: "Acércate hasta llenar el óvalo — más cerca es mejor para el análisis",
          tip3: "Usa buena iluminación uniforme",
          grant: "Permitir acceso a la cámara",
          skip: "Usar la galería",
          denied: "Acceso a la cámara denegado. Puedes usar la galería."
        },
        welcome: {
          eyebrow: "Primeros pasos",
          title: "Bienvenido a MorphIndex",
          subtitle: "Analicemos tu rostro según más de 100 métricas y construyamos tu plan de mejora personalizado.",
          item1: "Toma una foto frontal y lateral",
          item2: "Obtén tus puntuaciones de armonía, mandíbula, rasgos y piel",
          item3: "Desbloquea tus resultados completos y tu plan personalizado",
          note: "Toma unos 2 minutos. Tus fotos son privadas."
        },
        consent: {
          eyebrow: "Antes de empezar",
          title: "Tus datos, tu control",
          subtitle: "Necesitamos tu consentimiento para analizar tus fotos y almacenar tus resultados de forma segura.",
          photos: "Acepto subir fotos para análisis facial con IA",
          storage: "Acepto el almacenamiento seguro de mis fotos y resultados",
          disclaimer: "Entiendo que esto no es consejo médico",
          legal: "Lee nuestra Política de privacidad y Términos de servicio."
        },
        photos: {
          phaseFront: "1 de 2 — Foto frontal",
          phaseSide: "2 de 2 — Perfil lateral"
        },
        front: {
          eyebrow: "Foto frontal",
          title: "Toma una foto de frente",
          subtitle: "Mira directamente a la cámara con expresión neutra. Buena iluminación, sin obstrucciones.",
          guide: "Centra tu rostro en el marco",
          tip1: "Mira directamente a la cámara",
          tip2: "Usa iluminación natural y uniforme",
          tip3: "Quítate las gafas y despeja tu rostro"
        },
        side: {
          eyebrow: "Foto lateral",
          title: "Toma una foto de perfil",
          subtitle: "Gira la cabeza 90° para mostrar tu perfil. Mantén la barbilla a nivel.",
          guide: "Muestra tu perfil completo",
          tip1: "Gira exactamente 90° de la cámara",
          tip2: "Mantén la mandíbula visible",
          tip3: "Misma iluminación que la foto frontal"
        },
        analyzing: {
          title: "Analizando tu rostro…",
          subtitle: "Midiendo más de 100 métricas faciales en 4 pilares.",
          harmony: "Mapeando ratios de armonía facial",
          angularity: "Midiendo mandíbula y estructura ósea",
          dimorphism: "Evaluando rasgos dimórficos",
          features: "Analizando piel y rasgos"
        },
        results: {
          eyebrow: "Análisis completo",
          title: "Tus resultados están listos",
          subtitle: "Aquí tienes un adelanto — suscríbete para desbloquear el análisis completo y tu plan.",
          overall: "Puntuación global",
          teaser: "Tu desglose detallado está abajo",
          metric1: "Ratio de tercios faciales",
          metric2: "Ángulo de mandíbula",
          metric3: "Desviación de simetría",
          metric4: "Ratio IPD",
          lock: "Suscríbete para desbloquear tus resultados",
          unlock: "Desbloquear mis resultados"
        },
        paywall: {
          eyebrow: "MorphIndex Pro",
          title: "Desbloquea tu análisis completo",
          subtitle: "Accede a tus resultados completos, plan personalizado y seguimiento de progreso.",
          f1: "Análisis completo en más de 100 métricas",
          f2: "Plan de mejora personalizado",
          f3: "Coach — orientación experta con IA",
          f4: "Seguimiento de progreso y re-escaneos",
          yearly: "Anual",
          yearlyPrice: "59,99 €/año",
          monthly: "Mensual",
          monthlyPrice: "9,99 €/mes",
          bestValue: "Mejor valor",
          subscribe: "Suscribirse ahora",
          legal: "Cancela cuando quieras. Pago seguro con Stripe.",
          verifying: "Confirmando tu pago…",
          verifyingSubscription: "Activando tu suscripción…",
          checkoutError: "No se pudo iniciar el pago. Inténtalo de nuevo.",
          checkoutLoading: "Redirigiendo al pago…",
          cancelled: "Pago cancelado. Suscríbete para desbloquear tus resultados."
        },
        meta: {
          title: "MorphIndex — Onboarding",
          description: "Completa tu primer análisis facial con MorphIndex."
        }
      }
    }
  };

  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o && o[k]; }, obj);
  }

  function getLang() {
    var stored = localStorage.getItem("lang");
    if (stored && LANGS.indexOf(stored) !== -1) return stored;
    var browser = (navigator.language || "en").slice(0, 2);
    return LANGS.indexOf(browser) !== -1 ? browser : "en";
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) return;
    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang);
    applyLang(lang);
    document.querySelectorAll("[data-lang-current]").forEach(function (el) {
      el.textContent = LANG_LABELS[lang];
    });
    document.querySelectorAll("[data-lang-option]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang-option") === lang);
    });
  }

  function applyLang(lang) {
    var dict = T[lang];
    if (!dict) return;
    var authPage = document.body && document.body.dataset.authPage;
    var isAuthPage = document.body && document.body.classList.contains("auth-page");
    var isAppPage = document.body && document.body.classList.contains("app-page");
    var isOnboardingPage = document.body && document.body.dataset.appShell === "onboarding";

    if (isOnboardingPage && dict.onboarding && dict.onboarding.meta) {
      document.title = dict.onboarding.meta.title;
      var onboardingMeta = document.querySelector('meta[name="description"]');
      if (onboardingMeta) onboardingMeta.setAttribute("content", dict.onboarding.meta.description);
    } else if (isAppPage && dict.app && dict.app.meta) {
      document.title = dict.app.meta.title;
      var appMeta = document.querySelector('meta[name="description"]');
      if (appMeta) appMeta.setAttribute("content", dict.app.meta.description);
      document.dispatchEvent(new CustomEvent("langchange"));
    } else if (isAuthPage && dict.auth) {
      var meta = authPage === "login" ? dict.auth.loginMeta : dict.auth.registerMeta;
      if (meta) {
        document.title = meta.title;
        var authMeta = document.querySelector('meta[name="description"]');
        if (authMeta) authMeta.setAttribute("content", meta.description);
      }
    } else {
      document.title = dict.meta.title;
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", dict.meta.description);
    }
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var val = get(dict, el.getAttribute("data-i18n"));
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var val = get(dict, el.getAttribute("data-i18n-html"));
      if (val != null) el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var val = get(dict, el.getAttribute("data-i18n-aria"));
      if (val != null) el.setAttribute("aria-label", val);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var val = get(dict, el.getAttribute("data-i18n-placeholder"));
      if (val != null) el.setAttribute("placeholder", val);
    });
    if (dict.auth) {
      document.body.dataset.showPassword = dict.auth.showPassword || "";
      document.body.dataset.hidePassword = dict.auth.hidePassword || "";
      document.dispatchEvent(new CustomEvent("langchange"));
    }
  }

  function initLangSwitcher() {
    document.querySelectorAll(".lang-switcher").forEach(function (wrap) {
      var btn = wrap.querySelector("[data-lang-toggle]");
      var menu = wrap.querySelector(".lang-switcher__menu");
      if (!btn || !menu) return;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = wrap.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      menu.querySelectorAll("[data-lang-option]").forEach(function (option) {
        option.addEventListener("click", function () {
          setLang(option.getAttribute("data-lang-option"));
          wrap.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
        });
      });
    });
    document.addEventListener("click", function () {
      document.querySelectorAll(".lang-switcher.is-open").forEach(function (wrap) {
        wrap.classList.remove("is-open");
        var btn = wrap.querySelector("[data-lang-toggle]");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  window.I18N_T = T;

  document.addEventListener("DOMContentLoaded", function () {
    setLang(getLang());
    initLangSwitcher();
  });
})();
