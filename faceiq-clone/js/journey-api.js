(function () {
  var currentSession = null;

  function setSession(session) {
    currentSession = session || null;
  }
  function getAccessToken(session) {
    var active = session || currentSession;
    return active && active.access_token ? active.access_token : "";
  }

  function pickSyncPayload(userId) {
    if (!window.Onboarding) return null;
    var state = window.Onboarding.getState(userId);
    return {
      journey: state.journey || null,
      scoreHistory: Array.isArray(state.scoreHistory) ? state.scoreHistory.slice(-12) : [],
      planProgress: state.planProgress || {}
    };
  }

  function applyRemoteState(userId, remoteState) {
    if (!remoteState || !window.Onboarding) return;
    var patch = {};
    if (remoteState.journey) patch.journey = remoteState.journey;
    if (Array.isArray(remoteState.scoreHistory)) patch.scoreHistory = remoteState.scoreHistory;
    if (remoteState.planProgress) patch.planProgress = remoteState.planProgress;
    if (remoteState.updatedAt) patch.appStateUpdatedAt = remoteState.updatedAt;
    if (Object.keys(patch).length) {
      window.Onboarding.saveState(userId, patch);
    }
  }

  function fetchRemoteState(session) {
    var token = getAccessToken(session);
    if (!token) {
      return Promise.resolve({ ok: false });
    }

    return fetch("/api/journey", {
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

  function pushRemoteState(session, userId) {
    var token = getAccessToken(session);
    var payload = pickSyncPayload(userId);
    if (!token || !payload) {
      return Promise.resolve({ ok: false });
    }

    return fetch("/api/journey", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return response.json().then(function (data) {
          if (response.ok && data.state && data.state.updatedAt) {
            window.Onboarding.saveState(userId, { appStateUpdatedAt: data.state.updatedAt });
          }
          return { ok: response.ok, status: response.status, data: data };
        });
      })
      .catch(function () {
        return { ok: false };
      });
  }

  function hydrate(session, userId) {
    if (!session || !userId || !window.Onboarding) {
      return Promise.resolve();
    }

    var local = window.Onboarding.getState(userId);
    var localUpdated = local.appStateUpdatedAt || "";

    return fetchRemoteState(session).then(function (result) {
      if (!result.ok || !result.data || !result.data.state) {
        if (local.journey) {
          return pushRemoteState(session, userId);
        }
        return null;
      }

      var remote = result.data.state;
      var remoteUpdated = remote.updatedAt || "";

      if (!localUpdated || (remoteUpdated && remoteUpdated >= localUpdated)) {
        applyRemoteState(userId, remote);
        return null;
      }

      if (localUpdated > remoteUpdated) {
        return pushRemoteState(session, userId);
      }

      return null;
    });
  }

  function sync(userId) {
    return pushRemoteState(currentSession, userId);
  }

  window.JourneyApi = {
    setSession: setSession,
    hydrate: hydrate,
    sync: sync
  };
})();
