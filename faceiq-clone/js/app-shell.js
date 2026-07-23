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

  function renderNav(activeView) {
    var nav = document.getElementById("dashboard-nav");
    if (!nav) return;

    var items = [
      { view: "overview", href: "/app", key: "dashboard.nav.overview" },
      { view: "preview", href: "/app/preview", key: "dashboard.nav.preview" },
      { view: "metrics", href: "/app/metrics", key: "dashboard.nav.metrics" },
      { view: "plan", href: "/app/plan", key: "dashboard.nav.plan" }
    ];

    nav.innerHTML =
      '<nav class="dashboard-nav" aria-label="' + t("dashboard.nav.label") + '">' +
        items.map(function (item) {
          var active = item.view === activeView;
          return (
            '<a href="' + item.href + '" class="dashboard-nav__link' + (active ? " is-active" : "") + '"' +
              (active ? ' aria-current="page"' : "") + ">" +
              t(item.key) +
            "</a>"
          );
        }).join("") +
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
