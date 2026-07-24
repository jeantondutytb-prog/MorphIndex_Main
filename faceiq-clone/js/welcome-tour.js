(function () {
  var STORAGE_KEY = "morphindex-welcome-pending";
  var STEP_MS = 2000;

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

  function markPending() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {
      // Ignore.
    }
  }

  function shouldShow() {
    var params = new URLSearchParams(window.location.search);
    if (params.get("welcome") === "1") return true;
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function clearFlag() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // Ignore.
    }
    if (window.history && window.history.replaceState) {
      try {
        var url = new URL(window.location.href);
        if (url.searchParams.has("welcome")) {
          url.searchParams.delete("welcome");
          var next = url.pathname + (url.searchParams.toString() ? "?" + url.searchParams.toString() : "");
          window.history.replaceState({}, "", next);
        }
      } catch (e) {
        // Ignore.
      }
    }
  }

  function getSteps() {
    return [
      {
        center: true,
        title: t("app.welcomeTour.step0.title"),
        body: t("app.welcomeTour.step0.body")
      },
      {
        target: '.dashboard-tabbar__item[href="/app"]',
        placement: "top",
        title: t("app.welcomeTour.step1.title"),
        body: t("app.welcomeTour.step1.body")
      },
      {
        target: '.dashboard-tabbar__item[href="/app/plan"]',
        placement: "top",
        title: t("app.welcomeTour.step2.title"),
        body: t("app.welcomeTour.step2.body")
      },
      {
        target: '.dashboard-tabbar__item[href="/app/metrics"]',
        placement: "top",
        title: t("app.welcomeTour.step3.title"),
        body: t("app.welcomeTour.step3.body")
      },
      {
        target: "#coach-fab",
        placement: "left",
        title: t("app.welcomeTour.step4.title"),
        body: t("app.welcomeTour.step4.body")
      }
    ];
  }

  function positionBubble(bubble, arrow, target, placement, center) {
    var pad = 12;
    var rect;

    if (center || !target) {
      bubble.style.top = "50%";
      bubble.style.left = "50%";
      bubble.style.transform = "translate(-50%, -50%)";
      arrow.hidden = true;
      return;
    }

    rect = target.getBoundingClientRect();
    arrow.hidden = false;

    var bubbleRect = bubble.getBoundingClientRect();
    var top = 0;
    var left = 0;

    if (placement === "top") {
      top = rect.top - bubbleRect.height - pad - 10;
      left = rect.left + rect.width / 2 - bubbleRect.width / 2;
      arrow.className = "welcome-tour__arrow welcome-tour__arrow--down";
      arrow.style.top = rect.top - 10 + "px";
      arrow.style.left = rect.left + rect.width / 2 - 8 + "px";
    } else if (placement === "left") {
      top = rect.top + rect.height / 2 - bubbleRect.height / 2;
      left = rect.left - bubbleRect.width - pad - 10;
      arrow.className = "welcome-tour__arrow welcome-tour__arrow--right";
      arrow.style.top = rect.top + rect.height / 2 - 8 + "px";
      arrow.style.left = rect.left - 10 + "px";
    } else {
      top = rect.bottom + pad + 10;
      left = rect.left + rect.width / 2 - bubbleRect.width / 2;
      arrow.className = "welcome-tour__arrow welcome-tour__arrow--up";
      arrow.style.top = rect.bottom + 2 + "px";
      arrow.style.left = rect.left + rect.width / 2 - 8 + "px";
    }

    left = Math.max(pad, Math.min(left, window.innerWidth - bubbleRect.width - pad));
    top = Math.max(pad, Math.min(top, window.innerHeight - bubbleRect.height - pad));

    bubble.style.top = top + "px";
    bubble.style.left = left + "px";
    bubble.style.transform = "none";
  }

  function show(onDone) {
    if (!shouldShow()) {
      if (typeof onDone === "function") onDone();
      return;
    }

    var steps = getSteps();
    var index = 0;
    var root = document.createElement("div");
    root.className = "welcome-tour";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", t("app.welcomeTour.aria"));
    root.innerHTML =
      '<div class="welcome-tour__backdrop"></div>' +
      '<div class="welcome-tour__spotlight" hidden></div>' +
      '<div class="welcome-tour__arrow" hidden aria-hidden="true"></div>' +
      '<div class="welcome-tour__bubble">' +
        '<p class="welcome-tour__step-label"></p>' +
        '<h2 class="welcome-tour__title"></h2>' +
        '<p class="welcome-tour__body"></p>' +
        '<div class="welcome-tour__dots"></div>' +
        '<button type="button" class="welcome-tour__skip">' + t("app.welcomeTour.skip") + "</button>" +
      "</div>";

    document.body.appendChild(root);
    document.body.classList.add("welcome-tour-open");

    var backdrop = root.querySelector(".welcome-tour__backdrop");
    var spotlight = root.querySelector(".welcome-tour__spotlight");
    var bubble = root.querySelector(".welcome-tour__bubble");
    var arrowEl = root.querySelector(".welcome-tour__arrow");
    var stepLabel = root.querySelector(".welcome-tour__step-label");
    var titleEl = root.querySelector(".welcome-tour__title");
    var bodyEl = root.querySelector(".welcome-tour__body");
    var dotsEl = root.querySelector(".welcome-tour__dots");
    var skipBtn = root.querySelector(".welcome-tour__skip");
    var timerId = null;

    dotsEl.innerHTML = steps
      .map(function (_, i) {
        return '<span class="welcome-tour__dot' + (i === 0 ? " is-active" : "") + '"></span>';
      })
      .join("");

    function finish() {
      if (timerId) window.clearTimeout(timerId);
      clearFlag();
      root.classList.add("welcome-tour--leaving");
      window.setTimeout(function () {
        root.remove();
        document.body.classList.remove("welcome-tour-open");
        if (typeof onDone === "function") onDone();
      }, 220);
    }

    function renderStep(stepIndex) {
      var step = steps[stepIndex];
      if (!step) {
        finish();
        return;
      }

      var target = step.target ? document.querySelector(step.target) : null;
      stepLabel.textContent = t("app.welcomeTour.stepOf")
        .replace("{current}", String(stepIndex + 1))
        .replace("{total}", String(steps.length));
      titleEl.textContent = step.title;
      bodyEl.textContent = step.body;

      Array.prototype.forEach.call(dotsEl.children, function (dot, i) {
        dot.classList.toggle("is-active", i === stepIndex);
      });

      if (target) {
        target.classList.add("welcome-tour__highlight");
        var rect = target.getBoundingClientRect();
        spotlight.hidden = false;
        spotlight.style.top = rect.top - 6 + "px";
        spotlight.style.left = rect.left - 6 + "px";
        spotlight.style.width = rect.width + 12 + "px";
        spotlight.style.height = rect.height + 12 + "px";
      } else {
        spotlight.hidden = true;
      }

      document.querySelectorAll(".welcome-tour__highlight").forEach(function (el) {
        if (!target || el !== target) el.classList.remove("welcome-tour__highlight");
      });

      window.requestAnimationFrame(function () {
        positionBubble(bubble, arrowEl, target, step.placement, step.center);
      });

      timerId = window.setTimeout(function () {
        if (target) target.classList.remove("welcome-tour__highlight");
        renderStep(stepIndex + 1);
      }, STEP_MS);
    }

    skipBtn.addEventListener("click", finish);
    backdrop.addEventListener("click", finish);
    renderStep(0);
  }

  window.WelcomeTour = {
    markPending: markPending,
    shouldShow: shouldShow,
    show: show,
    clear: clearFlag
  };
})();
