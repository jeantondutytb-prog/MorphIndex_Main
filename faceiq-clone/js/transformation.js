(function () {
  var root = document.querySelector("[data-transformation]");
  if (!root) return;

  var SLIDES = [
    { score: "5.1", timeline: 0, scale: 1 },
    { score: "5.6", timeline: 1, scale: 1.02 },
    { score: "6.3", timeline: 2, scale: 1.04 },
    { score: "7.0", timeline: 3, scale: 1.06 },
    { score: "7.42", timeline: 3, scale: 1.08 }
  ];

  var index = 0;
  var image = root.querySelector("[data-transform-image]");
  var scoreEl = root.querySelector("[data-transform-score]");
  var dots = root.querySelectorAll("[data-transform-dots] button");
  var timelineItems = root.querySelectorAll("[data-transform-phase]");
  var beforeBtn = root.querySelector('[data-transform-view="before"]');
  var afterBtn = root.querySelector('[data-transform-view="after"]');
  var scoreStartEl = root.querySelector("[data-transform-score-start]");
  var scoreEndEl = root.querySelector("[data-transform-score-end]");
  var prevBtn = root.querySelector("[data-transform-prev]");
  var nextBtn = root.querySelector("[data-transform-next]");

  function render() {
    var slide = SLIDES[index];

    if (scoreEl) {
      scoreEl.innerHTML = slide.score + "<small>/10</small>";
    }

    if (scoreStartEl) scoreStartEl.textContent = SLIDES[0].score;
    if (scoreEndEl) scoreEndEl.textContent = SLIDES[SLIDES.length - 1].score;

    if (image) {
      image.style.transform = "scale(" + slide.scale + ")";
    }

    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === index);
      dot.setAttribute("aria-current", i === index ? "true" : "false");
    });

    timelineItems.forEach(function (item) {
      var phase = Number(item.getAttribute("data-transform-phase"));
      item.classList.toggle("timeline__item--active", phase === slide.timeline);
    });

    if (beforeBtn && afterBtn) {
      var isBefore = index === 0;
      var isAfter = index === SLIDES.length - 1;
      beforeBtn.classList.toggle("pill--active", isBefore);
      afterBtn.classList.toggle("pill--active", isAfter);
    }

    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === SLIDES.length - 1;
  }

  function goTo(i) {
    index = Math.max(0, Math.min(SLIDES.length - 1, i));
    render();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      goTo(index - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      goTo(index + 1);
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      goTo(i);
    });
  });

  if (beforeBtn) {
    beforeBtn.addEventListener("click", function () {
      goTo(0);
    });
  }

  if (afterBtn) {
    afterBtn.addEventListener("click", function () {
      goTo(SLIDES.length - 1);
    });
  }

  var touchStartX = 0;
  var imageWrap = root.querySelector(".transformation__image");

  if (imageWrap) {
    imageWrap.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    imageWrap.addEventListener("touchend", function (e) {
      var delta = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(delta) < 40) return;
      goTo(delta < 0 ? index + 1 : index - 1);
    }, { passive: true });
  }

  render();
})();
