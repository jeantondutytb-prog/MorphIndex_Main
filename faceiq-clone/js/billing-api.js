(function () {
  function getAccessToken(session) {
    return session && session.access_token ? session.access_token : "";
  }

  function createCheckoutSession(session, plan) {
    var token = getAccessToken(session);
    if (!token) {
      return Promise.resolve({ ok: false, error: "Not authenticated" });
    }

    return fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ plan: plan || "yearly" })
    }).then(function (response) {
      return response.json().then(function (data) {
        return { ok: response.ok, status: response.status, data: data };
      });
    }).then(function (result) {
      if (!result.ok) {
        return {
          ok: false,
          error: (result.data && result.data.error) || "Checkout failed",
          status: result.status
        };
      }
      return { ok: true, url: result.data.url };
    }).catch(function () {
      return { ok: false, error: "Network error" };
    });
  }

  function verifyCheckout(session, sessionId) {
    var token = getAccessToken(session);
    if (!token || !sessionId) {
      return Promise.resolve({ ok: false, error: "Missing session" });
    }

    return fetch("/api/verify-checkout?session_id=" + encodeURIComponent(sessionId), {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(function (response) {
      return response.json().then(function (data) {
        return { ok: response.ok, status: response.status, data: data };
      });
    }).then(function (result) {
      if (!result.ok) {
        return {
          ok: false,
          error: (result.data && result.data.error) || "Verification failed",
          status: result.status
        };
      }
      return { ok: true, active: !!result.data.active };
    }).catch(function () {
      return { ok: false, error: "Network error" };
    });
  }

  window.BillingApi = {
    createCheckoutSession: createCheckoutSession,
    verifyCheckout: verifyCheckout
  };
})();
