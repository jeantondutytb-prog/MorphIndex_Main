(function () {
  var emailEl = document.getElementById("app-email");
  var signOutBtn = document.getElementById("app-signout");
  var currentUser = null;
  var currentSession = null;

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

  function renderDashboard(user, session) {
    var state = window.Onboarding.getState(user.id);
    var analysis = window.AnalysisData.ensureAnalysis(state, user.id);

    if (!state.analysis) {
      window.Onboarding.saveState(user.id, { analysis: analysis });
    }

    window.Dashboard.renderPreview(
      document.getElementById("dashboard-preview"),
      state,
      analysis,
      { loading: !!state.previewGenerating }
    );
    window.Dashboard.renderScoreHero(document.getElementById("dashboard-hero"), analysis);
    window.Dashboard.renderPhotos(document.getElementById("dashboard-photos"), state);
    window.Dashboard.renderPillarBars(document.getElementById("dashboard-pillars"), analysis);
    window.Dashboard.renderSummaryGrid(document.getElementById("dashboard-summary"), analysis);
    window.Dashboard.renderMetricsTabs(document.getElementById("dashboard-metrics"), analysis);
    window.Dashboard.renderPlan(document.getElementById("dashboard-plan"), analysis);

    if (!state.preview6mUrl && !state.previewGenerating && session && window.AiApi) {
      window.Onboarding.saveState(user.id, { previewGenerating: true });
      renderDashboard(user, session);
      window.AiApi.generatePreview(session, state.frontPhoto, analysis.plan).then(function (result) {
        if (result.ok && result.previewUrl) {
          window.Onboarding.saveState(user.id, {
            preview6mUrl: result.previewUrl,
            preview6mAt: result.generatedAt,
            previewGenerating: false
          });
        } else {
          window.Onboarding.saveState(user.id, { previewGenerating: false });
        }
        renderDashboard(user, session);
      });
    }
  }

  function bootApp() {
    setBooting(true);
    var client = initSupabase();
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
      renderDashboard(user, result.data.session);
      setBooting(false);
    });

    document.addEventListener("langchange", function () {
      if (currentUser) renderDashboard(currentUser, currentSession);
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootApp);
  } else {
    bootApp();
  }
})();
