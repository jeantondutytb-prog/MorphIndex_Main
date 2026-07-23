(function () {
  function renderOverview(ctx) {
    if (!ctx) return;
    var state = ctx.state;
    var analysis = ctx.analysis;

    if (!state.frontPhoto && !state.sidePhoto) {
      window.Dashboard.renderEmptyState(document.getElementById("dashboard-empty"), state);
      ["dashboard-hero", "dashboard-next-step", "dashboard-strengths", "dashboard-tools", "dashboard-pillars"].forEach(
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
    window.Dashboard.renderScoreHero(document.getElementById("dashboard-hero"), analysis);
    window.Dashboard.renderNextStep(document.getElementById("dashboard-next-step"), ctx);
    window.Dashboard.renderStrengthsWeaknesses(
      document.getElementById("dashboard-strengths"),
      analysis
    );
    window.Dashboard.renderToolsStrip(document.getElementById("dashboard-tools"));
    window.Dashboard.renderPillarBars(document.getElementById("dashboard-pillars"), analysis);
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
      window.Dashboard.renderEmptyState(document.getElementById("dashboard-empty"), ctx.state);
      return;
    }
    window.Dashboard.renderEmptyState(document.getElementById("dashboard-empty"), null);
    window.Dashboard.renderScoreHistory(document.getElementById("dashboard-history"), ctx.state, ctx.analysis);
    window.Dashboard.renderMetricsTabs(document.getElementById("dashboard-metrics"), ctx.analysis);
    window.Dashboard.renderProgressActions(document.getElementById("dashboard-progress-actions"));
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
