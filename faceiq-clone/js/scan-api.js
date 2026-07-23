(function () {
  var currentSession = null;

  function setSession(session) {
    currentSession = session || null;
  }

  function getAccessToken(session) {
    var active = session || currentSession;
    return active && active.access_token ? active.access_token : "";
  }

  function pickScanPayload(userId) {
    if (!window.Onboarding) return null;
    var state = window.Onboarding.getState(userId);
    if (!state) return null;

    var payload = {
      scanComplete: !!state.scanComplete,
      scores: state.scores || (state.analysis && state.analysis.scores) || null,
      analysis: state.analysis || null,
      scoreHistory: Array.isArray(state.scoreHistory) ? state.scoreHistory.slice(-12) : [],
      journey: state.journey || null,
      planProgress: state.planProgress || {},
      preview6mUrl: state.preview6mUrl || null,
      preview6mAt: state.preview6mAt || null,
      chatHistory: Array.isArray(state.chatHistory) ? state.chatHistory.slice(-40) : [],
      procedureSimulations: state.procedureSimulations || {},
      rescanPending: !!state.rescanPending
    };

    if (state.frontPhoto && String(state.frontPhoto).indexOf("data:image/") === 0) {
      payload.frontPhoto = state.frontPhoto;
    }
    if (state.sidePhoto && String(state.sidePhoto).indexOf("data:image/") === 0) {
      payload.sidePhoto = state.sidePhoto;
    }

    return payload;
  }

  function applyRemoteScan(userId, scan) {
    if (!scan || !window.Onboarding) return;
    var local = window.Onboarding.getState(userId) || {};
    var patch = {
      scanComplete: scan.scanComplete !== false,
      rescanPending: !!scan.rescanPending
    };

    if (scan.scores) patch.scores = scan.scores;
    if (scan.analysis) patch.analysis = scan.analysis;
    if (scan.frontPhoto) patch.frontPhoto = scan.frontPhoto;
    if (scan.sidePhoto) patch.sidePhoto = scan.sidePhoto;
    if (Array.isArray(scan.scoreHistory) && scan.scoreHistory.length) {
      patch.scoreHistory = scan.scoreHistory;
    }
    if (scan.journey) patch.journey = scan.journey;
    if (scan.planProgress && Object.keys(scan.planProgress).length) {
      patch.planProgress = scan.planProgress;
    }
    if (typeof scan.preview6mUrl === "string" && scan.preview6mUrl) {
      patch.preview6mUrl = scan.preview6mUrl;
    }
    if (typeof scan.preview6mAt === "string" && scan.preview6mAt) {
      patch.preview6mAt = scan.preview6mAt;
    }
    if (Array.isArray(scan.chatHistory) && scan.chatHistory.length) {
      patch.chatHistory = scan.chatHistory;
    } else if (!local.chatHistory) {
      patch.chatHistory = [];
    }
    if (
      scan.procedureSimulations &&
      typeof scan.procedureSimulations === "object" &&
      Object.keys(scan.procedureSimulations).length
    ) {
      patch.procedureSimulations = scan.procedureSimulations;
    }
    if (scan.scanUpdatedAt) patch.scanUpdatedAt = scan.scanUpdatedAt;

    window.Onboarding.saveState(userId, patch);
  }

  function fetchRemoteScan(session) {
    var token = getAccessToken(session);
    if (!token) {
      return Promise.resolve({ ok: false });
    }

    return fetch("/api/scan", {
      method: "GET",
      headers: { Authorization: "Bearer " + token }
    })
      .then(function (response) {
        return response.json().then(function (data) {
          return { ok: response.ok, status: response.status, data: data };
        });
      })
      .catch(function () {
        return { ok: false };
      });
  }

  function pushRemoteScan(session, userId, options) {
    var token = getAccessToken(session);
    var payload = pickScanPayload(userId);
    if (!token || !payload) {
      return Promise.resolve({ ok: false });
    }

    options = options || {};
    if (options.includePhotos === false) {
      delete payload.frontPhoto;
      delete payload.sidePhoto;
    }

    return fetch("/api/scan", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return response.json().then(function (data) {
          if (response.ok && data.scanUpdatedAt && window.Onboarding) {
            window.Onboarding.saveState(userId, { scanUpdatedAt: data.scanUpdatedAt });
          }
          return { ok: response.ok, status: response.status, data: data };
        });
      })
      .catch(function () {
        return { ok: false };
      });
  }

  function localHasScan(state) {
    return !!(state && (state.frontPhoto || state.sidePhoto || state.analysis || state.scanComplete));
  }

  function hydrate(session, userId) {
    if (!session || !userId || !window.Onboarding) {
      return Promise.resolve();
    }

    var local = window.Onboarding.getState(userId);
    var localUpdated = local.scanUpdatedAt || local.appStateUpdatedAt || "";

    return fetchRemoteScan(session).then(function (result) {
      if (!result.ok) {
        if (localHasScan(local)) {
          return pushRemoteScan(session, userId);
        }
        return null;
      }

      var remote = result.data && result.data.scan;
      if (!remote) {
        if (localHasScan(local)) {
          return pushRemoteScan(session, userId);
        }
        return null;
      }

      var remoteUpdated = remote.scanUpdatedAt || "";
      var localMissingPhotos = !local.frontPhoto && !local.sidePhoto;
      var remoteHasPhotos = !!(remote.frontPhoto || remote.sidePhoto);
      var localMissingAnalysis = !local.analysis && !!remote.analysis;

      // Always restore cloud photos/analysis when this device is empty.
      if (localMissingPhotos && remoteHasPhotos) {
        applyRemoteScan(userId, remote);
        return null;
      }
      if (localMissingAnalysis) {
        applyRemoteScan(userId, remote);
        return null;
      }

      if (!localUpdated || (remoteUpdated && remoteUpdated >= localUpdated)) {
        applyRemoteScan(userId, remote);
        return null;
      }

      if (localUpdated > remoteUpdated && localHasScan(local)) {
        return pushRemoteScan(session, userId);
      }

      return null;
    });
  }

  function sync(userId, options) {
    return pushRemoteScan(currentSession, userId, options);
  }

  window.ScanApi = {
    setSession: setSession,
    hydrate: hydrate,
    sync: sync
  };
})();
