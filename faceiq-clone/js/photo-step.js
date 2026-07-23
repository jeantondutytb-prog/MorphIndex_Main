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

  function showSaveError(message) {
    var existing = document.getElementById("photo-save-error");
    if (!existing) {
      existing = document.createElement("p");
      existing.id = "photo-save-error";
      existing.className = "auth__error";
      existing.setAttribute("role", "alert");
      var continueBtn = document.getElementById("onboarding-continue");
      if (continueBtn && continueBtn.parentNode) {
        continueBtn.parentNode.insertBefore(existing, continueBtn);
      }
    }
    existing.textContent = message;
    existing.hidden = !message;
  }

  function initPhotoStep(config) {
    var continueBtn = document.getElementById("onboarding-continue");
    var photoData = null;
    var userId = null;
    var isProcessing = false;
    var camera = null;

    function setProcessing(state) {
      isProcessing = state;
      if (continueBtn) continueBtn.disabled = state || !photoData;
      if (camera && camera.captureBtn) camera.captureBtn.disabled = state;
    }

    function onPhotoCaptured(dataUrl) {
      photoData = dataUrl;
      showSaveError("");
      if (continueBtn) continueBtn.disabled = isProcessing;
    }

    function onPhotoRetake() {
      photoData = null;
      showSaveError("");
      if (continueBtn) continueBtn.disabled = true;
    }

    camera = window.CameraCapture.create({
      mode: config.mode,
      zone: document.getElementById("photo-zone"),
      video: document.getElementById("camera-video"),
      overlay: document.getElementById("camera-overlay"),
      statusEl: document.getElementById("camera-status"),
      hudEl: document.getElementById("camera-hud"),
      hudIconEl: document.getElementById("camera-hud-icon"),
      guideEl: document.getElementById("camera-guide"),
      previewEl: document.getElementById("photo-preview"),
      captureBtn: document.getElementById("photo-capture"),
      galleryBtn: document.getElementById("photo-gallery"),
      retakeBtn: document.getElementById("photo-retake"),
      fileInput: document.getElementById("photo-input"),
      onCapture: onPhotoCaptured,
      onRetake: onPhotoRetake
    });

    var client = window.Onboarding.initSupabase();
    if (!client) {
      window.Onboarding.redirectToLogin();
      return;
    }

    window.Onboarding.requireStep(client, config.minStep, config.currentStep).then(function (ctx) {
      if (!ctx) return;
      userId = ctx.user.id;
      var state = window.Onboarding.getState(userId);

      if (config.requirePhotoKey && !state[config.requirePhotoKey]) {
        window.location.href = config.requirePhotoRedirect;
        return;
      }

      if (!state[config.photoKey] && !state.cameraReady && !state.cameraSkipped && config.mode === "front") {
        window.location.href = "/onboarding/camera";
        return;
      }

      if (state[config.photoKey]) {
        document.body.classList.remove("onboarding-camera-booting");
        camera.showPreview(state[config.photoKey]);
        photoData = state[config.photoKey];
        if (continueBtn) continueBtn.disabled = false;
      } else if (state.cameraSkipped) {
        camera.initGalleryOnly();
      } else {
        document.body.classList.add("onboarding-camera-booting");
        camera.init();
      }

      if (continueBtn) {
        continueBtn.addEventListener("click", function () {
          if (!photoData || isProcessing) return;
          var savePhoto = window.ImageCompress
            ? window.ImageCompress.compressDataUrl(photoData)
            : Promise.resolve(photoData);
          setProcessing(true);
          showSaveError("");
          savePhoto.then(function (compressedPhoto) {
            var patch = {};
            patch[config.photoKey] = compressedPhoto;
            if (state.rescanPending && config.photoKey === "frontPhoto") {
              patch.sidePhoto = null;
              patch.scanComplete = false;
              patch.analysis = null;
              patch.scores = null;
              patch.preview6mUrl = null;
              patch.previewGenerating = false;
              patch.previewError = false;
            }
            var result = window.Onboarding.saveState(userId, patch);
            if (!result.ok) {
              showSaveError(t("onboarding.storageError"));
              return;
            }
            window.location.href = config.nextUrl;
          }).catch(function () {
            showSaveError(t("onboarding.storageError"));
          }).finally(function () {
            setProcessing(false);
          });
        });
      }
    });

    window.addEventListener("pagehide", function () {
      if (camera) camera.destroy();
    });
  }

  window.PhotoStep = {
    init: initPhotoStep
  };
})();
