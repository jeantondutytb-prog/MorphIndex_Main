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

  var PROCEDURES = ["jawline", "nose", "cheeks", "chin", "lips"];

  function mount(container, ctx) {
    if (!container || !ctx) return;

    var state = ctx.state;
    var procedure = "jawline";
    var intensity = 50;
    var generating = false;
    var resultUrl = state.procedureSimulations && state.procedureSimulations[procedure]
      ? state.procedureSimulations[procedure].previewUrl
      : null;

    container.innerHTML =
      '<section class="simulate">' +
        '<p class="dashboard-section__subtitle">' + t("dashboard.simulate.subtitle") + "</p>" +
        '<div class="simulate__procedures" id="simulate-procedures"></div>' +
        '<div class="simulate__slider">' +
          '<label for="simulate-intensity">' + t("dashboard.simulate.intensity") + '</label>' +
          '<input type="range" id="simulate-intensity" min="0" max="100" value="50">' +
          '<span id="simulate-intensity-value">50%</span>' +
        '</div>' +
        '<button type="button" class="btn btn--full btn--lg" id="simulate-generate">' + t("dashboard.simulate.generate") + "</button>" +
        '<p class="simulate__error" id="simulate-error" hidden role="alert"></p>' +
        '<div class="simulate__compare" id="simulate-compare" hidden>' +
          '<div class="dashboard-compare">' +
            '<div class="dashboard-compare__after"><img id="simulate-after" alt=""></div>' +
            '<div class="dashboard-compare__before"><img id="simulate-before" src="' + state.frontPhoto + '" alt=""></div>' +
            '<div class="dashboard-compare__handle" aria-hidden="true"></div>' +
            '<input type="range" class="dashboard-compare__range" min="0" max="100" value="50" aria-label="' + t("dashboard.preview.dragHint") + '">' +
          '</div>' +
          '<div class="dashboard-compare__labels">' +
            '<span>' + t("dashboard.preview.before") + '</span>' +
            '<span>' + t("dashboard.simulate.after") + '</span>' +
          '</div>' +
        '</div>' +
        '<p class="simulate__disclaimer">' + t("dashboard.simulate.disclaimer") + "</p>" +
      "</section>";

    var proceduresEl = container.querySelector("#simulate-procedures");
    var intensityInput = container.querySelector("#simulate-intensity");
    var intensityValue = container.querySelector("#simulate-intensity-value");
    var generateBtn = container.querySelector("#simulate-generate");
    var errorEl = container.querySelector("#simulate-error");
    var compareEl = container.querySelector("#simulate-compare");
    var afterImg = container.querySelector("#simulate-after");

    function renderProcedures() {
      proceduresEl.innerHTML = PROCEDURES.map(function (id) {
        return (
          '<button type="button" class="simulate__procedure' + (id === procedure ? " is-active" : "") + '" data-procedure="' + id + '">' +
            t("dashboard.simulate.procedures." + id) +
          "</button>"
        );
      }).join("");

      proceduresEl.querySelectorAll("[data-procedure]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          procedure = btn.getAttribute("data-procedure");
          var saved = state.procedureSimulations && state.procedureSimulations[procedure];
          resultUrl = saved ? saved.previewUrl : null;
          renderProcedures();
          updateCompare();
        });
      });
    }

    function showError(message) {
      if (!errorEl) return;
      errorEl.textContent = message || "";
      errorEl.hidden = !message;
    }

    function bindCompareSlider() {
      var compare = compareEl.querySelector(".dashboard-compare");
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
      range.addEventListener("input", function () { update(range.value); });
      update(range.value || 50);
    }

    function updateCompare() {
      if (resultUrl && afterImg) {
        afterImg.src = resultUrl;
        compareEl.hidden = false;
        bindCompareSlider();
      } else {
        compareEl.hidden = true;
      }
    }

    renderProcedures();
    updateCompare();

    if (intensityInput) {
      intensityInput.addEventListener("input", function () {
        intensity = Number(intensityInput.value);
        if (intensityValue) intensityValue.textContent = intensity + "%";
      });
    }

    if (generateBtn) {
      generateBtn.addEventListener("click", function () {
        if (generating || !window.AiApi) return;
        generating = true;
        generateBtn.disabled = true;
        generateBtn.textContent = t("dashboard.simulate.generating");
        showError("");

        window.AiApi.simulateProcedure(ctx.session, state.frontPhoto, procedure, intensity).then(function (result) {
          if (result.ok && result.previewUrl) {
            var sims = Object.assign({}, state.procedureSimulations || {});
            sims[procedure] = { previewUrl: result.previewUrl, generatedAt: result.generatedAt, intensity: intensity };
            window.Onboarding.saveState(ctx.user.id, { procedureSimulations: sims });
            state = window.Onboarding.getState(ctx.user.id);
            resultUrl = result.previewUrl;
            updateCompare();
          } else {
            showError(t("dashboard.simulate.error"));
          }
        }).finally(function () {
          generating = false;
          generateBtn.disabled = false;
          generateBtn.textContent = t("dashboard.simulate.generate");
        });
      });
    }
  }

  window.Simulate = { mount: mount };
})();
