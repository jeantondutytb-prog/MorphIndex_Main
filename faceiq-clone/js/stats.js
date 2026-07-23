(function () {
  var INTERVAL_MS = 5000;
  var OFFSET_MS = 2500;
  var BASE_MEMBERS = 225000;
  var BASE_ANALYSES = 175000;

  var counts = { members: BASE_MEMBERS, analyses: BASE_ANALYSES };

  function formatCount(value) {
    var lang = document.documentElement.getAttribute("lang") || "en";
    return value.toLocaleString(lang);
  }

  function padLeft(str, len) {
    while (str.length < len) str = " " + str;
    return str;
  }

  function renderCounter(el, value, animate) {
    var formatted = formatCount(value);
    var prevFormatted = el.dataset.formatted || null;
    var prevValue = el.dataset.value ? parseInt(el.dataset.value, 10) : null;
    var shouldAnimate = animate && prevValue !== null && value > prevValue;

    var oldAligned = prevFormatted ? padLeft(prevFormatted, formatted.length) : padLeft(formatted, formatted.length);
    var newAligned = formatted;

    var digitsHtml = "";
    for (var i = 0; i < newAligned.length; i++) {
      var nextChar = newAligned[i];
      var prevChar = oldAligned[i];

      if (nextChar === "," || nextChar === " ") {
        digitsHtml += '<span class="stat-digit stat-digit--sep" aria-hidden="true">' + nextChar + "</span>";
        continue;
      }

      if (shouldAnimate && prevChar !== nextChar) {
        var fromChar = prevChar.trim() !== "" ? prevChar : nextChar;
        digitsHtml +=
          '<span class="stat-digit">' +
          '<span class="stat-digit__reel stat-digit__reel--spin">' +
          "<span>" + fromChar + "</span>" +
          "<span>" + nextChar + "</span>" +
          "</span></span>";
      } else {
        digitsHtml +=
          '<span class="stat-digit">' +
          '<span class="stat-digit__reel"><span>' + nextChar + "</span></span>" +
          "</span>";
      }
    }

    el.innerHTML =
      '<span class="stat-counter__value" aria-label="' + formatted + ' plus">' +
      digitsHtml +
      '</span><span class="stat-counter__plus" aria-hidden="true">+</span>';

    el.dataset.value = String(value);
    el.dataset.formatted = formatted;

    if (shouldAnimate) {
      el.querySelectorAll(".stat-digit__reel--spin").forEach(function (reel) {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            reel.classList.add("is-spinning");
          });
        });
      });
    }
  }

  function renderStat(key, animate) {
    var el = document.querySelector("[data-stat-" + key + "]");
    if (el) renderCounter(el, counts[key], animate);
  }

  function tickStat(key) {
    counts[key] += 1;
    renderStat(key, true);
  }

  function refreshAll(animate) {
    renderStat("members", animate);
    renderStat("analyses", animate);
  }

  window.MorphStats = {
    refresh: function () {
      refreshAll(false);
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    refreshAll(false);

    setInterval(function () {
      tickStat("members");
    }, INTERVAL_MS);

    setTimeout(function () {
      tickStat("analyses");
      setInterval(function () {
        tickStat("analyses");
      }, INTERVAL_MS);
    }, OFFSET_MS);
  });
})();
