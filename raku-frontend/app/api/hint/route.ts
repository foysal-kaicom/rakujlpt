// import { NextResponse } from "next/server";
// import { GoogleGenAI } from "@google/genai";

// type Lang = "en" | "bn";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY!,
// });

// type Part =
//   | { text: string }
//   | {
//       inlineData: {
//         mimeType: string;
//         data: string;
//       };
//     };

// const isValidUrl = (url: string) => {
//   try {
//     const u = new URL(url);
//     return ["http:", "https:"].includes(u.protocol);
//   } catch {
//     return false;
//   }
// };

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const {
//       questionText,
//       imageUrl,
//       audioUrl,
//       lang = "en",
//     }: {
//       questionText?: string;
//       imageUrl?: string;
//       audioUrl?: string;
//       lang?: Lang;
//     } = body;

//     if (!questionText && !imageUrl && !audioUrl) {
//       return NextResponse.json(
//         { error: "No input provided" },
//         { status: 400 }
//       );
//     }

//      const useLang = lang === "bn" ? "Bangla" : "English";

//     const systemInstruction = `You are a mock test tutor.
//     Rules:
//     - Give ONLY a short hint
//     - NEVER reveal the answer
//     - If the question contains Japanese with furigana:
//       - Explain the furigana in ${useLang}
//     - Otherwise:
//       - Respond fully in ${useLang}
// `;

//     const userParts: Part[] = [];

//     if (questionText) {
//       userParts.push({ text: questionText });
//     }

//     if (imageUrl) {
//       if (!isValidUrl(imageUrl)) throw new Error("Invalid image URL");

//       const res = await fetch(imageUrl);
//       const buffer = Buffer.from(await res.arrayBuffer());

//       userParts.push({
//         inlineData: {
//           mimeType: res.headers.get("content-type") ?? "image/png",
//           data: buffer.toString("base64"),
//         },
//       });
//     }

//     if (audioUrl) {
//       if (!isValidUrl(audioUrl)) throw new Error("Invalid audio URL");

//       const res = await fetch(audioUrl);
//       const buffer = Buffer.from(await res.arrayBuffer());

//       userParts.push({
//         inlineData: {
//           mimeType: res.headers.get("content-type") ?? "audio/mpeg",
//           data: buffer.toString("base64"),
//         },
//       });
//     }

//     const result = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: [{ role: "user", parts: userParts }],
//       config: { systemInstruction },
//     });

//     const hint = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

//     return NextResponse.json({ hint });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

type Lang = "en" | "bn";

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
    const body = await req.json();

    const {
      questionText,
      imageUrl,
      audioUrl,
      lang,
    }: {
      questionText?: string;
      imageUrl?: string;
      audioUrl?: string;
      lang?: Lang;
    } = body;

    if (!questionText && !imageUrl && !audioUrl) {
      return NextResponse.json({ error: "No input provided" }, { status: 400 });
    }

    const useLang = lang === "bn" ? "Bangla" : "English";

    const systemInstruction = `
    You are a mock test tutor.
    Rules:
    - Give ONLY a short hint
    - NEVER reveal the answer
    - If the question contains Japanese with furigana:
    - Explain the furigana in ${useLang}
    - Otherwise:
    - Respond fully in ${useLang}
    `.trim();

    const userParts: Part[] = [];

    if (questionText) {
      userParts.push({ text: questionText });
    }

    const fetchAndEncode = async (url: string) => {
      if (!isValidUrl(url)) throw new Error("Invalid media URL");

      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });

      const size = Number(res.headers.get("content-length") || 0);
      if (size > 5_000_000) throw new Error("File too large");

      const buffer = Buffer.from(await res.arrayBuffer());

      return {
        mimeType: res.headers.get("content-type") ?? "application/octet-stream",
        data: buffer.toString("base64"),
      };
    };

    if (imageUrl) {
      userParts.push({
        inlineData: await fetchAndEncode(imageUrl),
      });
    }

    if (audioUrl) {
      userParts.push({
        inlineData: await fetchAndEncode(audioUrl),
      });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: userParts }],
      config: { systemInstruction },
    });

    const hint =
      result.candidates
        ?.flatMap((c) => c.content?.parts ?? [])
        ?.find((p) => "text" in p)?.text ?? "";

    return NextResponse.json({ hint });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}
