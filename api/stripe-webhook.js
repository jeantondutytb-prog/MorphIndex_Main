import { activateSubscription, deactivateSubscription } from "../lib/subscription.js";
import { getStripe, isSubscriptionActive } from "../lib/stripe.js";
import { sendJson } from "../lib/http.js";

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

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return sendJson(response, 405, { error: "Method not allowed" });
  }

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
