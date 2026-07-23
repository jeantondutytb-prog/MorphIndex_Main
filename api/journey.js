import { requireUser } from "../lib/auth.js";
import { applyCors, readJsonBody, sendJson } from "../lib/http.js";
import { getUserAppState, saveUserAppState } from "../lib/user-app-data.js";

function pickSyncFields(body) {
  const patch = {};
  if (body && body.journey && typeof body.journey === "object") {
    patch.journey = body.journey;
  }
  if (body && Array.isArray(body.scoreHistory)) {
    patch.scoreHistory = body.scoreHistory.slice(-12);
  }
  if (body && body.planProgress && typeof body.planProgress === "object") {
    patch.planProgress = body.planProgress;
  }
  return patch;
}

export default async function handler(request, response) {
  applyCors(request, response);

  if (request.method === "OPTIONS") {
    return response.status(204).end();
  }

  const auth = await requireUser(request);
  if (auth.error) {
    return sendJson(response, auth.status, { error: auth.error });
  }

  if (request.method === "GET") {
    const result = await getUserAppState(auth.user.id);
    if (result.error) {
      return sendJson(response, result.status || 500, { error: result.error });
    }
    return sendJson(response, 200, { state: result.state });
  }

  if (request.method === "PUT") {
    try {
      const body = await readJsonBody(request);
      const patch = pickSyncFields(body);
      if (!Object.keys(patch).length) {
        return sendJson(response, 400, { error: "No journey fields to save" });
      }

      const result = await saveUserAppState(auth.user.id, patch);
      if (result.error) {
        return sendJson(response, result.status || 500, {
          error: result.error,
          detail: result.detail || null
        });
      }

      return sendJson(response, 200, { state: result.state });
    } catch (error) {
      return sendJson(response, 500, {
        error: "Unexpected journey save error",
        detail: error && error.message ? error.message : null
      });
    }
  }

  return sendJson(response, 405, { error: "Method not allowed" });
}
