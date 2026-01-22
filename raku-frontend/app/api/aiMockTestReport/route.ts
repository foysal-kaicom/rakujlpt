import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { payload, lang } = await req.json();

    if (!Array.isArray(payload) || payload.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty payload" },
        { status: 400 },
      );
    }

    const useLang = lang === "bn" ? "Bangla" : "English";

    const systemInstruction = `
        You are a strict JLPT exam coach.

        You mentor one student using results from multiple mock tests.
        Your job is to give blunt, corrective study instructions to improve exam performance.

        Language:
        - Respond ONLY in ${useLang}

        Rules:
        - For each exam, create a key using the exam title
        - For each module under the exam, create a key using the module name
        - Give EXACTLY 3 suggestions per module
        - Each suggestion must be under 20 words
        - Start each suggestion with a verb
        - Do NOT use numbers
        - Do NOT explain reasons
        - Do NOT analyze performance
        - Do NOT use motivational language
        - Do NOT repeat the module name in suggestions

        Tone:
        - Direct
        - Critical
        - Instructional

        Return ONLY valid JSON in this format:
        {
            "Exam Title": {
                "Module Name": [
                "suggestion one",
                "suggestion two"
                ]
            }
        }
    `.trim();

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: JSON.stringify(payload, null, 2),
            },
          ],
        },
      ],
      config: { systemInstruction },
    });

    const rawText =
      result.candidates
        ?.flatMap((c) => c.content?.parts ?? [])
        ?.find((p) => "text" in p)?.text ?? "";

    // Gemini sometimes wraps JSON in markdown
    const cleanText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const suggestions = JSON.parse(cleanText);

    return NextResponse.json({ suggestions });
  } catch (err) {
    console.error("Gemini evaluation error:", err);
    return NextResponse.json(
      { error: "AI evaluation failed", suggestions: {} },
      { status: 500 },
    );
  }
}
