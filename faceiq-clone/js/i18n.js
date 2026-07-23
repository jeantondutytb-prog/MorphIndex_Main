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
        badge: "Morphology analytics",
        title: "Facial structure,<br>measured like data.",
        subtitle: "MorphIndex converts two photos into a structured morphology report — metrics, protocols, and longitudinal tracking in one analytics workspace.",
        cta: "Generate my report",
        link: "View workflow",
        stat1l: "Variables tracked", stat2l: "Analysis layers", stat3l: "Active profiles",
        panelLabel: "Live morphology index", panelNote: "Last scan · 3 days ago"
      },
      steps: {
        eyebrow: "Workflow",
        title: "A repeatable analysis cycle",
        subtitle: "Capture, quantify, prioritize, and re-measure — each loop refines your morphology profile.",
        s1t: "Ingest", s1d: "Submit frontal and lateral captures. MorphIndex normalizes lighting and alignment automatically.",
        s2t: "Quantify", s2d: "Surface, balance, contour, and profile layers are scored independently, then synthesized.",
        s3t: "Protocol", s3d: "Interventions and habits are ranked by projected impact on your weakest metrics.",
        s4t: "Track", s4d: "Re-run the cycle, compare sessions, and let MorphAI answer protocol questions along the way.",
        note: "Lateral capture analysis included with every session."
      },
      pillars: {
        eyebrow: "Index layers",
        title: "Four independent scoring layers",
        subtitle: "Unlike a single beauty score, MorphIndex breaks morphology into measurable subsystems.",
        axis1: "Layer 01", p1: "Surface", p1d: "Skin quality, periorbital volume, and feature vitality markers",
        criteria: "criteria", ratios: "ratios", signals: "signals", markers: "markers",
        axis2: "Layer 02", p2: "Balance", p2d: "Facial thirds, inter-feature spacing, and bilateral symmetry",
        axis3: "Layer 03", p3: "Contour", p3d: "Mandibular line, zygomatic projection, and skeletal visibility",
        axis4: "Layer 04", p4: "Profile", p4d: "Sex-specific morphological markers and trait expression"
      },
      banner: "MorphIndex applies quantitative morphology research to everyday self-optimization — structured, repeatable, evidence-based.",
      testimonials: {
        title: "From the community",
        subtitle: "Notes from members who run regular analysis cycles.",
        t1: "\"Finally a tool that treats my face like a dataset. The layer breakdowns are what sold me — not another single vanity score.\"",
        t2: "\"I stopped guessing which habits mattered. MorphIndex ranked interventions by metric impact, and the index actually moved.\"",
        t3: "\"Surface layer detail on texture and periorbital volume was more precise than anything I'd tried before.\"",
        t4: "\"Session compare alone is worth it. I can see exactly which metrics shifted after each protocol change.\""
      },
      features: {
        title: "Platform modules",
        subtitle: "Everything lives in one morphology workspace — no switching between tools.",
        f1t: "Composite Index", f1d: "Weighted synthesis across all four layers.",
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
        subtitle: "Every session produces layer-level breakdowns, zone maps, and protocol suggestions — not a single opaque number.",
        l1: "Per-zone ratio tables", l2: "Layer trend lines across sessions", l3: "Impact-ranked protocol steps",
        metrics: "Index 62 → 74 over 18 months"
      },
      transform: {
        eyebrow: "Longitudinal data",
        title: "Protocols that move the index",
        subtitle: "Members who follow structured protocols see measurable layer shifts — not overnight, but consistently.",
        start: "Session 1", now: "Session 8", unit: "index points",
        t1h: "Protocol setup", t1p: "Months 1–6",
        t2h: "Metric response", t2p: "Months 6–12",
        t3h: "Layer convergence", t3p: "Months 12–18",
        t4h: "Stable plateau", t4p: "Months 18+",
        q1: "The index rewards consistency, not shortcuts. Members who re-scan on schedule see the clearest trajectories."
      },
      audience: {
        eyebrow: "Who it's for",
        title: "Analysts, not spectators",
        p1: "MorphIndex is for people who treat facial morphology as a dataset — something to measure, intervene on, and re-measure."
      },
      cta: {
        title: "Start with a morphology report",
        subtitle: "Two photos. Four layers. One structured index.",
        btn: "Generate report",
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
        badge: "Analyse morphologique",
        title: "Structure faciale,<br>mesurée comme une donnée.",
        subtitle: "MorphIndex convertit deux photos en rapport morphologique structuré — métriques, protocoles et suivi longitudinal dans un seul espace d'analyse.",
        cta: "Générer mon rapport",
        link: "Voir le workflow",
        stat1l: "Variables suivies", stat2l: "Couches d'analyse", stat3l: "Profils actifs",
        panelLabel: "Index morphologique en direct", panelNote: "Dernier scan · il y a 3 jours"
      },
      steps: {
        eyebrow: "Workflow",
        title: "Un cycle d'analyse reproductible",
        subtitle: "Capturer, quantifier, prioriser et re-mesurer — chaque boucle affine votre profil morphologique.",
        s1t: "Ingérer", s1d: "Soumettez des captures frontale et latérale. MorphIndex normalise automatiquement l'éclairage et l'alignement.",
        s2t: "Quantifier", s2d: "Les couches surface, équilibre, contour et profil sont notées indépendamment, puis synthétisées.",
        s3t: "Protocole", s3d: "Les interventions et habitudes sont classées par impact projeté sur vos métriques les plus faibles.",
        s4t: "Suivre", s4d: "Relancez le cycle, comparez les sessions et laissez MorphAI répondre à vos questions de protocole.",
        note: "Analyse de capture latérale incluse à chaque session."
      },
      pillars: {
        eyebrow: "Couches d'index",
        title: "Quatre couches de notation indépendantes",
        subtitle: "Contrairement à un score beauté unique, MorphIndex décompose la morphologie en sous-systèmes mesurables.",
        axis1: "Couche 01", p1: "Surface", p1d: "Qualité de peau, volume périorbitaire et marqueurs de vitalité des traits",
        criteria: "critères", ratios: "ratios", signals: "signaux", markers: "marqueurs",
        axis2: "Couche 02", p2: "Équilibre", p2d: "Tiers du visage, espacements inter-traits et symétrie bilatérale",
        axis3: "Couche 03", p3: "Contour", p3d: "Ligne mandibulaire, projection zygomatique et visibilité osseuse",
        axis4: "Couche 04", p4: "Profil", p4d: "Marqueurs morphologiques spécifiques au sexe et expression des traits"
      },
      banner: "MorphIndex applique la recherche en morphologie quantitative à l'auto-optimisation quotidienne — structurée, reproductible, fondée sur les données.",
      testimonials: {
        title: "De la communauté",
        subtitle: "Retours de membres qui effectuent des cycles d'analyse réguliers.",
        t1: "\"Enfin un outil qui traite mon visage comme un jeu de données. Les décompositions par couche m'ont convaincu — pas un autre score vanité unique.\"",
        t2: "\"J'ai arrêté de deviner quelles habitudes comptaient. MorphIndex a classé les interventions par impact métrique, et l'index a vraiment bougé.\"",
        t3: "\"Le détail de la couche surface sur la texture et le volume périorbitaire était plus précis que tout ce que j'avais testé.\"",
        t4: "\"La comparaison de sessions à elle seule vaut le coup. Je vois exactement quelles métriques ont changé après chaque modification de protocole.\""
      },
      features: {
        title: "Modules de la plateforme",
        subtitle: "Tout vit dans un seul espace morphologique — pas besoin de changer d'outil.",
        f1t: "Index composite", f1d: "Synthèse pondérée sur les quatre couches.",
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
        subtitle: "Chaque session produit des décompositions par couche, des cartes de zones et des suggestions de protocole — pas un chiffre opaque.",
        l1: "Tableaux de ratios par zone", l2: "Courbes de tendance par couche", l3: "Étapes de protocole classées par impact",
        metrics: "Index 62 → 74 sur 18 mois"
      },
      transform: {
        eyebrow: "Données longitudinales",
        title: "Des protocoles qui font bouger l'index",
        subtitle: "Les membres qui suivent des protocoles structurés voient des décalages mesurables par couche — pas du jour au lendemain, mais de façon constante.",
        start: "Session 1", now: "Session 8", unit: "points d'index",
        t1h: "Mise en place du protocole", t1p: "Mois 1–6",
        t2h: "Réponse métrique", t2p: "Mois 6–12",
        t3h: "Convergence des couches", t3p: "Mois 12–18",
        t4h: "Plateau stable", t4p: "Mois 18+",
        q1: "L'index récompense la constance, pas les raccourcis. Les membres qui re-scannent régulièrement voient les trajectoires les plus claires."
      },
      audience: {
        eyebrow: "Pour qui",
        title: "Des analystes, pas des spectateurs",
        p1: "MorphIndex s'adresse à ceux qui traitent la morphologie faciale comme un jeu de données — quelque chose à mesurer, intervenir et re-mesurer."
      },
      cta: {
        title: "Commencez par un rapport morphologique",
        subtitle: "Deux photos. Quatre couches. Un index structuré.",
        btn: "Générer le rapport",
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
        badge: "Análisis morfológico",
        title: "Estructura facial,<br>medida como un dato.",
        subtitle: "MorphIndex convierte dos fotos en un informe morfológico estructurado — métricas, protocolos y seguimiento longitudinal en un solo espacio de análisis.",
        cta: "Generar mi informe",
        link: "Ver flujo de trabajo",
        stat1l: "Variables rastreadas", stat2l: "Capas de análisis", stat3l: "Perfiles activos",
        panelLabel: "Índice morfológico en vivo", panelNote: "Último escaneo · hace 3 días"
      },
      steps: {
        eyebrow: "Flujo de trabajo",
        title: "Un ciclo de análisis repetible",
        subtitle: "Capturar, cuantificar, priorizar y re-medir — cada ciclo refina tu perfil morfológico.",
        s1t: "Ingestar", s1d: "Envía capturas frontal y lateral. MorphIndex normaliza iluminación y alineación automáticamente.",
        s2t: "Cuantificar", s2d: "Las capas superficie, equilibrio, contorno y perfil se puntúan de forma independiente y luego se sintetizan.",
        s3t: "Protocolo", s3d: "Las intervenciones y hábitos se clasifican por impacto proyectado en tus métricas más débiles.",
        s4t: "Rastrear", s4d: "Repite el ciclo, compara sesiones y deja que MorphAI responda preguntas de protocolo.",
        note: "Análisis de captura lateral incluido en cada sesión."
      },
      pillars: {
        eyebrow: "Capas de índice",
        title: "Cuatro capas de puntuación independientes",
        subtitle: "A diferencia de una puntuación de belleza única, MorphIndex descompone la morfología en subsistemas medibles.",
        axis1: "Capa 01", p1: "Superficie", p1d: "Calidad de piel, volumen periorbitario y marcadores de vitalidad",
        criteria: "criterios", ratios: "ratios", signals: "señales", markers: "marcadores",
        axis2: "Capa 02", p2: "Equilibrio", p2d: "Tercios faciales, espaciado inter-rasgos y simetría bilateral",
        axis3: "Capa 03", p3: "Contorno", p3d: "Línea mandibular, proyección cigomática y visibilidad ósea",
        axis4: "Capa 04", p4: "Perfil", p4d: "Marcadores morfológicos específicos de sexo y expresión de rasgos"
      },
      banner: "MorphIndex aplica investigación en morfología cuantitativa a la auto-optimización diaria — estructurada, repetible y basada en evidencia.",
      testimonials: {
        title: "De la comunidad",
        subtitle: "Notas de miembros que ejecutan ciclos de análisis regulares.",
        t1: "\"Por fin una herramienta que trata mi rostro como un dataset. Las descomposiciones por capa me convencieron — no otra puntuación vanidad única.\"",
        t2: "\"Dejé de adivinar qué hábitos importaban. MorphIndex clasificó intervenciones por impacto métrico, y el índice realmente se movió.\"",
        t3: "\"El detalle de la capa superficie en textura y volumen periorbitario fue más preciso que cualquier cosa que hubiera probado.\"",
        t4: "\"La comparación de sesiones sola vale la pena. Veo exactamente qué métricas cambiaron tras cada modificación de protocolo.\""
      },
      features: {
        title: "Módulos de la plataforma",
        subtitle: "Todo vive en un solo espacio morfológico — sin cambiar de herramienta.",
        f1t: "Índice compuesto", f1d: "Síntesis ponderada en las cuatro capas.",
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
        subtitle: "Cada sesión produce desgloses por capa, mapas de zonas y sugerencias de protocolo — no un número opaco.",
        l1: "Tablas de ratios por zona", l2: "Líneas de tendencia por capa", l3: "Pasos de protocolo clasificados por impacto",
        metrics: "Índice 62 → 74 en 18 meses"
      },
      transform: {
        eyebrow: "Datos longitudinales",
        title: "Protocolos que mueven el índice",
        subtitle: "Los miembros que siguen protocolos estructurados ven cambios medibles por capa — no de la noche a la mañana, pero de forma constante.",
        start: "Sesión 1", now: "Sesión 8", unit: "puntos de índice",
        t1h: "Configuración del protocolo", t1p: "Meses 1–6",
        t2h: "Respuesta métrica", t2p: "Meses 6–12",
        t3h: "Convergencia de capas", t3p: "Meses 12–18",
        t4h: "Meseta estable", t4p: "Meses 18+",
        q1: "El índice premia la constancia, no los atajos. Los miembros que re-escanean con regularidad ven las trayectorias más claras."
      },
      audience: {
        eyebrow: "Para quién",
        title: "Analistas, no espectadores",
        p1: "MorphIndex es para quienes tratan la morfología facial como un dataset — algo que medir, intervenir y re-medir."
      },
      cta: {
        title: "Empieza con un informe morfológico",
        subtitle: "Dos fotos. Cuatro capas. Un índice estructurado.",
        btn: "Generar informe",
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
