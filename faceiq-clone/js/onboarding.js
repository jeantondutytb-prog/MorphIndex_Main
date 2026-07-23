(function () {
  var STORAGE_PREFIX = "faceiq_onboarding_";
  var TOTAL_STEPS = 6;

  var stepRoutes = {
    1: "/onboarding",
    2: "/onboarding/camera",
    3: "/onboarding/front",
    4: "/onboarding/side",
    5: "/onboarding/analyzing",
    6: "/onboarding/results"
  };

  function redirectToLogin() {
    window.location.href = "/login";
  }

  function initSupabase() {
    var config = window.APP_CONFIG || {};
    if (!config.supabaseUrl || !config.supabaseAnonKey || !window.supabase) {
      return null;
    }
    return window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  }

  function storageKey(userId) {
    return STORAGE_PREFIX + userId;
  }

  function backupKey(userId) {
    return storageKey(userId) + "_backup";
  }

  function getState(userId) {
    try {
      var raw = localStorage.getItem(storageKey(userId));
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveState(userId, patch) {
    try {
      var current = getState(userId);
      var next = Object.assign({}, current, patch);
      localStorage.setItem(storageKey(userId), JSON.stringify(next));
      return { ok: true, state: next };
    } catch (e) {
      return { ok: false, error: e && e.name === "QuotaExceededError" ? "quota" : "storage" };
    }
  }

  function isRescanPending(userId) {
    return !!getState(userId).rescanPending;
  }

  function hasCompletedScan(user) {
    if (!user) return false;
    if (isRescanPending(user.id)) return false;
    if (user.user_metadata && user.user_metadata.onboarding_complete) return true;
    var state = getState(user.id);
    return !!state.scanComplete;
  }

  function hasActiveSubscription(user) {
    if (!user) return false;
    return !!(user.user_metadata && user.user_metadata.subscription_active);
  }

  function generateMockScores() {
    function score(min, max) {
      return Math.round((min + Math.random() * (max - min)) * 10) / 10;
    }
    return {
      overall: score(6.2, 8.4),
      harmony: score(5.8, 8.8),
      angularity: score(5.5, 8.5),
      dimorphism: score(6.0, 8.2),
      features: score(6.3, 8.6)
    };
  }

  function updateProgress(step) {
    document.querySelectorAll("[data-onboarding-step-current]").forEach(function (el) {
      el.textContent = step;
    });
    document.querySelectorAll("[data-onboarding-total]").forEach(function (el) {
      el.textContent = TOTAL_STEPS;
    });
    var fill = document.querySelector("[data-shell-progress-fill]");
    if (fill) {
      fill.style.width = Math.round((step / TOTAL_STEPS) * 100) + "%";
    }
  }

  function requireStep(client, minStep, currentStep) {
    return client.auth.getSession().then(function (result) {
      var session = result.data.session;
      if (!session) {
        redirectToLogin();
        return null;
      }

      var user = session.user;
      var state = getState(user.id);

      if (currentStep > 1 && !hasCompletedScan(user) && currentStep > 5) {
        if (!state.cameraReady && !state.cameraSkipped && !state.frontPhoto && currentStep > 2) {
          window.location.href = stepRoutes[2];
          return null;
        }
        if (!state.frontPhoto && currentStep > 3) {
          window.location.href = stepRoutes[3];
          return null;
        }
        if (!state.sidePhoto && currentStep > 4) {
          window.location.href = stepRoutes[4];
          return null;
        }
      }

      if (hasCompletedScan(user) && currentStep < 6) {
        window.location.href = stepRoutes[6];
        return null;
      }

      updateProgress(currentStep);
      return { client: client, session: session, user: user, state: state };
    });
  }

  function bindContinue(selector, href) {
    var btn = document.querySelector(selector);
    if (!btn) return;
    btn.addEventListener("click", function () {
      window.location.href = href;
    });
  }

  function startRescan() {
    var client = initSupabase();
    if (!client) {
      redirectToLogin();
      return;
    }

    client.auth.getSession().then(function (result) {
      var session = result.data.session;
      if (!session) {
        redirectToLogin();
        return;
      }

      var userId = session.user.id;
      var current = getState(userId);

      try {
        localStorage.setItem(backupKey(userId), JSON.stringify(current));
      } catch (e) {
        /* backup best-effort */
      }

      saveState(userId, {
        rescanPending: true,
        rescanStartedAt: Date.now(),
        frontPhoto: null,
        sidePhoto: null,
        scanComplete: false,
        analysis: null,
        scores: null,
        preview6mUrl: null,
        previewGenerating: false,
        previewError: false
      });

      client.auth.updateUser({
        data: { onboarding_complete: false }
      }).then(function () {
        return client.auth.refreshSession();
      }).then(function () {
        window.location.href = stepRoutes[2];
      }).catch(function () {
        window.location.href = stepRoutes[2];
      });
    });
  }

  window.Onboarding = {
    TOTAL_STEPS: TOTAL_STEPS,
    stepRoutes: stepRoutes,
    initSupabase: initSupabase,
    redirectToLogin: redirectToLogin,
    getState: getState,
    saveState: saveState,
    isRescanPending: isRescanPending,
    hasCompletedScan: hasCompletedScan,
    hasActiveSubscription: hasActiveSubscription,
    generateMockScores: generateMockScores,
    updateProgress: updateProgress,
    requireStep: requireStep,
    bindContinue: bindContinue,
    startRescan: startRescan
  };
})();
