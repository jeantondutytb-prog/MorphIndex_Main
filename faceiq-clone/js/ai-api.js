(function () {
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

  window.AiApi = {
    analyzeFace: analyzeFace,
    generatePreview: generatePreview
  };
})();
