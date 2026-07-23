(function () {
  var ANCHOR_MS = Date.parse("2026-07-23T08:42:00Z");
  var INTERVAL_MS = 30 * 1000;
  var BASE_MEMBERS = 12051;
  var BASE_ANALYSES = 73452;

  var state = { members: null, analyses: null };

  function tickCount(base) {
    var elapsed = Date.now() - ANCHOR_MS;
    if (elapsed < 0) return base;
    return base + Math.floor(elapsed / INTERVAL_MS);
  }

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

      if (shouldAnimate && prevChar !== nextChar && prevChar.trim() !== "") {
        digitsHtml +=
          '<span class="stat-digit">' +
          '<span class="stat-digit__reel stat-digit__reel--spin">' +
          "<span>" + prevChar + "</span>" +
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

  function updateStats(animate) {
    var membersEl = document.querySelector("[data-stat-members]");
    var analysesEl = document.querySelector("[data-stat-analyses]");
    var members = tickCount(BASE_MEMBERS);
    var analyses = tickCount(BASE_ANALYSES);

    if (membersEl) renderCounter(membersEl, members, animate);
    if (analysesEl) renderCounter(analysesEl, analyses, animate);

    state.members = members;
    state.analyses = analyses;
  }

  function scheduleNextTick() {
    var elapsed = Date.now() - ANCHOR_MS;
    var remainder = INTERVAL_MS - (elapsed % INTERVAL_MS || INTERVAL_MS);
    setTimeout(function () {
      updateStats(true);
      scheduleNextTick();
    }, remainder);
  }

  window.MorphStats = {
    refresh: function () {
      updateStats(false);
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    updateStats(false);
    scheduleNextTick();
  });
})();
