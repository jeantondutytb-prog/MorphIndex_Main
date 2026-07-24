(function () {
  var header = document.querySelector(".marketing .nav");
  if (header) {
    var lastY = 0;
    var ticking = false;

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (y > 100 && y > lastY + 8) {
        header.classList.add("is-hidden");
      } else if (y < lastY - 8 || y <= 100) {
        header.classList.remove("is-hidden");
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(onScroll);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  document.querySelectorAll("[data-faq-item]").forEach(function (item) {
    var btn = item.querySelector("[data-faq-toggle]");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var open = item.classList.contains("is-open");
      document.querySelectorAll("[data-faq-item].is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          var otherBtn = other.querySelector("[data-faq-toggle]");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("is-open", !open);
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });
})();
