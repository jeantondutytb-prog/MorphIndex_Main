import { sleep } from "./http.js";

const DEFAULT_MODEL = "fal-ai/image-editing/face-enhancement";

function getModelId() {
  return process.env.FAL_MODEL || DEFAULT_MODEL;
}

function buildPreviewPrompt(plan) {
  const focus = Array.isArray(plan)
    ? plan
        .slice(0, 3)
        .map(function (item) {
          return item && item.key ? item.key : "";
        })
        .filter(Boolean)
        .join(", ")
    : "";

  return (
    "Same person, realistic portrait photo after 6 months of consistent self-improvement. " +
    "Subtle natural enhancements: clearer skin, slightly sharper jawline, reduced under-eye shadows, " +
    "better grooming and posture. Keep identical identity, age, ethnicity, hairstyle, and camera angle. " +
    "Photorealistic, not plastic surgery, not a different person." +
    (focus ? " Focus areas: " + focus + "." : "")
  );
}

function buildRequestBody(modelId, frontPhoto, plan) {
  if (modelId.indexOf("kontext") !== -1) {
    return {
      prompt: buildPreviewPrompt(plan),
      image_url: frontPhoto,
      guidance_scale: 3.5,
      output_format: "jpeg",
      aspect_ratio: "3:4"
    };
  }

  return {
    image_url: frontPhoto,
    guidance_scale: 3.8,
    num_inference_steps: 32,
    output_format: "jpeg"
  };
}

export async function generateSixMonthPreview({ frontPhoto, plan }) {
  const apiKey = process.env.FAL_KEY;
  if (!apiKey) {
    return { error: "fal.ai API key is not configured", status: 503 };
  }

  if (!frontPhoto || !frontPhoto.startsWith("data:image/")) {
    return { error: "Invalid front photo", status: 400 };
  }

  const modelId = getModelId();
  const submitResponse = await fetch("https://queue.fal.run/" + modelId, {
    method: "POST",
    headers: {
      Authorization: "Key " + apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildRequestBody(modelId, frontPhoto, plan))
  });

  if (!submitResponse.ok) {
    const detail = await submitResponse.text();
    return { error: "fal.ai request failed", status: 502, detail: detail };
  }

  const submitPayload = await submitResponse.json();
  const requestId = submitPayload.request_id;
  if (!requestId) {
    return { error: "fal.ai did not return a request id", status: 502 };
  }

  const statusUrl = "https://queue.fal.run/" + modelId + "/requests/" + requestId + "/status";
  const resultUrl = "https://queue.fal.run/" + modelId + "/requests/" + requestId;

  for (let attempt = 0; attempt < 45; attempt += 1) {
    await sleep(2000);
    const statusResponse = await fetch(statusUrl, {
      headers: { Authorization: "Key " + apiKey }
    });
    if (!statusResponse.ok) continue;

    const statusPayload = await statusResponse.json();
    if (statusPayload.status === "COMPLETED") {
      const resultResponse = await fetch(resultUrl, {
        headers: { Authorization: "Key " + apiKey }
      });
      if (!resultResponse.ok) {
        return { error: "fal.ai result fetch failed", status: 502 };
      }
      const resultPayload = await resultResponse.json();
      const imageUrl =
        resultPayload.images &&
        resultPayload.images[0] &&
        (resultPayload.images[0].url || resultPayload.images[0]);
      if (!imageUrl) {
        return { error: "fal.ai returned no image", status: 502 };
      }
      return {
        previewUrl: typeof imageUrl === "string" ? imageUrl : imageUrl.url,
        generatedAt: new Date().toISOString(),
        source: "fal",
        model: modelId
      };
    }

    if (statusPayload.status === "FAILED") {
      return { error: "fal.ai generation failed", status: 502, detail: statusPayload };
    }
  }

  return { error: "fal.ai generation timed out", status: 504 };
}
