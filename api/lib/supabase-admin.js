export async function updateUserSubscription(userId, metadata) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return { error: "Supabase admin is not configured", status: 500 };
  }

  const existing = await getUserById(userId);
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
      user_metadata: Object.assign({}, currentMetadata, metadata)
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    return {
      error: "Failed to update user subscription",
      status: response.status,
      detail: detail
    };
  }

  return { ok: true };
}

export async function getUserById(userId) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return { error: "Supabase admin is not configured", status: 500 };
  }

  const response = await fetch(supabaseUrl + "/auth/v1/admin/users/" + userId, {
    headers: {
      Authorization: "Bearer " + serviceRoleKey,
      apikey: serviceRoleKey
    }
  });

  if (!response.ok) {
    return { error: "User not found", status: response.status };
  }

  return { user: await response.json() };
}
