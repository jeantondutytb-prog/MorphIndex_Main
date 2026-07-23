export async function requireUser(request) {
  const header = request.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) {
    return { error: "Missing authorization token", status: 401 };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: "Supabase is not configured", status: 500 };
  }

  const response = await fetch(supabaseUrl + "/auth/v1/user", {
    headers: {
      Authorization: "Bearer " + token,
      apikey: supabaseAnonKey
    }
  });

  if (!response.ok) {
    return { error: "Invalid session", status: 401 };
  }

  const user = await response.json();
  if (!user || !user.id) {
    return { error: "Invalid session", status: 401 };
  }

  return { user: user };
}
