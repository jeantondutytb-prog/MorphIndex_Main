(function () {
  var form = document.getElementById("auth-form");
  var emailInput = document.getElementById("auth-email");
  var passwordInput = document.getElementById("auth-password");
  var toggleBtn = document.getElementById("auth-password-toggle");
  var googleBtn = document.getElementById("auth-google");
  var errorEl = document.getElementById("auth-error");
  var submitBtn = form ? form.querySelector('[type="submit"]') : null;

  if (!form || !emailInput || !passwordInput) return;

  var authMode = document.body.dataset.authPage || "register";
  var supabaseClient = null;
  var busy = false;

  function t(key) {
    var lang = document.documentElement.getAttribute("lang") || "en";
    var labels = {
      en: {
        notConfigured: "Authentication is not configured yet. Add Supabase keys in Vercel.",
        generic: "Something went wrong. Please try again.",
        wrongPassword: "Incorrect password for this email.",
        checkEmail: "Check your inbox to confirm your account.",
        googleFailed: "Google sign-in failed. Please try again."
      },
      fr: {
        notConfigured: "L'authentification n'est pas encore configurée. Ajoutez les clés Supabase dans Vercel.",
        generic: "Une erreur est survenue. Veuillez réessayer.",
        wrongPassword: "Mot de passe incorrect pour cet e-mail.",
        checkEmail: "Consultez votre boîte mail pour confirmer votre compte.",
        googleFailed: "La connexion Google a échoué. Veuillez réessayer."
      },
      es: {
        notConfigured: "La autenticación aún no está configurada. Añade las claves de Supabase en Vercel.",
        generic: "Algo salió mal. Inténtalo de nuevo.",
        wrongPassword: "Contraseña incorrecta para este correo.",
        checkEmail: "Revisa tu correo para confirmar tu cuenta.",
        googleFailed: "El inicio de sesión con Google falló. Inténtalo de nuevo."
      }
    };
    return (labels[lang] && labels[lang][key]) || labels.en[key] || key;
  }

  function showError(message) {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  function clearError() {
    if (!errorEl) return;
    errorEl.textContent = "";
    errorEl.hidden = true;
  }

  function setBusy(state) {
    busy = state;
    form.classList.toggle("is-loading", state);
    if (submitBtn) submitBtn.disabled = state;
    if (googleBtn) googleBtn.disabled = state;
    emailInput.disabled = state;
    passwordInput.disabled = state;
    if (toggleBtn) toggleBtn.disabled = state;
  }

  function redirectAfterLogin() {
    var target = (window.APP_CONFIG && window.APP_CONFIG.redirectAfterLogin) || "/";
    window.location.href = target;
  }

  function initSupabase() {
    var config = window.APP_CONFIG || {};
    if (!config.supabaseUrl || !config.supabaseAnonKey || !window.supabase) {
      showError(t("notConfigured"));
      return null;
    }
    return window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  }

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

  async function handleEmailSubmit(email, password) {
    if (authMode === "login") {
      var loginResult = await supabaseClient.auth.signInWithPassword({ email: email, password: password });
      if (loginResult.error) {
        if (loginResult.error.message === "Invalid login credentials") {
          throw new Error(t("wrongPassword"));
        }
        throw new Error(loginResult.error.message);
      }
      redirectAfterLogin();
      return;
    }

    var signIn = await supabaseClient.auth.signInWithPassword({ email: email, password: password });
    if (!signIn.error && signIn.data.session) {
      redirectAfterLogin();
      return;
    }

    if (signIn.error && signIn.error.message !== "Invalid login credentials") {
      throw new Error(signIn.error.message);
    }

    var signUp = await supabaseClient.auth.signUp({ email: email, password: password });
    if (signUp.error) {
      if (
        signUp.error.message.indexOf("already registered") !== -1 ||
        signUp.error.message.indexOf("User already registered") !== -1
      ) {
        throw new Error(t("wrongPassword"));
      }
      throw new Error(signUp.error.message);
    }

    if (signUp.data.session) {
      redirectAfterLogin();
      return;
    }

    showError(t("checkEmail"));
  }

  async function handleGoogleSignIn() {
    clearError();
    if (!supabaseClient) return;
    if (busy) return;

    setBusy(true);
    try {
      var redirectTo = window.location.origin + window.location.pathname;
      var result = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectTo }
      });
      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (err) {
      showError(err && err.message ? err.message : t("googleFailed"));
      setBusy(false);
    }
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    clearError();
    if (!supabaseClient || busy) return;

    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }
    if (!passwordInput.checkValidity()) {
      passwordInput.reportValidity();
      return;
    }

    setBusy(true);
    try {
      await handleEmailSubmit(emailInput.value.trim(), passwordInput.value);
    } catch (err) {
      showError(err && err.message ? err.message : t("generic"));
    } finally {
      setBusy(false);
    }
  });

  if (googleBtn) {
    googleBtn.addEventListener("click", handleGoogleSignIn);
  }

  function bootAuth() {
    supabaseClient = initSupabase();
    if (!supabaseClient) return;

    supabaseClient.auth.getSession().then(function (sessionResult) {
      if (sessionResult.data.session) {
        redirectAfterLogin();
        return;
      }

      supabaseClient.auth.onAuthStateChange(function (event, session) {
        if (event === "SIGNED_IN" && session) {
          redirectAfterLogin();
        }
      });
    }).catch(function (err) {
      showError(err && err.message ? err.message : t("generic"));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootAuth);
  } else {
    bootAuth();
  }
})();
