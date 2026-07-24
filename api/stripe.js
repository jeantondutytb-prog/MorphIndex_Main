import { requireUser } from "../lib/auth.js";
import { applyCors, readJsonBody, sendJson } from "../lib/http.js";
import { activateSubscription, deactivateSubscription } from "../lib/subscription.js";
import { getAppOrigin, getPriceId, getStripe, isSubscriptionActive, resolveStripeCustomerId } from "../lib/stripe.js";

export const config = {
  api: {
    bodyParser: false
  }
};

async function readRawBody(request) {
  if (Buffer.isBuffer(request.body)) {
    return request.body;
  }
  if (typeof request.body === "string") {
    return Buffer.from(request.body);
  }

  const chunks = [];
  await new Promise(function (resolve, reject) {
    request.on("data", function (chunk) {
      chunks.push(Buffer.from(chunk));
    });
    request.on("end", resolve);
    request.on("error", reject);
  });
  return Buffer.concat(chunks);
}

function getQueryParam(request, name) {
  if (request.query && request.query[name]) {
    return request.query[name];
  }
  try {
    const host = request.headers.host || "localhost";
    const proto = request.headers["x-forwarded-proto"] || "https";
    return new URL(request.url, proto + "://" + host).searchParams.get(name);
  } catch (e) {
    return null;
  }
}

async function resolveUserIdFromSubscription(stripe, subscription) {
  if (subscription.metadata && subscription.metadata.supabase_user_id) {
    return subscription.metadata.supabase_user_id;
  }

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer && subscription.customer.id;

  if (!customerId) {
    return null;
  }

  const sessions = await stripe.checkout.sessions.list({
    customer: customerId,
    limit: 1
  });

  const session = sessions.data && sessions.data[0];
  if (!session) {
    return null;
  }

  if (session.metadata && session.metadata.supabase_user_id) {
    return session.metadata.supabase_user_id;
  }

  return session.client_reference_id || null;
}

