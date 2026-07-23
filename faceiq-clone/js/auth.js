(function () {
  var form = document.getElementById("auth-form");
  var emailInput = document.getElementById("auth-email");
  var passwordInput = document.getElementById("auth-password");
  var toggleBtn = document.getElementById("auth-password-toggle");

  if (!form || !emailInput || !passwordInput) return;

  function updateToggleLabel() {
    if (!toggleBtn) return;
    var showLabel = document.body.dataset.showPassword;
    var hideLabel = document.body.dataset.hidePassword;
    var visible = toggleBtn.getAttribute("aria-pressed") === "true";
    toggleBtn.setAttribute("aria-label", visible ? hideLabel : showLabel);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var visible = toggleBtn.getAttribute("aria-pressed") === "true";
      toggleBtn.setAttribute("aria-pressed", visible ? "false" : "true");
      passwordInput.type = visible ? "password" : "text";
      updateToggleLabel();
    });

    document.addEventListener("langchange", updateToggleLabel);
    updateToggleLabel();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }
    if (!passwordInput.checkValidity()) {
      passwordInput.reportValidity();
      return;
    }
    emailInput.blur();
    passwordInput.blur();
  });

  document.querySelectorAll(".auth__social").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.blur();
    });
  });
})();
