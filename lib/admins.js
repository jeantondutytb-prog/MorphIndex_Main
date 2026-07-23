export const ADMIN_EMAILS = ["jeantondut.ytb@gmail.com"];

export function normalizeEmail(email) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

export function isAdminEmail(email) {
  const normalized = normalizeEmail(email);
  return !!normalized && ADMIN_EMAILS.indexOf(normalized) !== -1;
}

export function getAdminMetadata() {
  return {
    role: "admin",
    subscription_active: true,
    onboarding_complete: true,
    subscription_plan: "admin"
  };
}
