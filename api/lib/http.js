export function sendJson(response, status, payload) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.status(status).json(payload);
}

export function applyCors(request, response) {
  const origin = request.headers.origin || "";
  const allowed = process.env.APP_ORIGIN || "https://www.morphindex.com";
  if (origin === allowed || origin.endsWith(".vercel.app")) {
    response.setHeader("Access-Control-Allow-Origin", origin);
  }
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export async function readJsonBody(request) {
  if (request.body && typeof request.body === "object") {
    return request.body;
  }
  const raw = await new Promise(function (resolve, reject) {
    let data = "";
    request.on("data", function (chunk) {
      data += chunk;
    });
    request.on("end", function () {
      resolve(data);
    });
    request.on("error", reject);
  });
  if (!raw) return {};
  return JSON.parse(raw);
}

export function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
