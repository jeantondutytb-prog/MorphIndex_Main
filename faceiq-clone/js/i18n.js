(function () {
  var LANGS = ["en", "fr", "es"];
  var LANG_LABELS = { en: "EN", fr: "FR", es: "ES" };

  var T = {
    en: {
      meta: {
        title: "FaceIQ Labs — The Self-Improvement System for Your Appearance",
        description: "Analyze your face across 100+ metrics, get a personalized improvement plan, and track your progress over time."
      },
      a11y: { theme: "Toggle theme", language: "Change language", menu: "Open menu", stars: "5 stars", prev: "Previous", next: "Next" },
      nav: { celebs: "Celebs", creators: "Creators", login: "Login", cta: "Try Free" },
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
        overall: "Overall score",
        potential: "Potential score",
        percentile: "Top {n}% of users",
        photoFront: "Front",
        photoSide: "Side profile",
        ideal: "Ideal",
        planTitle: "Your improvement plan",
        planSubtitle: "Prioritized actions based on your weakest metrics.",
        weeks: "{n} weeks",
        disclaimer: "Scores are for self-improvement guidance only — not medical advice.",
        preview: {
          title: "Your 6-month preview",
          subtitle: "AI projection of your results if you follow your improvement plan.",
          before: "Today",
          after: "In 6 months",
          generating: "Generating your preview…",
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
        plan: {
          jawlineDefinition: { title: "Improve jawline definition", desc: "Focus on body fat reduction, mewing posture, and masseter training." },
          midfaceBalance: { title: "Balance midface proportions", desc: "Track cheek volume and midface length with consistent photo angles." },
          skinRoutine: { title: "Optimize skincare routine", desc: "Target clarity and pore visibility with retinoids and SPF daily." },
          underEyeCare: { title: "Address under-eye area", desc: "Improve sleep consistency and consider caffeine-based topical care." },
          postureMewing: { title: "Posture & tongue posture", desc: "Maintain proper oral posture and neck alignment for jaw support." },
          grooming: { title: "Refine grooming", desc: "Optimize hairstyle and facial hair to enhance dimorphic traits." }
        }
      },
      onboarding: {
        step: "Step",
        back: "Back",
        continue: "Continue",
        uploadPhoto: "Upload photo",
        capturePhoto: "Capture photo",
        useGallery: "Choose from gallery",
        retake: "Retake",
        camera: {
          loading: "Starting camera…",
          searching: "Position your face in the frame",
          closer: "Move a little closer",
          farther: "Move back slightly",
          center: "Center your face in the oval",
          angleFront: "Look straight at the camera",
          angleSide: "Turn your head to show your profile",
          aligned: "Perfect — hold still…",
          capturing: "Capturing…",
          captured: "Photo captured",
          denied: "Camera unavailable — use gallery instead"
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
          legal: "Cancel anytime. Payment processing coming soon."
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
      a11y: { theme: "Changer le thème", language: "Changer la langue", menu: "Ouvrir le menu", stars: "5 étoiles", prev: "Précédent", next: "Suivant" },
      nav: { celebs: "Célébrités", creators: "Créateurs", login: "Connexion", cta: "Essayer gratuitement" },
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
        overall: "Score global",
        potential: "Score potentiel",
        percentile: "Top {n}% des utilisateurs",
        photoFront: "Face",
        photoSide: "Profil",
        ideal: "Idéal",
        planTitle: "Votre plan d'amélioration",
        planSubtitle: "Actions prioritaires basées sur vos métriques les plus faibles.",
        weeks: "{n} semaines",
        disclaimer: "Les scores sont indicatifs pour l'auto-amélioration — pas un avis médical.",
        preview: {
          title: "Votre aperçu à 6 mois",
          subtitle: "Projection IA de vos résultats si vous suivez votre plan d'amélioration.",
          before: "Aujourd'hui",
          after: "Dans 6 mois",
          generating: "Génération de votre aperçu…",
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
        plan: {
          jawlineDefinition: { title: "Améliorer la définition de la mâchoire", desc: "Réduire le gras corporel, posture linguale et entraînement des masséters." },
          midfaceBalance: { title: "Équilibrer le midface", desc: "Suivre le volume des joues et la longueur du midface avec des photos cohérentes." },
          skinRoutine: { title: "Optimiser la routine skincare", desc: "Cibler clarté et pores avec rétinoïdes et SPF quotidien." },
          underEyeCare: { title: "Traiter la zone sous les yeux", desc: "Améliorer le sommeil et envisager des soins à base de caféine." },
          postureMewing: { title: "Posture et posture linguale", desc: "Maintenir une posture orale et cervicale correcte pour soutenir la mâchoire." },
          grooming: { title: "Affiner le grooming", desc: "Optimiser coiffure et pilosité faciale pour renforcer les traits dimorphiques." }
        }
      },
      onboarding: {
        step: "Étape",
        back: "Retour",
        continue: "Continuer",
        uploadPhoto: "Importer une photo",
        capturePhoto: "Prendre la photo",
        useGallery: "Choisir depuis la galerie",
        retake: "Reprendre",
        camera: {
          loading: "Démarrage de la caméra…",
          searching: "Placez votre visage dans le cadre",
          closer: "Rapprochez-vous un peu",
          farther: "Éloignez-vous légèrement",
          center: "Centrez votre visage dans l'ovale",
          angleFront: "Regardez droit la caméra",
          angleSide: "Tournez la tête pour montrer votre profil",
          aligned: "Parfait — ne bougez plus…",
          capturing: "Capture en cours…",
          captured: "Photo capturée",
          denied: "Caméra indisponible — utilisez la galerie"
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
          legal: "Annulation à tout moment. Paiement bientôt disponible."
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
      a11y: { theme: "Cambiar tema", language: "Cambiar idioma", menu: "Abrir menú", stars: "5 estrellas", prev: "Anterior", next: "Siguiente" },
      nav: { celebs: "Celebridades", creators: "Creadores", login: "Iniciar sesión", cta: "Probar gratis" },
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
        overall: "Puntuación global",
        potential: "Puntuación potencial",
        percentile: "Top {n}% de usuarios",
        photoFront: "Frontal",
        photoSide: "Perfil",
        ideal: "Ideal",
        planTitle: "Tu plan de mejora",
        planSubtitle: "Acciones prioritarias según tus métricas más débiles.",
        weeks: "{n} semanas",
        disclaimer: "Las puntuaciones son orientativas para la auto-mejora — no son consejo médico.",
        preview: {
          title: "Tu vista previa a 6 meses",
          subtitle: "Proyección IA de tus resultados si sigues tu plan de mejora.",
          before: "Hoy",
          after: "En 6 meses",
          generating: "Generando tu vista previa…",
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
        plan: {
          jawlineDefinition: { title: "Mejorar definición mandibular", desc: "Reducir grasa corporal, postura lingual y entrenamiento de maseteros." },
          midfaceBalance: { title: "Equilibrar el midface", desc: "Seguir volumen de mejillas y longitud del midface con fotos consistentes." },
          skinRoutine: { title: "Optimizar rutina de skincare", desc: "Mejorar claridad y poros con retinoides y SPF diario." },
          underEyeCare: { title: "Tratar zona bajo los ojos", desc: "Mejorar el sueño y considerar cuidados con cafeína." },
          postureMewing: { title: "Postura y postura lingual", desc: "Mantener postura oral y cervical correcta para apoyar la mandíbula." },
          grooming: { title: "Refinar el grooming", desc: "Optimizar peinado y vello facial para realzar rasgos dimórficos." }
        }
      },
      onboarding: {
        step: "Paso",
        back: "Volver",
        continue: "Continuar",
        uploadPhoto: "Subir foto",
        capturePhoto: "Capturar foto",
        useGallery: "Elegir de la galería",
        retake: "Repetir",
        camera: {
          loading: "Iniciando cámara…",
          searching: "Coloca tu rostro en el marco",
          closer: "Acércate un poco",
          farther: "Aléjate un poco",
          center: "Centra tu rostro en el óvalo",
          angleFront: "Mira directamente a la cámara",
          angleSide: "Gira la cabeza para mostrar tu perfil",
          aligned: "Perfecto — quédate quieto…",
          capturing: "Capturando…",
          captured: "Foto capturada",
          denied: "Cámara no disponible — usa la galería"
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
          legal: "Cancela cuando quieras. Pago próximamente."
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
