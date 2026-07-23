(function () {
  var DEFAULTS = {
    maxEdge: 1280,
    quality: 0.85,
    mimeType: "image/jpeg",
    skipBelowBytes: 280000
  };

  function mergeOptions(options) {
    var merged = {};
    var key;
    for (key in DEFAULTS) {
      if (Object.prototype.hasOwnProperty.call(DEFAULTS, key)) {
        merged[key] = DEFAULTS[key];
      }
    }
    options = options || {};
    for (key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key) && options[key] != null) {
        merged[key] = options[key];
      }
    }
    return merged;
  }

  function estimateBytes(dataUrl) {
    if (!dataUrl) return 0;
    var base64 = dataUrl.split(",")[1] || "";
    return Math.round((base64.length * 3) / 4);
  }

  function shouldCompress(dataUrl, options) {
    if (!dataUrl || dataUrl.indexOf("data:image/") !== 0) return false;
    if (estimateBytes(dataUrl) <= options.skipBelowBytes && dataUrl.indexOf("image/jpeg") !== -1) {
      return false;
    }
    return true;
  }

  function loadImage(dataUrl) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function () {
        reject(new Error("Could not load image"));
      };
      img.src = dataUrl;
    });
  }

  function drawToCanvas(img, options) {
    var width = img.naturalWidth || img.width;
    var height = img.naturalHeight || img.height;
    if (!width || !height) {
      throw new Error("Invalid image dimensions");
    }

    var maxEdge = options.maxEdge;
    var scale = Math.min(1, maxEdge / Math.max(width, height));
    var targetWidth = Math.max(1, Math.round(width * scale));
    var targetHeight = Math.max(1, Math.round(height * scale));
    var canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    var ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas is not supported");
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, targetWidth, targetHeight);
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    return canvas.toDataURL(options.mimeType, options.quality);
  }

  function compressDataUrl(dataUrl, options) {
    var opts = mergeOptions(options);
    if (!shouldCompress(dataUrl, opts)) {
      return Promise.resolve(dataUrl);
    }
    return loadImage(dataUrl).then(function (img) {
      return drawToCanvas(img, opts);
    });
  }

  function readFileAsDataUrl(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (event) {
        resolve(event.target.result);
      };
      reader.onerror = function () {
        reject(new Error("Could not read file"));
      };
      reader.readAsDataURL(file);
    });
  }

  function compressFile(file, options) {
    if (!file) {
      return Promise.reject(new Error("No file provided"));
    }
    return readFileAsDataUrl(file).then(function (dataUrl) {
      return compressDataUrl(dataUrl, options);
    });
  }

  window.ImageCompress = {
    DEFAULTS: DEFAULTS,
    estimateBytes: estimateBytes,
    shouldCompress: shouldCompress,
    compressDataUrl: compressDataUrl,
    compressFile: compressFile
  };
})();
