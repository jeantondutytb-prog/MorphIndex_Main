(function () {
  var emailEl = document.getElementById("app-email");
  var signOutBtn = document.getElementById("app-signout");
  var startAnalysisEl = document.getElementById("app-start-analysis");

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
    if (!user) return false;
    if (user.user_metadata && user.user_metadata.onboarding_complete) return true;
    try {
      var raw = localStorage.getItem("faceiq_onboarding_" + user.id);
      if (!raw) return false;
      var state = JSON.parse(raw);
      return !!state.scanComplete;
    } catch (e) {
      return false;
    }
  }

  function hasActiveSubscription(user) {
    if (!user) return false;
    if (user.user_metadata && user.user_metadata.subscription_active) return true;
    try {
      var raw = localStorage.getItem("faceiq_onboarding_" + user.id);
      if (!raw) return false;
      var state = JSON.parse(raw);
      return !!state.subscriptionActive;
    } catch (e) {
      return false;
    }
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

      if (startAnalysisEl) {
        startAnalysisEl.href = "/onboarding/results";
      }

      showUser(result.data.session);
      setBooting(false);
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
