(function () {
  var emailEl = document.getElementById("app-email");
  var signOutBtn = document.getElementById("app-signout");

  function redirectToLogin() {
    window.location.href = "/login";
  }

  function initSupabase() {
    var config = window.APP_CONFIG || {};
    if (!config.supabaseUrl || !config.supabaseAnonKey || !window.supabase) {
      redirectToLogin();
      return null;
    }
    return window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  }

  function showUser(session) {
    if (!session || !session.user) {
      redirectToLogin();
      return;
    }
    if (emailEl && session.user.email) {
      emailEl.textContent = session.user.email;
      emailEl.hidden = false;
    }
  }

  function bootApp() {
    var client = initSupabase();
    if (!client) return;

    client.auth.getSession().then(function (result) {
      if (!result.data.session) {
        redirectToLogin();
        return;
      }
      showUser(result.data.session);
    });

    if (signOutBtn) {
      signOutBtn.addEventListener("click", function () {
        signOutBtn.disabled = true;
        client.auth.signOut().finally(function () {
          redirectToLogin();
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootApp);
  } else {
    bootApp();
  }
})();
