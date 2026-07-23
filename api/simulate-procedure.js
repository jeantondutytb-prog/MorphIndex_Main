import { requireUser } from "./lib/auth.js";
import { applyCors, readJsonBody, sendJson } from "./lib/http.js";
import { generateProcedureSimulation } from "./lib/fal.js";

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
    const body = await readJsonBody(request);
    const result = await generateProcedureSimulation({
      frontPhoto: body.frontPhoto,
      procedure: body.procedure || "jawline",
      intensity: body.intensity
    });

    if (result.error) {
      return sendJson(response, result.status || 500, {
        error: result.error,
        detail: result.detail || null
      });
    }

    return sendJson(response, 200, {
      previewUrl: result.previewUrl,
      generatedAt: result.generatedAt,
      source: result.source
    });
  } catch (error) {
    return sendJson(response, 500, {
      error: "Unexpected simulation error",
      detail: error && error.message ? error.message : null
    });
  }
}
