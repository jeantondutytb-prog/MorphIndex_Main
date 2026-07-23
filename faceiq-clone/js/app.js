(function () {
  function renderOverview(ctx) {
    if (!ctx) return;
    var state = ctx.state;
    var analysis = ctx.analysis;

    if (!state.frontPhoto && !state.sidePhoto) {
      window.Dashboard.renderEmptyState(document.getElementById("dashboard-empty"), state);
      return;
    }

    window.Dashboard.renderEmptyState(document.getElementById("dashboard-empty"), null);
    window.Dashboard.renderScoreHero(document.getElementById("dashboard-hero"), analysis);
    window.Dashboard.renderScoreHistory(document.getElementById("dashboard-history"), state, analysis);
    window.Dashboard.renderQuickActions(document.getElementById("dashboard-quick-actions"));
    window.Dashboard.renderPhotos(document.getElementById("dashboard-photos"), state);
    window.Dashboard.renderPillarBars(document.getElementById("dashboard-pillars"), analysis);
    window.Dashboard.renderSummaryGrid(document.getElementById("dashboard-summary"), analysis);
  }

  function renderPreviewPage(ctx) {
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
      renderPreviewPage(window.AppShell.getAppContext());
      window.AiApi.generatePreview(session, state.frontPhoto, analysis.plan).then(function (result) {
        if (result.ok && result.previewUrl) {
          window.Onboarding.saveState(user.id, {
            preview6mUrl: result.previewUrl,
            preview6mAt: result.generatedAt,
            previewGenerating: false,
            previewError: false
          });
        } else {
          window.Onboarding.saveState(user.id, { previewGenerating: false, previewError: true });
        }
        renderPreviewPage(window.AppShell.getAppContext());
      }).catch(function () {
        window.Onboarding.saveState(user.id, { previewGenerating: false, previewError: true });
        renderPreviewPage(window.AppShell.getAppContext());
      });
    }
  }

  function renderMetricsPage(ctx) {
    if (!ctx) return;
    if (!ctx.state.frontPhoto) {
      window.Dashboard.renderEmptyState(document.getElementById("dashboard-metrics"), ctx.state);
      return;
    }
    window.Dashboard.renderMetricsTabs(document.getElementById("dashboard-metrics"), ctx.analysis);
  }

  function renderPlanPage(ctx) {
    if (!ctx) return;
    if (!ctx.state.frontPhoto) {
      window.Dashboard.renderEmptyState(document.getElementById("dashboard-plan"), ctx.state);
      return;
    }
    window.Dashboard.renderPlan(
      document.getElementById("dashboard-plan"),
      ctx.analysis,
      ctx.user.id,
      {
        onActionToggle: function (actionKey, done) {
          window.Onboarding.toggleJourneyAction(ctx.user.id, actionKey, done, ctx.analysis);
          renderPlanPage(window.AppShell.getAppContext());
        },
        onFocusChange: function (focusKey) {
          window.Onboarding.setActiveFocus(ctx.user.id, focusKey, ctx.analysis);
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

  function renderSimulatePage(ctx) {
    if (!ctx) return;
    if (!ctx.state.frontPhoto) {
      window.Dashboard.renderEmptyState(document.getElementById("simulate-root"), ctx.state);
      return;
    }
    if (window.Simulate) {
      window.Simulate.mount(document.getElementById("simulate-root"), ctx);
    }
  }

  function bootPage() {
    var currentView = document.body.getAttribute("data-app-view") || "overview";
    var renderers = {
      overview: renderOverview,
      preview: renderPreviewPage,
      metrics: renderMetricsPage,
      plan: renderPlanPage,
      chat: renderChatPage,
      simulate: renderSimulatePage
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
