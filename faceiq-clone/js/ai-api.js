(function () {
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

  function getAccessToken(session) {
    return session && session.access_token ? session.access_token : "";
  }

  function postJson(path, token, payload) {
    return fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(payload || {})
    }).then(function (response) {
      return response.json().then(function (data) {
        return { ok: response.ok, status: response.status, data: data };
      });
    });
  }

  function compressForApi(dataUrl) {
    if (!dataUrl || !window.ImageCompress) {
      return Promise.resolve(dataUrl);
    }
    return window.ImageCompress.compressDataUrl(dataUrl);
  }

  function analyzeFace(session, frontPhoto, sidePhoto) {
    var token = getAccessToken(session);
    if (!token) {
      return Promise.resolve({ ok: false, error: "Not authenticated" });
    }

    return Promise.all([
      compressForApi(frontPhoto),
      compressForApi(sidePhoto)
    ]).then(function (photos) {
      return postJson("/api/analyze-face", token, {
        frontPhoto: photos[0],
        sidePhoto: photos[1]
      });
    }).then(function (result) {
      if (!result.ok) {
        return {
          ok: false,
          error: (result.data && result.data.error) || "Analysis failed",
          status: result.status
        };
      }
      return { ok: true, analysis: result.data.analysis, source: result.data.source };
    }).catch(function () {
      return { ok: false, error: "Network error" };
    });
  }

  function generatePreview(session, frontPhoto, plan) {
    var token = getAccessToken(session);
    if (!token) {
      return Promise.resolve({ ok: false, error: "Not authenticated" });
    }

    return compressForApi(frontPhoto).then(function (compressedPhoto) {
      return postJson("/api/generate-preview", token, {
        frontPhoto: compressedPhoto,
        plan: plan || []
      });
    }).then(function (result) {
      if (!result.ok) {
        return {
          ok: false,
          error: (result.data && result.data.error) || "Preview generation failed",
          status: result.status
        };
      }
      return {
        ok: true,
        previewUrl: result.data.previewUrl,
        generatedAt: result.data.generatedAt,
        source: result.data.source
      };
    }).catch(function () {
      return { ok: false, error: "Network error" };
    });
  }

  function chat(session, messages, analysis) {
    var token = getAccessToken(session);
    if (!token) {
      return Promise.resolve({ ok: false, error: "Not authenticated" });
    }

    return postJson("/api/chat", token, {
      messages: messages,
      analysis: analysis
    }).then(function (result) {
      if (!result.ok) {
        return {
          ok: false,
          error: (result.data && result.data.error) || "Chat failed",
          status: result.status
        };
      }
      return { ok: true, reply: result.data.reply };
    }).catch(function () {
      return { ok: false, error: "Network error" };
    });
  }

  function simulateProcedure(session, frontPhoto, procedure, intensity) {
    var token = getAccessToken(session);
    if (!token) {
      return Promise.resolve({ ok: false, error: "Not authenticated" });
    }

    return compressForApi(frontPhoto).then(function (compressedPhoto) {
      return postJson("/api/simulate-procedure", token, {
        frontPhoto: compressedPhoto,
        procedure: procedure,
        intensity: intensity
      });
    }).then(function (result) {
      if (!result.ok) {
        return {
          ok: false,
          error: (result.data && result.data.error) || "Simulation failed",
          status: result.status
        };
      }
      return {
        ok: true,
        previewUrl: result.data.previewUrl,
        generatedAt: result.data.generatedAt
      };
    }).catch(function () {
      return { ok: false, error: "Network error" };
    });
  }

  window.AiApi = {
    analyzeFace: analyzeFace,
    generatePreview: generatePreview,
    chat: chat,
    simulateProcedure: simulateProcedure
  };
})();
