import { createOrUpdateAdminUser } from "../lib/supabase-admin.js";
import { applyCors, readJsonBody, sendJson } from "../lib/http.js";

export const config = {
  api: {
    bodyParser: false
  }
};

function isAuthorized(request) {
  const bootstrapKey = process.env.ADMIN_BOOTSTRAP_KEY;
  if (!bootstrapKey) {
    return false;
  }

  const header = request.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return token === bootstrapKey;
}

export default async function handler(request, response) {
  applyCors(request, response);

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  if (!isAuthorized(request)) {
    sendJson(response, 401, { error: "Unauthorized" });
    return;
  }

  let body;
  try {
    body = await readJsonBody(request);
  } catch (e) {
    sendJson(response, 400, { error: "Invalid JSON body" });
    return;
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email) {
    sendJson(response, 400, { error: "email is required" });
    return;
  }

  if (password && password.length < 8) {
    sendJson(response, 400, { error: "password must be at least 8 characters" });
    return;
  }

  const result = await createOrUpdateAdminUser({
    email: email,
    password: password || undefined
  });
  if (result.error) {
    sendJson(response, result.status || 500, {
      error: result.error,
      detail: result.detail || null
    });
    return;
  }

  sendJson(response, 200, {
    ok: true,
    created: !!result.created,
    userId: result.user && result.user.id ? result.user.id : null,
    email: result.user && result.user.email ? result.user.email : email
  });
}
