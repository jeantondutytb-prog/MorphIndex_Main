(function () {
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

  function mount(container, ctx) {
    if (!container || !ctx) return;

    var messages = (ctx.state.chatHistory || []).slice();
    var sending = false;

    container.innerHTML =
      '<section class="facegpt">' +
        '<p class="dashboard-section__subtitle">' + t("dashboard.chat.subtitle") + "</p>" +
        '<div class="facegpt__prompts" id="facegpt-prompts">' +
          '<button type="button" class="facegpt__prompt" data-prompt-key="thisWeek">' +
            t("dashboard.chat.promptThisWeek") +
          "</button>" +
          '<button type="button" class="facegpt__prompt" data-prompt-key="whyFocus">' +
            t("dashboard.chat.promptWhyFocus") +
          "</button>" +
          '<button type="button" class="facegpt__prompt" data-prompt-key="nextStep">' +
            t("dashboard.chat.promptNextStep") +
          "</button>" +
        "</div>" +
        '<div class="facegpt__messages" id="facegpt-messages" aria-live="polite"></div>' +
        '<form class="facegpt__form" id="facegpt-form">' +
          '<input type="text" class="facegpt__input" id="facegpt-input" autocomplete="off" placeholder="' + t("dashboard.chat.placeholder") + '">' +
          '<button type="submit" class="btn" id="facegpt-send">' + t("dashboard.chat.send") + "</button>" +
        "</form>" +
      "</section>";

    var messagesEl = container.querySelector("#facegpt-messages");
    var form = container.querySelector("#facegpt-form");
    var input = container.querySelector("#facegpt-input");
    var sendBtn = container.querySelector("#facegpt-send");
    var promptsEl = container.querySelector("#facegpt-prompts");

    function saveMessages() {
      window.Onboarding.saveState(ctx.user.id, { chatHistory: messages });
    }

    function renderMessages() {
      if (!messages.length) {
        messagesEl.innerHTML = '<p class="facegpt__empty">' + t("dashboard.chat.empty") + "</p>";
        return;
      }
      messagesEl.innerHTML = messages.map(function (msg) {
        return (
          '<div class="facegpt__bubble facegpt__bubble--' + msg.role + '">' +
            '<p>' + escapeHtml(msg.content) + "</p>" +
          "</div>"
        );
      }).join("");
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function escapeHtml(text) {
      return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function setSending(state) {
      sending = state;
      if (input) input.disabled = state;
      if (sendBtn) sendBtn.disabled = state;
      if (promptsEl) {
        promptsEl.querySelectorAll(".facegpt__prompt").forEach(function (btn) {
          btn.disabled = state;
        });
      }
    }

    function getJourney() {
      return window.Onboarding.getJourney(ctx.user.id, ctx.analysis);
    }

    function sendMessage(content) {
      if (sending || !content.trim()) return;

      messages.push({ role: "user", content: content.trim() });
      saveMessages();
      renderMessages();
      setSending(true);

      window.AiApi.chat(ctx.session, messages, ctx.analysis, getJourney()).then(function (result) {
        if (result.ok && result.reply) {
          messages.push({ role: "assistant", content: result.reply });
        } else if (result.status === 429) {
          messages.push({ role: "assistant", content: t("dashboard.chat.limitReached") });
        } else {
          messages.push({ role: "assistant", content: t("dashboard.chat.error") });
        }
        saveMessages();
        renderMessages();
      }).finally(function () {
        setSending(false);
      });
    }

    renderMessages();

    if (promptsEl) {
      promptsEl.addEventListener("click", function (event) {
        var button = event.target.closest("[data-prompt-key]");
        if (!button || sending) return;
        var key = button.getAttribute("data-prompt-key");
        var prompt = t("dashboard.chat.prompts." + key);
        if (prompt && prompt.indexOf("dashboard.chat.prompts.") !== 0) {
          sendMessage(prompt);
        }
      });
    }

    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!input || !input.value.trim()) return;
        var content = input.value;
        input.value = "";
        sendMessage(content);
      });
    }
  }

  window.FaceGpt = { mount: mount };
})();
