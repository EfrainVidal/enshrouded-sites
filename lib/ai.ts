import OpenAI from "openai";

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  return new OpenAI({ apiKey });
}

export async function generateArticleWithAI(input: {
  siteName: string;
  game: string;
  keyword: string;
  category?: string;
}) {
  const client = getOpenAIClient();
  const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";

  const prompt = `
You are writing a highly useful SEO article for a game-guide website.

Rules:
- Write for humans first.
- No filler.
- Make the intro directly answer the keyword.
- Use short sections and scan-friendly headings.
- Include concrete steps.
- Include a "Common Mistakes" section.
- Include a short FAQ section with 3 questions.
- Do not claim patch-specific facts unless stated.
- Do not invent coordinates, exact drop rates, or fake developer statements.
- Use markdown.
- Output valid JSON ONLY with keys:
  title, description, category, keywords, body

Site name: ${input.siteName}
Game: ${input.game}
Primary keyword: ${input.keyword}
Category: ${input.category || "Guides"}
`.trim();

  const response = await client.responses.create({
    model,
    input: prompt
  });

  // Best-effort extraction. This starter keeps parsing simple.
  const text =
    response.output_text ||
    JSON.stringify(response);

  // Ask model for JSON only, but still defensively parse.
  const parsed = safeJsonParse(text);

  if (!parsed) {
    throw new Error("AI output was not valid JSON. Raw output: " + text);
  }

  return {
    title: String(parsed.title),
    description: String(parsed.description),
    category: String(parsed.category || input.category || "Guides"),
    keywords: Array.isArray(parsed.keywords) ? parsed.keywords.map(String) : [input.keyword],
    body: String(parsed.body)
  };
}

function safeJsonParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    const match = value.match(/\{[\s\S]*\}/);
    if (!match) return null;

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}