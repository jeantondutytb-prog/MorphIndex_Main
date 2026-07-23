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
  return status === "active" || status === "trialing";
}
