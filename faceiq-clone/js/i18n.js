(function () {
  var LANGS = ["en", "fr", "es"];
  var LANG_LABELS = { en: "EN", fr: "FR", es: "ES" };

  var T = {
    en: {
      meta: {
        title: "MorphIndex — Quantify Your Facial Morphology",
        description: "MorphIndex measures your facial morphology across 100+ data points, builds a custom improvement plan, and tracks every change over time."
      },
      a11y: {
        theme: "Toggle theme",
        language: "Change language",
        stars: "5 stars",
        prev: "Previous",
        next: "Next"
      },
      nav: { benchmarks: "Benchmarks", community: "Community", signin: "Sign In", cta: "Get Started" },
      hero: {
        members: "members",
        scans: "scans",
        title: "Your Face.<br>Mapped. Scored. Refined.",
        subtitle: "MorphIndex breaks down your facial structure into 100+ data points, delivers a tailored action plan, and shows how you evolve over time.",
        cta: "Start My Analysis",
        link: "Discover the process",
        note: "Built for people who want measurable progress, not guesswork.",
        tabFront: "Front View",
        tabProfile: "Profile View"
      },
      transform: {
        eyebrow: "Consistency compounds",
        title: "Real Progress, Documented",
        subtitle: "Two years of disciplined effort — every milestone captured in data.",
        start: "Start",
        now: "Now",
        label: "MorphIndex score progression over 24 months",
        t1h: "Foundation Phase", t1p: "Month 0–8 · 8 months",
        t2h: "Visible Shift", t2p: "Month 8–14 · 6 months",
        t3h: "Structural Gains", t3p: "Month 14–26 · 12 months",
        t4h: "Peak Form", t4p: "Month 26–30 · 4 months",
        q1: "Lasting change doesn't come from luck — it comes from discipline.",
        q2: "The people who improve the most log every scan, trust the numbers, and stick to the plan. MorphIndex is the framework that keeps them focused and moving forward."
      },
      pillars: {
        eyebrow: "Core Metrics",
        title: "Four axes that define your morphology",
        subtitle: "Each dimension captures a distinct layer of your facial structure.",
        axis1: "Axis 1", p1: "Proportions", p1d: "Balance and symmetry across facial thirds",
        criteria: "criteria", ratios: "ratios", signals: "signals",
        axis2: "Axis 2", p2: "Definition", p2d: "Jawline sharpness and skeletal contour",
        axis3: "Axis 3", p3: "Traits", p3d: "Masculine and feminine morphological markers",
        axis4: "Axis 4", p4: "Vitality", p4d: "Skin quality, symmetry, and feature health"
      },
      banner: "Designed by researchers who pioneered quantitative facial analysis — for anyone ready to take their morphology seriously.",
      testimonials: {
        title: "Trusted by our community",
        subtitle: "Honest feedback from people who use MorphIndex daily.",
        t1: "\"MorphIndex delivers exactly what it promises — precise, no-fluff analysis. Whether you're optimizing your look or just curious about your structure, this is the most reliable tool I've found.\"",
        t2: "\"I'd always had a vague sense of my weak points, but MorphIndex put numbers on it. Having objective data instead of random opinions changed how I approach improvement entirely.\"",
        t3: "\"My overall score was decent, but I needed specifics on skin texture and under-eye hollows. MorphIndex was the first platform to give me precise, actionable feedback — not generic advice.\"",
        t4: "\"Finally a tool that shows me exactly where I stand — strengths, gaps, and what to prioritize. That level of clarity alone is worth it.\"",
        t5: "\"The depth of analysis is on another level. Every scan reveals something new, and the personalized plans keep me accountable week after week.\"",
        t6: "\"MorphIndex gave me a full roadmap — not just clinical options, but daily habits that actually move the needle. Nothing else comes close in terms of precision.\"",
        t7: "\"I downloaded MorphIndex out of curiosity about my score. The recommendations were so detailed that I scheduled a consultation with a specialist. The app genuinely changed my approach.\""
      },
      features: {
        title: "Everything you need in one dashboard",
        subtitle: "Scanning is just the beginning. Monitor trends, preview changes, and get guidance — all in one place.",
        f1t: "MorphIndex Score", f1d: "A composite rating across 4 axes with 70+ anatomical ratios.",
        f2t: "MorphAI", f2d: "Ask any question about your morphology — get instant, expert-level answers.",
        f3t: "Visual Previews", f3d: "Preview potential changes before making any decision.",
        f4t: "Action Plan", f4d: "A step-by-step roadmap built from your unique profile.",
        f5t: "Side-by-Side", f5d: "Compare scans over time with granular metric breakdowns.",
        f6t: "Rankings", f6d: "Climb the community leaderboard and track your position.",
        new: "New"
      },
      showcase: {
        tag1: "MorphAI 2.0", tag2: "Preview Engine",
        title: "Explore the platform",
        subtitle: "Each scan unlocks a deep breakdown — from skin vitality to proportional ratios across every facial zone.",
        metrics: "100+ data points per analysis"
      },
      steps: {
        title: "How MorphIndex works",
        subtitle: "Four steps. Repeat the cycle. Watch your index rise.",
        s1t: "Capture", s1d: "Upload a front-facing photo and a side profile.",
        s2t: "Measure", s2d: "Receive a full report across proportions, definition, traits, and vitality.",
        s3t: "Strategize", s3d: "Get a ranked list of lifestyle and clinical options tailored to your goals.",
        s4t: "Execute & Monitor", s4d: "Follow your plan, preview outcomes with MorphAI, and re-scan to measure real progress.",
        note: "Profile analysis included at no extra cost."
      },
      projection: {
        eyebrow: "Index Forecast",
        title: "Your index can grow",
        subtitle: "Incremental improvements stack up. Follow the data and watch your potential unfold.",
        current: "Current", projected: "Projected",
        cta: "View my forecast"
      },
      audience: {
        eyebrow: "Who this is for",
        title: "Not for the passive",
        p1: "Most people glance at their score and move on. The ones who actually evolve treat it as a baseline — then put in the work.",
        p2: "MorphIndex was built for that mindset."
      },
      cta: {
        title: "It all starts with one scan",
        subtitle: "Over 120,000 people already use MorphIndex. Will you be next?",
        btn: "Launch My First Scan",
        note: "Your morphology deserves better than guesswork."
      },
      footer: { careers: "Careers", privacy: "Privacy", terms: "Terms", copy: "© 2026 MorphIndex" }
    },
    fr: {
      meta: {
        title: "MorphIndex — Quantifiez votre morphologie faciale",
        description: "MorphIndex analyse votre morphologie faciale sur plus de 100 indicateurs, crée un plan d'amélioration personnalisé et suit chaque évolution dans le temps."
      },
      a11y: {
        theme: "Changer le thème",
        language: "Changer la langue",
        stars: "5 étoiles",
        prev: "Précédent",
        next: "Suivant"
      },
      nav: { benchmarks: "Références", community: "Communauté", signin: "Connexion", cta: "Commencer" },
      hero: {
        members: "membres",
        scans: "analyses",
        title: "Votre visage.<br>Cartographié. Noté. Affiné.",
        subtitle: "MorphIndex décompose votre structure faciale en plus de 100 indicateurs, vous propose un plan d'action sur mesure et suit votre évolution dans le temps.",
        cta: "Lancer mon analyse",
        link: "Découvrir le processus",
        note: "Conçu pour ceux qui veulent des progrès mesurables, pas des approximations.",
        tabFront: "Vue de face",
        tabProfile: "Vue de profil"
      },
      transform: {
        eyebrow: "La régularité paie",
        title: "Des progrès réels, documentés",
        subtitle: "Deux ans d'efforts disciplinés — chaque étape capturée en données.",
        start: "Départ",
        now: "Aujourd'hui",
        label: "Progression du score MorphIndex sur 24 mois",
        t1h: "Phase fondation", t1p: "Mois 0–8 · 8 mois",
        t2h: "Premiers changements", t2p: "Mois 8–14 · 6 mois",
        t3h: "Gains structurels", t3p: "Mois 14–26 · 12 mois",
        t4h: "Forme optimale", t4p: "Mois 26–30 · 4 mois",
        q1: "Un changement durable ne vient pas du hasard — il vient de la discipline.",
        q2: "Ceux qui progressent le plus enregistrent chaque scan, font confiance aux chiffres et suivent le plan. MorphIndex est le cadre qui les garde concentrés et en mouvement."
      },
      pillars: {
        eyebrow: "Métriques clés",
        title: "Quatre axes qui définissent votre morphologie",
        subtitle: "Chaque dimension capture une couche distincte de votre structure faciale.",
        axis1: "Axe 1", p1: "Proportions", p1d: "Équilibre et symétrie des tiers du visage",
        criteria: "critères", ratios: "ratios", signals: "signaux",
        axis2: "Axe 2", p2: "Définition", p2d: "Netteté de la mâchoire et contour osseux",
        axis3: "Axe 3", p3: "Traits", p3d: "Marqueurs morphologiques masculins et féminins",
        axis4: "Axe 4", p4: "Vitalité", p4d: "Qualité de peau, symétrie et santé des traits"
      },
      banner: "Conçu par des chercheurs pionniers de l'analyse faciale quantitative — pour tous ceux qui prennent leur morphologie au sérieux.",
      testimonials: {
        title: "Approuvé par notre communauté",
        subtitle: "Des retours honnêtes de personnes qui utilisent MorphIndex au quotidien.",
        t1: "\"MorphIndex tient exactement ses promesses — une analyse précise, sans blabla. Que vous optimisiez votre apparence ou soyez simplement curieux, c'est l'outil le plus fiable que j'aie trouvé.\"",
        t2: "\"J'avais toujours eu une vague idée de mes points faibles, mais MorphIndex a mis des chiffres dessus. Avoir des données objectives plutôt que des avis aléatoires a complètement changé ma façon de m'améliorer.\"",
        t3: "\"Mon score global était correct, mais j'avais besoin de détails sur la texture de peau et les cernes. MorphIndex est la première plateforme à m'avoir donné des retours précis et actionnables.\"",
        t4: "\"Enfin un outil qui me montre exactement où j'en suis — forces, lacunes et priorités. Ce niveau de clarté vaut à lui seul le prix.\"",
        t5: "\"La profondeur d'analyse est incomparable. Chaque scan révèle quelque chose de nouveau, et les plans personnalisés me gardent motivé semaine après semaine.\"",
        t6: "\"MorphIndex m'a donné une feuille de route complète — pas seulement des options cliniques, mais des habitudes quotidiennes qui font vraiment la différence.\"",
        t7: "\"J'ai téléchargé MorphIndex par curiosité pour mon score. Les recommandations étaient si détaillées que j'ai pris rendez-vous avec un spécialiste. L'app a vraiment changé mon approche.\""
      },
      features: {
        title: "Tout ce dont vous avez besoin, en un seul tableau de bord",
        subtitle: "Le scan n'est que le début. Suivez les tendances, prévisualisez les changements et recevez des conseils — tout au même endroit.",
        f1t: "Score MorphIndex", f1d: "Une note composite sur 4 axes avec plus de 70 ratios anatomiques.",
        f2t: "MorphAI", f2d: "Posez n'importe quelle question sur votre morphologie — des réponses instantanées de niveau expert.",
        f3t: "Aperçus visuels", f3d: "Prévisualisez les changements potentiels avant de prendre une décision.",
        f4t: "Plan d'action", f4d: "Une feuille de route étape par étape construite à partir de votre profil unique.",
        f5t: "Comparaison", f5d: "Comparez vos scans dans le temps avec des métriques détaillées.",
        f6t: "Classement", f6d: "Grimpez au classement communautaire et suivez votre position.",
        new: "Nouveau"
      },
      showcase: {
        tag1: "MorphAI 2.0", tag2: "Moteur d'aperçu",
        title: "Explorez la plateforme",
        subtitle: "Chaque scan débloque une analyse approfondie — de la vitalité de la peau aux ratios proportionnels de chaque zone faciale.",
        metrics: "Plus de 100 indicateurs par analyse"
      },
      steps: {
        title: "Comment fonctionne MorphIndex",
        subtitle: "Quatre étapes. Répétez le cycle. Regardez votre index progresser.",
        s1t: "Capturer", s1d: "Téléchargez une photo de face et une photo de profil.",
        s2t: "Mesurer", s2d: "Recevez un rapport complet sur proportions, définition, traits et vitalité.",
        s3t: "Stratégiser", s3d: "Obtenez une liste classée d'options lifestyle et cliniques adaptées à vos objectifs.",
        s4t: "Agir & Suivre", s4d: "Suivez votre plan, prévisualisez les résultats avec MorphAI et re-scannez pour mesurer vos progrès.",
        note: "L'analyse de profil est incluse sans frais supplémentaires."
      },
      projection: {
        eyebrow: "Prévision d'index",
        title: "Votre index peut progresser",
        subtitle: "Les améliorations progressives s'accumulent. Suivez les données et regardez votre potentiel se déployer.",
        current: "Actuel", projected: "Projeté",
        cta: "Voir ma prévision"
      },
      audience: {
        eyebrow: "Pour qui c'est fait",
        title: "Pas pour les passifs",
        p1: "La plupart des gens regardent leur score et passent à autre chose. Ceux qui évoluent vraiment le traitent comme une base de départ — puis font le travail.",
        p2: "MorphIndex a été conçu pour cet état d'esprit."
      },
      cta: {
        title: "Tout commence par un scan",
        subtitle: "Plus de 120 000 personnes utilisent déjà MorphIndex. Et vous ?",
        btn: "Lancer mon premier scan",
        note: "Votre morphologie mérite mieux que des suppositions."
      },
      footer: { careers: "Carrières", privacy: "Confidentialité", terms: "Conditions", copy: "© 2026 MorphIndex" }
    },
    es: {
      meta: {
        title: "MorphIndex — Cuantifica tu morfología facial",
        description: "MorphIndex mide tu morfología facial en más de 100 puntos de datos, crea un plan de mejora personalizado y registra cada cambio a lo largo del tiempo."
      },
      a11y: {
        theme: "Cambiar tema",
        language: "Cambiar idioma",
        stars: "5 estrellas",
        prev: "Anterior",
        next: "Siguiente"
      },
      nav: { benchmarks: "Referencias", community: "Comunidad", signin: "Iniciar sesión", cta: "Empezar" },
      hero: {
        members: "miembros",
        scans: "análisis",
        title: "Tu rostro.<br>Mapeado. Evaluado. Refinado.",
        subtitle: "MorphIndex descompone tu estructura facial en más de 100 puntos de datos, entrega un plan de acción personalizado y muestra cómo evolucionas con el tiempo.",
        cta: "Iniciar mi análisis",
        link: "Descubrir el proceso",
        note: "Diseñado para quienes buscan progreso medible, no suposiciones.",
        tabFront: "Vista frontal",
        tabProfile: "Vista de perfil"
      },
      transform: {
        eyebrow: "La constancia suma",
        title: "Progreso real, documentado",
        subtitle: "Dos años de esfuerzo disciplinado — cada hito capturado en datos.",
        start: "Inicio",
        now: "Ahora",
        label: "Progresión del score MorphIndex en 24 meses",
        t1h: "Fase fundacional", t1p: "Mes 0–8 · 8 meses",
        t2h: "Cambio visible", t2p: "Mes 8–14 · 6 meses",
        t3h: "Ganancias estructurales", t3p: "Mes 14–26 · 12 meses",
        t4h: "Forma máxima", t4p: "Mes 26–30 · 4 meses",
        q1: "El cambio duradero no viene de la suerte — viene de la disciplina.",
        q2: "Quienes más mejoran registran cada escaneo, confían en los números y siguen el plan. MorphIndex es el marco que los mantiene enfocados y avanzando."
      },
      pillars: {
        eyebrow: "Métricas clave",
        title: "Cuatro ejes que definen tu morfología",
        subtitle: "Cada dimensión captura una capa distinta de tu estructura facial.",
        axis1: "Eje 1", p1: "Proporciones", p1d: "Equilibrio y simetría de los tercios faciales",
        criteria: "criterios", ratios: "ratios", signals: "señales",
        axis2: "Eje 2", p2: "Definición", p2d: "Nitidez de mandíbula y contorno óseo",
        axis3: "Eje 3", p3: "Rasgos", p3d: "Marcadores morfológicos masculinos y femeninos",
        axis4: "Eje 4", p4: "Vitalidad", p4d: "Calidad de piel, simetría y salud de rasgos"
      },
      banner: "Diseñado por investigadores pioneros en análisis facial cuantitativo — para quienes se toman su morfología en serio.",
      testimonials: {
        title: "Respaldado por nuestra comunidad",
        subtitle: "Opiniones honestas de personas que usan MorphIndex a diario.",
        t1: "\"MorphIndex cumple exactamente lo que promete — análisis preciso, sin relleno. Ya sea que optimices tu apariencia o solo tengas curiosidad, es la herramienta más fiable que he encontrado.\"",
        t2: "\"Siempre tuve una idea vaga de mis puntos débiles, pero MorphIndex les puso números. Tener datos objetivos en lugar de opiniones al azar cambió por completo mi forma de mejorar.\"",
        t3: "\"Mi puntuación general era decente, pero necesitaba detalles sobre textura de piel y ojeras. MorphIndex fue la primera plataforma en darme feedback preciso y accionable.\"",
        t4: "\"Por fin una herramienta que me muestra exactamente dónde estoy — fortalezas, carencias y prioridades. Ese nivel de claridad ya vale la pena.\"",
        t5: "\"La profundidad del análisis es otro nivel. Cada escaneo revela algo nuevo, y los planes personalizados me mantienen responsable semana tras semana.\"",
        t6: "\"MorphIndex me dio una hoja de ruta completa — no solo opciones clínicas, sino hábitos diarios que realmente marcan la diferencia.\"",
        t7: "\"Descargué MorphIndex por curiosidad sobre mi puntuación. Las recomendaciones fueron tan detalladas que pedí cita con un especialista. La app cambió genuinamente mi enfoque.\""
      },
      features: {
        title: "Todo lo que necesitas en un solo panel",
        subtitle: "El escaneo es solo el comienzo. Monitoriza tendencias, previsualiza cambios y recibe orientación — todo en un lugar.",
        f1t: "Score MorphIndex", f1d: "Una calificación compuesta en 4 ejes con más de 70 ratios anatómicos.",
        f2t: "MorphAI", f2d: "Pregunta lo que quieras sobre tu morfología — respuestas instantáneas de nivel experto.",
        f3t: "Vistas previas", f3d: "Previsualiza cambios potenciales antes de tomar cualquier decisión.",
        f4t: "Plan de acción", f4d: "Una hoja de ruta paso a paso construida desde tu perfil único.",
        f5t: "Comparación", f5d: "Compara escaneos en el tiempo con desgloses detallados de métricas.",
        f6t: "Ranking", f6d: "Sube en el ranking de la comunidad y sigue tu posición.",
        new: "Nuevo"
      },
      showcase: {
        tag1: "MorphAI 2.0", tag2: "Motor de vista previa",
        title: "Explora la plataforma",
        subtitle: "Cada escaneo desbloquea un análisis profundo — desde vitalidad de piel hasta ratios proporcionales en cada zona facial.",
        metrics: "Más de 100 puntos de datos por análisis"
      },
      steps: {
        title: "Cómo funciona MorphIndex",
        subtitle: "Cuatro pasos. Repite el ciclo. Observa cómo sube tu índice.",
        s1t: "Capturar", s1d: "Sube una foto de frente y una de perfil.",
        s2t: "Medir", s2d: "Recibe un informe completo sobre proporciones, definición, rasgos y vitalidad.",
        s3t: "Estrategizar", s3d: "Obtén una lista clasificada de opciones de estilo de vida y clínicas adaptadas a tus objetivos.",
        s4t: "Ejecutar y monitorizar", s4d: "Sigue tu plan, previsualiza resultados con MorphAI y vuelve a escanear para medir el progreso real.",
        note: "El análisis de perfil está incluido sin coste adicional."
      },
      projection: {
        eyebrow: "Previsión de índice",
        title: "Tu índice puede crecer",
        subtitle: "Las mejoras incrementales se acumulan. Sigue los datos y observa cómo se despliega tu potencial.",
        current: "Actual", projected: "Proyectado",
        cta: "Ver mi previsión"
      },
      audience: {
        eyebrow: "Para quién es",
        title: "No es para pasivos",
        p1: "La mayoría mira su puntuación y sigue adelante. Quienes realmente evolucionan la tratan como punto de partida — y luego hacen el trabajo.",
        p2: "MorphIndex fue creado para esa mentalidad."
      },
      cta: {
        title: "Todo empieza con un escaneo",
        subtitle: "Más de 120.000 personas ya usan MorphIndex. ¿Serás el siguiente?",
        btn: "Lanzar mi primer escaneo",
        note: "Tu morfología merece algo mejor que suposiciones."
      },
      footer: { careers: "Empleo", privacy: "Privacidad", terms: "Términos", copy: "© 2026 MorphIndex" }
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

    document.title = dict.meta.title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", dict.meta.description);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = get(dict, key);
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      var val = get(dict, key);
      if (val != null) el.innerHTML = val;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      var val = get(dict, key);
      if (val != null) el.setAttribute("aria-label", val);
    });
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

  window.MorphI18n = { setLang: setLang, getLang: getLang };

  document.addEventListener("DOMContentLoaded", function () {
    setLang(getLang());
    initLangSwitcher();
  });
})();
