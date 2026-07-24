(function () {
  var metricsShowAll = false;

  function renderOverview(ctx) {
    if (!ctx) return;
    var state = ctx.state;
    var analysis = ctx.analysis;

    if (!state.frontPhoto && !state.sidePhoto) {
      window.Dashboard.renderEmptyState(document.getElementById("dashboard-empty"), state);
      ["dashboard-hero", "dashboard-next-step", "dashboard-tools", "dashboard-pillars"].forEach(
        function (id) {
          var el = document.getElementById(id);
          if (!el) return;
          el.innerHTML = "";
          if (id !== "dashboard-hero" && id !== "dashboard-pillars") el.hidden = true;
        }
      );
      return;
    }

    window.Dashboard.renderEmptyState(document.getElementById("dashboard-empty"), null);
    window.Dashboard.renderScanSummary(document.getElementById("dashboard-hero"), analysis, state);
    window.Dashboard.renderNextStep(document.getElementById("dashboard-next-step"), ctx);
    window.Dashboard.renderQuickNav(document.getElementById("dashboard-tools"));
    window.Dashboard.renderMetricPreview(document.getElementById("dashboard-pillars"), analysis);
  }

  function renderPreviewSection(ctx) {
    if (!ctx) return;
    var state = ctx.state;
    var analysis = ctx.analysis;
    var session = ctx.session;
    var user = ctx.user;

    if (!state.frontPhoto) {
      window.Dashboard.renderEmptyState(document.getElementById("dashboard-preview"), state);
      return;
    }

    var PREVIEW_STALE_MS = 3 * 60 * 1000;
    if (state.previewGenerating && state.previewGeneratingAt && Date.now() - state.previewGeneratingAt > PREVIEW_STALE_MS) {
      window.Onboarding.saveState(user.id, { previewGenerating: false, previewError: true });
      state = window.Onboarding.getState(user.id);
    }

    var previewError = !!state.previewError;

    window.Dashboard.renderPreview(
      document.getElementById("dashboard-preview"),
      state,
      analysis,
      { loading: !!state.previewGenerating, error: previewError }
    );

    if (!state.preview6mUrl && !state.previewGenerating && !previewError && session && window.AiApi) {
      window.Onboarding.saveState(user.id, {
        previewGenerating: true,
        previewGeneratingAt: Date.now(),
        previewError: false
      });
      renderPreviewSection(window.AppShell.getAppContext());
      window.AiApi.generatePreview(session, state.frontPhoto, analysis.plan).then(function (result) {
        if (result.ok && result.previewUrl) {
          window.Onboarding.saveState(user.id, {
            preview6mUrl: result.previewUrl,
            preview6mAt: result.generatedAt,
            previewGenerating: false,
            previewError: false
          });
          if (window.Onboarding.queueScanSync) {
            window.Onboarding.queueScanSync(user.id, { includePhotos: false });
          }
        } else {
          window.Onboarding.saveState(user.id, { previewGenerating: false, previewError: true });
        }
        renderPreviewSection(window.AppShell.getAppContext());
      }).catch(function () {
        window.Onboarding.saveState(user.id, { previewGenerating: false, previewError: true });
        renderPreviewSection(window.AppShell.getAppContext());
      });
    }
  }

  function renderPotentialPage(ctx) {
    if (!ctx) return;
    if (!ctx.state.frontPhoto) {
      window.Dashboard.renderEmptyState(document.getElementById("dashboard-empty"), ctx.state);
      return;
    }
    renderPreviewSection(ctx);
    if (window.Simulate) {
      window.Simulate.mount(document.getElementById("simulate-root"), ctx);
    }
  }

  function renderMetricsPage(ctx) {
    if (!ctx) return;
    if (!ctx.state.frontPhoto) {
      window.Dashboard.renderEmptyState(document.getElementById("dashboard-empty"), ctx.state);
      return;
    }
    window.Dashboard.renderEmptyState(document.getElementById("dashboard-empty"), null);
    window.Dashboard.renderScoreHistory(document.getElementById("dashboard-history"), ctx.state, ctx.analysis);
    window.Dashboard.renderMetricsTop5(document.getElementById("dashboard-metrics"), ctx.analysis, {
      showAll: metricsShowAll,
      onShowAll: function () {
        metricsShowAll = true;
        renderMetricsPage(window.AppShell.getAppContext());
      },
      onShowTop: function () {
        metricsShowAll = false;
        renderMetricsPage(window.AppShell.getAppContext());
      }
    });
    window.Dashboard.renderProgressActions(document.getElementById("dashboard-progress-actions"));
  }

  function renderPlanPage(ctx) {
    if (!ctx) return;
    if (!ctx.state.frontPhoto) {
      window.Dashboard.renderEmptyState(document.getElementById("dashboard-plan"), ctx.state);
      return;
    }
    window.Dashboard.renderSimplePlan(
      document.getElementById("dashboard-plan"),
      ctx.analysis,
      ctx.user.id,
      {
        onActionToggle: function (actionKey, done) {
          window.Onboarding.toggleJourneyAction(ctx.user.id, actionKey, done, ctx.analysis);
          renderPlanPage(window.AppShell.getAppContext());
        }
      }
    );
  }

  function renderChatPage(ctx) {
    if (!ctx) return;
    if (window.FaceGpt) {
      window.FaceGpt.mount(document.getElementById("facegpt-root"), ctx);
    }
  }

  function bootPage() {
    var currentView = document.body.getAttribute("data-app-view") || "overview";
    var renderers = {
      overview: renderOverview,
      preview: renderPotentialPage,
      simulate: renderPotentialPage,
      potential: renderPotentialPage,
      metrics: renderMetricsPage,
      plan: renderPlanPage,
      chat: renderChatPage
    };

    function renderCurrent(ctx) {
      var render = renderers[currentView] || renderOverview;
      render(ctx);
    }

    window.AppShell.boot(renderCurrent);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootPage);
  } else {
    bootPage();
  }
})();
