import { requireUser } from "../lib/auth.js";
import { applyCors, readJsonBody, sendJson } from "../lib/http.js";
import { getAppOrigin, getPriceId, getStripe } from "../lib/stripe.js";

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

  const stripe = getStripe();
  if (!stripe) {
    return sendJson(response, 503, { error: "Stripe is not configured" });
  }

  try {
    const body = await readJsonBody(request);
    const plan = body.plan === "yearly" ? "yearly" : "monthly";
    const priceId = getPriceId(plan);
    if (!priceId) {
      return sendJson(response, 503, { error: "Stripe price is not configured" });
    }

    const origin = getAppOrigin();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: auth.user.email || undefined,
      client_reference_id: auth.user.id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url:
        origin +
        "/onboarding/results?checkout=success&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: origin + "/onboarding/results?checkout=cancelled",
      metadata: {
        supabase_user_id: auth.user.id,
        plan: plan
      },
      subscription_data: {
        metadata: {
          supabase_user_id: auth.user.id,
          plan: plan
        }
      }
    });

    if (!session.url) {
      return sendJson(response, 500, { error: "Failed to create checkout session" });
    }

    return sendJson(response, 200, { url: session.url, sessionId: session.id });
  } catch (error) {
    return sendJson(response, 500, {
      error: "Failed to create checkout session",
      detail: error && error.message ? error.message : null
    });
  }
}
