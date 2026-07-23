const BUCKET = "user-scans";
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

function getConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return { error: "Supabase admin is not configured", status: 500 };
  }
  return { supabaseUrl, serviceRoleKey };
}

function storageHeaders(serviceRoleKey, contentType) {
  const headers = {
    Authorization: "Bearer " + serviceRoleKey,
    apikey: serviceRoleKey
  };
  if (contentType) {
    headers["Content-Type"] = contentType;
  }
  return headers;
}

let bucketReady = false;

export async function ensureScanBucket() {
  if (bucketReady) {
    return { ok: true };
  }

  const config = getConfig();
  if (config.error) {
    return config;
  }

  const listResponse = await fetch(config.supabaseUrl + "/storage/v1/bucket/" + BUCKET, {
    headers: storageHeaders(config.serviceRoleKey)
  });

  if (listResponse.ok) {
    bucketReady = true;
    return { ok: true };
  }

  const createResponse = await fetch(config.supabaseUrl + "/storage/v1/bucket", {
    method: "POST",
    headers: storageHeaders(config.serviceRoleKey, "application/json"),
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: false,
      file_size_limit: FILE_SIZE_LIMIT,
      allowed_mime_types: ["image/jpeg", "image/png", "image/webp", "application/json"]
    })
  });

  if (!createResponse.ok) {
    const detail = await createResponse.text();
    // Bucket may already exist (race) — treat as success if we can read it next.
    const retry = await fetch(config.supabaseUrl + "/storage/v1/bucket/" + BUCKET, {
      headers: storageHeaders(config.serviceRoleKey)
    });
    if (retry.ok) {
      bucketReady = true;
      return { ok: true };
    }
    return {
      error: "Failed to create storage bucket",
      status: createResponse.status,
      detail: detail
    };
  }

  bucketReady = true;
  return { ok: true };
}

export function scanObjectPath(userId, name) {
  return userId + "/" + name;
}

export async function uploadScanObject(userId, name, body, contentType) {
  const ready = await ensureScanBucket();
  if (ready.error) {
    return ready;
  }

  const config = getConfig();
  if (config.error) {
    return config;
  }

  const path = scanObjectPath(userId, name);
  const response = await fetch(
    config.supabaseUrl + "/storage/v1/object/" + BUCKET + "/" + path,
    {
      method: "POST",
      headers: Object.assign(storageHeaders(config.serviceRoleKey, contentType), {
        "x-upsert": "true"
      }),
      body: body
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    return {
      error: "Failed to upload scan object",
      status: response.status,
      detail: detail,
      path: path
    };
  }

  return { ok: true, path: path, bucket: BUCKET };
}

export async function downloadScanObject(userId, name) {
  const ready = await ensureScanBucket();
  if (ready.error) {
    return ready;
  }

  const config = getConfig();
  if (config.error) {
    return config;
  }

  const path = scanObjectPath(userId, name);
  const response = await fetch(
    config.supabaseUrl + "/storage/v1/object/" + BUCKET + "/" + path,
    {
      headers: storageHeaders(config.serviceRoleKey)
    }
  );

  if (response.status === 404) {
    return { missing: true, path: path };
  }

  if (!response.ok) {
    const detail = await response.text();
    return {
      error: "Failed to download scan object",
      status: response.status,
      detail: detail,
      path: path
    };
  }

  const contentType = response.headers.get("content-type") || "application/octet-stream";
  const buffer = Buffer.from(await response.arrayBuffer());
  return {
    ok: true,
    path: path,
    contentType: contentType,
    buffer: buffer
  };
}

export async function removeScanObject(userId, name) {
  const config = getConfig();
  if (config.error) {
    return config;
  }

  const path = scanObjectPath(userId, name);
  const response = await fetch(
    config.supabaseUrl + "/storage/v1/object/" + BUCKET,
    {
      method: "DELETE",
      headers: storageHeaders(config.serviceRoleKey, "application/json"),
      body: JSON.stringify({ prefixes: [path] })
    }
  );

  if (!response.ok && response.status !== 404) {
    const detail = await response.text();
    return {
      error: "Failed to remove scan object",
      status: response.status,
      detail: detail
    };
  }

  return { ok: true };
}

export function dataUrlToBuffer(dataUrl) {
  if (!dataUrl || typeof dataUrl !== "string") {
    return null;
  }
  const match = /^data:([^;]+);base64,([\s\S]+)$/.exec(dataUrl);
  if (!match) {
    return null;
  }
  return {
    contentType: match[1] || "application/octet-stream",
    buffer: Buffer.from(match[2], "base64")
  };
}

export function bufferToDataUrl(buffer, contentType) {
  const mime = contentType || "application/octet-stream";
  return "data:" + mime + ";base64," + Buffer.from(buffer).toString("base64");
}

export { BUCKET as SCAN_BUCKET };
