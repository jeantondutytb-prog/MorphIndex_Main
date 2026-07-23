(function () {
  var form = document.getElementById("auth-form");
  var emailInput = document.getElementById("auth-email");
  var passwordInput = document.getElementById("auth-password");
  var clearBtn = document.getElementById("auth-clear");

  if (!form || !emailInput || !passwordInput) return;

  function toggleClear() {
    if (!clearBtn) return;
    clearBtn.hidden = emailInput.value.length === 0;
  }

  emailInput.addEventListener("input", toggleClear);

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      emailInput.value = "";
      emailInput.focus();
      toggleClear();
    });
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
