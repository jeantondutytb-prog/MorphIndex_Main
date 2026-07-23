import { buildJourneyContext } from "./improvement-protocols.js";

const SYSTEM_PROMPT = `You are FaceGPT, an expert facial aesthetics coach inside FaceIQ Labs.
You help users understand their facial analysis scores and structured improvement journey.
Be concise, supportive, and practical. This is self-improvement guidance — not medical advice.
Never recommend specific surgeons or guarantee results.

When the user asks what to do, ALWAYS base your answer on their active focus, current phase, and checklist actions from the journey context.
Each action may include a short "guide" with concrete product examples or exercise cues — use those details when coaching.
Do not invent medical protocols or prescription drugs. Prefer the listed OTC product examples and technique steps.
If unsure, tell them to open the action details on the Plan page.
Reference their scores and journey progress when relevant.`;

export async function chatWithAnthropic({ messages, analysis, journey }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { error: "Anthropic API key is not configured", status: 503 };
  }

  const contextParts = [];
  if (analysis && analysis.scores) {
    contextParts.push(
      "User analysis context:\n" +
        JSON.stringify({
          scores: analysis.scores,
          potential: analysis.potential,
          percentile: analysis.percentile,
          summary: analysis.summary,
          plan: (analysis.plan || []).map(function (item) {
            return { key: item.key, pillar: item.pillar, impact: item.impact, weeks: item.weeks };
          })
        })
    );
  }

  const journeyContext = buildJourneyContext(journey);
  if (journeyContext) {
    contextParts.push(
      "User journey context (authoritative protocol state):\n" + JSON.stringify(journeyContext)
    );
  }

  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
  const maxHistory = Number(process.env.FACEGPT_MAX_HISTORY) || 6;
  const anthropicMessages = (messages || [])
    .filter(function (m) {
      return m && m.role && m.content;
    })
    .map(function (m) {
      return { role: m.role === "assistant" ? "assistant" : "user", content: m.content };
    })
    .slice(-maxHistory);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: model,
      max_tokens: 1024,
      temperature: 0.4,
      system: SYSTEM_PROMPT + (contextParts.length ? "\n\n" + contextParts.join("\n") : ""),
      messages: anthropicMessages
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    return { error: "FaceGPT request failed", status: 502, detail: detail };
  }

  const payload = await response.json();
  const textBlock = (payload.content || []).find(function (block) {
    return block.type === "text";
  });

  return {
    reply: textBlock && textBlock.text ? textBlock.text.trim() : "",
    model: model
  };
}
