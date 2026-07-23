import { isSubscriptionActive } from "./stripe.js";
import { updateUserSubscription } from "./supabase-admin.js";

export function buildSubscriptionMetadata({
  active,
  customerId,
  subscriptionId,
  status,
  plan
}) {
  return {
    subscription_active: !!active,
    stripe_customer_id: customerId || null,
    stripe_subscription_id: subscriptionId || null,
    stripe_subscription_status: status || null,
    subscription_plan: plan || null
  };
}

export async function setUserSubscription(userId, fields) {
  const metadata = buildSubscriptionMetadata(fields);
  return updateUserSubscription(userId, metadata);
}

export async function activateSubscription(userId, {
  customerId,
  subscriptionId,
  status,
  plan
}) {
  return setUserSubscription(userId, {
    active: isSubscriptionActive(status || "active"),
    customerId: customerId,
    subscriptionId: subscriptionId,
    status: status || "active",
    plan: plan
  });
}

export async function deactivateSubscription(userId, {
  customerId,
  subscriptionId,
  status
} = {}) {
  return setUserSubscription(userId, {
    active: false,
    customerId: customerId,
    subscriptionId: subscriptionId,
    status: status || "canceled",
    plan: null
  });
}
