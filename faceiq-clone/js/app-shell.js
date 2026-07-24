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

  var SIGNED_OUT_FLAG = "faceiq-signed-out";

  function redirectToLogin() {
    window.location.href = "/login";
  }

  function redirectAfterSignOut() {
    try {
      sessionStorage.setItem(SIGNED_OUT_FLAG, String(Date.now()));
    } catch (err) {
      // Ignore.
    }
    window.location.replace("/");
  }

  function isAuthStorageKey(key) {
    if (!key) return false;
    var lower = key.toLowerCase();
    return key.indexOf("sb-") === 0 || lower.indexOf("supabase") !== -1;
  }

  function clearAuthStorage() {
    [localStorage, sessionStorage].forEach(function (storage) {
      try {
        var keys = [];
        for (var i = 0; i < storage.length; i++) {
          var key = storage.key(i);
          if (isAuthStorageKey(key)) keys.push(key);
        }
        keys.forEach(function (key) {
          storage.removeItem(key);
        });
      } catch (err) {
        // Ignore storage access errors (private mode, quota, etc.).
      }
    });
  }

  function markSignedOut() {
    try {
      sessionStorage.setItem(SIGNED_OUT_FLAG, String(Date.now()));
    } catch (err) {
      // Ignore.
    }
  }

  function performSignOut() {
    if (signOutBtn) signOutBtn.disabled = true;

    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      currentUser = null;
      currentSession = null;
      markSignedOut();
      clearAuthStorage();
      redirectAfterSignOut();
    }

    markSignedOut();
    clearAuthStorage();

    var timeoutId = window.setTimeout(finish, 800);
    var signOutPromise =
      client && client.auth
        ? client.auth.signOut({ scope: "local" })
        : Promise.resolve();

    Promise.resolve(signOutPromise)
      .catch(function () {
        return null;
      })
      .finally(function () {
        window.clearTimeout(timeoutId);
        finish();
      });
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
    var hasPhotos = !!(state.frontPhoto || state.sidePhoto);
    var analysis = state.analysis || null;
    if (!analysis && hasPhotos && window.AnalysisData) {
      analysis = window.AnalysisData.ensureAnalysis(state, currentUser.id);
      if (!state.analysis) {
        window.Onboarding.saveState(currentUser.id, { analysis: analysis });
        state = window.Onboarding.getState(currentUser.id);
      }
    }
    return { user: currentUser, session: currentSession, state: state, analysis: analysis };
  }

  var NAV_ICONS = {
    overview:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/></svg>',
    plan:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/><path d="M4.5 6.5 6 8l1.5-1.5"/><path d="M4.5 12.5 6 14l1.5-1.5"/><path d="M4.5 18.5 6 20l1.5-1.5"/></svg>',
    metrics:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-6"/><path d="M22 20v-9"/></svg>'
  };

  function resolveNavView(view) {
    if (view === "preview" || view === "simulate" || view === "potential" || view === "chat") {
      return "overview";
    }
    return view || "overview";
  }

  function renderNav(activeView) {
    var nav = document.getElementById("dashboard-nav");
    if (!nav) return;

    var current = resolveNavView(activeView);
    var items = [
      { view: "overview", href: "/app", key: "dashboard.nav.overview" },
      { view: "plan", href: "/app/plan", key: "dashboard.nav.plan" },
      { view: "metrics", href: "/app/metrics", key: "dashboard.nav.metrics" }
    ];

    nav.innerHTML =
      '<nav class="dashboard-tabbar" aria-label="' + t("dashboard.nav.label") + '">' +
        '<div class="dashboard-tabbar__inner">' +
          items.map(function (item) {
            var active = item.view === current;
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

  function renderCoachFab(activeView) {
    var existing = document.getElementById("coach-fab");
    if (existing) existing.remove();
    if (activeView === "chat") return;

    var fab = document.createElement("a");
    fab.id = "coach-fab";
    fab.className = "coach-fab";
    fab.href = "/app/chat";
    fab.setAttribute("aria-label", t("dashboard.coachFab.aria"));
    fab.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c-4.4 0-8 2.7-8 6 0 1.8.9 3.4 2.4 4.6L5 21l4.8-2.2c.7.1 1.4.2 2.2.2 4.4 0 8-2.7 8-6s-3.6-6-8-6z"/></svg>' +
      '<span>' + t("dashboard.coachFab.label") + "</span>";
    document.body.appendChild(fab);
  }

  function applyPageMeta(view) {
    var key = "dashboard.pages." + view;
    var title = t(key + ".title");
    var description = t(key + ".description");
    if (title && title.indexOf("dashboard.pages.") !== 0) {
      document.title = "MorphIndex — " + title;
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

      if (window.JourneyApi) {
        window.JourneyApi.setSession(currentSession);
      }
      if (window.ScanApi) {
        window.ScanApi.setSession(currentSession);
      }

      var view = document.body.getAttribute("data-app-view") || "overview";
      renderNav(view);
      renderCoachFab(view);
      applyPageMeta(view);

      var scanHydrate =
        window.ScanApi && window.ScanApi.hydrate
          ? window.ScanApi.hydrate(currentSession, currentUser.id)
          : Promise.resolve();
      var journeyHydrate =
        window.JourneyApi && window.JourneyApi.hydrate
          ? window.JourneyApi.hydrate(currentSession, currentUser.id)
          : Promise.resolve();

      scanHydrate
        .catch(function () {
          return null;
        })
        .then(function () {
          return journeyHydrate.catch(function () {
            return null;
          });
        })
        .finally(function () {
          if (typeof onReady === "function") {
            onReady(getAppContext());
          }
          setBooting(false);
        });
    }).catch(function () {
      setBooting(false);
      redirectToLogin();
    });

    document.addEventListener("langchange", function () {
      var view = document.body.getAttribute("data-app-view") || "overview";
      renderNav(view);
      renderCoachFab(view);
      applyPageMeta(view);
      if (typeof onReady === "function" && currentUser) {
        onReady(getAppContext());
      }
    });

    if (signOutBtn) {
      signOutBtn.addEventListener("click", function (event) {
        event.preventDefault();
        performSignOut();
      });
    }
  }

  window.AppShell = {
    boot: boot,
    getAppContext: getAppContext,
    renderNav: renderNav,
    renderCoachFab: renderCoachFab,
    applyPageMeta: applyPageMeta
  };
})();
