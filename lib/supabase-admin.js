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

export async function findUserByEmail(email) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return { error: "Supabase admin is not configured", status: 500 };
  }

  const response = await fetch(
    supabaseUrl + "/auth/v1/admin/users?email=" + encodeURIComponent(email),
    {
      headers: {
        Authorization: "Bearer " + serviceRoleKey,
        apikey: serviceRoleKey
      }
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    return { error: "Failed to look up user", status: response.status, detail: detail };
  }

  const data = await response.json();
  const users = data && Array.isArray(data.users) ? data.users : [];
  return { user: users[0] || null };
}

export async function createOrUpdateAdminUser({ email, password, metadata = {} }) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return { error: "Supabase admin is not configured", status: 500 };
  }

  const adminMetadata = Object.assign(
    {
      role: "admin",
      subscription_active: true,
      onboarding_complete: true,
      subscription_plan: "admin"
    },
    metadata
  );

  const existing = await findUserByEmail(email);
  if (existing.error) {
    return existing;
  }

  const payload = {
    email: email,
    password: password,
    email_confirm: true,
    user_metadata: adminMetadata
  };

  if (existing.user && existing.user.id) {
    const currentMetadata =
      existing.user.user_metadata && typeof existing.user.user_metadata === "object"
        ? existing.user.user_metadata
        : {};
    payload.user_metadata = Object.assign({}, currentMetadata, adminMetadata);

    const response = await fetch(supabaseUrl + "/auth/v1/admin/users/" + existing.user.id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + serviceRoleKey,
        apikey: serviceRoleKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const detail = await response.text();
      return {
        error: "Failed to update admin user",
        status: response.status,
        detail: detail
      };
    }

    return { user: await response.json(), created: false };
  }

  const response = await fetch(supabaseUrl + "/auth/v1/admin/users", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + serviceRoleKey,
      apikey: serviceRoleKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const detail = await response.text();
    return {
      error: "Failed to create admin user",
      status: response.status,
      detail: detail
    };
  }

  return { user: await response.json(), created: true };
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
