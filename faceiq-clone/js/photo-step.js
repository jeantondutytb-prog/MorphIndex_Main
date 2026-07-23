(function () {
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
      if (continueBtn) continueBtn.disabled = isProcessing;
    }

    function onPhotoRetake() {
      photoData = null;
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
          savePhoto.then(function (compressedPhoto) {
            var patch = {};
            patch[config.photoKey] = compressedPhoto;
            window.Onboarding.saveState(userId, patch);
            window.location.href = config.nextUrl;
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
