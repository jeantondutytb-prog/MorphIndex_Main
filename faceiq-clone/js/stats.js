(function () {
  var ANCHOR_MS = Date.parse("2026-07-23T08:42:00Z");
  var INTERVAL_MS = 10 * 60 * 1000;
  var BASE_MEMBERS = 12051;
  var BASE_ANALYSES = 73452;

  function tickCount(base) {
    var elapsed = Date.now() - ANCHOR_MS;
    if (elapsed < 0) return base;
    return base + Math.floor(elapsed / INTERVAL_MS);
  }

  function formatCount(value) {
    var lang = document.documentElement.getAttribute("lang") || "en";
    return value.toLocaleString(lang);
  }

  function updateStats() {
    var membersEl = document.querySelector("[data-stat-members]");
    var analysesEl = document.querySelector("[data-stat-analyses]");
    if (membersEl) membersEl.textContent = formatCount(tickCount(BASE_MEMBERS));
    if (analysesEl) analysesEl.textContent = formatCount(tickCount(BASE_ANALYSES));
  }

  function scheduleNextTick() {
    var elapsed = Date.now() - ANCHOR_MS;
    var remainder = INTERVAL_MS - (elapsed % INTERVAL_MS || INTERVAL_MS);
    setTimeout(function () {
      updateStats();
      scheduleNextTick();
    }, remainder);
  }

  window.MorphStats = { refresh: updateStats };

  document.addEventListener("DOMContentLoaded", function () {
    updateStats();
    scheduleNextTick();
  });
})();
