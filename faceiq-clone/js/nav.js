(function () {
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector("[data-nav-toggle]");
  var drawer = document.querySelector("[data-nav-drawer]");
  var backdrop = document.querySelector("[data-nav-backdrop]");

  if (!toggle || !drawer || !backdrop) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    drawer.classList.toggle("is-open", open);
    backdrop.hidden = !open;
    document.body.classList.toggle("nav-open", open);
    if (nav) nav.classList.toggle("is-menu-open", open);
  }

  function closeMenu() {
    setOpen(false);
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  backdrop.addEventListener("click", closeMenu);

  drawer.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) closeMenu();
  });
})();
