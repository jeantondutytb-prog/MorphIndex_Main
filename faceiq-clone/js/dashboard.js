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

  function bindCompareSlider(container) {
    var compare = container.querySelector(".dashboard-compare");
    if (!compare) return;
    var range = compare.querySelector(".dashboard-compare__range");
    var before = compare.querySelector(".dashboard-compare__before");
    var handle = compare.querySelector(".dashboard-compare__handle");
    if (!range || !before || !handle) return;

    function update(value) {
      var pct = Math.min(100, Math.max(0, Number(value)));
      before.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
      handle.style.left = pct + "%";
    }

    range.addEventListener("input", function () {
      update(range.value);
    });
    update(range.value || 50);
  }

  function renderQuickActions(container) {
    if (!container) return;
    container.hidden = false;
    container.innerHTML =
      '<section class="dashboard-quick-actions" aria-label="' + t("dashboard.quickActions.label") + '">' +
        '<a href="/app/preview" class="dashboard-quick-actions__card">' +
          '<span class="dashboard-quick-actions__icon" aria-hidden="true">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 1.4 4.3L18 9l-4.6 1.7L12 15l-1.4-4.3L6 9l4.6-1.7L12 3z"/></svg>' +
          "</span>" +
          '<span class="dashboard-quick-actions__title">' + t("dashboard.quickActions.preview") + "</span>" +
          '<span class="dashboard-quick-actions__desc">' + t("dashboard.quickActions.previewDesc") + "</span>" +
        "</a>" +
        '<a href="/app/metrics" class="dashboard-quick-actions__card">' +
          '<span class="dashboard-quick-actions__icon" aria-hidden="true">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-6"/><path d="M22 20v-9"/></svg>' +
          "</span>" +
          '<span class="dashboard-quick-actions__title">' + t("dashboard.quickActions.metrics") + "</span>" +
          '<span class="dashboard-quick-actions__desc">' + t("dashboard.quickActions.metricsDesc") + "</span>" +
        "</a>" +
        '<a href="/app/plan" class="dashboard-quick-actions__card">' +
          '<span class="dashboard-quick-actions__icon" aria-hidden="true">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/></svg>' +
          "</span>" +
          '<span class="dashboard-quick-actions__title">' + t("dashboard.quickActions.plan") + "</span>" +
          '<span class="dashboard-quick-actions__desc">' + t("dashboard.quickActions.planDesc") + "</span>" +
        "</a>" +
        '<button type="button" class="dashboard-quick-actions__card" id="dashboard-rescan">' +
          '<span class="dashboard-quick-actions__icon" aria-hidden="true">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 15-6.7L21 3"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 21"/><path d="M3 21v-5h5"/></svg>' +
          "</span>" +
          '<span class="dashboard-quick-actions__title">' + t("dashboard.quickActions.rescan") + "</span>" +
          '<span class="dashboard-quick-actions__desc">' + t("dashboard.quickActions.rescanDesc") + "</span>" +
        "</button>" +
      "</section>";

    var rescanBtn = container.querySelector("#dashboard-rescan");
    if (rescanBtn) {
      rescanBtn.addEventListener("click", function () {
        if (!window.confirm(t("dashboard.rescanConfirm"))) return;
        if (window.Onboarding && window.Onboarding.startRescan) {
          window.Onboarding.startRescan();
        } else {
          window.location.href = "/onboarding/photos";
        }
      });
    }
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
    var error = options.error;

    if (afterSrc && !loading) {
      container.innerHTML =
        '<section class="dashboard-preview">' +
          '<div class="dashboard-preview__head">' +
            '<h2 class="dashboard-section__title">' + t("dashboard.preview.title") + '</h2>' +
            '<p class="dashboard-section__subtitle">' + t("dashboard.preview.subtitle") + '</p>' +
          '</div>' +
          '<div class="dashboard-compare">' +
            '<div class="dashboard-compare__after"><img src="' + afterSrc + '" alt=""></div>' +
            '<div class="dashboard-compare__before"><img src="' + beforeSrc + '" alt=""></div>' +
            '<div class="dashboard-compare__handle" aria-hidden="true"></div>' +
            '<input type="range" class="dashboard-compare__range" min="0" max="100" value="50" aria-label="' + t("dashboard.preview.dragHint") + '">' +
          '</div>' +
          '<div class="dashboard-compare__labels">' +
            '<span>' + t("dashboard.preview.before") + '</span>' +
            '<span>' + t("dashboard.preview.after") + '</span>' +
          '</div>' +
          (analysis && analysis.potential
            ? '<p class="dashboard-preview__note">' +
              t("dashboard.preview.scoreNote")
                .replace("{current}", analysis.scores.overall)
                .replace("{potential}", analysis.potential.overall) +
              "</p>"
            : "") +
        "</section>";
      bindCompareSlider(container);
      return;
    }

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
        (error
          ? '<p class="dashboard-preview__error" role="alert">' + t("dashboard.preview.error") + "</p>"
          : "") +
        (analysis && analysis.potential && !error
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
    var chevron =
      '<svg class="dashboard-metrics__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
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
      data.metrics.forEach(function (metric, metricIndex) {
        var name = t("dashboard.metrics." + metric.key);
        var desc = t("dashboard.metricDetails." + metric.key + ".desc");
        var tip = t("dashboard.metricDetails." + metric.key + ".tip");
        var panelId = "metric-detail-" + pillar + "-" + metricIndex;
        html +=
          '<div class="dashboard-metrics__card dashboard-metrics__card--' + metric.status + '">' +
            '<button type="button" class="dashboard-metrics__toggle" aria-expanded="false" aria-controls="' + panelId + '">' +
              '<span class="dashboard-metrics__summary">' +
                '<span class="dashboard-metrics__info">' +
                  '<span class="dashboard-metrics__name">' + name + '</span>' +
                  '<span class="dashboard-metrics__ideal">' + t("dashboard.ideal") + ': ' + metric.ideal + '</span>' +
                '</span>' +
                '<span class="dashboard-metrics__value-wrap">' +
                  '<strong class="dashboard-metrics__value">' + metric.value + '</strong>' +
                  '<span class="dashboard-metrics__badge">' + statusLabel(metric.status) + '</span>' +
                '</span>' +
                chevron +
              '</span>' +
            '</button>' +
            '<div class="dashboard-metrics__detail" id="' + panelId + '" hidden>' +
              '<p class="dashboard-metrics__desc">' + desc + '</p>' +
              '<dl class="dashboard-metrics__stats">' +
                '<div><dt>' + t("dashboard.yourResult") + '</dt><dd>' + metric.value + '</dd></div>' +
                '<div><dt>' + t("dashboard.ideal") + '</dt><dd>' + metric.ideal + '</dd></div>' +
                '<div><dt>' + t("dashboard.statusLabel") + '</dt><dd>' + statusLabel(metric.status) + '</dd></div>' +
              '</dl>' +
              '<p class="dashboard-metrics__tip"><span>' + t("dashboard.howToImprove") + '</span> ' + tip + '</p>' +
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

    container.querySelectorAll(".dashboard-metrics__toggle").forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        var card = toggle.closest(".dashboard-metrics__card");
        var detail = card.querySelector(".dashboard-metrics__detail");
        var willOpen = toggle.getAttribute("aria-expanded") !== "true";

        container.querySelectorAll(".dashboard-metrics__card.is-open").forEach(function (openCard) {
          if (openCard === card) return;
          openCard.classList.remove("is-open");
          var openToggle = openCard.querySelector(".dashboard-metrics__toggle");
          var openDetail = openCard.querySelector(".dashboard-metrics__detail");
          if (openToggle) openToggle.setAttribute("aria-expanded", "false");
          if (openDetail) openDetail.hidden = true;
        });

        card.classList.toggle("is-open", willOpen);
        toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
        detail.hidden = !willOpen;
      });
    });
  }

  function renderPlan(container, analysis, userId, onToggle) {
    var progress = userId && window.Onboarding ? window.Onboarding.getPlanProgress(userId) : {};
    var doneCount = 0;
    analysis.plan.forEach(function (item) {
      if (progress[item.key]) doneCount += 1;
    });

    var html = '<div class="dashboard-plan">';
    html += '<div class="dashboard-plan__head">';
    html += '<h2 class="dashboard-section__title">' + t("dashboard.planTitle") + '</h2>';
    html += '<p class="dashboard-plan__progress">' + t("dashboard.planProgress").replace("{done}", doneCount).replace("{total}", analysis.plan.length) + '</p>';
    html += '</div>';
    html += '<p class="dashboard-section__subtitle">' + t("dashboard.planSubtitle") + '</p>';
    html += '<ol class="dashboard-plan__list">';
    analysis.plan.forEach(function (item, i) {
      var checked = !!progress[item.key];
      html +=
        '<li class="dashboard-plan__item' + (checked ? " is-done" : "") + '">' +
          '<label class="dashboard-plan__check">' +
            '<input type="checkbox" class="dashboard-plan__checkbox" data-plan-key="' + item.key + '"' + (checked ? " checked" : "") + ">" +
            '<span class="dashboard-plan__rank">' + (i + 1) + '</span>' +
          '</label>' +
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

    container.querySelectorAll(".dashboard-plan__checkbox").forEach(function (input) {
      input.addEventListener("change", function () {
        var key = input.getAttribute("data-plan-key");
        if (typeof onToggle === "function") {
          onToggle(key, input.checked);
        }
      });
    });
  }

  function renderScoreHistory(container, state, currentAnalysis) {
    if (!container) return;
    var history = (state && state.scoreHistory) || [];
    var points = history.slice();
    if (currentAnalysis && currentAnalysis.scores) {
      var hasCurrent = points.some(function (p) {
        return p.analyzedAt === currentAnalysis.analyzedAt;
      });
      if (!hasCurrent) {
        points.push({
          analyzedAt: currentAnalysis.analyzedAt || new Date().toISOString(),
          overall: currentAnalysis.scores.overall,
          scores: currentAnalysis.scores
        });
      }
    }

    if (points.length < 2) {
      container.hidden = true;
      container.innerHTML = "";
      return;
    }

    container.hidden = false;
    var max = 10;
    var minScore = Math.min.apply(null, points.map(function (p) { return p.overall; }));
    var maxScore = Math.max.apply(null, points.map(function (p) { return p.overall; }));
    var range = Math.max(0.5, maxScore - minScore);

    var bars = points.map(function (point, i) {
      var height = 20 + ((point.overall - minScore) / range) * 70;
      var date = new Date(point.analyzedAt);
      var label = isNaN(date.getTime()) ? "" : date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      return (
        '<div class="score-history__item">' +
          '<div class="score-history__bar" style="height:' + height.toFixed(1) + '%" title="' + point.overall + '/10"></div>' +
          '<span class="score-history__score">' + point.overall + '</span>' +
          '<span class="score-history__date">' + label + '</span>' +
        '</div>'
      );
    }).join("");

    container.innerHTML =
      '<section class="score-history">' +
        '<h2 class="dashboard-section__title">' + t("dashboard.history.title") + '</h2>' +
        '<p class="dashboard-section__subtitle">' + t("dashboard.history.subtitle") + '</p>' +
        '<div class="score-history__chart" role="img" aria-label="' + t("dashboard.history.title") + '">' + bars + '</div>' +
      '</section>';
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
        '</div>'
      : '';

    container.className = "results-dashboard" + (locked ? "" : " is-unlocked");
    container.innerHTML =
      '<div class="results-dashboard__overall">' +
        '<span class="results-dashboard__label" data-i18n="onboarding.results.overall">' + t("onboarding.results.overall") + '</span>' +
        '<span class="results-dashboard__score">' + scores.overall + '</span>' +
      '</div>' +
      '<div class="results-dashboard__locked-content">' +
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
      '</div>' +
      lockHtml;
  }

  function renderEmptyState(container, state) {
    if (!container) return;
    if (!state) {
      container.hidden = true;
      container.innerHTML = "";
      return;
    }
    container.hidden = false;
    container.innerHTML =
      '<section class="dashboard-empty">' +
        '<p class="dashboard-empty__title">' + t("dashboard.empty.title") + "</p>" +
        '<p class="dashboard-empty__desc">' + t("dashboard.empty.desc") + "</p>" +
        '<button type="button" class="btn btn--full" id="dashboard-empty-rescan">' + t("dashboard.empty.cta") + "</button>" +
      "</section>";

    var rescanBtn = container.querySelector("#dashboard-empty-rescan");
    if (rescanBtn) {
      rescanBtn.addEventListener("click", function () {
        if (!window.confirm(t("dashboard.rescanConfirm"))) return;
        if (window.Onboarding && window.Onboarding.startRescan) {
          window.Onboarding.startRescan();
        } else {
          window.location.href = "/onboarding/photos";
        }
      });
    }
  }

  window.Dashboard = {
    renderScoreHistory: renderScoreHistory,
    renderPreview: renderPreview,
    renderQuickActions: renderQuickActions,
    renderEmptyState: renderEmptyState,
    renderScoreHero: renderScoreHero,
    renderPhotos: renderPhotos,
    renderPillarBars: renderPillarBars,
    renderMetricsTabs: renderMetricsTabs,
    renderPlan: renderPlan,
    renderSummaryGrid: renderSummaryGrid,
    renderResultsPreview: renderResultsPreview
  };
})();
