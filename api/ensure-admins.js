import { ADMIN_EMAILS } from "../lib/admins.js";
import { promoteUserToAdminByEmail } from "../lib/supabase-admin.js";
import { applyCors, sendJson } from "../lib/http.js";

export default async function handler(request, response) {
  applyCors(request, response);

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "POST" && request.method !== "GET") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  const results = [];

  for (let i = 0; i < ADMIN_EMAILS.length; i++) {
    const email = ADMIN_EMAILS[i];
    const result = await promoteUserToAdminByEmail(email);
    if (result.error) {
      results.push({
        email: email,
        ok: false,
        error: result.error,
        status: result.status || 500
      });
      continue;
    }

    results.push({
      email: email,
      ok: true,
      userId: result.user && result.user.id ? result.user.id : null,
      role: result.user && result.user.user_metadata ? result.user.user_metadata.role : "admin",
      onboarding_complete:
        result.user && result.user.user_metadata
          ? !!result.user.user_metadata.onboarding_complete
          : true,
      subscription_active:
        result.user && result.user.user_metadata
          ? !!result.user.user_metadata.subscription_active
          : true
    });
  }

  const failed = results.filter(function (item) {
    return !item.ok;
  });

  sendJson(response, failed.length ? 207 : 200, {
    ok: failed.length === 0,
    results: results
  });
}
