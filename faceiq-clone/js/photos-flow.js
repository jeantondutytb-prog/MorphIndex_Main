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

  function init() {
    var phase = "front";
    var frontData = null;
    var sideData = null;
    var userId = null;
    var isProcessing = false;
    var camera = null;

    var titleEl = document.getElementById("photos-title");
    var subtitleEl = document.getElementById("photos-subtitle");
    var phaseLabelEl = document.getElementById("photos-phase-label");
    var continueBtn = document.getElementById("onboarding-continue");
    var grantBtn = document.getElementById("camera-access-grant");
    var skipBtn = document.getElementById("camera-access-skip");
    var cameraAccessEl = document.getElementById("photos-camera-access");
    var captureEl = document.getElementById("photos-capture");
    var errorEl = document.getElementById("photo-save-error");

    function showError(message) {
      if (!errorEl) return;
      errorEl.textContent = message || "";
      errorEl.hidden = !message;
    }

    function setProcessing(state) {
      isProcessing = state;
      if (continueBtn) continueBtn.disabled = state || !(frontData && sideData);
      if (camera && camera.captureBtn) camera.captureBtn.disabled = state;
    }

    function updatePhaseUI() {
      if (phaseLabelEl) {
        phaseLabelEl.textContent = phase === "front"
          ? t("onboarding.photos.phaseFront")
          : t("onboarding.photos.phaseSide");
      }
      if (titleEl) {
        titleEl.textContent = phase === "front"
          ? t("onboarding.front.title")
          : t("onboarding.side.title");
      }
      if (subtitleEl) {
        subtitleEl.textContent = phase === "front"
          ? t("onboarding.front.subtitle")
          : t("onboarding.side.subtitle");
      }
      if (continueBtn) {
        continueBtn.disabled = isProcessing || !(frontData && sideData);
      }
    }

    function destroyCamera() {
      if (camera) {
        camera.destroy();
        camera = null;
      }
    }

    function createCamera(mode) {
      destroyCamera();
      var overlay = document.getElementById("camera-overlay");
      if (overlay) {
        overlay.classList.toggle("onboarding__camera-overlay--side", mode === "side");
      }

      camera = window.CameraCapture.create({
        mode: mode,
        zone: document.getElementById("photo-zone"),
        video: document.getElementById("camera-video"),
        overlay: overlay,
        statusEl: document.getElementById("camera-status"),
        hudEl: document.getElementById("camera-hud"),
        hudIconEl: document.getElementById("camera-hud-icon"),
        guideEl: document.getElementById("camera-guide"),
        previewEl: document.getElementById("photo-preview"),
        captureBtn: document.getElementById("photo-capture"),
        galleryBtn: document.getElementById("photo-gallery"),
        retakeBtn: document.getElementById("photo-retake"),
        fileInput: document.getElementById("photo-input"),
        onCapture: function (dataUrl) {
          if (phase === "front") {
            frontData = dataUrl;
            phase = "side";
            updatePhaseUI();
            window.setTimeout(function () {
              startCapturePhase();
            }, 400);
          } else {
            sideData = dataUrl;
            updatePhaseUI();
          }
        },
        onRetake: function () {
          if (phase === "front") {
            frontData = null;
            sideData = null;
          } else {
            sideData = null;
          }
          updatePhaseUI();
        }
      });

      return camera;
    }

    function startCapturePhase() {
      if (!captureEl) return;
      captureEl.hidden = false;
      document.body.classList.add("onboarding-camera-booting");
      var cam = createCamera(phase);
      var state = window.Onboarding.getState(userId);

      if (phase === "front" && state.frontPhoto) {
        cam.showPreview(state.frontPhoto);
        frontData = state.frontPhoto;
        phase = "side";
        updatePhaseUI();
        startCapturePhase();
        return;
      }

      if (phase === "side" && state.sidePhoto) {
        cam.showPreview(state.sidePhoto);
        sideData = state.sidePhoto;
        document.body.classList.remove("onboarding-camera-booting");
        updatePhaseUI();
        return;
      }

      if (state.cameraSkipped) {
        document.body.classList.remove("onboarding-camera-booting");
        cam.initGalleryOnly();
      } else {
        cam.init().finally(function () {
          document.body.classList.remove("onboarding-camera-booting");
        });
      }
    }

    function showCameraAccess() {
      if (cameraAccessEl) cameraAccessEl.hidden = false;
      if (captureEl) captureEl.hidden = true;
      if (continueBtn) continueBtn.disabled = true;
    }

    function hideCameraAccess() {
      if (cameraAccessEl) cameraAccessEl.hidden = true;
      startCapturePhase();
    }

    var client = window.Onboarding.initSupabase();
    if (!client) {
      window.Onboarding.redirectToLogin();
      return;
    }

    window.Onboarding.requireStep(client, 2, 2).then(function (ctx) {
      if (!ctx) return;
      userId = ctx.user.id;
      var state = window.Onboarding.getState(userId);

      if (state.frontPhoto) frontData = state.frontPhoto;
      if (state.sidePhoto) sideData = state.sidePhoto;
      if (frontData && sideData) {
        phase = "side";
      } else if (frontData) {
        phase = "side";
      }

      updatePhaseUI();

      if (state.cameraReady || state.cameraSkipped) {
        hideCameraAccess();
      } else {
        showCameraAccess();
      }

      if (grantBtn) {
        grantBtn.addEventListener("click", function () {
          showError("");
          grantBtn.disabled = true;
          if (skipBtn) skipBtn.disabled = true;
          window.CameraPrep.requestAccess().then(function () {
            window.Onboarding.saveState(userId, { cameraReady: true, cameraSkipped: false });
            hideCameraAccess();
          }).catch(function () {
            showError(t("onboarding.cameraAccess.denied"));
          }).finally(function () {
            grantBtn.disabled = false;
            if (skipBtn) skipBtn.disabled = false;
          });
        });
      }

      if (skipBtn) {
        skipBtn.addEventListener("click", function () {
          window.Onboarding.saveState(userId, { cameraSkipped: true, cameraReady: false });
          hideCameraAccess();
        });
      }

      if (continueBtn) {
        continueBtn.addEventListener("click", function () {
          if (!frontData || !sideData || isProcessing) return;
          setProcessing(true);
          showError("");
          Promise.all([
            window.ImageCompress ? window.ImageCompress.compressDataUrl(frontData) : Promise.resolve(frontData),
            window.ImageCompress ? window.ImageCompress.compressDataUrl(sideData) : Promise.resolve(sideData)
          ]).then(function (photos) {
            var patch = {
              frontPhoto: photos[0],
              sidePhoto: photos[1],
              rescanPending: false
            };
            if (state.rescanPending) {
              patch.analysis = null;
              patch.scores = null;
              patch.scanComplete = false;
              patch.preview6mUrl = null;
            }
            var result = window.Onboarding.saveState(userId, patch);
            if (!result.ok) {
              showError(t("onboarding.storageError"));
              return;
            }
            window.location.href = "/onboarding/analyzing";
          }).catch(function () {
            showError(t("onboarding.storageError"));
          }).finally(function () {
            setProcessing(false);
          });
        });
      }
    });

    window.addEventListener("pagehide", destroyCamera);
  }

  window.PhotosFlow = { init: init };
})();
