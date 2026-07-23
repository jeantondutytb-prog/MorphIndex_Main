import { getUserById } from "./supabase-admin.js";

const DEFAULT_DAILY_CHAT_LIMIT = 25;

async function updateUserMetadata(userId, metadataPatch) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return { error: "Supabase admin is not configured", status: 500 };
  }

  const existing = await getUserById(userId);
  if (existing.error) {
    return existing;
  }

  const currentMetadata =
    existing.user && existing.user.user_metadata ? existing.user.user_metadata : {};

  const response = await fetch(supabaseUrl + "/auth/v1/admin/users/" + userId, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + serviceRoleKey,
      apikey: serviceRoleKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_metadata: Object.assign({}, currentMetadata, metadataPatch)
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    return {
      error: "Failed to update user metadata",
      status: response.status,
      detail: detail
    };
  }

  return { ok: true };
}

export async function getUserAppState(userId) {
  const existing = await getUserById(userId);
  if (existing.error) {
    return existing;
  }

  const metadata = existing.user && existing.user.user_metadata ? existing.user.user_metadata : {};
  return {
    state: metadata.app_state || null
  };
}

export async function saveUserAppState(userId, patch) {
  const existing = await getUserAppState(userId);
  if (existing.error) {
    return existing;
  }

  const current = existing.state && typeof existing.state === "object" ? existing.state : {};
  const next = Object.assign({}, current, patch || {}, {
    updatedAt: new Date().toISOString()
  });

  const result = await updateUserMetadata(userId, { app_state: next });
  if (result.error) {
    return result;
  }

  return { ok: true, state: next };
}

export async function checkAndIncrementChatUsage(userId, dailyLimit) {
  const limit =
    typeof dailyLimit === "number" && dailyLimit > 0
      ? dailyLimit
      : Number(process.env.FACEGPT_DAILY_LIMIT) || DEFAULT_DAILY_CHAT_LIMIT;

  const existing = await getUserById(userId);
  if (existing.error) {
    return existing;
  }

  const metadata = existing.user && existing.user.user_metadata ? existing.user.user_metadata : {};
  const today = new Date().toISOString().slice(0, 10);
  const usage = metadata.chat_usage && typeof metadata.chat_usage === "object" ? metadata.chat_usage : {};
  const count = usage.date === today ? usage.count || 0 : 0;

  if (count >= limit) {
    return {
      error: "Daily FaceGPT limit reached",
      status: 429,
      limit: limit,
      remaining: 0
    };
  }

  const nextCount = count + 1;
  const updateResult = await updateUserMetadata(userId, {
    chat_usage: { date: today, count: nextCount }
  });

  if (updateResult.error) {
    return updateResult;
  }

  return {
    ok: true,
    limit: limit,
    remaining: Math.max(0, limit - nextCount)
  };
}
