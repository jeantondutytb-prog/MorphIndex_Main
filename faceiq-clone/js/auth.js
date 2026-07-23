(function () {
  var form = document.getElementById("auth-form");
  var emailInput = document.getElementById("auth-email");
  var clearBtn = document.getElementById("auth-clear");

  if (!form || !emailInput) return;

  function toggleClear() {
    if (!clearBtn) return;
    var hasValue = emailInput.value.length > 0;
    clearBtn.hidden = !hasValue;
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
    emailInput.blur();
  });

  document.querySelectorAll(".auth__social").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.blur();
    });
  });
})();
