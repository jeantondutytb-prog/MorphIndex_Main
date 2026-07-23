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

  function pillarLabel(pillar) {
    var map = { harmony: "pillars.p1", angularity: "pillars.p2", dimorphism: "pillars.p3", features: "pillars.p4" };
    return t(map[pillar] || pillar);
  }

  function statusLabel(status) {
    return t("dashboard.status." + status);
  }

  function impactLabel(impact) {
    return t("dashboard.impact." + impact);
  }

  function renderPreview(container, state, analysis, options) {
    if (!container) return;
    options = options || {};

    if (!state.frontPhoto && !state.preview6mUrl && !options.loading) {
      container.hidden = true;
      return;
    }

    container.hidden = false;
    var beforeSrc = state.frontPhoto || "";
    var afterSrc = state.preview6mUrl || "";
    var loading = options.loading;

    container.innerHTML =
      '<section class="dashboard-preview">' +
        '<div class="dashboard-preview__head">' +
          '<h2 class="dashboard-section__title">' + t("dashboard.preview.title") + '</h2>' +
          '<p class="dashboard-section__subtitle">' + t("dashboard.preview.subtitle") + '</p>' +
        '</div>' +
        '<div class="dashboard-preview__grid">' +
          '<figure class="dashboard-preview__card">' +
            '<img src="' + beforeSrc + '" alt="">' +
            '<figcaption>' + t("dashboard.preview.before") + '</figcaption>' +
          '</figure>' +
          '<figure class="dashboard-preview__card' + (loading ? " is-loading" : "") + '">' +
            (afterSrc
              ? '<img src="' + afterSrc + '" alt="">'
              : '<div class="dashboard-preview__placeholder"><span class="dashboard-preview__spinner" aria-hidden="true"></span><p>' +
                t("dashboard.preview.generating") +
                "</p></div>") +
            '<figcaption>' + t("dashboard.preview.after") + '</figcaption>' +
          '</figure>' +
        '</div>' +
        (analysis && analysis.potential
          ? '<p class="dashboard-preview__note">' +
            t("dashboard.preview.scoreNote")
              .replace("{current}", analysis.scores.overall)
              .replace("{potential}", analysis.potential.overall) +
            "</p>"
          : "") +
      "</section>";
  }

  function renderScoreHero(container, analysis) {
    var scores = analysis.scores;
    container.innerHTML =
      '<div class="dashboard-hero">' +
        '<div class="dashboard-hero__main">' +
          '<span class="dashboard-hero__label" data-i18n="dashboard.overall">' + t("dashboard.overall") + '</span>' +
          '<div class="dashboard-hero__score">' + scores.overall + '<small>/10</small></div>' +
          '<span class="dashboard-hero__percentile">' + t("dashboard.percentile").replace("{n}", analysis.percentile) + '</span>' +
        '</div>' +
        '<div class="dashboard-hero__potential">' +
          '<span class="dashboard-hero__label" data-i18n="dashboard.potential">' + t("dashboard.potential") + '</span>' +
          '<div class="dashboard-hero__potential-value">' + scores.overall + ' <span>→</span> ' + analysis.potential.overall + '</div>' +
          '<div class="dashboard-hero__potential-bar"><div class="dashboard-hero__potential-fill" style="width:' + (analysis.potential.overall / 10 * 100) + '%"></div></div>' +
        '</div>' +
      '</div>';
  }

  function renderPhotos(container, state) {
    if (!state.frontPhoto && !state.sidePhoto) {
      container.hidden = true;
      return;
    }
    container.hidden = false;
    var html = '<div class="dashboard-photos">';
    if (state.frontPhoto) {
      html += '<figure class="dashboard-photos__item"><img src="' + state.frontPhoto + '" alt=""><figcaption data-i18n="dashboard.photoFront">' + t("dashboard.photoFront") + '</figcaption></figure>';
    }
    if (state.sidePhoto) {
      html += '<figure class="dashboard-photos__item"><img src="' + state.sidePhoto + '" alt=""><figcaption data-i18n="dashboard.photoSide">' + t("dashboard.photoSide") + '</figcaption></figure>';
    }
    html += '</div>';
    container.innerHTML = html;
  }

  function renderPillarBars(container, analysis) {
    var pillars = ["harmony", "angularity", "dimorphism", "features"];
    var html = '<div class="dashboard-pillars">';
    pillars.forEach(function (pillar) {
      var data = analysis.pillars[pillar];
      html +=
        '<div class="dashboard-pillars__item">' +
          '<div class="dashboard-pillars__head">' +
            '<span>' + pillarLabel(pillar) + '</span>' +
            '<strong>' + data.score + '</strong>' +
          '</div>' +
          '<div class="dashboard-pillars__bar"><div class="dashboard-pillars__fill" style="width:' + (data.score / 10 * 100) + '%"></div></div>' +
        '</div>';
    });
    html += '</div>';
    container.innerHTML = html;
  }

  function renderMetricsTabs(container, analysis) {
    var pillars = ["harmony", "angularity", "dimorphism", "features"];
    var html = '<div class="dashboard-tabs">';
    html += '<div class="dashboard-tabs__nav" role="tablist">';
    pillars.forEach(function (pillar, i) {
      html += '<button type="button" class="dashboard-tabs__btn' + (i === 0 ? ' is-active' : '') + '" role="tab" data-tab="' + pillar + '" aria-selected="' + (i === 0 ? 'true' : 'false') + '">' + pillarLabel(pillar) + '</button>';
    });
    html += '</div>';

    pillars.forEach(function (pillar, i) {
      var data = analysis.pillars[pillar];
      html += '<div class="dashboard-tabs__panel' + (i === 0 ? ' is-active' : '') + '" role="tabpanel" data-panel="' + pillar + '"' + (i === 0 ? '' : ' hidden') + '>';
      html += '<div class="dashboard-metrics">';
      data.metrics.forEach(function (metric) {
        html +=
          '<div class="dashboard-metrics__row dashboard-metrics__row--' + metric.status + '">' +
            '<div class="dashboard-metrics__info">' +
              '<span class="dashboard-metrics__name">' + t("dashboard.metrics." + metric.key) + '</span>' +
              '<span class="dashboard-metrics__ideal">' + t("dashboard.ideal") + ': ' + metric.ideal + '</span>' +
            '</div>' +
            '<div class="dashboard-metrics__value-wrap">' +
              '<strong class="dashboard-metrics__value">' + metric.value + '</strong>' +
              '<span class="dashboard-metrics__badge">' + statusLabel(metric.status) + '</span>' +
            '</div>' +
          '</div>';
      });
      html += '</div></div>';
    });

    html += '</div>';
    container.innerHTML = html;

    container.querySelectorAll(".dashboard-tabs__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tab = btn.getAttribute("data-tab");
        container.querySelectorAll(".dashboard-tabs__btn").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        container.querySelectorAll(".dashboard-tabs__panel").forEach(function (panel) {
          var active = panel.getAttribute("data-panel") === tab;
          panel.classList.toggle("is-active", active);
          panel.hidden = !active;
        });
      });
    });
  }

  function renderPlan(container, analysis) {
    var html = '<div class="dashboard-plan"><h2 class="dashboard-section__title" data-i18n="dashboard.planTitle">' + t("dashboard.planTitle") + '</h2>';
    html += '<p class="dashboard-section__subtitle" data-i18n="dashboard.planSubtitle">' + t("dashboard.planSubtitle") + '</p>';
    html += '<ol class="dashboard-plan__list">';
    analysis.plan.forEach(function (item, i) {
      html +=
        '<li class="dashboard-plan__item">' +
          '<span class="dashboard-plan__rank">' + (i + 1) + '</span>' +
          '<div class="dashboard-plan__body">' +
            '<strong>' + t("dashboard.plan." + item.key + ".title") + '</strong>' +
            '<p>' + t("dashboard.plan." + item.key + ".desc") + '</p>' +
            '<div class="dashboard-plan__meta">' +
              '<span class="dashboard-plan__pillar">' + pillarLabel(item.pillar) + '</span>' +
              '<span class="dashboard-plan__impact dashboard-plan__impact--' + item.impact + '">' + impactLabel(item.impact) + '</span>' +
              '<span class="dashboard-plan__weeks">' + t("dashboard.weeks").replace("{n}", item.weeks) + '</span>' +
            '</div>' +
          '</div>' +
        '</li>';
    });
    html += '</ol></div>';
    container.innerHTML = html;
  }

  function renderSummaryGrid(container, analysis) {
    var keys = ["facialThirds", "jawAngle", "symmetryDeviation", "ipdRatio"];
    var html = '<div class="dashboard-summary">';
    keys.forEach(function (key) {
      html +=
        '<div class="dashboard-summary__item">' +
          '<span>' + t("dashboard.summary." + key) + '</span>' +
          '<strong>' + analysis.summary[key] + '</strong>' +
        '</div>';
    });
    html += '</div>';
    container.innerHTML = html;
  }

  function renderResultsPreview(container, analysis, locked) {
    var scores = analysis.scores;
    var lockHtml = locked
      ? '<div class="results-dashboard__lock" id="results-lock">' +
          '<div class="results-dashboard__lock-icon" aria-hidden="true">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
          '</div>' +
          '<p class="results-dashboard__lock-text" data-i18n="onboarding.results.lock">' + t("onboarding.results.lock") + '</p>' +
          '<button type="button" class="btn btn--full btn--lg" id="unlock-btn" data-i18n="onboarding.results.unlock">' + t("onboarding.results.unlock") + '</button>' +
        '</div>'
      : '';

    container.className = "results-dashboard" + (locked ? "" : " is-unlocked");
    container.innerHTML =
      '<div class="results-dashboard__overall">' +
        '<span class="results-dashboard__label" data-i18n="onboarding.results.overall">' + t("onboarding.results.overall") + '</span>' +
        '<span class="results-dashboard__score">' + scores.overall + '</span>' +
      '</div>' +
      '<div class="results-dashboard__pillars">' +
        ["harmony", "angularity", "dimorphism", "features"].map(function (pillar) {
          var label = pillarLabel(pillar);
          var val = scores[pillar];
          return '<div class="results-dashboard__pillar">' +
            '<span class="results-dashboard__pillar-name">' + label + '</span>' +
            '<div class="results-dashboard__pillar-bar"><div class="results-dashboard__pillar-fill" style="width:' + (val / 10 * 100) + '%"></div></div>' +
            '<span class="results-dashboard__pillar-score">' + val + '</span>' +
          '</div>';
        }).join("") +
      '</div>' +
      '<div class="results-dashboard__metrics">' +
        '<div class="results-dashboard__metric"><span data-i18n="onboarding.results.metric1">' + t("onboarding.results.metric1") + '</span><strong>' + analysis.summary.facialThirds + '</strong></div>' +
        '<div class="results-dashboard__metric"><span data-i18n="onboarding.results.metric2">' + t("onboarding.results.metric2") + '</span><strong>' + analysis.summary.jawAngle + '</strong></div>' +
        '<div class="results-dashboard__metric"><span data-i18n="onboarding.results.metric3">' + t("onboarding.results.metric3") + '</span><strong>' + analysis.summary.symmetryDeviation + '</strong></div>' +
        '<div class="results-dashboard__metric"><span data-i18n="onboarding.results.metric4">' + t("onboarding.results.metric4") + '</span><strong>' + analysis.summary.ipdRatio + '</strong></div>' +
      '</div>' +
      lockHtml;
  }

  window.Dashboard = {
    renderPreview: renderPreview,
    renderScoreHero: renderScoreHero,
    renderPhotos: renderPhotos,
    renderPillarBars: renderPillarBars,
    renderMetricsTabs: renderMetricsTabs,
    renderPlan: renderPlan,
    renderSummaryGrid: renderSummaryGrid,
    renderResultsPreview: renderResultsPreview
  };
})();
