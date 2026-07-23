(function () {
  var STORAGE_PREFIX = "faceiq_onboarding_";
  var TOTAL_STEPS = 4;
  var ADMIN_EMAILS = ["jeantondut.ytb@gmail.com"];

  var stepRoutes = {
    1: "/onboarding",
    2: "/onboarding/photos",
    3: "/onboarding/analyzing",
    4: "/onboarding/results"
  };

  function redirectToLogin() {
    window.location.href = "/login";
  }

  function normalizeEmail(email) {
    return typeof email === "string" ? email.trim().toLowerCase() : "";
  }

  function isAdminUser(user) {
    if (!user) return false;
    if (user.user_metadata && user.user_metadata.role === "admin") return true;
    return ADMIN_EMAILS.indexOf(normalizeEmail(user.email)) !== -1;
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
    if (isAdminUser(user)) return true;
    if (user.user_metadata && user.user_metadata.onboarding_complete) return true;
    var state = getState(user.id);
    return !!state.scanComplete;
  }

  function hasActiveSubscription(user) {
    if (!user) return false;
    if (isAdminUser(user)) return true;
    return !!(user.user_metadata && user.user_metadata.subscription_active);
  }

  function appendScoreHistory(userId, analysis) {
    if (!analysis || !analysis.scores) return;
    var state = getState(userId);
    var history = Array.isArray(state.scoreHistory) ? state.scoreHistory.slice() : [];
    history.push({
      analyzedAt: analysis.analyzedAt || new Date().toISOString(),
      scores: analysis.scores,
      overall: analysis.scores.overall
    });
    if (history.length > 12) history = history.slice(-12);
    saveState(userId, { scoreHistory: history });
    queueAppStateSync(userId);
  }

  function getPlanProgress(userId) {
    var state = getState(userId);
    return state.planProgress || {};
  }

  function togglePlanItem(userId, key, done) {
    var progress = getPlanProgress(userId);
    progress[key] = !!done;
    saveState(userId, { planProgress: progress });
    return progress;
  }

  function queueAppStateSync(userId) {
    if (window.JourneyApi && window.JourneyApi.sync) {
      window.JourneyApi.sync(userId);
    }
  }

  function defaultJourneyForAnalysis(analysis) {
    var firstKey =
      analysis && analysis.plan && analysis.plan[0] ? analysis.plan[0].key : "skinRoutine";
    return {
      activeFocusKey: firstKey,
      phaseIndex: 0,
      actionProgress: {},
      startedAt: new Date().toISOString()
    };
  }

  function getJourney(userId, analysis) {
    var state = getState(userId);
    var journey = state.journey;
    if (!journey || !journey.activeFocusKey) {
      journey = defaultJourneyForAnalysis(analysis);
      saveState(userId, { journey: journey });
      return journey;
    }
    if (analysis && Array.isArray(analysis.plan) && analysis.plan.length) {
      var keys = analysis.plan.map(function (item) {
        return item.key;
      });
      if (keys.indexOf(journey.activeFocusKey) === -1) {
        journey.activeFocusKey = keys[0];
        saveState(userId, { journey: journey });
      }
    }
    return journey;
  }

  function toggleJourneyAction(userId, actionKey, done, analysis) {
    var state = getState(userId);
    var journey = state.journey || defaultJourneyForAnalysis(analysis);
    journey.actionProgress = journey.actionProgress || {};
    journey.actionProgress[actionKey] = !!done;

    if (window.ImprovementProtocols) {
      var protocol = window.ImprovementProtocols.getProtocol(journey.activeFocusKey);
      if (protocol) {
        var phaseIndex = window.ImprovementProtocols.resolvePhaseIndex(journey, protocol);
        if (
          window.ImprovementProtocols.isPhaseComplete(protocol, phaseIndex, journey.actionProgress) &&
          phaseIndex < protocol.phases.length - 1
        ) {
          journey.phaseIndex = phaseIndex + 1;
        } else {
          journey.phaseIndex = phaseIndex;
        }
      }
    }

    saveState(userId, { journey: journey });
    queueAppStateSync(userId);
    return journey;
  }

  function setActiveFocus(userId, focusKey, analysis) {
    var state = getState(userId);
    var journey = state.journey || {};
    if (journey.activeFocusKey === focusKey) {
      return journey;
    }
    journey = {
      activeFocusKey: focusKey,
      phaseIndex: 0,
      actionProgress: {},
      startedAt: new Date().toISOString()
    };
    saveState(userId, { journey: journey });
    if (analysis && analysis.plan) {
      var progress = getPlanProgress(userId);
      analysis.plan.forEach(function (item) {
        if (item.key !== focusKey) {
          progress[item.key] = false;
        }
      });
      saveState(userId, { planProgress: progress });
    }
    queueAppStateSync(userId);
    return journey;
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

      if (isAdminUser(user) && !isRescanPending(user.id) && hasActiveSubscription(user)) {
        window.location.href = "/app";
        return null;
      }

      if (!hasCompletedScan(user)) {
        if (currentStep > 2 && (!state.frontPhoto || !state.sidePhoto)) {
          window.location.href = stepRoutes[2];
          return null;
        }
        if (currentStep > 3 && (!state.frontPhoto || !state.sidePhoto)) {
          window.location.href = stepRoutes[2];
          return null;
        }
      }

      if (hasCompletedScan(user) && currentStep < 4) {
        window.location.href = hasActiveSubscription(user) ? "/app" : stepRoutes[4];
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

      if (current.analysis) {
        appendScoreHistory(userId, current.analysis);
      }

      try {
        localStorage.setItem(backupKey(userId), JSON.stringify(current));
      } catch (e) {
        /* backup best-effort */
      }

      var preserved = {
        scoreHistory: getState(userId).scoreHistory,
        planProgress: current.planProgress || {},
        journey: current.journey || null,
        procedureSimulations: current.procedureSimulations || {},
        chatHistory: current.chatHistory || []
      };

      saveState(userId, Object.assign(preserved, {
        rescanPending: true,
        rescanStartedAt: Date.now(),
        frontPhoto: null,
        sidePhoto: null,
        scanComplete: false,
        analysis: null,
        scores: null,
        preview6mUrl: null,
        previewGenerating: false,
        previewError: false,
        cameraReady: false,
        cameraSkipped: false
      }));

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
    isAdminUser: isAdminUser,
    getState: getState,
    saveState: saveState,
    isRescanPending: isRescanPending,
    hasCompletedScan: hasCompletedScan,
    hasActiveSubscription: hasActiveSubscription,
    appendScoreHistory: appendScoreHistory,
    getPlanProgress: getPlanProgress,
    togglePlanItem: togglePlanItem,
    getJourney: getJourney,
    toggleJourneyAction: toggleJourneyAction,
    setActiveFocus: setActiveFocus,
    updateProgress: updateProgress,
    requireStep: requireStep,
    bindContinue: bindContinue,
    startRescan: startRescan
  };
})();
