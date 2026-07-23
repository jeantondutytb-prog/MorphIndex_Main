import { normalizeAnalysis } from "./normalize-analysis.js";

const ANALYSIS_PROMPT = `You are a facial aesthetics analysis engine for a self-improvement app (not medical advice).
Analyze the FRONT photo and SIDE profile photo. Estimate visible facial structure metrics conservatively and realistically.

Return ONLY valid JSON (no markdown) matching this schema:
{
  "scores": { "overall": 0-10, "harmony": 0-10, "angularity": 0-10, "dimorphism": 0-10, "features": 0-10 },
  "potential": { "overall": 0-10 },
  "percentile": 5-95,
  "pillars": {
    "harmony": { "score": 0-10, "metrics": [{ "key": "facialThirds", "value": "string", "ideal": "string", "status": "good|average|focus" }] },
    "angularity": { "score": 0-10, "metrics": [{ "key": "jawAngle", "value": "string", "ideal": "string", "status": "good|average|focus" }] },
    "dimorphism": { "score": 0-10, "metrics": [{ "key": "browRidge", "value": "string", "ideal": "string", "status": "good|average|focus" }] },
    "features": { "score": 0-10, "metrics": [{ "key": "skinClarity", "value": "string", "ideal": "string", "status": "good|average|focus" }] }
  },
  "summary": {
    "facialThirds": "string",
    "jawAngle": "string",
    "symmetryDeviation": "string",
    "ipdRatio": "string"
  },
  "plan": [{ "key": "jawlineDefinition|midfaceBalance|skinRoutine|underEyeCare|postureMewing|grooming", "pillar": "harmony|angularity|dimorphism|features", "impact": "high|medium|low", "weeks": 4-24 }]
}

Harmony metrics keys: facialThirds, facialWidthHeight, midfaceRatio, symmetryDeviation, ipdRatio, canthalTilt, noseChinRatio
Angularity metrics keys: jawAngle, gonialAngle, jawDefinition, cheekboneProminence, chinProjection, mandibleWidth
Dimorphism metrics keys: browRidge, jawRobustness, facialHairline, lipFullness, noseSize
Features metrics keys: skinClarity, underEyeQuality, acneScarring, poreVisibility, lipHealth, hairDensity
Include 5 plan items prioritized by weakest areas.`;

function parseDataUri(dataUri) {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUri || "");
  if (!match) return null;
  return { media_type: match[1], data: match[2] };
}

function extractJson(text) {
  const trimmed = (text || "").trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed);
  } catch (e) {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    try {
      return JSON.parse(trimmed.slice(start, end + 1));
    } catch (err) {
      return null;
    }
  }
}

export async function analyzeFaceWithAnthropic({ frontPhoto, sidePhoto, userId }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { error: "Anthropic API key is not configured", status: 503 };
  }

  const front = parseDataUri(frontPhoto);
  const side = parseDataUri(sidePhoto);
  if (!front || !side) {
    return { error: "Invalid photo payload", status: 400 };
  }

  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: model,
      max_tokens: 4096,
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "FRONT photo:" },
            { type: "image", source: { type: "base64", media_type: front.media_type, data: front.data } },
            { type: "text", text: "SIDE profile photo:" },
            { type: "image", source: { type: "base64", media_type: side.media_type, data: side.data } },
            { type: "text", text: ANALYSIS_PROMPT }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    return { error: "Anthropic analysis failed", status: 502, detail: detail };
  }

  const payload = await response.json();
  const textBlock = (payload.content || []).find(function (block) {
    return block.type === "text";
  });
  const parsed = extractJson(textBlock && textBlock.text);
  if (!parsed) {
    return { error: "Could not parse AI analysis", status: 502 };
  }

  return { analysis: normalizeAnalysis(parsed, userId) };
}
