(function () {
  var LANGS = ["en", "fr", "es"];
  var LANG_LABELS = { en: "EN", fr: "FR", es: "ES" };

  var T = {
    en: {
      meta: {
        title: "MorphIndex — Morphology Analytics Platform",
        description: "MorphIndex is a morphology analytics platform — structured facial metrics, personalized protocols, and longitudinal tracking."
      },
      a11y: { theme: "Toggle theme", language: "Change language", stars: "5 stars", prev: "Previous", next: "Next" },
      nav: { metrics: "Metrics", platform: "Platform", signin: "Sign In", cta: "Open dashboard" },
      hero: {
        badge: "Facial analysis",
        title: 'Your appearance.<br><span class="hero__title-punch">Measured.</span><br><span class="hero__title-punch">Tracked.</span><br><span class="hero__title-punch hero__title-punch--accent">Improved.</span>',
        subtitle: "Analyze your face across 100+ criteria, get a personalized plan, and track your progress over time.",
        cta: "Start first session",
        link: "See how it works",
        note: "No vanity score. Just measurable change over time.",
        videoLabel: "Product walkthrough — video coming soon",
        videoCaption: "A preview of the MorphIndex analytics workspace"
      },
      steps: {
        eyebrow: "Workflow",
        title: "A repeatable analysis cycle",
        subtitle: "Capture, quantify, prioritize, and re-measure — each loop refines your morphology profile.",
        s1t: "Ingest", s1d: "Submit frontal and lateral captures. MorphIndex normalizes lighting and alignment automatically.",
        s2t: "Quantify", s2d: "Symmetry, Proportions, Structure, and Expression axes are scored independently, then synthesized.",
        s3t: "Protocol", s3d: "Interventions and habits are ranked by projected impact on your weakest metrics.",
        s4t: "Track", s4d: "Re-run the cycle, compare sessions, and let MorphAI answer protocol questions along the way.",
        note: "Lateral capture analysis included with every session."
      },
      pillars: {
        eyebrow: "Analysis axes",
        title: "Four independent measurement axes",
        subtitle: "Unlike a single beauty score, MorphIndex breaks morphology into measurable subsystems you can track over time.",
        axis1: "Axis 01", p1: "Symmetry", p1d: "Bilateral balance, feature alignment, and mirror-line deviation",
        criteria: "criteria", ratios: "ratios", signals: "signals", markers: "markers",
        axis2: "Axis 02", p2: "Proportions", p2d: "Facial thirds, inter-feature spacing, and golden-ratio markers",
        axis3: "Axis 03", p3: "Structure", p3d: "Mandibular line, zygomatic projection, and skeletal visibility",
        axis4: "Axis 04", p4: "Expression", p4d: "Trait dynamics, soft-tissue markers, and sex-specific morphology"
      },
      banner: "MorphIndex applies quantitative morphology research to everyday self-optimization — structured, repeatable, evidence-based.",
      testimonials: {
        title: "From the community",
        subtitle: "Notes from members who run regular analysis cycles.",
        t1: "\"Finally a tool that treats my face like a dataset. The axis breakdowns are what sold me — not another single vanity score.\"",
        t2: "\"I stopped guessing which habits mattered. MorphIndex ranked interventions by metric impact, and the index actually moved.\"",
        t3: "\"Symmetry axis detail on alignment and bilateral balance was more precise than anything I'd tried before.\"",
        t4: "\"Session compare alone is worth it. I can see exactly which metrics shifted after each protocol change.\""
      },
      features: {
        title: "Platform modules",
        subtitle: "Everything lives in one morphology workspace — no switching between tools.",
        f1t: "Composite Index", f1d: "Weighted synthesis across all four axes.",
        f2t: "MorphAI", f2d: "Query your morphology data in natural language.",
        f3t: "Morph Preview", f3d: "Model projected outcomes before committing to a protocol step.",
        f4t: "Protocol Builder", f4d: "Auto-generated intervention sequences ranked by metric impact.",
        f5t: "Session Compare", f5d: "Diff any two scans at the metric level.",
        f6t: "Cohort Benchmarks", f6d: "See how your index compares within anonymized cohorts.",
        new: "Beta"
      },
      showcase: {
        tag1: "MorphAI", tag2: "Preview engine",
        title: "Granular by design",
        subtitle: "Every session produces axis-level breakdowns, zone maps, and protocol suggestions — not a single opaque number.",
        l1: "Per-zone ratio tables", l2: "Axis trend lines across sessions", l3: "Impact-ranked protocol steps",
        metrics: "4 sessions over 16 months"
      },
      transform: {
        eyebrow: "Session history",
        title: "See change unfold over time",
        subtitle: "Each re-scan adds a data point to your morphology timeline — not a single score comparison.",
        s1d: "Mar 2024", s1h: "Baseline capture", s1p: "Initial profile established across all four axes.", s1m: "Composite 62",
        s2d: "Aug 2024", s2h: "Protocol adjusted", s2p: "Structure and Proportions targeted after first review.", s2m: "Structure +4",
        s3d: "Feb 2025", s3h: "Mid-cycle scan", s3p: "Symmetry and Expression show measurable drift.", s3m: "Symmetry +3",
        s4d: "Jul 2025", s4h: "Latest session", s4p: "Fourth scan confirms sustained axis convergence.", s4m: "Composite 74",
        start: "Session 1", now: "Session 8",
        q1: "The clearest trajectories come from regular re-scans — not from chasing a single number."
      },
      audience: {
        eyebrow: "Who it's for",
        title: "Analysts, not spectators",
        p1: "MorphIndex is for people who treat facial morphology as a dataset — something to measure, intervene on, and re-measure."
      },
      cta: {
        title: "Open your morphology workspace",
        subtitle: "Two photos. Four axes. A timeline that grows with you.",
        btn: "Start first session",
        note: "Free lateral analysis included."
      },
      footer: { careers: "Careers", privacy: "Privacy", terms: "Terms", copy: "© 2026 MorphIndex" }
    },
    fr: {
      meta: {
        title: "MorphIndex — Plateforme d'analyse morphologique",
        description: "MorphIndex est une plateforme d'analyse morphologique — métriques faciales structurées, protocoles personnalisés et suivi longitudinal."
      },
      a11y: { theme: "Changer le thème", language: "Changer la langue", stars: "5 étoiles", prev: "Précédent", next: "Suivant" },
      nav: { metrics: "Métriques", platform: "Plateforme", signin: "Connexion", cta: "Ouvrir le tableau de bord" },
      hero: {
        badge: "Analyse faciale",
        title: 'Votre apparence.<br><span class="hero__title-punch">Mesurée.</span><br><span class="hero__title-punch">Suivie.</span><br><span class="hero__title-punch hero__title-punch--accent">Améliorée.</span>',
        subtitle: "Analysez votre visage selon plus de 100 critères, obtenez un plan personnalisé et suivez vos progrès au fil du temps.",
        cta: "Démarrer ma première session",
        link: "Voir comment ça marche",
        note: "Pas de score vanité. Juste des changements mesurables dans le temps.",
        videoLabel: "Démo produit — vidéo bientôt disponible",
        videoCaption: "Un aperçu de l'espace d'analyse MorphIndex"
      },
      steps: {
        eyebrow: "Workflow",
        title: "Un cycle d'analyse reproductible",
        subtitle: "Capturer, quantifier, prioriser et re-mesurer — chaque boucle affine votre profil morphologique.",
        s1t: "Ingérer", s1d: "Soumettez des captures frontale et latérale. MorphIndex normalise automatiquement l'éclairage et l'alignement.",
        s2t: "Quantifier", s2d: "Les axes Symétrie, Proportions, Structure et Expression sont notés indépendamment, puis synthétisés.",
        s3t: "Protocole", s3d: "Les interventions et habitudes sont classées par impact projeté sur vos métriques les plus faibles.",
        s4t: "Suivre", s4d: "Relancez le cycle, comparez les sessions et laissez MorphAI répondre à vos questions de protocole.",
        note: "Analyse de capture latérale incluse à chaque session."
      },
      pillars: {
        eyebrow: "Axes d'analyse",
        title: "Quatre axes de mesure indépendants",
        subtitle: "Contrairement à un score beauté unique, MorphIndex décompose la morphologie en sous-systèmes mesurables que vous pouvez suivre dans le temps.",
        axis1: "Axe 01", p1: "Symétrie", p1d: "Équilibre bilatéral, alignement des traits et déviation de la ligne médiane",
        criteria: "critères", ratios: "ratios", signals: "signaux", markers: "marqueurs",
        axis2: "Axe 02", p2: "Proportions", p2d: "Tiers du visage, espacements inter-traits et marqueurs du nombre d'or",
        axis3: "Axe 03", p3: "Structure", p3d: "Ligne mandibulaire, projection zygomatique et visibilité osseuse",
        axis4: "Axe 04", p4: "Expression", p4d: "Dynamique des traits, marqueurs des tissus mous et morphologie spécifique au sexe"
      },
      banner: "MorphIndex applique la recherche en morphologie quantitative à l'auto-optimisation quotidienne — structurée, reproductible, fondée sur les données.",
      testimonials: {
        title: "De la communauté",
        subtitle: "Retours de membres qui effectuent des cycles d'analyse réguliers.",
        t1: "\"Enfin un outil qui traite mon visage comme un jeu de données. Les décompositions par axe m'ont convaincu — pas un autre score vanité unique.\"",
        t2: "\"J'ai arrêté de deviner quelles habitudes comptaient. MorphIndex a classé les interventions par impact métrique, et l'index a vraiment bougé.\"",
        t3: "\"Le détail de l'axe Symétrie sur l'alignement et l'équilibre bilatéral était plus précis que tout ce que j'avais testé.\"",
        t4: "\"La comparaison de sessions à elle seule vaut le coup. Je vois exactement quelles métriques ont changé après chaque modification de protocole.\""
      },
      features: {
        title: "Modules de la plateforme",
        subtitle: "Tout vit dans un seul espace morphologique — pas besoin de changer d'outil.",
        f1t: "Index composite", f1d: "Synthèse pondérée sur les quatre axes.",
        f2t: "MorphAI", f2d: "Interrogez vos données morphologiques en langage naturel.",
        f3t: "Aperçu Morph", f3d: "Modélisez les résultats projetés avant de valider une étape de protocole.",
        f4t: "Constructeur de protocole", f4d: "Séquences d'intervention auto-générées classées par impact métrique.",
        f5t: "Comparaison de sessions", f5d: "Comparez deux scans au niveau métrique.",
        f6t: "Benchmarks de cohorte", f6d: "Voyez comment votre index se situe dans des cohortes anonymisées.",
        new: "Bêta"
      },
      showcase: {
        tag1: "MorphAI", tag2: "Moteur d'aperçu",
        title: "Granulaire par conception",
        subtitle: "Chaque session produit des décompositions par axe, des cartes de zones et des suggestions de protocole — pas un chiffre opaque.",
        l1: "Tableaux de ratios par zone", l2: "Courbes de tendance par axe", l3: "Étapes de protocole classées par impact",
        metrics: "4 sessions sur 16 mois"
      },
      transform: {
        eyebrow: "Historique des sessions",
        title: "Voir l'évolution se déployer dans le temps",
        subtitle: "Chaque re-scan ajoute un point de données à votre timeline morphologique — pas une simple comparaison de score.",
        s1d: "Mars 2024", s1h: "Capture initiale", s1p: "Profil initial établi sur les quatre axes.", s1m: "Composite 62",
        s2d: "Août 2024", s2h: "Protocole ajusté", s2p: "Structure et Proportions ciblées après la première revue.", s2m: "Structure +4",
        s3d: "Fév. 2025", s3h: "Scan mi-parcours", s3p: "Symétrie et Expression montrent une dérive mesurable.", s3m: "Symétrie +3",
        s4d: "Juil. 2025", s4h: "Dernière session", s4p: "Le quatrième scan confirme une convergence soutenue des axes.", s4m: "Composite 74",
        start: "Session 1", now: "Session 8",
        q1: "Les trajectoires les plus claires viennent de re-scans réguliers — pas de la course à un seul chiffre."
      },
      audience: {
        eyebrow: "Pour qui",
        title: "Des analystes, pas des spectateurs",
        p1: "MorphIndex s'adresse à ceux qui traitent la morphologie faciale comme un jeu de données — quelque chose à mesurer, intervenir et re-mesurer."
      },
      cta: {
        title: "Ouvrez votre espace morphologique",
        subtitle: "Deux photos. Quatre axes. Une timeline qui grandit avec vous.",
        btn: "Démarrer ma première session",
        note: "Analyse latérale gratuite incluse."
      },
      footer: { careers: "Carrières", privacy: "Confidentialité", terms: "Conditions", copy: "© 2026 MorphIndex" }
    },
    es: {
      meta: {
        title: "MorphIndex — Plataforma de análisis morfológico",
        description: "MorphIndex es una plataforma de análisis morfológico — métricas faciales estructuradas, protocolos personalizados y seguimiento longitudinal."
      },
      a11y: { theme: "Cambiar tema", language: "Cambiar idioma", stars: "5 estrellas", prev: "Anterior", next: "Siguiente" },
      nav: { metrics: "Métricas", platform: "Plataforma", signin: "Iniciar sesión", cta: "Abrir panel" },
      hero: {
        badge: "Análisis facial",
        title: 'Tu apariencia.<br><span class="hero__title-punch">Medida.</span><br><span class="hero__title-punch">Seguida.</span><br><span class="hero__title-punch hero__title-punch--accent">Mejorada.</span>',
        subtitle: "Analiza tu rostro según más de 100 criterios, obtén un plan personalizado y sigue tu progreso con el tiempo.",
        cta: "Iniciar primera sesión",
        link: "Ver cómo funciona",
        note: "Sin puntuación vanidad. Solo cambios medibles en el tiempo.",
        videoLabel: "Demo del producto — vídeo próximamente",
        videoCaption: "Una vista previa del espacio de análisis MorphIndex"
      },
      steps: {
        eyebrow: "Flujo de trabajo",
        title: "Un ciclo de análisis repetible",
        subtitle: "Capturar, cuantificar, priorizar y re-medir — cada ciclo refina tu perfil morfológico.",
        s1t: "Ingestar", s1d: "Envía capturas frontal y lateral. MorphIndex normaliza iluminación y alineación automáticamente.",
        s2t: "Cuantificar", s2d: "Los ejes Simetría, Proporciones, Estructura y Expresión se puntúan de forma independiente y luego se sintetizan.",
        s3t: "Protocolo", s3d: "Las intervenciones y hábitos se clasifican por impacto proyectado en tus métricas más débiles.",
        s4t: "Rastrear", s4d: "Repite el ciclo, compara sesiones y deja que MorphAI responda preguntas de protocolo.",
        note: "Análisis de captura lateral incluido en cada sesión."
      },
      pillars: {
        eyebrow: "Ejes de análisis",
        title: "Cuatro ejes de medición independientes",
        subtitle: "A diferencia de una puntuación de belleza única, MorphIndex descompone la morfología en subsistemas medibles que puedes seguir en el tiempo.",
        axis1: "Eje 01", p1: "Simetría", p1d: "Equilibrio bilateral, alineación de rasgos y desviación de la línea media",
        criteria: "criterios", ratios: "ratios", signals: "señales", markers: "marcadores",
        axis2: "Eje 02", p2: "Proporciones", p2d: "Tercios faciales, espaciado inter-rasgos y marcadores de proporción áurea",
        axis3: "Eje 03", p3: "Estructura", p3d: "Línea mandibular, proyección cigomática y visibilidad ósea",
        axis4: "Eje 04", p4: "Expresión", p4d: "Dinámica de rasgos, marcadores de tejidos blandos y morfología específica de sexo"
      },
      banner: "MorphIndex aplica investigación en morfología cuantitativa a la auto-optimización diaria — estructurada, repetible y basada en evidencia.",
      testimonials: {
        title: "De la comunidad",
        subtitle: "Notas de miembros que ejecutan ciclos de análisis regulares.",
        t1: "\"Por fin una herramienta que trata mi rostro como un dataset. Las descomposiciones por eje me convencieron — no otra puntuación vanidad única.\"",
        t2: "\"Dejé de adivinar qué hábitos importaban. MorphIndex clasificó intervenciones por impacto métrico, y el índice realmente se movió.\"",
        t3: "\"El detalle del eje Simetría en alineación y equilibrio bilateral fue más preciso que cualquier cosa que hubiera probado.\"",
        t4: "\"La comparación de sesiones sola vale la pena. Veo exactamente qué métricas cambiaron tras cada modificación de protocolo.\""
      },
      features: {
        title: "Módulos de la plataforma",
        subtitle: "Todo vive en un solo espacio morfológico — sin cambiar de herramienta.",
        f1t: "Índice compuesto", f1d: "Síntesis ponderada en los cuatro ejes.",
        f2t: "MorphAI", f2d: "Consulta tus datos morfológicos en lenguaje natural.",
        f3t: "Vista previa Morph", f3d: "Modela resultados proyectados antes de comprometerte con un paso de protocolo.",
        f4t: "Constructor de protocolo", f4d: "Secuencias de intervención auto-generadas clasificadas por impacto métrico.",
        f5t: "Comparar sesiones", f5d: "Compara dos escaneos a nivel métrico.",
        f6t: "Benchmarks de cohorte", f6d: "Mira cómo se compara tu índice en cohortes anonimizadas.",
        new: "Beta"
      },
      showcase: {
        tag1: "MorphAI", tag2: "Motor de vista previa",
        title: "Granular por diseño",
        subtitle: "Cada sesión produce desgloses por eje, mapas de zonas y sugerencias de protocolo — no un número opaco.",
        l1: "Tablas de ratios por zona", l2: "Líneas de tendencia por eje", l3: "Pasos de protocolo clasificados por impacto",
        metrics: "4 sesiones en 16 meses"
      },
      transform: {
        eyebrow: "Historial de sesiones",
        title: "Ver el cambio desplegarse en el tiempo",
        subtitle: "Cada re-escaneo añade un punto de datos a tu timeline morfológica — no una simple comparación de puntuación.",
        s1d: "Mar 2024", s1h: "Captura inicial", s1p: "Perfil inicial establecido en los cuatro ejes.", s1m: "Compuesto 62",
        s2d: "Ago 2024", s2h: "Protocolo ajustado", s2p: "Estructura y Proporciones objetivo tras la primera revisión.", s2m: "Estructura +4",
        s3d: "Feb 2025", s3h: "Escaneo a mitad de ciclo", s3p: "Simetría y Expresión muestran deriva medible.", s3m: "Simetría +3",
        s4d: "Jul 2025", s4h: "Última sesión", s4p: "El cuarto escaneo confirma convergencia sostenida de ejes.", s4m: "Compuesto 74",
        start: "Sesión 1", now: "Sesión 8",
        q1: "Las trayectorias más claras vienen de re-escaneos regulares — no de perseguir un solo número."
      },
      audience: {
        eyebrow: "Para quién",
        title: "Analistas, no espectadores",
        p1: "MorphIndex es para quienes tratan la morfología facial como un dataset — algo que medir, intervenir y re-medir."
      },
      cta: {
        title: "Abre tu espacio morfológico",
        subtitle: "Dos fotos. Cuatro ejes. Una timeline que crece contigo.",
        btn: "Iniciar primera sesión",
        note: "Análisis lateral gratuito incluido."
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
    if (window.MorphStats) window.MorphStats.refresh();
  }

  function applyLang(lang) {
    var dict = T[lang];
    if (!dict) return;
    document.title = dict.meta.title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", dict.meta.description);
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
