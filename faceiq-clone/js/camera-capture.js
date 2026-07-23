(function () {
  var MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.14/model";
  var DETECT_INTERVAL_MS = 80;
  var AUTO_CAPTURE_FRAMES = 14;

  var GUIDES = {
    front: {
      cx: 0.5,
      cy: 0.44,
      width: 0.52,
      height: 0.62,
      minYaw: -0.18,
      maxYaw: 0.18
    },
    side: {
      cx: 0.54,
      cy: 0.44,
      width: 0.48,
      height: 0.62,
      minYaw: 0.22,
      maxYaw: 1
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
    this.destroyed = false;

    this.zone = options.zone;
    this.video = options.video;
    this.overlay = options.overlay;
    this.statusEl = options.statusEl;
    this.previewEl = options.previewEl;
    this.captureBtn = options.captureBtn;
    this.galleryBtn = options.galleryBtn;
    this.retakeBtn = options.retakeBtn;
    this.fileInput = options.fileInput;
    this.onCapture = options.onCapture || function () {};
    this.onRetake = options.onRetake || function () {};
    this.onReadyChange = options.onReadyChange || function () {};
  }

  CameraCapture.prototype.setStatus = function (key, fallback, state) {
    this.lastStatusKey = key;
    this.lastStatusFallback = fallback;
    var text = t(key, fallback);
    if (this.statusEl) {
      this.statusEl.textContent = text;
      this.statusEl.setAttribute("data-camera-status", state || "default");
    }
    this.lastStatus = state || "default";
    if (this.overlay) {
      this.overlay.classList.toggle("is-aligned", state === "aligned");
      this.overlay.classList.toggle("is-warning", state === "warning");
    }
  };

  CameraCapture.prototype.loadModels = function () {
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

    if (sizeRatio < 0.42) {
      return { aligned: false, reason: "closer" };
    }
    if (sizeRatio > 0.95) {
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
    this.setStatus(entry[0], entry[1], entry[2]);
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
        self.scheduleDetect();
      });
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

    var width = video.videoWidth;
    var height = video.videoHeight;
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (this.mirror) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, width, height);
    this.stopCamera();
    this.setStatus(
      auto ? "onboarding.camera.capturing" : "onboarding.camera.captured",
      auto ? "Capturing…" : "Photo captured",
      "aligned"
    );

    var dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    var finalize = function (compressed) {
      if (this.previewEl) {
        this.previewEl.src = compressed;
        this.previewEl.hidden = false;
      }
      if (this.zone) {
        this.zone.classList.add("has-preview");
      }
      if (this.video) this.video.hidden = true;
      if (this.overlay) this.overlay.hidden = true;
      if (this.captureBtn) this.captureBtn.hidden = true;
      if (this.galleryBtn) this.galleryBtn.hidden = true;
      if (this.retakeBtn) this.retakeBtn.hidden = false;
      this.onCapture(compressed);
    }.bind(this);

    if (window.ImageCompress) {
      window.ImageCompress.compressDataUrl(dataUrl).then(finalize).catch(function () {
        finalize(dataUrl);
      });
    } else {
      finalize(dataUrl);
    }
  };

  CameraCapture.prototype.showLive = function () {
    this.captured = false;
    this.alignedFrames = 0;
    if (this.previewEl) {
      this.previewEl.hidden = true;
      this.previewEl.src = "";
    }
    if (this.zone) this.zone.classList.remove("has-preview");
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
    if (this.zone) this.zone.classList.add("has-preview");
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
      self.setStatus("onboarding.camera.searching", "Position your face in the frame", "default");
      self.scheduleDetect();
    }).catch(function () {
      self.setStatus("onboarding.camera.denied", "Camera unavailable — use gallery instead", "warning");
    });
  };

  CameraCapture.prototype.bindEvents = function () {
    var self = this;
    document.addEventListener("langchange", function () {
      if (self.lastStatusKey) {
        self.setStatus(self.lastStatusKey, self.lastStatusFallback, self.lastStatus);
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
    this.setStatus("onboarding.camera.loading", "Starting camera…", "default");

    return this.loadModels().then(function () {
      return self.startCamera();
    }).then(function () {
      self.detecting = true;
      self.onReadyChange(true);
      self.setStatus("onboarding.camera.searching", "Position your face in the frame", "default");
      self.scheduleDetect();
    }).catch(function () {
      self.onReadyChange(false);
      self.setStatus("onboarding.camera.denied", "Camera unavailable — use gallery instead", "warning");
      if (self.captureBtn) self.captureBtn.disabled = true;
    });
  };

  CameraCapture.prototype.destroy = function () {
    this.destroyed = true;
    this.stopCamera();
  };

  window.CameraCapture = {
    create: function (options) {
      return new CameraCapture(options);
    }
  };
})();
