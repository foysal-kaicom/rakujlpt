import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    // Inside your POST function, before ai.models.generateContent
// ...
    const { questionText, imageUrl, audioUrl } = await req.json();

    // 1. Define the system instruction to set the model's role
    const systemInstruction =
      "You are a mock test tutor. Give a short hint. Do NOT reveal the answer. And give the hint in japanese if the question use furigana you should also use furigana or explain the furigana";

    // 2. Collect all the user-provided parts (text, image, audio)
    const userParts: any[] = [];

    // Combine instruction with the question text (since system instruction is separate)
    if (questionText) {
      userParts.push({ text: questionText });
    }

    // Image input (must fetch and convert to base64)
    if (imageUrl) {
      const response = await fetch(imageUrl);
      const buffer = Buffer.from(await response.arrayBuffer());
      const base64Image = buffer.toString("base64");
      
      // Push the image part directly with the correct format
      userParts.push({
        inlineData: {
          mimeType: "image/png", // Use mimeType: "image/jpeg" or appropriate
          data: base64Image,
        },
      });
    }

    // Audio input (optional)
    if (audioUrl) {
      // Audio parts are similar to image parts, using inlineData or fileData
      // Note: For large files, it's better to use the Files API first and then fileData.
      // If fetching/base64 encoding the audio, use inlineData:
      const audioResponse = await fetch(audioUrl);
      const audioBuffer = Buffer.from(await audioResponse.arrayBuffer());
      const base64Audio = audioBuffer.toString("base64");

      userParts.push({
        inlineData: {
          mimeType: "audio/mp3",
          data: base64Audio,
        },
      });
    }

    // 3. Construct the final contents array for the API call
    const contents = [
      {
        role: "user",
        parts: userParts,
      },
    ];

    // 4. Generate content
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: systemInstruction, // Use the proper config field for system instructions
      }
    });
    // ✅ Correct property to get text
   const hint = result.text;

    return NextResponse.json({ hint });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
