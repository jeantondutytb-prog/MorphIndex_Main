import { chatWithAnthropic } from "../lib/chat.js";
import { requireUser } from "../lib/auth.js";
import { applyCors, readJsonBody, sendJson } from "../lib/http.js";
import { checkAndIncrementChatUsage } from "../lib/user-app-data.js";

export default async function handler(request, response) {
  applyCors(request, response);

  if (request.method === "OPTIONS") {
    return response.status(204).end();
  }

  if (request.method !== "POST") {
    return sendJson(response, 405, { error: "Method not allowed" });
  }

  const auth = await requireUser(request);
  if (auth.error) {
    return sendJson(response, auth.status, { error: auth.error });
  }

  try {
    const usage = await checkAndIncrementChatUsage(auth.user.id);
    if (usage.error) {
      return sendJson(response, usage.status || 429, {
        error: usage.error,
        limit: usage.limit || null,
        remaining: usage.remaining != null ? usage.remaining : 0
      });
    }

    const body = await readJsonBody(request);
    const result = await chatWithAnthropic({
      messages: body.messages || [],
      analysis: body.analysis || null,
      journey: body.journey || null
    });

    if (result.error) {
      return sendJson(response, result.status || 500, {
        error: result.error,
        detail: result.detail || null
      });
    }

    return sendJson(response, 200, {
      reply: result.reply,
      model: result.model,
      remaining: usage.remaining
    });
  } catch (error) {
    return sendJson(response, 500, {
      error: "Unexpected chat error",
      detail: error && error.message ? error.message : null
    });
  }
}
