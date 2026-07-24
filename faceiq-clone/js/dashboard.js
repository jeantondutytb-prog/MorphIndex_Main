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

  function startRescanFlow() {
    if (!window.confirm(t("dashboard.rescanConfirm"))) return;
    if (window.Onboarding && window.Onboarding.startRescan) {
      window.Onboarding.startRescan();
    } else {
      window.location.href = "/onboarding/photos";
    }
  }

  function bindRescanButton(btn) {
    if (!btn) return;
    btn.addEventListener("click", startRescanFlow);
  }

  function getNextActionLabel(focusKey, actionKey) {
    var specific = t("dashboard.protocols." + focusKey + ".actions." + actionKey);
    if (specific !== "dashboard.protocols." + focusKey + ".actions." + actionKey) {
      return specific;
    }
    var shared = t("dashboard.protocols._shared.actions." + actionKey);
    if (shared !== "dashboard.protocols._shared.actions." + actionKey) {
      return shared;
    }
    return actionKey;
  }

  function findMetric(analysis, key) {
    var pillars = ["harmony", "angularity", "dimorphism", "features"];
    for (var i = 0; i < pillars.length; i++) {
      var data = analysis.pillars[pillars[i]];
      if (!data || !data.metrics) continue;
      for (var j = 0; j < data.metrics.length; j++) {
        if (data.metrics[j].key === key) {
          return { pillar: pillars[i], metric: data.metrics[j] };
        }
      }
    }
    return null;
  }

  function renderNextStep(container, ctx) {
    renderFocusCard(container, ctx);
  }

  function renderFocusCard(container, ctx) {
    if (!container || !ctx || !ctx.analysis) return;
    var analysis = ctx.analysis;
    var userId = ctx.user && ctx.user.id;
    if (!analysis.plan || !analysis.plan.length) {
      container.hidden = true;
      container.innerHTML = "";
      return;
    }

    var journey = userId && window.Onboarding ? window.Onboarding.getJourney(userId, analysis) : null;
    var protocols = window.ImprovementProtocols;
    var focusKey = journey ? journey.activeFocusKey : analysis.plan[0].key;
    var focusItem =
      analysis.plan.find(function (item) {
        return item.key === focusKey;
      }) || analysis.plan[0];
    var protocol = protocols ? protocols.getProtocol(focusKey) : null;
    var phaseIndex =
      protocol && journey && protocols ? protocols.resolvePhaseIndex(journey, protocol) : 0;
    var actionProgress = (journey && journey.actionProgress) || {};
    var phaseActions =
      protocol && protocols ? protocols.listPhaseActions(protocol, phaseIndex) : [];
    var nextActionKey = phaseActions.find(function (key) {
      return !actionProgress[key];
    });
    var nextActionLabel = nextActionKey
      ? getNextActionLabel(focusKey, nextActionKey)
      : t("dashboard.nextStep.allDone");

    container.hidden = false;
    container.innerHTML =
      '<section class="focus-card">' +
        '<p class="focus-card__label">' + t("dashboard.focus.recommended") + "</p>" +
        '<h2 class="focus-card__title">' + t("dashboard.plan." + focusItem.key + ".title") + "</h2>" +
        '<p class="focus-card__action">' + nextActionLabel + "</p>" +
        '<a href="/app/plan" class="focus-card__link">' + t("dashboard.focus.viewPlan") + "</a>" +
      "</section>";
  }

  function renderStrengthsWeaknesses(container, analysis) {
    if (!container || !analysis || !analysis.pillars) return;

    var pillars = ["harmony", "angularity", "dimorphism", "features"]
      .map(function (key) {
        return { key: key, score: analysis.pillars[key].score };
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });

    var strengths = pillars.slice(0, 2);
    var weaknesses = pillars.slice().reverse().slice(0, 2);
    var focusAreas = (analysis.plan || []).slice(0, 2);

    function listItems(items, kind) {
      return items
        .map(function (item) {
          return (
            '<li class="dashboard-split__item dashboard-split__item--' +
            kind +
            '">' +
            '<span class="dashboard-split__name">' +
            pillarLabel(item.key) +
            "</span>" +
            '<strong class="dashboard-split__score">' +
            item.score +
            "</strong>" +
            "</li>"
          );
        })
        .join("");
    }

    var focusHtml = focusAreas.length
      ? '<div class="dashboard-split__focus">' +
        "<p>" +
        t("dashboard.split.focusLabel") +
        "</p>" +
        "<ul>" +
        focusAreas
          .map(function (item) {
            return (
              "<li>" +
              t("dashboard.plan." + item.key + ".title") +
              "</li>"
            );
          })
          .join("") +
        "</ul>" +
        "</div>"
      : "";

    container.hidden = false;
    container.innerHTML =
      '<section class="dashboard-split" aria-label="' + t("dashboard.split.label") + '">' +
        '<div class="dashboard-split__col dashboard-split__col--strengths">' +
          '<h2 class="dashboard-split__title">' + t("dashboard.split.strengths") + "</h2>" +
          '<p class="dashboard-split__subtitle">' + t("dashboard.split.strengthsDesc") + "</p>" +
          "<ul>" +
          listItems(strengths, "strength") +
          "</ul>" +
        "</div>" +
        '<div class="dashboard-split__col dashboard-split__col--weaknesses">' +
          '<h2 class="dashboard-split__title">' + t("dashboard.split.weaknesses") + "</h2>" +
          '<p class="dashboard-split__subtitle">' + t("dashboard.split.weaknessesDesc") + "</p>" +
          "<ul>" +
          listItems(weaknesses, "weakness") +
          "</ul>" +
          focusHtml +
        "</div>" +
      "</section>";
  }

  function renderHomeLink(container) {
    renderQuickNav(container);
  }

  function renderQuickNav(container) {
    if (!container) return;
    container.hidden = false;
    container.innerHTML =
      '<section class="quick-nav" aria-label="' + t("dashboard.quickNav.label") + '">' +
        '<a href="/app/metrics" class="quick-nav__item">' +
          '<span class="quick-nav__title">' + t("dashboard.quickNav.metrics") + "</span>" +
          '<span class="quick-nav__desc">' + t("dashboard.quickNav.metricsDesc") + "</span>" +
        "</a>" +
        '<a href="/app/plan" class="quick-nav__item">' +
          '<span class="quick-nav__title">' + t("dashboard.quickNav.plan") + "</span>" +
          '<span class="quick-nav__desc">' + t("dashboard.quickNav.planDesc") + "</span>" +
        "</a>" +
        '<a href="/app/potential" class="quick-nav__item">' +
          '<span class="quick-nav__title">' + t("dashboard.quickNav.potential") + "</span>" +
          '<span class="quick-nav__desc">' + t("dashboard.quickNav.potentialDesc") + "</span>" +
        "</a>" +
        '<a href="/app/chat" class="quick-nav__item">' +
          '<span class="quick-nav__title">' + t("dashboard.quickNav.coach") + "</span>" +
          '<span class="quick-nav__desc">' + t("dashboard.quickNav.coachDesc") + "</span>" +
        "</a>" +
      "</section>";
  }

  function renderToolsStrip(container) {
    renderHomeLink(container);
  }

  function renderProgressActions(container) {
    if (!container) return;
    container.hidden = false;
    container.innerHTML =
      '<section class="dashboard-progress-actions">' +
        '<button type="button" class="btn btn--full" id="dashboard-progress-rescan">' +
          t("dashboard.quickActions.rescan") +
        "</button>" +
        '<p class="dashboard-progress-actions__hint">' + t("dashboard.quickActions.rescanDesc") + "</p>" +
      "</section>";
    bindRescanButton(container.querySelector("#dashboard-progress-rescan"));
  }

  function renderQuickActions(container) {
    renderToolsStrip(container);
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

  function renderScoreHero(container, analysis, state) {
    renderScanSummary(container, analysis, state);
  }

  function renderScanSummary(container, analysis, state) {
    if (!container || !analysis) return;
    state = state || {};
    var scores = analysis.scores;
    var gain = roundScore(analysis.potential.overall - scores.overall);
    var photoHtml = state.frontPhoto
      ? '<div class="scan-summary__photo">' +
          '<img src="' + state.frontPhoto + '" alt="">' +
          '<span class="scan-summary__photo-label">' + t("dashboard.photoFront") + "</span>" +
        "</div>"
      : "";

    container.innerHTML =
      '<section class="scan-summary">' +
        photoHtml +
        '<div class="scan-summary__scores">' +
          '<div class="scan-summary__score-block">' +
            '<span class="scan-summary__label">' + t("dashboard.scan.overall") + "</span>" +
            '<div class="scan-summary__value-row">' +
              '<span class="scan-summary__value">' + scores.overall + "</span>" +
              '<span class="scan-summary__unit">/ 10</span>' +
            "</div>" +
          "</div>" +
          '<div class="scan-summary__score-block scan-summary__score-block--potential">' +
            '<span class="scan-summary__label">' + t("dashboard.scan.potential") + "</span>" +
            '<div class="scan-summary__value-row">' +
              '<span class="scan-summary__value">' + analysis.potential.overall + "</span>" +
              '<span class="scan-summary__gain">' +
                t("dashboard.scan.gain").replace("{n}", gain) +
              "</span>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>";
  }

  function roundScore(value) {
    return Math.round(value * 10) / 10;
  }

  function renderMetricPreview(container, analysis) {
    if (!container || !analysis) return;
    var keys = ["jawDefinition", "canthalTilt", "skinClarity", "jawAngle", "symmetryDeviation", "cheekboneProminence"];
    var items = [];
    keys.forEach(function (key) {
      var found = findMetric(analysis, key);
      if (found) items.push(found);
    });

    if (!items.length) {
      container.hidden = true;
      return;
    }

    container.hidden = false;
    container.innerHTML =
      '<section class="metric-preview">' +
        '<div class="metric-preview__head">' +
          '<h2 class="metric-preview__title">' + t("dashboard.breakdown.metricsTitle") + "</h2>" +
          '<a href="/app/metrics" class="metric-preview__link">' + t("dashboard.breakdown.viewAll") + "</a>" +
        "</div>" +
        '<ul class="metric-preview__list">' +
          items
            .map(function (item) {
              return (
                '<li class="metric-preview__item">' +
                  '<span class="metric-preview__name">' + t("dashboard.metrics." + item.metric.key) + "</span>" +
                  '<span class="metric-preview__value">' + item.metric.value + "</span>" +
                "</li>"
              );
            })
            .join("") +
        "</ul>" +
        '<div class="metric-preview__breakdown">' +
          '<h3 class="metric-preview__breakdown-title">' + t("dashboard.breakdown.title") + "</h3>" +
          '<ul class="score-breakdown__list score-breakdown__list--compact">' +
            ["harmony", "angularity", "dimorphism", "features"]
              .map(function (pillar) {
                var data = analysis.pillars[pillar];
                return (
                  '<li class="score-breakdown__item">' +
                    '<span class="score-breakdown__name">' + pillarLabel(pillar) + "</span>" +
                    '<span class="score-breakdown__score">' + data.score + "</span>" +
                  "</li>"
                );
              })
              .join("") +
          "</ul>" +
        "</div>" +
      "</section>";
  }

  function renderScoreBreakdown(container, analysis) {
    if (!container || !analysis) return;
    var pillars = ["harmony", "angularity", "dimorphism", "features"];

    container.innerHTML =
      '<section class="score-breakdown">' +
        '<div class="score-breakdown__head">' +
          '<h2 class="score-breakdown__title">' + t("dashboard.breakdown.title") + "</h2>" +
          '<a href="/app/metrics" class="score-breakdown__link">' + t("dashboard.breakdown.viewAll") + "</a>" +
        "</div>" +
        '<ul class="score-breakdown__list">' +
          pillars
            .map(function (pillar) {
              var data = analysis.pillars[pillar];
              return (
                '<li class="score-breakdown__item">' +
                  '<span class="score-breakdown__name">' + pillarLabel(pillar) + "</span>" +
                  '<span class="score-breakdown__score">' + data.score + "</span>" +
                "</li>"
              );
            })
            .join("") +
        "</ul>" +
      "</section>";
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
    renderMetricPreview(container, analysis);
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

  function protocolText(focusKey, section, id) {
    var specific = t("dashboard.protocols." + focusKey + "." + section + "." + id);
    if (specific !== "dashboard.protocols." + focusKey + "." + section + "." + id) {
      return specific;
    }
    return t("dashboard.protocols._shared." + section + "." + id);
  }

  function catalogT(path) {
    return window.CatalogCopy && window.CatalogCopy.t ? window.CatalogCopy.t(path) : path;
  }

  function escapeAttr(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderActionDetailHtml(actionKey) {
    var catalog = window.ProtocolCatalog;
    if (!catalog) return "";
    var detail = catalog.getActionDetail(actionKey);
    if (!detail) return "";

    var html = '<div class="dashboard-action-detail">';
    if (detail.frequency || detail.duration) {
      html += '<p class="dashboard-action-detail__meta">';
      if (detail.frequency) {
        html +=
          "<span><strong>" +
          escapeHtml(catalogT("ui.frequency")) +
          "</strong> " +
          escapeHtml(detail.frequency) +
          "</span>";
      }
      if (detail.duration) {
        html +=
          "<span><strong>" +
          escapeHtml(catalogT("ui.duration")) +
          "</strong> " +
          escapeHtml(detail.duration) +
          "</span>";
      }
      html += "</p>";
    }

    if (detail.steps && detail.steps.length) {
      html += "<h4>" + escapeHtml(catalogT("ui.steps")) + "</h4><ol>";
      detail.steps.forEach(function (stepKey) {
        html += "<li>" + escapeHtml(catalogT("steps." + stepKey)) + "</li>";
      });
      html += "</ol>";
    }

    if (detail.exercises && detail.exercises.length) {
      html += "<h4>" + escapeHtml(catalogT("ui.exercises")) + "</h4>";
      detail.exercises.forEach(function (exId) {
        var ex = catalog.getExercise(exId) || {};
        html += '<article class="dashboard-action-exercise">';
        html += "<strong>" + escapeHtml(catalogT("exercises." + exId + ".title")) + "</strong>";
        if (ex.sets || ex.durationMin) {
          html +=
            '<p class="dashboard-action-exercise__meta">' +
            escapeHtml(
              (ex.sets ? ex.sets : "") +
                (ex.sets && ex.durationMin ? " · " : "") +
                (ex.durationMin ? "~" + ex.durationMin + " min" : "")
            ) +
            "</p>";
        }
        var caution = catalogT("exercises." + exId + ".caution");
        if (caution && caution.indexOf("exercises.") !== 0) {
          html +=
            '<p class="dashboard-action-exercise__caution"><strong>' +
            escapeHtml(catalogT("ui.caution")) +
            ":</strong> " +
            escapeHtml(caution) +
            "</p>";
        }
        var steps = catalogT("exercises." + exId + ".steps");
        if (Array.isArray(steps)) {
          html += "<ol>";
          steps.forEach(function (step) {
            html += "<li>" + escapeHtml(step) + "</li>";
          });
          html += "</ol>";
        }
        html += "</article>";
      });
    }

    if (detail.products && detail.products.length) {
      html += "<h4>" + escapeHtml(catalogT("ui.products")) + "</h4>";
      html += '<ul class="dashboard-action-products">';
      detail.products.forEach(function (productId) {
        var product = catalog.getProduct(productId) || {};
        html += "<li>";
        html +=
          "<strong>" + escapeHtml(catalogT("products." + productId + ".name")) + "</strong>";
        html +=
          "<p>" +
          escapeHtml(catalogT("ui.why")) +
          ": " +
          escapeHtml(catalogT("products." + productId + ".why")) +
          "</p>";
        if (product.examples && product.examples.length) {
          html +=
            '<p class="dashboard-action-products__examples"><span>' +
            escapeHtml(catalogT("ui.examples")) +
            ":</span> " +
            escapeHtml(product.examples.join(" · ")) +
            "</p>";
        }
        html += "</li>";
      });
      html += "</ul>";
    }

    html += "</div>";
    return html;
  }

  function renderPlan(container, analysis, userId, callbacks) {
    if (!container || !analysis || !analysis.plan || !analysis.plan.length) return;

    callbacks = callbacks || {};
    var journey =
      userId && window.Onboarding ? window.Onboarding.getJourney(userId, analysis) : null;
    var protocols = window.ImprovementProtocols;
    var focusKey = journey ? journey.activeFocusKey : analysis.plan[0].key;
    var protocol = protocols ? protocols.getProtocol(focusKey) : null;
    var phaseIndex =
      protocol && journey && protocols
        ? protocols.resolvePhaseIndex(journey, protocol)
        : 0;
    var currentPhase = protocol && protocol.phases ? protocol.phases[phaseIndex] : null;
    var actionProgress = (journey && journey.actionProgress) || {};
    var currentWeek =
      protocol && journey && protocols ? protocols.getCurrentWeek(journey, protocol) : 1;
    var totalWeeks = protocol ? protocol.totalWeeks : 12;
    var phaseActions =
      protocol && protocols ? protocols.listPhaseActions(protocol, phaseIndex) : [];
    var phaseDone = phaseActions.filter(function (key) {
      return !!actionProgress[key];
    }).length;
    var totalActions = protocol && protocols ? protocols.countTotalActions(protocol) : 0;
    var totalDone =
      protocol && protocols ? protocols.countCompletedActions(protocol, actionProgress) : 0;

    var focusItem = analysis.plan.find(function (item) {
      return item.key === focusKey;
    }) || analysis.plan[0];

    var html = '<div class="dashboard-plan dashboard-plan--journey">';

    html += '<div class="dashboard-plan__head">';
    html += '<div>';
    html += '<p class="dashboard-journey__eyebrow">' + t("dashboard.journey.eyebrow") + "</p>";
    html += '<h2 class="dashboard-section__title">' + t("dashboard.journey.currentFocus") + "</h2>";
    html += "</div>";
    html +=
      '<p class="dashboard-plan__progress">' +
      t("dashboard.journey.overallProgress")
        .replace("{done}", totalDone)
        .replace("{total}", totalActions) +
      "</p>";
    html += "</div>";

    html += '<article class="dashboard-journey__focus">';
    html +=
      '<div class="dashboard-journey__focus-head">' +
      "<div>" +
      '<strong class="dashboard-journey__focus-title">' +
      t("dashboard.plan." + focusItem.key + ".title") +
      "</strong>" +
      '<p class="dashboard-journey__focus-desc">' +
      t("dashboard.plan." + focusItem.key + ".desc") +
      "</p>" +
      "</div>" +
      '<span class="dashboard-journey__badge">' +
      t("dashboard.journey.activeBadge") +
      "</span>" +
      "</div>";
    html += '<div class="dashboard-journey__meta">';
    html +=
      '<span class="dashboard-plan__pillar">' + pillarLabel(focusItem.pillar) + "</span>";
    html +=
      '<span class="dashboard-plan__impact dashboard-plan__impact--' +
      focusItem.impact +
      '">' +
      impactLabel(focusItem.impact) +
      "</span>";
    html +=
      '<span class="dashboard-plan__weeks">' +
      t("dashboard.journey.weekOf")
        .replace("{current}", currentWeek)
        .replace("{total}", totalWeeks) +
      "</span>";
    html += "</div>";

    if (protocol && protocol.phases) {
      html += '<ol class="dashboard-journey__phases">';
      protocol.phases.forEach(function (phase, index) {
        var stateClass =
          index < phaseIndex ? " is-done" : index === phaseIndex ? " is-active" : "";
        html +=
          '<li class="dashboard-journey__phase' +
          stateClass +
          '">' +
          '<span class="dashboard-journey__phase-dot" aria-hidden="true"></span>' +
          '<div class="dashboard-journey__phase-body">' +
          "<strong>" +
          t("dashboard.journey.phases." + phase.id) +
          "</strong>" +
          "<span>" +
          t("dashboard.journey.phaseRange")
            .replace("{start}", phase.weekStart)
            .replace("{end}", phase.weekEnd) +
          "</span>" +
          "</div>" +
          "</li>";
      });
      html += "</ol>";
    }

    if (currentPhase) {
      html += '<section class="dashboard-journey__week">';
      html += '<div class="dashboard-journey__week-head">';
      html += "<h3>" + t("dashboard.journey.thisWeek") + "</h3>";
      html +=
        "<p>" +
        t("dashboard.journey.phaseProgress")
          .replace("{done}", phaseDone)
          .replace("{total}", phaseActions.length) +
        "</p>";
      html += "</div>";
      html += '<ul class="dashboard-journey__actions dashboard-journey__actions--detailed">';
      phaseActions.forEach(function (actionKey, actionIndex) {
        var checked = !!actionProgress[actionKey];
        var detailId = "action-detail-" + actionIndex + "-" + actionKey;
        // First incomplete action opens by default so the plan never looks empty/vague.
        var openByDefault = !checked && phaseActions.findIndex(function (key) {
          return !actionProgress[key];
        }) === actionIndex;
        html +=
          '<li class="dashboard-journey__action dashboard-journey__action--card' +
          (checked ? " is-done" : "") +
          '">' +
          '<div class="dashboard-action-card' +
          (openByDefault ? " is-open" : "") +
          '">' +
          '<div class="dashboard-action-card__head">' +
          '<label class="dashboard-journey__action-label">' +
          '<input type="checkbox" class="dashboard-journey__action-checkbox" data-action-key="' +
          escapeAttr(actionKey) +
          '"' +
          (checked ? " checked" : "") +
          ">" +
          '<span class="dashboard-journey__action-text">' +
          protocolText(focusKey, "actions", actionKey) +
          "</span>" +
          "</label>" +
          '<button type="button" class="dashboard-action-card__toggle btn btn--sm" aria-expanded="' +
          (openByDefault ? "true" : "false") +
          '" aria-controls="' +
          escapeAttr(detailId) +
          '" data-action-toggle>' +
          escapeHtml(openByDefault ? catalogT("ui.hideDetail") : catalogT("ui.showDetail")) +
          "</button>" +
          "</div>" +
          '<div class="dashboard-action-card__body" id="' +
          escapeAttr(detailId) +
          '"' +
          (openByDefault ? "" : " hidden") +
          ">" +
          renderActionDetailHtml(actionKey) +
          "</div>" +
          "</div>" +
          "</li>";
      });
      html += "</ul>";
      html += '<div class="dashboard-journey__bar" aria-hidden="true">';
      html +=
        '<span class="dashboard-journey__bar-fill" style="width:' +
        (phaseActions.length ? Math.round((phaseDone / phaseActions.length) * 100) : 0) +
        '%"></span>';
      html += "</div>";
      html += "</section>";
    }

    if (protocol && (protocol.avoid || protocol.consultWhen)) {
      html += '<div class="dashboard-journey__notes">';
      if (protocol.avoid && protocol.avoid.length) {
        html += '<div class="dashboard-journey__note">';
        html += "<h4>" + t("dashboard.journey.avoidTitle") + "</h4><ul>";
        protocol.avoid.forEach(function (key) {
          html += "<li>" + protocolText(focusKey, "avoid", key) + "</li>";
        });
        html += "</ul></div>";
      }
      if (protocol.consultWhen && protocol.consultWhen.length) {
        html += '<div class="dashboard-journey__note">';
        html += "<h4>" + t("dashboard.journey.consultTitle") + "</h4><ul>";
        protocol.consultWhen.forEach(function (key) {
          html += "<li>" + protocolText(focusKey, "consultWhen", key) + "</li>";
        });
        html += "</ul></div>";
      }
      html += "</div>";
    }

    if (phaseIndex >= (protocol && protocol.phases ? protocol.phases.length - 1 : 0)) {
      html += '<div class="dashboard-journey__rescan">';
      html += "<p>" + t("dashboard.journey.rescanReminder") + "</p>";
      html +=
        '<button type="button" class="btn btn--sm" id="dashboard-journey-rescan">' +
        t("dashboard.journey.rescanCta") +
        "</button>";
      html += "</div>";
    }

    html += '<section class="dashboard-journey__priorities">';
    html += "<h3>" + t("dashboard.journey.allPriorities") + "</h3>";
    html += '<ol class="dashboard-plan__list">';
    analysis.plan.forEach(function (item, i) {
      var isActive = item.key === focusKey;
      html +=
        '<li class="dashboard-plan__item' +
        (isActive ? " is-active" : "") +
        '">' +
        '<span class="dashboard-plan__rank">' +
        (i + 1) +
        "</span>" +
        '<div class="dashboard-plan__body">' +
        "<strong>" +
        t("dashboard.plan." + item.key + ".title") +
        "</strong>" +
        "<p>" +
        t("dashboard.plan." + item.key + ".desc") +
        "</p>" +
        '<div class="dashboard-plan__meta">' +
        '<span class="dashboard-plan__pillar">' +
        pillarLabel(item.pillar) +
        "</span>" +
        '<span class="dashboard-plan__impact dashboard-plan__impact--' +
        item.impact +
        '">' +
        impactLabel(item.impact) +
        "</span>" +
        '<span class="dashboard-plan__weeks">' +
        t("dashboard.weeks").replace("{n}", item.weeks) +
        "</span>" +
        "</div>" +
        (!isActive
          ? '<button type="button" class="btn btn--ghost btn--sm dashboard-journey__switch" data-focus-key="' +
            escapeAttr(item.key) +
            '">' +
            t("dashboard.journey.switchFocus") +
            "</button>"
          : '<span class="dashboard-journey__active-label">' +
            t("dashboard.journey.activeBadge") +
            "</span>") +
        "</div>" +
        "</li>";
    });
    html += "</ol></section>";

    html +=
      '<p class="dashboard-journey__disclaimer">' + t("dashboard.journey.disclaimer") + "</p>";
    html += "</div>";

    container.innerHTML = html;

    container.querySelectorAll(".dashboard-journey__action-checkbox").forEach(function (input) {
      input.addEventListener("change", function () {
        var key = input.getAttribute("data-action-key");
        if (typeof callbacks.onActionToggle === "function") {
          callbacks.onActionToggle(key, input.checked);
        }
      });
    });

    container.querySelectorAll("[data-action-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        var card = button.closest(".dashboard-action-card");
        if (!card) return;
        var body = card.querySelector(".dashboard-action-card__body");
        if (!body) return;
        var willOpen = button.getAttribute("aria-expanded") !== "true";

        container.querySelectorAll(".dashboard-action-card.is-open").forEach(function (openCard) {
          if (openCard === card) return;
          openCard.classList.remove("is-open");
          var openToggle = openCard.querySelector("[data-action-toggle]");
          var openBody = openCard.querySelector(".dashboard-action-card__body");
          if (openToggle) {
            openToggle.setAttribute("aria-expanded", "false");
            openToggle.textContent = catalogT("ui.showDetail");
          }
          if (openBody) openBody.hidden = true;
        });

        card.classList.toggle("is-open", willOpen);
        button.setAttribute("aria-expanded", willOpen ? "true" : "false");
        button.textContent = willOpen ? catalogT("ui.hideDetail") : catalogT("ui.showDetail");
        body.hidden = !willOpen;
      });
    });

    container.querySelectorAll(".dashboard-journey__switch").forEach(function (button) {
      button.addEventListener("click", function () {
        var key = button.getAttribute("data-focus-key");
        if (typeof callbacks.onFocusChange === "function") {
          callbacks.onFocusChange(key);
        }
      });
    });

    var rescanBtn = container.querySelector("#dashboard-journey-rescan");
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

  function metricStatusRank(status) {
    if (status === "focus") return 0;
    if (status === "average") return 1;
    return 2;
  }

  function renderMetricsTop5(container, analysis, callbacks) {
    callbacks = callbacks || {};
    var showAll = !!callbacks.showAll;
    if (!container || !analysis) return;

    var pillars = ["harmony", "angularity", "dimorphism", "features"];
    var all = [];
    pillars.forEach(function (pillar) {
      var data = analysis.pillars[pillar];
      if (!data || !data.metrics) return;
      data.metrics.forEach(function (metric) {
        all.push({ pillar: pillar, metric: metric });
      });
    });
    all.sort(function (a, b) {
      var diff = metricStatusRank(a.metric.status) - metricStatusRank(b.metric.status);
      if (diff !== 0) return diff;
      return Number(a.metric.value) - Number(b.metric.value);
    });

    var html =
      '<section class="dashboard-metrics-top">' +
        '<div class="dashboard-metrics-top__head">' +
          '<h2 class="dashboard-section__title">' + t("dashboard.metricsView.top5Title") + "</h2>" +
          '<p class="dashboard-section__subtitle">' + t("dashboard.metricsView.top5Subtitle") + "</p>" +
        "</div>";

    if (!showAll) {
      html += '<div class="dashboard-metrics">';
      all.slice(0, 5).forEach(function (item) {
        var metric = item.metric;
        html +=
          '<div class="dashboard-metrics__card dashboard-metrics__card--' + metric.status + '">' +
            '<div class="dashboard-metrics__summary dashboard-metrics__summary--flat">' +
              '<span class="dashboard-metrics__info">' +
                '<span class="dashboard-metrics__name">' + t("dashboard.metrics." + metric.key) + "</span>" +
                '<span class="dashboard-metrics__pillar">' + pillarLabel(item.pillar) + "</span>" +
              "</span>" +
              '<span class="dashboard-metrics__value-wrap">' +
                '<strong class="dashboard-metrics__value">' + metric.value + "</strong>" +
                '<span class="dashboard-metrics__status dashboard-metrics__status--' + metric.status + '">' +
                  statusLabel(metric.status) +
                "</span>" +
              "</span>" +
            "</div>" +
          "</div>";
      });
      html += "</div>";
      html +=
        '<button type="button" class="btn btn--full dashboard-metrics-top__toggle" data-metrics-show-all>' +
          t("dashboard.metricsView.showAll") +
        "</button>";
    } else {
      html += '<div id="dashboard-metrics-all"></div>';
      html +=
        '<button type="button" class="btn btn--ghost btn--full dashboard-metrics-top__toggle" data-metrics-show-top>' +
          t("dashboard.metricsView.showTop") +
        "</button>";
    }

    html += "</section>";
    container.innerHTML = html;

    var showAllBtn = container.querySelector("[data-metrics-show-all]");
    if (showAllBtn && typeof callbacks.onShowAll === "function") {
      showAllBtn.addEventListener("click", callbacks.onShowAll);
    }
    var showTopBtn = container.querySelector("[data-metrics-show-top]");
    if (showTopBtn && typeof callbacks.onShowTop === "function") {
      showTopBtn.addEventListener("click", callbacks.onShowTop);
    }
    if (showAll) {
      renderMetricsTabs(container.querySelector("#dashboard-metrics-all"), analysis);
    }
  }

  function renderSimplePlan(container, analysis, userId, callbacks) {
    if (!container || !analysis || !analysis.plan || !analysis.plan.length) return;

    callbacks = callbacks || {};
    var journey =
      userId && window.Onboarding ? window.Onboarding.getJourney(userId, analysis) : null;
    var protocols = window.ImprovementProtocols;
    var focusKey = journey ? journey.activeFocusKey : analysis.plan[0].key;
    var protocol = protocols ? protocols.getProtocol(focusKey) : null;
    var phaseIndex =
      protocol && journey && protocols ? protocols.resolvePhaseIndex(journey, protocol) : 0;
    var actionProgress = (journey && journey.actionProgress) || {};
    var phaseActions =
      protocol && protocols ? protocols.listPhaseActions(protocol, phaseIndex) : [];

    var html =
      '<div class="dashboard-plan dashboard-plan--simple">' +
        '<p class="dashboard-section__subtitle">' + t("dashboard.planSubtitle") + "</p>" +
        '<ol class="dashboard-plan__list">';

    analysis.plan.forEach(function (item) {
      html +=
        '<li class="dashboard-plan__item' + (item.key === focusKey ? " is-active" : "") + '">' +
          '<div class="dashboard-plan__body">' +
            "<strong>" + t("dashboard.plan." + item.key + ".title") + "</strong>" +
            "<p>" + t("dashboard.plan." + item.key + ".desc") + "</p>" +
            '<div class="dashboard-plan__meta">' +
              '<span class="dashboard-plan__pillar">' + pillarLabel(item.pillar) + "</span>" +
            "</div>" +
          "</div>" +
        "</li>";
    });

    html += "</ol>";

    if (phaseActions.length) {
      html += '<section class="dashboard-journey__week">';
      html += "<h3>" + t("dashboard.journey.thisWeek") + "</h3>";
      html += '<ul class="dashboard-journey__actions">';
      phaseActions.forEach(function (actionKey) {
        var checked = !!actionProgress[actionKey];
        html +=
          '<li class="dashboard-journey__action' + (checked ? " is-done" : "") + '">' +
            '<label class="dashboard-journey__action-label">' +
              '<input type="checkbox" class="dashboard-journey__action-checkbox" data-action-key="' +
              actionKey +
              '"' +
              (checked ? " checked" : "") +
              ">" +
              '<span class="dashboard-journey__action-text">' +
              getNextActionLabel(focusKey, actionKey) +
              "</span>" +
            "</label>" +
          "</li>";
      });
      html += "</ul></section>";
    }

    html += "</div>";
    container.innerHTML = html;

    container.querySelectorAll(".dashboard-journey__action-checkbox").forEach(function (input) {
      input.addEventListener("change", function () {
        var key = input.getAttribute("data-action-key");
        if (typeof callbacks.onActionToggle === "function") {
          callbacks.onActionToggle(key, input.checked);
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

  function renderResultsPreview(container, analysis, locked, options) {
    options = options || {};
    var compact = !!options.compact;
    var scores = analysis.scores;
    var photo = options.frontPhoto || null;
    var valueCls = locked ? " results-dashboard__value" : "";

    var selfieHtml = photo
      ? '<div class="results-dashboard__selfie-wrap">' +
          '<img class="results-dashboard__selfie" src="' + escapeHtml(photo) + '" alt="" width="68" height="68" decoding="async">' +
        "</div>"
      : "";

    var metricsHtml = compact
      ? ""
      : '<div class="results-dashboard__metrics">' +
          '<div class="results-dashboard__metric"><span data-i18n="onboarding.results.metric1">' + t("onboarding.results.metric1") + '</span><strong' + (locked ? ' class="results-dashboard__value"' : "") + ">" + analysis.summary.facialThirds + "</strong></div>" +
          '<div class="results-dashboard__metric"><span data-i18n="onboarding.results.metric2">' + t("onboarding.results.metric2") + '</span><strong' + (locked ? ' class="results-dashboard__value"' : "") + ">" + analysis.summary.jawAngle + "</strong></div>" +
          '<div class="results-dashboard__metric"><span data-i18n="onboarding.results.metric3">' + t("onboarding.results.metric3") + '</span><strong' + (locked ? ' class="results-dashboard__value"' : "") + ">" + analysis.summary.symmetryDeviation + "</strong></div>" +
          '<div class="results-dashboard__metric"><span data-i18n="onboarding.results.metric4">' + t("onboarding.results.metric4") + '</span><strong' + (locked ? ' class="results-dashboard__value"' : "") + ">" + analysis.summary.ipdRatio + "</strong></div>" +
        "</div>";

    var lockHtml = !compact && locked
      ? '<div class="results-dashboard__lock" id="results-lock">' +
          '<div class="results-dashboard__lock-icon" aria-hidden="true">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
          '</div>' +
          '<p class="results-dashboard__lock-text" data-i18n="onboarding.results.lock">' + t("onboarding.results.lock") + "</p>" +
        "</div>"
      : "";

    container.className =
      "results-dashboard" +
      (locked ? "" : " is-unlocked") +
      (compact ? " results-dashboard--compact" : "");
    container.innerHTML =
      selfieHtml +
      '<div class="results-dashboard__overall">' +
        '<span class="results-dashboard__label" data-i18n="onboarding.results.overall">' + t("onboarding.results.overall") + "</span>" +
        '<span class="results-dashboard__score' + valueCls + '">' + scores.overall + "<small>/10</small></span>" +
        (locked && !compact
          ? '<p class="results-dashboard__teaser" data-i18n="onboarding.results.teaser">' + t("onboarding.results.teaser") + "</p>"
          : "") +
      "</div>" +
      '<div class="results-dashboard__pillars">' +
        ["harmony", "angularity", "dimorphism", "features"].map(function (pillar) {
          var label = pillarLabel(pillar);
          var val = scores[pillar];
          return '<div class="results-dashboard__pillar">' +
            '<span class="results-dashboard__pillar-name">' + label + "</span>" +
            '<div class="results-dashboard__pillar-bar' + valueCls + '"><div class="results-dashboard__pillar-fill" style="width:' + (val / 10 * 100) + '%"></div></div>' +
            '<span class="results-dashboard__pillar-score' + valueCls + '">' + val + "</span>" +
          "</div>";
        }).join("") +
      "</div>" +
      metricsHtml +
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
    renderNextStep: renderNextStep,
    renderFocusCard: renderFocusCard,
    renderStrengthsWeaknesses: renderStrengthsWeaknesses,
    renderHomeLink: renderHomeLink,
    renderQuickNav: renderQuickNav,
    renderToolsStrip: renderToolsStrip,
    renderProgressActions: renderProgressActions,
    renderEmptyState: renderEmptyState,
    renderScoreHero: renderScoreHero,
    renderScanSummary: renderScanSummary,
    renderPhotos: renderPhotos,
    renderPillarBars: renderPillarBars,
    renderMetricPreview: renderMetricPreview,
    renderScoreBreakdown: renderScoreBreakdown,
    renderMetricsTabs: renderMetricsTabs,
    renderMetricsTop5: renderMetricsTop5,
    renderSimplePlan: renderSimplePlan,
    renderPlan: renderPlan,
    renderSummaryGrid: renderSummaryGrid,
    renderResultsPreview: renderResultsPreview
  };
})();
