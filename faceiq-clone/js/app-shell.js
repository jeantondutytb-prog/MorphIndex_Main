(function () {
  var emailEl = document.getElementById("app-email");
  var signOutBtn = document.getElementById("app-signout");
  var currentUser = null;
  var currentSession = null;
  var client = null;

  function t(key) {
    var lang = document.documentElement.getAttribute("lang") || "en";
    var dict = window.I18N_T && window.I18N_T[lang];
    if (!dict) return key;
    var parts = key.split(".");
    var val = dict;
    for (var i = 0; i < parts.length; i++) {
      if (!val) return key;
      val = val[parts[i]];
    }
    return val != null ? val : key;
  }

  function redirectToLogin() {
    window.location.href = "/login";
  }

  function setBooting(isBooting) {
    document.body.classList.toggle("app-page--booting", isBooting);
  }

  function initSupabase() {
    var config = window.APP_CONFIG || {};
    if (!config.supabaseUrl || !config.supabaseAnonKey || !window.supabase) {
      redirectToLogin();
      return null;
    }
    return window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  }

  function hasCompletedOnboarding(user) {
    return window.Onboarding && window.Onboarding.hasCompletedScan(user);
  }

  function hasActiveSubscription(user) {
    return window.Onboarding && window.Onboarding.hasActiveSubscription(user);
  }

  function showUser(session) {
    if (!session || !session.user) {
      redirectToLogin();
      return;
    }
    if (emailEl && session.user.email) {
      emailEl.textContent = session.user.email;
      emailEl.hidden = false;
    }
  }

  function getAppContext() {
    if (!currentUser) return null;
    var state = window.Onboarding.getState(currentUser.id);
    var analysis = window.AnalysisData.ensureAnalysis(state, currentUser.id);
    if (!state.analysis) {
      window.Onboarding.saveState(currentUser.id, { analysis: analysis });
    }
    return { user: currentUser, session: currentSession, state: state, analysis: analysis };
  }

  var NAV_ICONS = {
    overview:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/></svg>',
    preview:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 1.4 4.3L18 9l-4.6 1.7L12 15l-1.4-4.3L6 9l4.6-1.7L12 3z"/><path d="M19 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z"/></svg>',
    metrics:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-6"/><path d="M22 20v-9"/></svg>',
    plan:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/><path d="M4.5 6.5 6 8l1.5-1.5"/><path d="M4.5 12.5 6 14l1.5-1.5"/><path d="M4.5 18.5 6 20l1.5-1.5"/></svg>',
    chat:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c-4.4 0-8 2.7-8 6 0 1.8.9 3.4 2.4 4.6L5 21l4.8-2.2c.7.1 1.4.2 2.2.2 4.4 0 8-2.7 8-6s-3.6-6-8-6z"/></svg>',
    simulate:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v3"/><path d="M12 18v3"/><path d="m4.2 4.2 2.1 2.1"/><path d="m17.7 17.7 2.1 2.1"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="m4.2 19.8 2.1-2.1"/><path d="m17.7 6.3 2.1-2.1"/><circle cx="12" cy="12" r="4"/></svg>'
  };

  function renderNav(activeView) {
    var nav = document.getElementById("dashboard-nav");
    if (!nav) return;

    var items = [
      { view: "overview", href: "/app", key: "dashboard.nav.overview" },
      { view: "preview", href: "/app/preview", key: "dashboard.nav.preview" },
      { view: "metrics", href: "/app/metrics", key: "dashboard.nav.metrics" },
      { view: "plan", href: "/app/plan", key: "dashboard.nav.plan" },
      { view: "chat", href: "/app/chat", key: "dashboard.nav.chat" },
      { view: "simulate", href: "/app/simulate", key: "dashboard.nav.simulate" }
    ];

    nav.innerHTML =
      '<nav class="dashboard-tabbar" aria-label="' + t("dashboard.nav.label") + '">' +
        '<div class="dashboard-tabbar__inner">' +
          items.map(function (item) {
            var active = item.view === activeView;
            return (
              '<a href="' + item.href + '" class="dashboard-tabbar__item' + (active ? " is-active" : "") + '"' +
                (active ? ' aria-current="page"' : "") + ">" +
                '<span class="dashboard-tabbar__icon">' + (NAV_ICONS[item.view] || "") + "</span>" +
                '<span class="dashboard-tabbar__label">' + t(item.key) + "</span>" +
              "</a>"
            );
          }).join("") +
        "</div>" +
      "</nav>";
  }

  function applyPageMeta(view) {
    var key = "dashboard.pages." + view;
    var title = t(key + ".title");
    var description = t(key + ".description");
    if (title && title.indexOf("dashboard.pages.") !== 0) {
      document.title = "FaceIQ Labs — " + title;
    }
    var meta = document.querySelector('meta[name="description"]');
    if (meta && description && description.indexOf("dashboard.pages.") !== 0) {
      meta.setAttribute("content", description);
    }
    var titleEl = document.getElementById("dashboard-page-title");
    if (titleEl) titleEl.textContent = title;
  }

  function boot(onReady) {
    setBooting(true);
    client = initSupabase();
    if (!client) {
      setBooting(false);
      return;
    }

    client.auth.getSession().then(function (result) {
      if (!result.data.session) {
        redirectToLogin();
        return;
      }

      var user = result.data.session.user;
      if (!hasCompletedOnboarding(user)) {
        window.location.href = "/onboarding";
        return;
      }
      if (!hasActiveSubscription(user)) {
        window.location.href = "/onboarding/results";
        return;
      }

      showUser(result.data.session);
      currentUser = user;
      currentSession = result.data.session;

      var view = document.body.getAttribute("data-app-view") || "overview";
      renderNav(view);
      applyPageMeta(view);

      if (typeof onReady === "function") {
        onReady(getAppContext());
      }
      setBooting(false);
    }).catch(function () {
      setBooting(false);
      redirectToLogin();
    });

    document.addEventListener("langchange", function () {
      var view = document.body.getAttribute("data-app-view") || "overview";
      renderNav(view);
      applyPageMeta(view);
      if (typeof onReady === "function" && currentUser) {
        onReady(getAppContext());
      }
    });

    if (signOutBtn) {
      signOutBtn.addEventListener("click", function () {
        signOutBtn.disabled = true;
        client.auth.signOut().finally(function () {
          redirectToLogin();
        });
      });
    }
  }

  window.AppShell = {
    boot: boot,
    getAppContext: getAppContext,
    renderNav: renderNav,
    applyPageMeta: applyPageMeta
  };
})();