async function handleWebhook(request, response) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    return sendJson(response, 503, { error: "Stripe webhook is not configured" });
  }

  const signature = request.headers["stripe-signature"];
  if (!signature) {
    return sendJson(response, 400, { error: "Missing stripe-signature header" });
  }

  let event;
  try {
    const rawBody = await readRawBody(request);
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    return sendJson(response, 400, {
      error: "Invalid webhook signature",
      detail: error && error.message ? error.message : null
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId =
          (session.metadata && session.metadata.supabase_user_id) ||
          session.client_reference_id;

        if (!userId) {
          break;
        }

        const subscriptionId =
          typeof session.subscription === "string" ? session.subscription : null;
        let status = "active";

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          status = subscription.status;
        }

        await activateSubscription(userId, {
          customerId:
            typeof session.customer === "string" ? session.customer : session.customer && session.customer.id,
          subscriptionId: subscriptionId,
          status: status,
          plan: session.metadata && session.metadata.plan ? session.metadata.plan : null
        });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const userId = await resolveUserIdFromSubscription(stripe, subscription);
        if (!userId) {
          break;
        }

        if (isSubscriptionActive(subscription.status)) {
          await activateSubscription(userId, {
            customerId:
              typeof subscription.customer === "string"
                ? subscription.customer
                : subscription.customer && subscription.customer.id,
            subscriptionId: subscription.id,
            status: subscription.status,
            plan: subscription.metadata && subscription.metadata.plan ? subscription.metadata.plan : null
          });
        } else {
          await deactivateSubscription(userId, {
            customerId:
              typeof subscription.customer === "string"
                ? subscription.customer
                : subscription.customer && subscription.customer.id,
            subscriptionId: subscription.id,
            status: subscription.status
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const userId = await resolveUserIdFromSubscription(stripe, subscription);
        if (!userId) {
          break;
        }

        await deactivateSubscription(userId, {
          customerId:
            typeof subscription.customer === "string"
              ? subscription.customer
              : subscription.customer && subscription.customer.id,
          subscriptionId: subscription.id,
          status: subscription.status
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const subscriptionId =
          typeof invoice.subscription === "string"
            ? invoice.subscription
            : invoice.subscription && invoice.subscription.id;

        if (!subscriptionId) {
          break;
        }

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const userId = await resolveUserIdFromSubscription(stripe, subscription);
        if (!userId) {
          break;
        }

        if (isSubscriptionActive(subscription.status)) {
          await activateSubscription(userId, {
            customerId:
              typeof subscription.customer === "string"
                ? subscription.customer
                : subscription.customer && subscription.customer.id,
            subscriptionId: subscription.id,
            status: subscription.status,
            plan: subscription.metadata && subscription.metadata.plan ? subscription.metadata.plan : null
          });
        } else {
          await deactivateSubscription(userId, {
            customerId:
              typeof subscription.customer === "string"
                ? subscription.customer
                : subscription.customer && subscription.customer.id,
            subscriptionId: subscription.id,
            status: subscription.status
          });
        }
        break;
      }

      default:
        break;
    }

    return sendJson(response, 200, { received: true });
  } catch (error) {
    return sendJson(response, 500, {
      error: "Webhook handler failed",
      detail: error && error.message ? error.message : null
    });
  }
}

async function handleSyncSubscription(request, response) {
  const auth = await requireUser(request);
  if (auth.error) {
    return sendJson(response, auth.status, { error: auth.error });
  }

  const stripe = getStripe();
  if (!stripe) {
    return sendJson(response, 503, { error: "Stripe is not configured" });
  }

  try {
    const userId = auth.user.id;
    const email = auth.user.email || "";

    let matchedSession = null;
    try {
      const search = await stripe.checkout.sessions.search({
        query: "client_reference_id:'" + userId + "' AND status:'complete'",
        limit: 5
      });
      matchedSession =
        search.data.find(function (session) {
          return session.payment_status === "paid" || session.status === "complete";
        }) || null;
    } catch (searchError) {
      // Search API may be unavailable; fall back to customer lookup below.
    }

    if (matchedSession) {
      const subscriptionId =
        typeof matchedSession.subscription === "string"
          ? matchedSession.subscription
          : matchedSession.subscription && matchedSession.subscription.id;

      let subscription = null;
      if (subscriptionId) {
        subscription = await stripe.subscriptions.retrieve(subscriptionId);
      }

      const status = subscription ? subscription.status : "active";
      if (!subscription || isSubscriptionActive(status)) {
        const update = await activateSubscription(userId, {
          customerId:
            typeof matchedSession.customer === "string"
              ? matchedSession.customer
              : matchedSession.customer && matchedSession.customer.id,
          subscriptionId: subscriptionId,
          status: status,
          plan: matchedSession.metadata && matchedSession.metadata.plan ? matchedSession.metadata.plan : null
        });

        if (update.error) {
          return sendJson(response, update.status || 500, { error: update.error });
        }

        return sendJson(response, 200, { active: true, status: status });
      }
    }

    if (email) {
      const customers = await stripe.customers.list({ email: email, limit: 3 });
      for (const customer of customers.data) {
        const subscriptions = await stripe.subscriptions.list({
          customer: customer.id,
          status: "all",
          limit: 5
        });

        const activeSub = subscriptions.data.find(function (sub) {
          return isSubscriptionActive(sub.status);
        });

        if (activeSub) {
          const update = await activateSubscription(userId, {
            customerId: customer.id,
            subscriptionId: activeSub.id,
            status: activeSub.status,
            plan: activeSub.metadata && activeSub.metadata.plan ? activeSub.metadata.plan : null
          });

          if (update.error) {
            return sendJson(response, update.status || 500, { error: update.error });
          }

          return sendJson(response, 200, { active: true, status: activeSub.status });
        }
      }
    }

    return sendJson(response, 200, { active: false });
  } catch (error) {
    return sendJson(response, 500, {
      error: "Failed to sync subscription",
      detail: error && error.message ? error.message : null
    });
  }
}

async function handleVerifyCheckout(request, response) {
  const auth = await requireUser(request);
  if (auth.error) {
    return sendJson(response, auth.status, { error: auth.error });
  }

  const stripe = getStripe();
  if (!stripe) {
    return sendJson(response, 503, { error: "Stripe is not configured" });
  }

  const sessionId = getQueryParam(request, "session_id");
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

    const paid = session.payment_status === "paid" || session.status === "complete";
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

async function handleCreateCheckout(request, response, body) {
  const auth = await requireUser(request);
  if (auth.error) {
    return sendJson(response, auth.status, { error: auth.error });
  }

  const stripe = getStripe();
  if (!stripe) {
    return sendJson(response, 503, { error: "Stripe is not configured" });
  }

  try {
    const payload = body || (await readJsonBody(request));
    const plan = payload.plan === "yearly" ? "yearly" : "monthly";
    const priceId = getPriceId(plan);
    if (!priceId) {
      return sendJson(response, 503, { error: "Stripe price is not configured" });
    }

    const origin = getAppOrigin();
    const customerId = await resolveStripeCustomerId(stripe, auth.user);
    const sessionParams = {
      mode: "subscription",
      allow_promotion_codes: true,
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
    };

    if (customerId) {
      sessionParams.customer = customerId;
    } else if (auth.user.email) {
      sessionParams.customer_email = auth.user.email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

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

async function handleCustomerPortal(request, response) {
  const auth = await requireUser(request);
  if (auth.error) {
    return sendJson(response, auth.status, { error: auth.error });
  }

  const stripe = getStripe();
  if (!stripe) {
    return sendJson(response, 503, { error: "Stripe is not configured" });
  }

  try {
    const customerId = await resolveStripeCustomerId(stripe, auth.user);
    if (!customerId) {
      return sendJson(response, 400, { error: "No billing account found" });
    }

    const origin = getAppOrigin();
    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: origin + "/app"
    });

    if (!portal.url) {
      return sendJson(response, 500, { error: "Failed to create portal session" });
    }

    return sendJson(response, 200, { url: portal.url });
  } catch (error) {
    return sendJson(response, 500, {
      error: "Failed to create portal session",
      detail: error && error.message ? error.message : null
    });
  }
}

async function handlePost(request, response) {
  if (request.headers["stripe-signature"]) {
    return handleWebhook(request, response);
  }

  const body = await readJsonBody(request);
  if (body && body.action === "portal") {
    return handleCustomerPortal(request, response);
  }

  return handleCreateCheckout(request, response, body);
}

export default async function handler(request, response) {
  applyCors(request, response);

  if (request.method === "OPTIONS") {
    return response.status(204).end();
  }

  if (request.method === "GET") {
    if (getQueryParam(request, "sync") === "1") {
      return handleSyncSubscription(request, response);
    }
    return handleVerifyCheckout(request, response);
  }

  if (request.method === "POST") {
    return handlePost(request, response);
  }

  return sendJson(response, 405, { error: "Method not allowed" });
}
