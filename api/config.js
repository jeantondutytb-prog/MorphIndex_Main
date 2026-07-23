export default function handler(request, response) {
  response.setHeader("Content-Type", "application/javascript; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");

  response.status(200).send(
    "window.APP_CONFIG = " +
      JSON.stringify({
        supabaseUrl: process.env.SUPABASE_URL || "",
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
        redirectAfterLogin: process.env.AUTH_REDIRECT_URL || "/app"
      }) +
      ";"
  );
}
