(function () {
  var MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.14/model";
  var modelsPromise = null;

  function loadModels() {
    if (!window.faceapi) {
      return Promise.reject(new Error("Face detection is unavailable in this browser."));
    }
    if (!modelsPromise) {
      modelsPromise = Promise.all([
        window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        window.faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL)
      ]);
    }
    return modelsPromise;
  }

  function requestAccess() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return Promise.reject(new Error("Camera is not available on this device."));
    }
    return loadModels().then(function () {
      return navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 960 }
        }
      });
    }).then(function (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    });
  }

  window.CameraPrep = {
    MODEL_URL: MODEL_URL,
    loadModels: loadModels,
    requestAccess: requestAccess
  };
})();
