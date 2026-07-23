(function () {
  var MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.14/model";
  var DETECT_INTERVAL_MS = 80;
  var AUTO_CAPTURE_FRAMES = 14;

  var GUIDES = {
    front: {
      cx: 0.5,
      cy: 0.46,
      width: 0.4,
      height: 0.52,
      minYaw: -0.18,
      maxYaw: 0.18,
      minSize: 0.58,
      maxSize: 0.9
    },
    side: {
      cx: 0.54,
      cy: 0.46,
      width: 0.38,
      height: 0.52,
      minYaw: 0.22,
      maxYaw: 1,
      minSize: 0.55,
      maxSize: 0.9
    }
  };

  function t(key, fallback) {
    if (window.I18N_T) {
      var lang = localStorage.getItem("lang") || "en";
      var dict = window.I18N_T[lang] || window.I18N_T.en;
      var value = key.split(".").reduce(function (o, k) {
        return o && o[k];
      }, dict);
      if (value != null) return value;
    }
    return fallback;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function estimateYaw(landmarks) {
    if (!landmarks || !landmarks.positions) return 0;
    var points = landmarks.positions;
    var leftCheek = points[0];
    var rightCheek = points[16];
    var nose = points[30];
    if (!leftCheek || !rightCheek || !nose) return 0;
    var faceWidth = rightCheek.x - leftCheek.x;
    if (!faceWidth) return 0;
    return (nose.x - (leftCheek.x + rightCheek.x) / 2) / faceWidth;
  }

  function mirrorBox(box, width) {
    return {
      x: width - box.x - box.width,
      y: box.y,
      width: box.width,
      height: box.height
    };
  }

  function CameraCapture(options) {
    this.options = options || {};
    this.mode = options.mode === "side" ? "side" : "front";
    this.mirror = this.mode === "front";
    this.guide = GUIDES[this.mode];
    this.stream = null;
    this.modelsReady = false;
    this.detecting = false;
    this.captured = false;
    this.rafId = null;
    this.detectTimer = null;
    this.alignedFrames = 0;
    this.lastStatus = "";
    this.lastDetection = null;
    this.destroyed = false;

    this.zone = options.zone;
    this.video = options.video;
    this.overlay = options.overlay;
    this.statusEl = options.statusEl;
    this.hudEl = options.hudEl;
    this.hudIconEl = options.hudIconEl;
    this.guideEl = options.guideEl;
    this.previewEl = options.previewEl;
    this.captureBtn = options.captureBtn;
    this.galleryBtn = options.galleryBtn;
    this.retakeBtn = options.retakeBtn;
    this.fileInput = options.fileInput;
    this.onCapture = options.onCapture || function () {};
    this.onRetake = options.onRetake || function () {};
    this.onReadyChange = options.onReadyChange || function () {};
  }

  CameraCapture.prototype.setStatus = function (key, fallback, state, reason) {
    this.lastStatusKey = key;
    this.lastStatusFallback = fallback;
    this.lastReason = reason || this.lastReason || "searching";
    var text = t(key, fallback);
    if (this.statusEl) {
      this.statusEl.textContent = text;
      this.statusEl.setAttribute("data-camera-status", state || "default");
    }
    if (this.guideEl) {
      this.guideEl.textContent = text;
    }
    if (this.overlay) {
      this.overlay.classList.toggle("is-aligned", state === "aligned");
      this.overlay.classList.toggle("is-warning", state === "warning");
      if (reason) {
        this.overlay.setAttribute("data-hint", reason);
      }
    }
    if (this.hudEl) {
      this.hudEl.hidden = false;
      this.hudEl.setAttribute("data-hint", this.lastReason);
    }
    if (this.hudIconEl) {
      this.hudIconEl.setAttribute("data-hint", this.lastReason);
    }
    this.lastStatus = state || "default";
  };

  CameraCapture.prototype.loadModels = function () {
    if (window.CameraPrep && window.CameraPrep.loadModels) {
      return window.CameraPrep.loadModels();
    }
    if (!window.faceapi) {
      return Promise.reject(new Error("face-api unavailable"));
    }
    if (this.modelsReady) return Promise.resolve();
    return Promise.all([
      window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      window.faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL)
    ]).then(function () {
      this.modelsReady = true;
    }.bind(this));
  };

  CameraCapture.prototype.startCamera = function () {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return Promise.reject(new Error("Camera unavailable"));
    }
    return navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 960 }
      }
    }).then(function (stream) {
      this.stream = stream;
      this.video.srcObject = stream;
      return this.video.play();
    }.bind(this));
  };

  CameraCapture.prototype.stopCamera = function () {
    if (this.detectTimer) {
      clearTimeout(this.detectTimer);
      this.detectTimer = null;
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.detecting = false;
    if (this.stream) {
      this.stream.getTracks().forEach(function (track) {
        track.stop();
      });
      this.stream = null;
    }
    if (this.video) {
      this.video.srcObject = null;
    }
  };

  CameraCapture.prototype.getGuideRect = function () {
    var width = this.zone.clientWidth;
    var height = this.zone.clientHeight;
    return {
      x: (this.guide.cx - this.guide.width / 2) * width,
      y: (this.guide.cy - this.guide.height / 2) * height,
      width: this.guide.width * width,
      height: this.guide.height * height,
      centerX: this.guide.cx * width,
      centerY: this.guide.cy * height
    };
  };

  CameraCapture.prototype.evaluateAlignment = function (detection) {
    if (!detection) {
      return { aligned: false, reason: "searching" };
    }

    var videoWidth = this.video.videoWidth;
    var videoHeight = this.video.videoHeight;
    if (!videoWidth || !videoHeight) {
      return { aligned: false, reason: "searching" };
    }

    var box = detection.detection.box;
    if (this.mirror) {
      box = mirrorBox(box, videoWidth);
    }

    var zoneWidth = this.zone.clientWidth;
    var zoneHeight = this.zone.clientHeight;
    var scale = Math.max(zoneWidth / videoWidth, zoneHeight / videoHeight);
    var displayWidth = videoWidth * scale;
    var displayHeight = videoHeight * scale;
    var offsetX = (zoneWidth - displayWidth) / 2;
    var offsetY = (zoneHeight - displayHeight) / 2;

    var faceCenterX = offsetX + (box.x + box.width / 2) * scale;
    var faceCenterY = offsetY + (box.y + box.height / 2) * scale;
    var faceWidth = box.width * scale;
    var guide = this.getGuideRect();
    var dx = Math.abs(faceCenterX - guide.centerX) / guide.width;
    var dy = Math.abs(faceCenterY - guide.centerY) / guide.height;
    var sizeRatio = faceWidth / guide.width;

    if (sizeRatio < this.guide.minSize) {
      return { aligned: false, reason: "closer" };
    }
    if (sizeRatio > this.guide.maxSize) {
      return { aligned: false, reason: "farther" };
    }
    if (dx > 0.22 || dy > 0.24) {
      return { aligned: false, reason: "center" };
    }

    var yaw = estimateYaw(detection.landmarks);
    if (this.mirror) yaw = -yaw;

    if (this.mode === "front") {
      if (yaw < this.guide.minYaw || yaw > this.guide.maxYaw) {
        return { aligned: false, reason: "angle-front" };
      }
    } else if (Math.abs(yaw) < this.guide.minYaw) {
      return { aligned: false, reason: "angle-side" };
    }

    return { aligned: true, reason: "aligned" };
  };

  CameraCapture.prototype.updateStatusForReason = function (reason) {
    var map = {
      searching: ["onboarding.camera.searching", "Position your face in the frame", "default"],
      closer: ["onboarding.camera.closer", "Move a little closer", "warning"],
      farther: ["onboarding.camera.farther", "Move back slightly", "warning"],
      center: ["onboarding.camera.center", "Center your face in the oval", "warning"],
      "angle-front": ["onboarding.camera.angleFront", "Look straight at the camera", "warning"],
      "angle-side": ["onboarding.camera.angleSide", "Turn your head to show your profile", "warning"],
      aligned: ["onboarding.camera.aligned", "Perfect — hold still…", "aligned"],
      capturing: ["onboarding.camera.capturing", "Capturing…", "aligned"]
    };
    var entry = map[reason] || map.searching;
    this.setStatus(entry[0], entry[1], entry[2], reason);
  };

  CameraCapture.prototype.detectOnce = function () {
    if (this.destroyed || this.captured || !this.detecting || !this.modelsReady) return;

    var video = this.video;
    if (!video.videoWidth) {
      this.scheduleDetect();
      return;
    }

    var self = this;
    window.faceapi
      .detectSingleFace(video, new window.faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.45 }))
      .withFaceLandmarks(true)
      .then(function (detection) {
        if (self.destroyed || self.captured) return;
        if (detection) self.lastDetection = detection;
        var result = self.evaluateAlignment(detection);
        self.updateStatusForReason(result.reason);

        if (result.aligned) {
          self.alignedFrames += 1;
          if (self.alignedFrames >= AUTO_CAPTURE_FRAMES) {
            self.captureFrame(true);
            return;
          }
        } else {
          self.alignedFrames = 0;
        }
        self.scheduleDetect();
      })
      .catch(function () {
        self.updateStatusForReason("searching");
        self.scheduleDetect();
      });
  };

  CameraCapture.prototype.setScanMode = function (active) {
    if (!this.zone) return;
    if (active) {
      this.zone.classList.add("is-scanning");
      this.zone.classList.remove("has-preview");
      document.body.classList.add("onboarding-scan-active");
      document.body.classList.remove("onboarding-camera-booting");
      if (this.hudEl) this.hudEl.hidden = false;
    } else {
      this.zone.classList.remove("is-scanning", "is-capturing");
      document.body.classList.remove("onboarding-scan-active");
      document.body.classList.remove("onboarding-camera-booting");
      if (this.hudEl) this.hudEl.hidden = true;
    }
  };

  CameraCapture.prototype.getHeadCropRect = function (video, detection) {
    var vw = video.videoWidth;
    var vh = video.videoHeight;
    var box = detection && detection.detection ? detection.detection.box : null;
    var x;
    var y;
    var w;
    var h;

    if (box) {
      x = box.x;
      y = box.y;
      w = box.width;
      h = box.height;
      x -= w * 0.42;
      y -= h * 0.62;
      w += w * 0.84;
      h += h * 1.05;
    } else {
      var size = Math.min(vw, vh) * 0.72;
      w = size;
      h = size * 1.28;
      x = (vw - w) / 2;
      y = (vh - h) * 0.42;
    }

    x = clamp(x, 0, vw - 1);
    y = clamp(y, 0, vh - 1);
    w = clamp(w, 1, vw - x);
    h = clamp(h, 1, vh - y);

    var centerX = x + w / 2;
    var centerY = y + h / 2;
    var targetRatio = 3 / 4;
    var currentRatio = w / h;
    if (currentRatio > targetRatio) {
      w = h * targetRatio;
    } else {
      h = w / targetRatio;
    }
    x = centerX - w / 2;
    y = centerY - h / 2;
    w = clamp(w, 1, vw - x);
    h = clamp(h, 1, vh - y);

    return { x: x, y: y, width: w, height: h };
  };

  CameraCapture.prototype.drawHeadCapture = function (video, detection) {
    var crop = this.getHeadCropRect(video, detection);
    var canvas = document.createElement("canvas");
    canvas.width = Math.round(crop.width);
    canvas.height = Math.round(crop.height);
    var ctx = canvas.getContext("2d");
    if (!ctx) return null;

    if (this.mirror) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(
        video,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    } else {
      ctx.drawImage(
        video,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }

    return canvas;
  };

  CameraCapture.prototype.exitScanWithPreview = function () {
    this.setScanMode(false);
    if (this.zone) this.zone.classList.add("has-preview");
  };

  CameraCapture.prototype.scheduleDetect = function () {
    if (this.destroyed || this.captured || !this.detecting) return;
    var self = this;
    this.detectTimer = window.setTimeout(function () {
      self.detectOnce();
    }, DETECT_INTERVAL_MS);
  };

  CameraCapture.prototype.captureFrame = function (auto) {
    if (this.captured || this.destroyed) return;
    var video = this.video;
    if (!video.videoWidth || !video.videoHeight) return;

    this.captured = true;
    this.detecting = false;

    var canvas = this.drawHeadCapture(video, this.lastDetection);
    if (!canvas) return;
    if (this.zone) this.zone.classList.add("is-capturing");
    this.stopCamera();
    this.setStatus(
      auto ? "onboarding.camera.capturing" : "onboarding.camera.captured",
      auto ? "Capturing…" : "Photo captured",
      "aligned"
    );

    var dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    var self = this;
    var finalize = function (compressed) {
      if (self.previewEl) {
        self.previewEl.src = compressed;
        self.previewEl.hidden = false;
      }
      self.exitScanWithPreview();
      if (self.video) self.video.hidden = true;
      if (self.overlay) self.overlay.hidden = true;
      if (self.captureBtn) self.captureBtn.hidden = true;
      if (self.galleryBtn) self.galleryBtn.hidden = true;
      if (self.retakeBtn) self.retakeBtn.hidden = false;
      self.onCapture(compressed);
    };

    window.setTimeout(function () {
      if (window.ImageCompress) {
        window.ImageCompress.compressDataUrl(dataUrl).then(finalize).catch(function () {
          finalize(dataUrl);
        });
      } else {
        finalize(dataUrl);
      }
    }, 280);
  };

  CameraCapture.prototype.showLive = function () {
    this.captured = false;
    this.alignedFrames = 0;
    if (this.previewEl) {
      this.previewEl.hidden = true;
      this.previewEl.src = "";
    }
    this.setScanMode(true);
    if (this.video) this.video.hidden = false;
    if (this.overlay) this.overlay.hidden = false;
    if (this.captureBtn) {
      this.captureBtn.hidden = false;
      this.captureBtn.disabled = false;
    }
    if (this.galleryBtn) this.galleryBtn.hidden = false;
    if (this.retakeBtn) this.retakeBtn.hidden = true;
  };

  CameraCapture.prototype.showPreview = function (dataUrl) {
    this.captured = true;
    this.stopCamera();
    if (this.previewEl) {
      this.previewEl.src = dataUrl;
      this.previewEl.hidden = false;
    }
    this.exitScanWithPreview();
    if (this.video) this.video.hidden = true;
    if (this.overlay) this.overlay.hidden = true;
    if (this.captureBtn) this.captureBtn.hidden = true;
    if (this.galleryBtn) this.galleryBtn.hidden = true;
    if (this.retakeBtn) this.retakeBtn.hidden = false;
    this.setStatus("onboarding.camera.captured", "Photo captured", "aligned");
  };

  CameraCapture.prototype.retake = function () {
    this.onRetake();
    this.showLive();
    var self = this;
    this.startCamera().then(function () {
      self.detecting = true;
      self.setStatus("onboarding.camera.searching", "Position your face in the frame", "default", "searching");
      self.scheduleDetect();
    }).catch(function () {
      self.setStatus("onboarding.camera.denied", "Camera unavailable — use gallery instead", "warning");
    });
  };

  CameraCapture.prototype.bindEvents = function () {
    var self = this;
    document.addEventListener("langchange", function () {
      if (self.lastStatusKey) {
        self.setStatus(self.lastStatusKey, self.lastStatusFallback, self.lastStatus, self.lastReason);
      }
    });
    if (this.captureBtn) {
      this.captureBtn.addEventListener("click", function () {
        if (!self.captured) self.captureFrame(false);
      });
    }
    if (this.galleryBtn && this.fileInput) {
      this.galleryBtn.addEventListener("click", function () {
        self.fileInput.click();
      });
      this.fileInput.addEventListener("change", function () {
        var file = self.fileInput.files && self.fileInput.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (event) {
          var dataUrl = event.target.result;
          var apply = function (compressed) {
            self.stopCamera();
            self.showPreview(compressed);
            self.onCapture(compressed);
          };
          if (window.ImageCompress) {
            window.ImageCompress.compressDataUrl(dataUrl).then(apply).catch(function () {
              apply(dataUrl);
            });
          } else {
            apply(dataUrl);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    if (this.retakeBtn) {
      this.retakeBtn.addEventListener("click", function () {
        self.fileInput.value = "";
        self.retake();
      });
    }
  };

  CameraCapture.prototype.init = function () {
    var self = this;
    this.bindEvents();
    this.zone.classList.add("onboarding__photo-zone--camera");
    document.body.classList.add("onboarding-camera-booting");
    this.setStatus("onboarding.camera.loading", "Starting camera…", "default", "searching");

    return this.loadModels().then(function () {
      self.modelsReady = true;
      return self.startCamera();
    }).then(function () {
      self.setScanMode(true);
      self.detecting = true;
      self.onReadyChange(true);
      self.setStatus("onboarding.camera.searching", "Position your face in the frame", "default", "searching");
      self.scheduleDetect();
    }).catch(function () {
      document.body.classList.remove("onboarding-camera-booting");
      self.setScanMode(false);
      self.onReadyChange(false);
      self.setStatus("onboarding.camera.denied", "Camera unavailable — use gallery instead", "warning");
      if (self.captureBtn) self.captureBtn.disabled = true;
    });
  };

  CameraCapture.prototype.destroy = function () {
    this.destroyed = true;
    this.setScanMode(false);
    this.stopCamera();
  };

  window.CameraCapture = {
    create: function (options) {
      return new CameraCapture(options);
    }
  };
})();
