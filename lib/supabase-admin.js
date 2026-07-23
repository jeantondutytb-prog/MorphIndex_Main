import { getAdminMetadata, isAdminEmail, normalizeEmail } from "./admins.js";

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

  const normalized = normalizeEmail(email);
  const headers = {
    Authorization: "Bearer " + serviceRoleKey,
    apikey: serviceRoleKey
  };

  const direct = await fetch(
    supabaseUrl + "/auth/v1/admin/users?email=" + encodeURIComponent(normalized),
    { headers: headers }
  );

  if (direct.ok) {
    const data = await direct.json();
    const users = data && Array.isArray(data.users) ? data.users : [];
    const match = users.find(function (user) {
      return normalizeEmail(user && user.email) === normalized;
    });
    if (match) {
      return { user: match };
    }
    if (data && data.id && normalizeEmail(data.email) === normalized) {
      return { user: data };
    }
  }

  // Fallback: paginate users and match email client-side.
  for (let page = 1; page <= 20; page++) {
    const response = await fetch(
      supabaseUrl + "/auth/v1/admin/users?page=" + page + "&per_page=200",
      { headers: headers }
    );
    if (!response.ok) {
      const detail = await response.text();
      return { error: "Failed to look up user", status: response.status, detail: detail };
    }
    const data = await response.json();
    const users = data && Array.isArray(data.users) ? data.users : [];
    const match = users.find(function (user) {
      return normalizeEmail(user && user.email) === normalized;
    });
    if (match) {
      return { user: match };
    }
    if (users.length < 200) {
      break;
    }
  }

  return { user: null };
}

export async function promoteUserToAdminByEmail(email) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return { error: "Supabase admin is not configured", status: 500 };
  }

  const normalized = normalizeEmail(email);
  if (!normalized) {
    return { error: "email is required", status: 400 };
  }

  const existing = await findUserByEmail(normalized);
  if (existing.error) {
    return existing;
  }
  if (!existing.user || !existing.user.id) {
    return { error: "User not found", status: 404, email: normalized };
  }

  const currentMetadata =
    existing.user.user_metadata && typeof existing.user.user_metadata === "object"
      ? existing.user.user_metadata
      : {};
  const adminMetadata = Object.assign({}, currentMetadata, getAdminMetadata());

  const response = await fetch(supabaseUrl + "/auth/v1/admin/users/" + existing.user.id, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + serviceRoleKey,
      apikey: serviceRoleKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email_confirm: true,
      user_metadata: adminMetadata
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    return {
      error: "Failed to promote admin user",
      status: response.status,
      detail: detail
    };
  }

  return {
    user: await response.json(),
    created: false,
    email: normalized,
    alreadyAdmin: isAdminEmail(normalized) || currentMetadata.role === "admin"
  };
}

export async function createOrUpdateAdminUser({ email, password, metadata = {} }) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return { error: "Supabase admin is not configured", status: 500 };
  }

  const normalized = normalizeEmail(email);
  const adminMetadata = Object.assign({}, getAdminMetadata(), metadata);

  const existing = await findUserByEmail(normalized);
  if (existing.error) {
    return existing;
  }

  const payload = {
    email: normalized,
    email_confirm: true,
    user_metadata: adminMetadata
  };

  if (password) {
    payload.password = password;
  }

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

  if (!password) {
    return { error: "password is required to create a new admin user", status: 400 };
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
