(function () {
  var LANGS = ["en", "fr", "es"];
  var LANG_LABELS = { en: "EN", fr: "FR", es: "ES" };

  var T = {
    en: {
      meta: {
        title: "FaceIQ Labs — The Self-Improvement System for Your Appearance",
        description: "Analyze your face across 100+ metrics, get a personalized improvement plan, and track your progress over time."
      },
      a11y: { theme: "Toggle theme", language: "Change language", menu: "Open menu", stars: "5 stars", prev: "Previous", next: "Next", close: "Close" },
      nav: { celebs: "Celebs", creators: "Creators", login: "Login", cta: "Try Free", ctaShort: "Try Free" },
      hero: {
        users: "users", analyses: "analyses",
        title: "Your Looks.<br>Measured. Tracked. Improved.",
        subtitle: "Analyze your face across 100+ metrics, get a personalized plan, and track your progress over time.",
        cta: "Start Your Journey", link: "See how it works",
        note: "For those serious about self-improvement.",
        tabFront: "Front Harmony", tabSide: "Side Harmony"
      },
      transform: {
        eyebrow: "Commitment pays off", title: "See What's Possible",
        subtitle: "2.5 years of real commitment, every step tracked.",
        before: "Before", after: "After",
        scoreLabel: "Overall facial score over 2.5 years",
        p1t: "Just the Beginning", p1d: "Month 0–8 · 8 months",
        p2t: "Early Results + Confidence Boost", p2d: "Month 8–14 · 6 months",
        p3t: "Serious Results", p3d: "Month 14–26 · 12 months",
        p4t: "Ascension", p4d: "Month 26–30 · 4 months",
        q1: "The people who get results aren't gifted — they're committed.",
        q2: "They track every change, follow the data, and stay the course. FaceIQ Labs gives them the system to do it — and the clarity to never waste effort."
      },
      pillars: {
        eyebrow: "Analysis Pillars", title: "Track your progress across 4 dimensions",
        subtitle: "Each pillar measures a different aspect of your facial structure.",
        p1tag: "Pillar 1", p1: "Harmony", p1d: "Facial proportional balance",
        p2tag: "Pillar 2", p2: "Angularity", p2d: "Jawline & bone structure definition", p2m: "assessments",
        p3tag: "Pillar 3", p3: "Dimorphism", p3d: "Gender-specific trait measurement", p3m: "measurements",
        p4tag: "Pillar 4", p4: "Health Indicators", p4d: "Skin health, symmetry & feature analysis", p4m: "health indicators"
      },
      banner: "Built by the team behind the industry's first facial harmony system — for those who take their appearance seriously.",
      testimonials: {
        title: "What people say", subtitle: "Real results from real users.",
        t1: "\"FaceIQ Labs is a quality app. You get exactly what you pay for. I would recommend it to anyone seeking aesthetic improvement or just curious where they stand. I hope the app grows in popularity because it's a real gem.\"",
        t2: "\"The analysis confirmed things I'd always suspected about my facial structure but could never quantify. It's refreshing to have an honest, data-driven tool instead of relying on opinions. Now I know what to improve and how.\"",
        t3: "\"My scores were solid overall, but I wanted to target my skin and under-eye area. FaceIQ Labs is the only tool that gave me genuinely accurate, actionable insights — everything else felt vague and unreliable.\"",
        t4: "\"The app helped me map out exactly where my strengths and weaknesses are, so I can focus my improvement efforts where they'll actually make a difference. Having that kind of clarity is a game-changer.\"",
        t5: "\"Hands down the best facial analysis tool available. The depth of measurement is unmatched, and the personalized improvement plans keep me coming back.\"",
        t6: "\"FaceIQ Labs gave me a clear, complete roadmap for improving my appearance — not just surgery, but practical, everyday steps to look and feel more attractive. It's the most advanced self-improvement tool I've used.\"",
        t7: "\"I initially signed up for FaceIQ Labs to see my score, but I ended up booking an appointment with my surgeon thanks to the advice they provided. I'm about to have my tri-max procedure with CCW rotation. This is a real story about how this app helped me improve.\""
      },
      platform: {
        title: "Your self-improvement command center",
        subtitle: "Analysis is step one. Track progress, simulate changes, get expert guidance — every week.",
        f1t: "Harmony Analysis", f1d: "Score across 4 pillars with 70+ precise facial ratios.",
        f2t: "FaceGPT", f2d: "Ask anything about your face — instant expert answers.",
        f3t: "Simulations", f3d: "See what procedures would look like before you commit.",
        f4t: "Your Plan", f4d: "A personalized roadmap based on your unique scores.",
        f5t: "Compare", f5d: "Side-by-side analysis with detailed breakdowns.",
        f6t: "Creator League", f6d: "Compete for the top spot on the leaderboard.",
        new: "New"
      },
      showcase: {
        tag1: "FaceGPT 1.5", tag2: "Simulate v1.0",
        title: "See what's inside",
        subtitle: "Every analysis includes dozens of detailed assessments — from skin health to facial harmony ratios.",
        highlight: "+100 metrics to track your transformation"
      },
      steps: {
        title: "How it works", subtitle: "Four steps. One cycle. Ongoing improvement.",
        s1t: "Upload", s1d: "Take a front and side photo.",
        s2t: "Analyze", s2d: "Get your complete analysis across 4 pillars — harmony, angularity, dimorphism, and features.",
        s3t: "Plan", s3d: "Receive a personalized roadmap with non-surgical and surgical options ranked by impact.",
        s4t: "Act & Track", s4d: "Follow your plan. Simulate changes. Ask FaceGPT along the way. Re-analyze over time and see how your scores move.",
        note: "Side profile analysis is free."
      },
      projection: {
        eyebrow: "Score Projection", title: "Your score isn't fixed",
        subtitle: "Small, consistent changes compound over time. Track your progress and watch your score move.",
        today: "Today", potential: "Potential", btn: "See your projection"
      },
      audience: {
        eyebrow: "A note on who this is for", title: "This isn't for everyone",
        p1: "Most people see their score and do nothing. They let the number define them. The ones who actually transform treat it as a starting point — and commit to the process.",
        p2: "FaceIQ Labs is built for them."
      },
      cta: {
        title: "Your transformation starts with a single photo",
        subtitle: "450,000+ people have started their journey. The question is — will you?",
        btn: "Begin Your Assessment", note: "Your future self will thank you."
      },
      footer: { join: "Join Us", privacy: "Privacy", terms: "Terms", copy: "© 2026 FaceIQ Labs" },
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
          title: "FaceIQ Labs — Log in",
          description: "Log in to your FaceIQ Labs account."
        },
        registerMeta: {
          title: "FaceIQ Labs — Create your account",
          description: "Create your FaceIQ Labs account and start your transformation journey."
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
        meta: {
          title: "FaceIQ Labs — Dashboard",
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
            description: "Ask FaceGPT about your analysis and improvement plan."
          },
          simulate: {
            title: "Simulations",
            description: "Preview cosmetic procedure effects on your photo with adjustable intensity."
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
          preview: "6-month preview",
          simulate: "Simulate",
          rescan: "New scan"
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
          subtitle: "Ask FaceGPT about your scores, metrics, or improvement plan — answers follow your active protocol.",
          placeholder: "Ask about your analysis…",
          send: "Send",
          empty: "Start a conversation — ask about your scores or what to focus on first.",
          error: "FaceGPT is unavailable right now. Please try again.",
          limitReached: "You've reached today's FaceGPT message limit. Check your Plan page for this week's actions and try again tomorrow.",
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
              rescan: "Run a new FaceIQ scan to update your scores",
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
          title: "Welcome to FaceIQ Labs",
          subtitle: "Let's analyze your face across 100+ metrics and build your personalized improvement plan.",
          item1: "Take a front and side photo",
          item2: "Get your analysis across 4 pillars",
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
          subtitle: "Subscribe to unlock your full analysis, personalized plan, and progress tracking.",
          overall: "Overall score",
          metric1: "Facial thirds ratio",
          metric2: "Jaw angle",
          metric3: "Symmetry deviation",
          metric4: "IPD ratio",
          lock: "Subscribe to unlock your full results",
          unlock: "Unlock my results"
        },
        paywall: {
          eyebrow: "FaceIQ Pro",
          title: "Unlock your full analysis",
          subtitle: "Get access to your complete results, personalized plan, and progress tracking.",
          f1: "Full analysis across 100+ metrics",
          f2: "Personalized improvement plan",
          f3: "FaceGPT — AI expert guidance",
          f4: "Progress tracking & re-scans",
          yearly: "Yearly",
          yearlyPrice: "€59.99/year",
          monthly: "Monthly",
          monthlyPrice: "€9.99/month",
          bestValue: "Best value",
          subscribe: "Subscribe now",
          legal: "Cancel anytime. Secure payment via Stripe.",
          verifying: "Confirming your payment…",
          checkoutError: "Unable to start checkout. Please try again.",
          checkoutLoading: "Redirecting to checkout…",
          cancelled: "Payment cancelled. Subscribe to unlock your full results."
        },
        meta: {
          title: "FaceIQ Labs — Onboarding",
          description: "Complete your first facial analysis with FaceIQ Labs."
        }
      }
    },
    fr: {
      meta: {
        title: "FaceIQ Labs — Le système d'auto-amélioration pour votre apparence",
        description: "Analysez votre visage selon plus de 100 métriques, obtenez un plan d'amélioration personnalisé et suivez vos progrès."
      },
      a11y: { theme: "Changer le thème", language: "Changer la langue", menu: "Ouvrir le menu", stars: "5 étoiles", prev: "Précédent", next: "Suivant", close: "Fermer" },
      nav: { celebs: "Célébrités", creators: "Créateurs", login: "Connexion", cta: "Essayer gratuitement", ctaShort: "Essayer" },
      hero: {
        users: "utilisateurs", analyses: "analyses",
        title: "Votre apparence.<br>Mesurée. Suivie. Améliorée.",
        subtitle: "Analysez votre visage selon plus de 100 métriques, obtenez un plan personnalisé et suivez vos progrès au fil du temps.",
        cta: "Commencer votre parcours", link: "Voir comment ça marche",
        note: "Pour ceux qui prennent l'auto-amélioration au sérieux.",
        tabFront: "Harmonie de face", tabSide: "Harmonie de profil"
      },
      transform: {
        eyebrow: "L'engagement paie", title: "Voyez ce qui est possible",
        subtitle: "2,5 ans d'engagement réel, chaque étape suivie.",
        before: "Avant", after: "Après",
        scoreLabel: "Score facial global sur 2,5 ans",
        p1t: "Le début", p1d: "Mois 0–8 · 8 mois",
        p2t: "Premiers résultats + confiance", p2d: "Mois 8–14 · 6 mois",
        p3t: "Résultats sérieux", p3d: "Mois 14–26 · 12 mois",
        p4t: "Ascension", p4d: "Mois 26–30 · 4 mois",
        q1: "Ceux qui obtiennent des résultats ne sont pas chanceux — ils sont engagés.",
        q2: "Ils suivent chaque changement, s'appuient sur les données et restent sur la voie. FaceIQ Labs leur donne le système — et la clarté pour ne jamais gaspiller leurs efforts."
      },
      pillars: {
        eyebrow: "Piliers d'analyse", title: "Suivez vos progrès sur 4 dimensions",
        subtitle: "Chaque pilier mesure un aspect différent de votre structure faciale.",
        p1tag: "Pilier 1", p1: "Harmonie", p1d: "Équilibre proportionnel du visage",
        p2tag: "Pilier 2", p2: "Angularité", p2d: "Définition de la mâchoire et de la structure osseuse", p2m: "évaluations",
        p3tag: "Pilier 3", p3: "Dimorphisme", p3d: "Mesure des traits spécifiques au genre", p3m: "mesures",
        p4tag: "Pilier 4", p4: "Indicateurs de santé", p4d: "Santé de la peau, symétrie et analyse des traits", p4m: "indicateurs de santé"
      },
      banner: "Conçu par l'équipe derrière le premier système d'harmonie faciale — pour ceux qui prennent leur apparence au sérieux.",
      testimonials: {
        title: "Ce qu'en disent les utilisateurs", subtitle: "Des résultats réels, par de vrais utilisateurs.",
        t1: "\"FaceIQ Labs est une application de qualité. Vous obtenez exactement ce que vous payez. Je la recommande à quiconque cherche à s'améliorer esthétiquement ou est simplement curieux de sa position.\"",
        t2: "\"L'analyse a confirmé ce que je soupçonnais toujours sur ma structure faciale sans pouvoir le quantifier. Maintenant je sais quoi améliorer et comment.\"",
        t3: "\"Mes scores étaient globalement bons, mais je voulais cibler ma peau et le contour des yeux. FaceIQ Labs est le seul outil qui m'a donné des insights vraiment précis et actionnables.\"",
        t4: "\"L'application m'a aidé à cartographier exactement mes forces et faiblesses, pour concentrer mes efforts là où ça compte vraiment.\"",
        t5: "\"De loin le meilleur outil d'analyse faciale. La profondeur des mesures est inégalée, et les plans d'amélioration personnalisés me font revenir.\"",
        t6: "\"FaceIQ Labs m'a donné une feuille de route claire et complète — pas seulement la chirurgie, mais des étapes pratiques au quotidien.\"",
        t7: "\"Je me suis inscrit pour voir mon score, mais j'ai fini par prendre rendez-vous avec mon chirurgien grâce aux conseils fournis. Une vraie histoire de transformation.\""
      },
      platform: {
        title: "Votre centre de commande d'auto-amélioration",
        subtitle: "L'analyse n'est que la première étape. Suivez vos progrès, simulez des changements, obtenez des conseils d'experts — chaque semaine.",
        f1t: "Analyse d'harmonie", f1d: "Score sur 4 piliers avec plus de 70 ratios faciaux précis.",
        f2t: "FaceGPT", f2d: "Posez n'importe quelle question sur votre visage — réponses d'expert instantanées.",
        f3t: "Simulations", f3d: "Visualisez les procédures avant de vous engager.",
        f4t: "Votre plan", f4d: "Une feuille de route personnalisée basée sur vos scores uniques.",
        f5t: "Comparer", f5d: "Analyse côte à côte avec des décompositions détaillées.",
        f6t: "Creator League", f6d: "Compétez pour la première place du classement.",
        new: "Nouveau"
      },
      showcase: {
        tag1: "FaceGPT 1.5", tag2: "Simulate v1.0",
        title: "Découvrez l'intérieur",
        subtitle: "Chaque analyse inclut des dizaines d'évaluations détaillées — de la santé de la peau aux ratios d'harmonie faciale.",
        highlight: "+100 métriques pour suivre votre transformation"
      },
      steps: {
        title: "Comment ça marche", subtitle: "Quatre étapes. Un cycle. Une amélioration continue.",
        s1t: "Télécharger", s1d: "Prenez une photo de face et de profil.",
        s2t: "Analyser", s2d: "Obtenez votre analyse complète sur 4 piliers — harmonie, angularité, dimorphisme et traits.",
        s3t: "Planifier", s3d: "Recevez une feuille de route personnalisée avec des options classées par impact.",
        s4t: "Agir & Suivre", s4d: "Suivez votre plan. Simulez des changements. Interrogez FaceGPT. Ré-analysez au fil du temps.",
        note: "L'analyse de profil est gratuite."
      },
      projection: {
        eyebrow: "Projection de score", title: "Votre score n'est pas figé",
        subtitle: "De petits changements constants se cumulent avec le temps. Suivez vos progrès et regardez votre score évoluer.",
        today: "Aujourd'hui", potential: "Potentiel", btn: "Voir votre projection"
      },
      audience: {
        eyebrow: "Pour qui c'est fait", title: "Ce n'est pas pour tout le monde",
        p1: "La plupart des gens voient leur score et ne font rien. Ils laissent le chiffre les définir. Ceux qui se transforment vraiment le considèrent comme un point de départ.",
        p2: "FaceIQ Labs est conçu pour eux."
      },
      cta: {
        title: "Votre transformation commence par une seule photo",
        subtitle: "450 000+ personnes ont commencé leur parcours. La question est — allez-vous le faire ?",
        btn: "Commencer votre évaluation", note: "Votre futur vous vous remerciera."
      },
      footer: { join: "Nous rejoindre", privacy: "Confidentialité", terms: "Conditions", copy: "© 2026 FaceIQ Labs" },
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
          title: "FaceIQ Labs — Connexion",
          description: "Connectez-vous à votre compte FaceIQ Labs."
        },
        registerMeta: {
          title: "FaceIQ Labs — Créer votre compte",
          description: "Créez votre compte FaceIQ Labs et commencez votre parcours de transformation."
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
        meta: {
          title: "FaceIQ Labs — Tableau de bord",
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
            description: "Posez vos questions à FaceGPT sur votre analyse et votre plan."
          },
          simulate: {
            title: "Simulations",
            description: "Prévisualisez l'effet de procédures esthétiques sur votre photo."
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
          preview: "Aperçu 6 mois",
          simulate: "Simuler",
          rescan: "Nouveau scan"
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
          subtitle: "Posez à FaceGPT vos questions — les réponses suivent votre protocole actif.",
          placeholder: "Posez une question sur votre analyse…",
          send: "Envoyer",
          empty: "Commencez la conversation — demandez par quoi commencer.",
          error: "FaceGPT est indisponible pour le moment. Réessayez.",
          limitReached: "Vous avez atteint la limite de messages FaceGPT pour aujourd'hui. Consultez votre Plan pour les actions de la semaine et réessayez demain.",
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
              rescan: "Lancer un nouveau scan FaceIQ pour mettre à jour vos scores",
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
          title: "Bienvenue sur FaceIQ Labs",
          subtitle: "Analysons votre visage selon plus de 100 métriques et construisons votre plan d'amélioration personnalisé.",
          item1: "Prenez une photo de face et de profil",
          item2: "Obtenez votre analyse sur 4 piliers",
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
          subtitle: "Abonnez-vous pour débloquer votre analyse complète, votre plan personnalisé et le suivi de vos progrès.",
          overall: "Score global",
          metric1: "Ratio des tiers faciaux",
          metric2: "Angle de la mâchoire",
          metric3: "Déviation de symétrie",
          metric4: "Ratio IPD",
          lock: "Abonnez-vous pour débloquer vos résultats",
          unlock: "Débloquer mes résultats"
        },
        paywall: {
          eyebrow: "FaceIQ Pro",
          title: "Débloquez votre analyse complète",
          subtitle: "Accédez à vos résultats complets, votre plan personnalisé et le suivi de vos progrès.",
          f1: "Analyse complète sur plus de 100 métriques",
          f2: "Plan d'amélioration personnalisé",
          f3: "FaceGPT — conseils d'expert par IA",
          f4: "Suivi des progrès et re-scans",
          yearly: "Annuel",
          yearlyPrice: "59,99 €/an",
          monthly: "Mensuel",
          monthlyPrice: "9,99 €/mois",
          bestValue: "Meilleur choix",
          subscribe: "S'abonner maintenant",
          legal: "Annulation à tout moment. Paiement sécurisé via Stripe.",
          verifying: "Confirmation de votre paiement…",
          checkoutError: "Impossible de démarrer le paiement. Réessayez.",
          checkoutLoading: "Redirection vers le paiement…",
          cancelled: "Paiement annulé. Abonnez-vous pour débloquer vos résultats."
        },
        meta: {
          title: "FaceIQ Labs — Onboarding",
          description: "Complétez votre première analyse faciale avec FaceIQ Labs."
        }
      }
    },
    es: {
      meta: {
        title: "FaceIQ Labs — El sistema de auto-mejora para tu apariencia",
        description: "Analiza tu rostro según más de 100 métricas, obtén un plan de mejora personalizado y sigue tu progreso."
      },
      a11y: { theme: "Cambiar tema", language: "Cambiar idioma", menu: "Abrir menú", stars: "5 estrellas", prev: "Anterior", next: "Siguiente", close: "Cerrar" },
      nav: { celebs: "Celebridades", creators: "Creadores", login: "Iniciar sesión", cta: "Probar gratis", ctaShort: "Probar" },
      hero: {
        users: "usuarios", analyses: "análisis",
        title: "Tu apariencia.<br>Medida. Seguida. Mejorada.",
        subtitle: "Analiza tu rostro según más de 100 métricas, obtén un plan personalizado y sigue tu progreso con el tiempo.",
        cta: "Comienza tu viaje", link: "Ver cómo funciona",
        note: "Para quienes se toman en serio la auto-mejora.",
        tabFront: "Armonía frontal", tabSide: "Armonía lateral"
      },
      transform: {
        eyebrow: "El compromiso da frutos", title: "Mira lo que es posible",
        subtitle: "2,5 años de compromiso real, cada paso registrado.",
        before: "Antes", after: "Después",
        scoreLabel: "Puntuación facial general en 2,5 años",
        p1t: "El comienzo", p1d: "Mes 0–8 · 8 meses",
        p2t: "Primeros resultados + confianza", p2d: "Mes 8–14 · 6 meses",
        p3t: "Resultados serios", p3d: "Mes 14–26 · 12 meses",
        p4t: "Ascensión", p4d: "Mes 26–30 · 4 meses",
        q1: "Quienes obtienen resultados no tienen suerte — están comprometidos.",
        q2: "Rastrean cada cambio, siguen los datos y mantienen el rumbo. FaceIQ Labs les da el sistema — y la claridad para no desperdiciar esfuerzo."
      },
      pillars: {
        eyebrow: "Pilares de análisis", title: "Sigue tu progreso en 4 dimensiones",
        subtitle: "Cada pilar mide un aspecto diferente de tu estructura facial.",
        p1tag: "Pilar 1", p1: "Armonía", p1d: "Equilibrio proporcional facial",
        p2tag: "Pilar 2", p2: "Angularidad", p2d: "Definición de mandíbula y estructura ósea", p2m: "evaluaciones",
        p3tag: "Pilar 3", p3: "Dimorfismo", p3d: "Medición de rasgos específicos de género", p3m: "mediciones",
        p4tag: "Pilar 4", p4: "Indicadores de salud", p4d: "Salud de la piel, simetría y análisis de rasgos", p4m: "indicadores de salud"
      },
      banner: "Creado por el equipo detrás del primer sistema de armonía facial — para quienes se toman su apariencia en serio.",
      testimonials: {
        title: "Lo que dicen los usuarios", subtitle: "Resultados reales de usuarios reales.",
        t1: "\"FaceIQ Labs es una app de calidad. Obtienes exactamente lo que pagas. La recomendaría a cualquiera que busque mejorar estéticamente.\"",
        t2: "\"El análisis confirmó cosas que siempre sospeché sobre mi estructura facial pero nunca pude cuantificar. Ahora sé qué mejorar y cómo.\"",
        t3: "\"Mis puntuaciones eran buenas en general, pero quería enfocarme en mi piel y el área bajo los ojos. FaceIQ Labs es la única herramienta con insights genuinamente precisos.\"",
        t4: "\"La app me ayudó a mapear exactamente mis fortalezas y debilidades, para enfocar mis esfuerzos donde realmente importan.\"",
        t5: "\"Sin duda la mejor herramienta de análisis facial. La profundidad de medición es inigualable.\"",
        t6: "\"FaceIQ Labs me dio una hoja de ruta clara y completa — no solo cirugía, sino pasos prácticos diarios.\"",
        t7: "\"Me registré para ver mi puntuación, pero terminé reservando una cita con mi cirujano gracias a los consejos proporcionados.\""
      },
      platform: {
        title: "Tu centro de comando de auto-mejora",
        subtitle: "El análisis es solo el primer paso. Sigue el progreso, simula cambios, obtén orientación experta — cada semana.",
        f1t: "Análisis de armonía", f1d: "Puntuación en 4 pilares con más de 70 ratios faciales precisos.",
        f2t: "FaceGPT", f2d: "Pregunta cualquier cosa sobre tu rostro — respuestas expertas al instante.",
        f3t: "Simulaciones", f3d: "Mira cómo se verían los procedimientos antes de comprometerte.",
        f4t: "Tu plan", f4d: "Una hoja de ruta personalizada basada en tus puntuaciones únicas.",
        f5t: "Comparar", f5d: "Análisis lado a lado con desgloses detallados.",
        f6t: "Creator League", f6d: "Compite por el primer puesto en el ranking.",
        new: "Nuevo"
      },
      showcase: {
        tag1: "FaceGPT 1.5", tag2: "Simulate v1.0",
        title: "Mira qué hay dentro",
        subtitle: "Cada análisis incluye docenas de evaluaciones detalladas — desde la salud de la piel hasta los ratios de armonía facial.",
        highlight: "+100 métricas para seguir tu transformación"
      },
      steps: {
        title: "Cómo funciona", subtitle: "Cuatro pasos. Un ciclo. Mejora continua.",
        s1t: "Subir", s1d: "Toma una foto frontal y lateral.",
        s2t: "Analizar", s2d: "Obtén tu análisis completo en 4 pilares — armonía, angularidad, dimorfismo y rasgos.",
        s3t: "Planificar", s3d: "Recibe una hoja de ruta personalizada con opciones clasificadas por impacto.",
        s4t: "Actuar y seguir", s4d: "Sigue tu plan. Simula cambios. Pregunta a FaceGPT. Re-analiza con el tiempo.",
        note: "El análisis de perfil es gratuito."
      },
      projection: {
        eyebrow: "Proyección de puntuación", title: "Tu puntuación no está fija",
        subtitle: "Los pequeños cambios constantes se acumulan con el tiempo. Sigue tu progreso y observa cómo se mueve tu puntuación.",
        today: "Hoy", potential: "Potencial", btn: "Ver tu proyección"
      },
      audience: {
        eyebrow: "Para quién es", title: "Esto no es para todos",
        p1: "La mayoría ve su puntuación y no hace nada. Dejan que el número los defina. Los que realmente se transforman lo tratan como punto de partida.",
        p2: "FaceIQ Labs está hecho para ellos."
      },
      cta: {
        title: "Tu transformación empieza con una sola foto",
        subtitle: "450.000+ personas han comenzado su viaje. La pregunta es — ¿lo harás tú?",
        btn: "Comenzar tu evaluación", note: "Tu yo del futuro te lo agradecerá."
      },
      footer: { join: "Únete", privacy: "Privacidad", terms: "Términos", copy: "© 2026 FaceIQ Labs" },
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
          title: "FaceIQ Labs — Iniciar sesión",
          description: "Inicia sesión en tu cuenta de FaceIQ Labs."
        },
        registerMeta: {
          title: "FaceIQ Labs — Crear tu cuenta",
          description: "Crea tu cuenta de FaceIQ Labs y comienza tu viaje de transformación."
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
        meta: {
          title: "FaceIQ Labs — Panel",
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
            description: "Pregunta a FaceGPT sobre tu análisis y plan de mejora."
          },
          simulate: {
            title: "Simulaciones",
            description: "Previsualiza efectos de procedimientos estéticos en tu foto."
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
          preview: "Vista 6 meses",
          simulate: "Simular",
          rescan: "Nuevo escaneo"
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
          subtitle: "Pregunta a FaceGPT — las respuestas siguen tu protocolo activo.",
          placeholder: "Pregunta sobre tu análisis…",
          send: "Enviar",
          empty: "Empieza la conversación — pregunta por dónde empezar.",
          error: "FaceGPT no está disponible ahora. Inténtalo de nuevo.",
          limitReached: "Has alcanzado el límite diario de mensajes de FaceGPT. Revisa tu Plan para las acciones de esta semana e inténtalo mañana.",
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
              rescan: "Hacer un nuevo escaneo FaceIQ para actualizar tus puntuaciones",
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
          title: "Bienvenido a FaceIQ Labs",
          subtitle: "Analicemos tu rostro según más de 100 métricas y construyamos tu plan de mejora personalizado.",
          item1: "Toma una foto frontal y lateral",
          item2: "Obtén tu análisis en 4 pilares",
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
          subtitle: "Suscríbete para desbloquear tu análisis completo, plan personalizado y seguimiento.",
          overall: "Puntuación global",
          metric1: "Ratio de tercios faciales",
          metric2: "Ángulo de mandíbula",
          metric3: "Desviación de simetría",
          metric4: "Ratio IPD",
          lock: "Suscríbete para desbloquear tus resultados",
          unlock: "Desbloquear mis resultados"
        },
        paywall: {
          eyebrow: "FaceIQ Pro",
          title: "Desbloquea tu análisis completo",
          subtitle: "Accede a tus resultados completos, plan personalizado y seguimiento de progreso.",
          f1: "Análisis completo en más de 100 métricas",
          f2: "Plan de mejora personalizado",
          f3: "FaceGPT — orientación experta con IA",
          f4: "Seguimiento de progreso y re-escaneos",
          yearly: "Anual",
          yearlyPrice: "59,99 €/año",
          monthly: "Mensual",
          monthlyPrice: "9,99 €/mes",
          bestValue: "Mejor valor",
          subscribe: "Suscribirse ahora",
          legal: "Cancela cuando quieras. Pago seguro con Stripe.",
          verifying: "Confirmando tu pago…",
          checkoutError: "No se pudo iniciar el pago. Inténtalo de nuevo.",
          checkoutLoading: "Redirigiendo al pago…",
          cancelled: "Pago cancelado. Suscríbete para desbloquear tus resultados."
        },
        meta: {
          title: "FaceIQ Labs — Onboarding",
          description: "Completa tu primer análisis facial con FaceIQ Labs."
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
