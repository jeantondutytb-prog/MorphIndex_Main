import { requireUser } from "../lib/auth.js";
import { applyCors, readJsonBody, sendJson } from "../lib/http.js";
import { getUserScan, saveUserScan } from "../lib/user-scan.js";

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
    try {
      const result = await getUserScan(auth.user.id);
      if (result.error) {
        return sendJson(response, result.status || 500, {
          error: result.error,
          detail: result.detail || null
        });
      }
      return sendJson(response, 200, { scan: result.scan });
    } catch (error) {
      return sendJson(response, 500, {
        error: "Unexpected scan load error",
        detail: error && error.message ? error.message : null
      });
    }
  }

  if (request.method === "PUT") {
    try {
      const body = await readJsonBody(request);
      if (!body || typeof body !== "object" || !Object.keys(body).length) {
        return sendJson(response, 400, { error: "No scan fields to save" });
      }

      const result = await saveUserScan(auth.user.id, body);
      if (result.error) {
        return sendJson(response, result.status || 500, {
          error: result.error,
          detail: result.detail || null
        });
      }

      return sendJson(response, 200, {
        ok: true,
        scanUpdatedAt: result.scanUpdatedAt,
        state: result.state
      });
    } catch (error) {
      return sendJson(response, 500, {
        error: "Unexpected scan save error",
        detail: error && error.message ? error.message : null
      });
    }
  }

  return sendJson(response, 405, { error: "Method not allowed" });
}
