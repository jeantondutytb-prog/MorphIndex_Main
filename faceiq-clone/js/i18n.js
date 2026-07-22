(function () {
  var LANGS = ["en", "fr", "es"];
  var LANG_LABELS = { en: "EN", fr: "FR", es: "ES" };

  var T = {
    en: {
      meta: {
        title: "MorphIndex — Your Morphology, Quantified",
        description: "MorphIndex turns facial photos into structured metrics, a personalized roadmap, and measurable progress over time."
      },
      a11y: {
        theme: "Toggle theme",
        language: "Change language",
        stars: "5 stars",
        prev: "Previous",
        next: "Next"
      },
      nav: { benchmarks: "Profiles", community: "Community", signin: "Sign In", cta: "Try MorphIndex" },
      hero: {
        members: "active users",
        scans: "scans completed",
        title: "Decode your structure.<br>Track what changes.",
        subtitle: "MorphIndex turns your facial photos into a living scorecard — structured metrics, a prioritized roadmap, and proof of progress as you go.",
        cta: "Run my first scan",
        link: "See how it works",
        note: "For people who prefer data over opinions.",
        tabFront: "Front scan",
        tabProfile: "Side scan"
      },
      transform: {
        eyebrow: "Case study",
        title: "Two years, one trajectory",
        subtitle: "Disciplined habits, logged scans, visible index growth — documented month by month.",
        start: "Day one",
        now: "Today",
        label: "Index growth over 24 months of consistent effort",
        t1h: "Baseline & habits", t1p: "Months 0–8 · establishing routines",
        t2h: "Early signals", t2p: "Months 8–14 · first measurable shifts",
        t3h: "Structural momentum", t3p: "Months 14–26 · deeper contour changes",
        t4h: "Peak window", t4p: "Months 26–30 · consolidating gains",
        q1: "Progress isn't accidental — it's the product of showing up.",
        q2: "Members who gain the most treat every scan as a checkpoint, not a verdict. MorphIndex keeps that rhythm alive."
      },
      pillars: {
        eyebrow: "Scoring model",
        title: "Four dimensions, one composite index",
        subtitle: "Every scan scores you across independent layers of facial morphology.",
        axis1: "Dimension A", p1: "Vitality", p1d: "Skin tone, feature clarity, and overall facial freshness",
        criteria: "criteria", ratios: "ratios", signals: "signals", markers: "markers",
        axis2: "Dimension B", p2: "Proportions", p2d: "Thirds, spacing, and symmetry across the face",
        axis3: "Dimension C", p3: "Definition", p3d: "Jaw contour, cheek structure, and bone visibility",
        axis4: "Dimension D", p4: "Traits", p4d: "Masculine and feminine morphological signatures"
      },
      banner: "Built on quantitative facial research — for anyone who treats appearance improvement as a measurable discipline.",
      testimonials: {
        title: "What members say",
        subtitle: "Unfiltered feedback from people who scan regularly.",
        t1: "\"No hype, just numbers I can act on. Whether I'm optimizing or simply understanding my structure, MorphIndex is the most consistent tool I've used.\"",
        t2: "\"I knew my weak spots vaguely — MorphIndex quantified them. Replacing guesswork with metrics completely changed how I approach improvement.\"",
        t3: "\"My composite score looked fine, but I needed detail on texture and under-eye volume. MorphIndex was the first app to give me specifics I could actually use.\"",
        t4: "\"Strengths, gaps, priorities — laid out clearly. That alone justified signing up.\"",
        t5: "\"Every re-scan surfaces something I missed. The personalized plans keep me accountable without feeling generic.\"",
        t6: "\"Clinical options plus daily habits — all ranked by impact. I haven't found anything else this precise.\"",
        t7: "\"I tried MorphIndex out of curiosity. The depth of the recommendations led me to book a specialist — the app genuinely shifted my approach.\""
      },
      features: {
        title: "One workspace for the full picture",
        subtitle: "Beyond the initial scan: trends, simulations, guidance, and community benchmarks — unified.",
        f1t: "Composite Index", f1d: "A single score synthesizing 70+ anatomical ratios across all four dimensions.",
        f2t: "MorphAI", f2d: "Conversational guidance about your face — ask anything, get structured answers.",
        f3t: "Outcome Simulator", f3d: "Visualize potential changes before committing to any intervention.",
        f4t: "Action Plan", f4d: "A step-by-step roadmap built from your unique morphology profile.",
        f5t: "Progress Tracker", f5d: "Line up scans side by side and watch individual metrics shift over time.",
        f6t: "Community Rank", f6d: "See where you stand among members and track your climb over time.",
        new: "New"
      },
      showcase: {
        tag1: "MorphAI 2.0", tag2: "Simulator",
        title: "Inside the analysis engine",
        subtitle: "Each scan surfaces granular detail — from skin vitality to zone-by-zone proportional ratios.",
        metrics: "100+ tracked variables per session"
      },
      steps: {
        eyebrow: "The method",
        title: "From photo to progress in four moves",
        subtitle: "Scan, understand, plan, repeat — each cycle sharpens your index.",
        s1t: "Upload", s1d: "Add a front photo and a side profile — that's all MorphIndex needs to start.",
        s2t: "Analyze", s2d: "Get a full breakdown across vitality, proportions, definition, and traits.",
        s3t: "Prioritize", s3d: "Receive lifestyle and clinical options ranked by expected impact on your profile.",
        s4t: "Iterate", s4d: "Execute your plan, simulate outcomes with MorphAI, and re-scan to confirm gains.",
        note: "Side-profile analysis included with every scan."
      },
      projection: {
        eyebrow: "Growth model",
        title: "Small gains compound",
        subtitle: "MorphIndex models where your score could land if you follow the recommended path.",
        current: "Today", projected: "Potential",
        cta: "Explore my trajectory"
      },
      audience: {
        eyebrow: "Built for",
        title: "The committed, not the curious",
        p1: "A score alone changes nothing. The members who transform treat MorphIndex as a starting line — then do the work between scans.",
        p2: "If that sounds like you, you're in the right place."
      },
      cta: {
        title: "Your baseline starts here",
        subtitle: "Join 120,000+ members who measure before they optimize.",
        btn: "Create my profile",
        note: "One scan. Full picture. No guesswork."
      },
      footer: { careers: "Careers", privacy: "Privacy", terms: "Terms", copy: "© 2026 MorphIndex" }
    },
    fr: {
      meta: {
        title: "MorphIndex — Votre morphologie, chiffrée",
        description: "MorphIndex transforme vos photos faciales en métriques structurées, un parcours personnalisé et des progrès mesurables dans le temps."
      },
      a11y: {
        theme: "Changer le thème",
        language: "Changer la langue",
        stars: "5 étoiles",
        prev: "Précédent",
        next: "Suivant"
      },
      nav: { benchmarks: "Profils", community: "Communauté", signin: "Connexion", cta: "Essayer MorphIndex" },
      hero: {
        members: "utilisateurs actifs",
        scans: "analyses réalisées",
        title: "Décryptez votre structure.<br>Suivez ce qui évolue.",
        subtitle: "MorphIndex transforme vos photos en tableau de bord vivant — métriques structurées, feuille de route priorisée et preuves de progression au fil du temps.",
        cta: "Lancer mon premier scan",
        link: "Voir comment ça marche",
        note: "Pour ceux qui préfèrent les données aux avis.",
        tabFront: "Scan de face",
        tabProfile: "Scan de profil"
      },
      transform: {
        eyebrow: "Étude de cas",
        title: "Deux ans, une trajectoire",
        subtitle: "Habitudes disciplinées, scans enregistrés, progression visible — documentée mois après mois.",
        start: "Jour 1",
        now: "Aujourd'hui",
        label: "Progression de l'index sur 24 mois d'efforts réguliers",
        t1h: "Base & habitudes", t1p: "Mois 0–8 · mise en place des routines",
        t2h: "Premiers signaux", t2p: "Mois 8–14 · premiers changements mesurables",
        t3h: "Élan structurel", t3p: "Mois 14–26 · modifications plus profondes",
        t4h: "Fenêtre optimale", t4p: "Mois 26–30 · consolidation des gains",
        q1: "La progression n'est pas un hasard — c'est le fruit de la constance.",
        q2: "Les membres qui progressent le plus traitent chaque scan comme un point de contrôle, pas un jugement. MorphIndex entretient ce rythme."
      },
      pillars: {
        eyebrow: "Modèle de notation",
        title: "Quatre dimensions, un index composite",
        subtitle: "Chaque scan vous évalue sur des couches indépendantes de morphologie faciale.",
        axis1: "Dimension A", p1: "Vitalité", p1d: "Teint, clarté des traits et fraîcheur globale du visage",
        criteria: "critères", ratios: "ratios", signals: "signaux", markers: "marqueurs",
        axis2: "Dimension B", p2: "Proportions", p2d: "Tiers, espacements et symétrie du visage",
        axis3: "Dimension C", p3: "Définition", p3d: "Contour de mâchoire, structure des pommettes et visibilité osseuse",
        axis4: "Dimension D", p4: "Traits", p4d: "Signatures morphologiques masculines et féminines"
      },
      banner: "Fondé sur la recherche faciale quantitative — pour tous ceux qui abordent l'amélioration de l'apparence comme une discipline mesurable.",
      testimonials: {
        title: "Ce que disent les membres",
        subtitle: "Retours sans filtre de personnes qui scannent régulièrement.",
        t1: "\"Pas de blabla, juste des chiffres sur lesquels agir. Que j'optimise ou que je comprenne ma structure, MorphIndex est l'outil le plus fiable que j'utilise.\"",
        t2: "\"Je connaissais vaguement mes points faibles — MorphIndex les a quantifiés. Remplacer les suppositions par des métriques a tout changé.\"",
        t3: "\"Mon score composite était correct, mais j'avais besoin de détails sur la texture et le creux sous les yeux. MorphIndex a été la première app à me donner des éléments exploitables.\"",
        t4: "\"Forces, lacunes, priorités — tout est clair. Ça seul valait l'inscription.\"",
        t5: "\"Chaque re-scan révèle quelque chose que j'avais manqué. Les plans personnalisés me responsabilisent sans paraître génériques.\"",
        t6: "\"Options cliniques et habitudes quotidiennes — tout classé par impact. Je n'ai rien trouvé d'aussi précis ailleurs.\"",
        t7: "\"J'ai testé MorphIndex par curiosité. La profondeur des recommandations m'a poussé à consulter un spécialiste — l'app a vraiment changé mon approche.\""
      },
      features: {
        title: "Un espace de travail pour la vue d'ensemble",
        subtitle: "Au-delà du scan initial : tendances, simulations, conseils et benchmarks communautaires — réunis.",
        f1t: "Index composite", f1d: "Un score unique synthétisant plus de 70 ratios anatomiques sur les quatre dimensions.",
        f2t: "MorphAI", f2d: "Guidance conversationnelle sur votre visage — posez n'importe quelle question, obtenez des réponses structurées.",
        f3t: "Simulateur de résultats", f3d: "Visualisez les changements potentiels avant tout engagement.",
        f4t: "Plan d'action", f4d: "Une feuille de route étape par étape construite à partir de votre profil morphologique unique.",
        f5t: "Suivi de progression", f5d: "Alignez vos scans côte à côte et observez l'évolution de chaque métrique.",
        f6t: "Classement communautaire", f6d: "Voyez votre position parmi les membres et suivez votre progression.",
        new: "Nouveau"
      },
      showcase: {
        tag1: "MorphAI 2.0", tag2: "Simulateur",
        title: "Au cœur du moteur d'analyse",
        subtitle: "Chaque scan révèle des détails granulaires — de la vitalité de la peau aux ratios proportionnels zone par zone.",
        metrics: "Plus de 100 variables suivies par session"
      },
      steps: {
        eyebrow: "La méthode",
        title: "De la photo à la progression en quatre étapes",
        subtitle: "Scanner, comprendre, planifier, recommencer — chaque cycle affine votre index.",
        s1t: "Importer", s1d: "Ajoutez une photo de face et une de profil — c'est tout ce dont MorphIndex a besoin.",
        s2t: "Analyser", s2d: "Recevez une analyse complète sur vitalité, proportions, définition et traits.",
        s3t: "Prioriser", s3d: "Obtenez des options lifestyle et cliniques classées par impact attendu sur votre profil.",
        s4t: "Itérer", s4d: "Suivez votre plan, simulez les résultats avec MorphAI et re-scannez pour confirmer vos gains.",
        note: "L'analyse de profil est incluse à chaque scan."
      },
      projection: {
        eyebrow: "Modèle de croissance",
        title: "Les petits gains s'accumulent",
        subtitle: "MorphIndex modélise où votre score pourrait atterrir si vous suivez le parcours recommandé.",
        current: "Aujourd'hui", projected: "Potentiel",
        cta: "Explorer ma trajectoire"
      },
      audience: {
        eyebrow: "Conçu pour",
        title: "Les engagés, pas les curieux",
        p1: "Un score seul ne change rien. Les membres qui se transforment traitent MorphIndex comme une ligne de départ — puis font le travail entre les scans.",
        p2: "Si cela vous ressemble, vous êtes au bon endroit."
      },
      cta: {
        title: "Votre base de départ, ici",
        subtitle: "Rejoignez plus de 120 000 membres qui mesurent avant d'optimiser.",
        btn: "Créer mon profil",
        note: "Un scan. Vue complète. Zéro approximation."
      },
      footer: { careers: "Carrières", privacy: "Confidentialité", terms: "Conditions", copy: "© 2026 MorphIndex" }
    },
    es: {
      meta: {
        title: "MorphIndex — Tu morfología, cuantificada",
        description: "MorphIndex convierte fotos faciales en métricas estructuradas, una hoja de ruta personalizada y progreso medible a lo largo del tiempo."
      },
      a11y: {
        theme: "Cambiar tema",
        language: "Cambiar idioma",
        stars: "5 estrellas",
        prev: "Anterior",
        next: "Siguiente"
      },
      nav: { benchmarks: "Perfiles", community: "Comunidad", signin: "Iniciar sesión", cta: "Probar MorphIndex" },
      hero: {
        members: "usuarios activos",
        scans: "análisis completados",
        title: "Descifra tu estructura.<br>Rastrea lo que cambia.",
        subtitle: "MorphIndex convierte tus fotos en un panel vivo — métricas estructuradas, hoja de ruta priorizada y prueba de progreso a medida que avanzas.",
        cta: "Hacer mi primer escaneo",
        link: "Ver cómo funciona",
        note: "Para quienes prefieren datos antes que opiniones.",
        tabFront: "Escaneo frontal",
        tabProfile: "Escaneo lateral"
      },
      transform: {
        eyebrow: "Caso de estudio",
        title: "Dos años, una trayectoria",
        subtitle: "Hábitos disciplinados, escaneos registrados, crecimiento visible del índice — documentado mes a mes.",
        start: "Día uno",
        now: "Hoy",
        label: "Crecimiento del índice en 24 meses de esfuerzo constante",
        t1h: "Base y hábitos", t1p: "Meses 0–8 · estableciendo rutinas",
        t2h: "Primeras señales", t2p: "Meses 8–14 · primeros cambios medibles",
        t3h: "Impulso estructural", t3p: "Meses 14–26 · cambios de contorno más profundos",
        t4h: "Ventana óptima", t4p: "Meses 26–30 · consolidando ganancias",
        q1: "El progreso no es casualidad — es el resultado de la constancia.",
        q2: "Los miembros que más avanzan tratan cada escaneo como un punto de control, no un veredicto. MorphIndex mantiene ese ritmo."
      },
      pillars: {
        eyebrow: "Modelo de puntuación",
        title: "Cuatro dimensiones, un índice compuesto",
        subtitle: "Cada escaneo te evalúa en capas independientes de morfología facial.",
        axis1: "Dimensión A", p1: "Vitalidad", p1d: "Tono de piel, claridad de rasgos y frescura facial general",
        criteria: "criterios", ratios: "ratios", signals: "señales", markers: "marcadores",
        axis2: "Dimensión B", p2: "Proporciones", p2d: "Tercios, espaciado y simetría del rostro",
        axis3: "Dimensión C", p3: "Definición", p3d: "Contorno mandibular, estructura de pómulos y visibilidad ósea",
        axis4: "Dimensión D", p4: "Rasgos", p4d: "Firmas morfológicas masculinas y femeninas"
      },
      banner: "Basado en investigación facial cuantitativa — para quienes tratan la mejora de apariencia como una disciplina medible.",
      testimonials: {
        title: "Lo que dicen los miembros",
        subtitle: "Opiniones sin filtro de personas que escanean con regularidad.",
        t1: "\"Sin exageraciones, solo números sobre los que puedo actuar. Ya sea optimizando o entendiendo mi estructura, MorphIndex es la herramienta más consistente que he usado.\"",
        t2: "\"Conocía vagamente mis puntos débiles — MorphIndex los cuantificó. Reemplazar suposiciones por métricas cambió por completo mi enfoque.\"",
        t3: "\"Mi puntuación compuesta parecía bien, pero necesitaba detalle sobre textura y volumen bajo los ojos. MorphIndex fue la primera app en darme datos que realmente puedo usar.\"",
        t4: "\"Fortalezas, carencias, prioridades — todo claro. Eso solo ya justificó registrarme.\"",
        t5: "\"Cada re-escaneo revela algo que pasé por alto. Los planes personalizados me mantienen responsable sin sentirse genéricos.\"",
        t6: "\"Opciones clínicas más hábitos diarios — todo clasificado por impacto. No he encontrado nada tan preciso.\"",
        t7: "\"Probé MorphIndex por curiosidad. La profundidad de las recomendaciones me llevó a consultar a un especialista — la app cambió genuinamente mi enfoque.\""
      },
      features: {
        title: "Un espacio de trabajo para el panorama completo",
        subtitle: "Más allá del escaneo inicial: tendencias, simulaciones, orientación y benchmarks comunitarios — unificados.",
        f1t: "Índice compuesto", f1d: "Una puntuación única que sintetiza más de 70 ratios anatómicos en las cuatro dimensiones.",
        f2t: "MorphAI", f2d: "Orientación conversacional sobre tu rostro — pregunta lo que quieras, obtén respuestas estructuradas.",
        f3t: "Simulador de resultados", f3d: "Visualiza cambios potenciales antes de comprometerte con cualquier intervención.",
        f4t: "Plan de acción", f4d: "Una hoja de ruta paso a paso construida desde tu perfil morfológico único.",
        f5t: "Seguimiento de progreso", f5d: "Alinea escaneos lado a lado y observa cómo cambian las métricas individuales.",
        f6t: "Ranking comunitario", f6d: "Mira dónde estás entre los miembros y sigue tu ascenso.",
        new: "Nuevo"
      },
      showcase: {
        tag1: "MorphAI 2.0", tag2: "Simulador",
        title: "Dentro del motor de análisis",
        subtitle: "Cada escaneo revela detalle granular — desde vitalidad de piel hasta ratios proporcionales por zona.",
        metrics: "Más de 100 variables rastreadas por sesión"
      },
      steps: {
        eyebrow: "El método",
        title: "De la foto al progreso en cuatro pasos",
        subtitle: "Escanear, entender, planificar, repetir — cada ciclo afina tu índice.",
        s1t: "Subir", s1d: "Añade una foto frontal y una de perfil — eso es todo lo que MorphIndex necesita.",
        s2t: "Analizar", s2d: "Recibe un desglose completo en vitalidad, proporciones, definición y rasgos.",
        s3t: "Priorizar", s3d: "Obtén opciones de estilo de vida y clínicas clasificadas por impacto esperado en tu perfil.",
        s4t: "Iterar", s4d: "Ejecuta tu plan, simula resultados con MorphAI y vuelve a escanear para confirmar ganancias.",
        note: "El análisis de perfil está incluido en cada escaneo."
      },
      projection: {
        eyebrow: "Modelo de crecimiento",
        title: "Las pequeñas ganancias se acumulan",
        subtitle: "MorphIndex modela dónde podría llegar tu puntuación si sigues el camino recomendado.",
        current: "Hoy", projected: "Potencial",
        cta: "Explorar mi trayectoria"
      },
      audience: {
        eyebrow: "Creado para",
        title: "Los comprometidos, no los curiosos",
        p1: "Una puntuación sola no cambia nada. Los miembros que se transforman tratan MorphIndex como línea de salida — y hacen el trabajo entre escaneos.",
        p2: "Si eso te describe, estás en el lugar correcto."
      },
      cta: {
        title: "Tu línea base empieza aquí",
        subtitle: "Únete a más de 120.000 miembros que miden antes de optimizar.",
        btn: "Crear mi perfil",
        note: "Un escaneo. Panorama completo. Sin suposiciones."
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
