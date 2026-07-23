(function () {
  var currentView = "overview";

  function renderOverview(ctx) {
    if (!ctx) return;
    var state = ctx.state;
    var analysis = ctx.analysis;

    window.Dashboard.renderScoreHero(document.getElementById("dashboard-hero"), analysis);
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
    var previewError = !!state.previewError;

    window.Dashboard.renderPreview(
      document.getElementById("dashboard-preview"),
      state,
      analysis,
      { loading: !!state.previewGenerating, error: previewError }
    );

    if (!state.preview6mUrl && !state.previewGenerating && !previewError && session && window.AiApi) {
      window.Onboarding.saveState(user.id, { previewGenerating: true, previewError: false });
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
      });
    }
  }

  function renderMetricsPage(ctx) {
    if (!ctx) return;
    window.Dashboard.renderMetricsTabs(document.getElementById("dashboard-metrics"), ctx.analysis);
  }

  function renderPlanPage(ctx) {
    if (!ctx) return;
    window.Dashboard.renderPlan(document.getElementById("dashboard-plan"), ctx.analysis);
  }

  function bootPage() {
    currentView = document.body.getAttribute("data-app-view") || "overview";
    var renderers = {
      overview: renderOverview,
      preview: renderPreviewPage,
      metrics: renderMetricsPage,
      plan: renderPlanPage
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
