(function () {
  function initVideoTabs() {
    var tabs = document.querySelectorAll("[data-video-tab]");
    var videos = document.querySelectorAll(".product-preview__video");
    if (!tabs.length || !videos.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-video-tab");

        tabs.forEach(function (t) {
          var active = t === tab;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", active ? "true" : "false");
        });

        videos.forEach(function (video) {
          var isTarget = video.getAttribute("data-video") === target;
          video.classList.toggle("is-active", isTarget);
          if (isTarget) {
            video.play().catch(function () {});
          } else {
            video.pause();
          }
        });
      });
    });
  }

  function initTestimonials() {
    var toggle = document.querySelector("[data-testimonials-toggle]");
    var grid = document.querySelector(".testimonials-grid");
    if (!toggle || !grid) return;

    toggle.addEventListener("click", function () {
      grid.classList.add("is-expanded");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initVideoTabs();
    initTestimonials();
  });
})();
