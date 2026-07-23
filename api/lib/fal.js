import { sleep } from "./http.js";

const MODEL_ID = "fal-ai/image-editing/face-enhancement";

export async function generateSixMonthPreview({ frontPhoto, plan }) {
  const apiKey = process.env.FAL_KEY;
  if (!apiKey) {
    return { error: "fal.ai API key is not configured", status: 503 };
  }

  if (!frontPhoto || !frontPhoto.startsWith("data:image/")) {
    return { error: "Invalid front photo", status: 400 };
  }

  const submitResponse = await fetch("https://queue.fal.run/" + MODEL_ID, {
    method: "POST",
    headers: {
      Authorization: "Key " + apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_url: frontPhoto,
        guidance_scale: 3.8,
      num_inference_steps: 32,
      output_format: "jpeg"
    })
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

  const statusUrl = "https://queue.fal.run/" + MODEL_ID + "/requests/" + requestId + "/status";
  const resultUrl = "https://queue.fal.run/" + MODEL_ID + "/requests/" + requestId;

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
        source: "fal"
      };
    }

    if (statusPayload.status === "FAILED") {
      return { error: "fal.ai generation failed", status: 502, detail: statusPayload };
    }
  }

  return { error: "fal.ai generation timed out", status: 504 };
}
