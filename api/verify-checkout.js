import { requireUser } from "../lib/auth.js";
import { applyCors, sendJson } from "../lib/http.js";
import { activateSubscription } from "../lib/subscription.js";
import { getStripe, isSubscriptionActive } from "../lib/stripe.js";

export default async function handler(request, response) {
  applyCors(request, response);

  if (request.method === "OPTIONS") {
    return response.status(204).end();
  }

  if (request.method !== "GET") {
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

  const sessionId =
    (request.query && request.query.session_id) ||
    (function () {
      try {
        var host = request.headers.host || "localhost";
        var proto = request.headers["x-forwarded-proto"] || "https";
        return new URL(request.url, proto + "://" + host).searchParams.get("session_id");
      } catch (e) {
        return null;
      }
    })();
  if (!sessionId) {
    return sendJson(response, 400, { error: "Missing session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"]
    });

    const sessionUserId =
      session.metadata && session.metadata.supabase_user_id
        ? session.metadata.supabase_user_id
        : session.client_reference_id;

    if (sessionUserId !== auth.user.id) {
      return sendJson(response, 403, { error: "Checkout session does not belong to this user" });
    }

    const paid =
      session.payment_status === "paid" ||
      session.status === "complete";

    if (!paid) {
      return sendJson(response, 402, { error: "Payment not completed", active: false });
    }

    const subscription =
      typeof session.subscription === "string"
        ? await stripe.subscriptions.retrieve(session.subscription)
        : session.subscription;

    const status = subscription ? subscription.status : "active";
    const active = subscription ? isSubscriptionActive(subscription.status) : true;

    if (active) {
      const update = await activateSubscription(auth.user.id, {
        customerId:
          typeof session.customer === "string" ? session.customer : session.customer && session.customer.id,
        subscriptionId: subscription ? subscription.id : null,
        status: status,
        plan: session.metadata && session.metadata.plan ? session.metadata.plan : null
      });

      if (update.error) {
        return sendJson(response, update.status || 500, { error: update.error });
      }
    }

    return sendJson(response, 200, {
      active: active,
      status: status,
      plan: session.metadata && session.metadata.plan ? session.metadata.plan : null
    });
  } catch (error) {
    return sendJson(response, 500, {
      error: "Failed to verify checkout",
      detail: error && error.message ? error.message : null
    });
  }
}
