import Stripe from "stripe";

let stripeClient = null;

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return null;
  }
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}

export function getAppOrigin() {
  return process.env.APP_ORIGIN || "https://www.morphindex.com";
}

export function getPriceId(plan) {
  if (plan === "yearly") {
    return process.env.STRIPE_PRICE_YEARLY || "";
  }
  if (plan === "monthly") {
    return process.env.STRIPE_PRICE_MONTHLY || "";
  }
  return "";
}

export function isSubscriptionActive(status) {
  return status === "active" || status === "trialing" || status === "past_due";
}

export async function resolveStripeCustomerId(stripe, user) {
  if (!stripe || !user) {
    return null;
  }

  const metadata = user.user_metadata || {};
  if (metadata.stripe_customer_id) {
    return metadata.stripe_customer_id;
  }

  const email = user.email;
  if (!email) {
    return null;
  }

  const customers = await stripe.customers.list({ email: email, limit: 1 });
  return customers.data[0] ? customers.data[0].id : null;
}
