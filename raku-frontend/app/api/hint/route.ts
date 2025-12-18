import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

type Part =
  | { text: string }
  | {
      inlineData: {
        mimeType: string;
        data: string;
      };
    };

const isValidUrl = (url: string) => {
  try {
    const u = new URL(url);
    return ["http:", "https:"].includes(u.protocol);
  } catch {
    return false;
  }
};

export async function POST(req: Request) {
  try {
    const { questionText, imageUrl, audioUrl } = await req.json();

    const systemInstruction = `You are a mock test tutor.
    Rules:
    - Give ONLY a short hint
    - NEVER reveal the answer
    - If the question contains Japanese with furigana:
      - Explain the furigana in English
    - Otherwise:
      - Respond fully in English
`;

    const userParts: Part[] = [];

    if (questionText) {
      userParts.push({ text: questionText });
    }

    if (imageUrl) {
      if (!isValidUrl(imageUrl)) throw new Error("Invalid image URL");

      const res = await fetch(imageUrl);
      const buffer = Buffer.from(await res.arrayBuffer());

      userParts.push({
        inlineData: {
          mimeType: res.headers.get("content-type") ?? "image/png",
          data: buffer.toString("base64"),
        },
      });
    }

    if (audioUrl) {
      if (!isValidUrl(audioUrl)) throw new Error("Invalid audio URL");

      const res = await fetch(audioUrl);
      const buffer = Buffer.from(await res.arrayBuffer());

      userParts.push({
        inlineData: {
          mimeType: res.headers.get("content-type") ?? "audio/mpeg",
          data: buffer.toString("base64"),
        },
      });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: userParts }],
      config: { systemInstruction },
    });

    const hint = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    return NextResponse.json({ hint });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
