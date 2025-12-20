
import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

/**
 * Transforms an image based on a text prompt using the gemini-2.5-flash-image model.
 */
export const transformImage = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  const apiKey = import.meta.env.VITE_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Missing API Key. Please set VITE_API_KEY in your environment variables.");
  }
  const ai = new GoogleGenAI({ apiKey });

  try {
    const mimeTypeMatch = base64Image.match(/^data:(image\/\w+);base64,/);
    const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const fullPrompt = `Task: Professional AI Photo Prank.
Instruction: "${prompt}".
Constraint: You MUST modify the input image. Output ONLY the modified image.
IMPORTANT: Do not return any text, only the image data.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType: mimeType } },
          { text: fullPrompt }
        ]
      },
      config: {
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
        ]
      }
    });

    const candidate = response.candidates?.[0];
    if (!candidate || candidate.finishReason === 'SAFETY') {
      throw new Error("Safety block: The prank was too cursed for the AI. Try a milder prompt.");
    }

    const parts = candidate?.content?.parts;
    if (parts) {
      // Prioritize the image part
      const imagePart = parts.find(p => p.inlineData?.data);
      if (imagePart && imagePart.inlineData?.data) {
        const data = imagePart.inlineData.data.trim();
        if (data.length > 500) {
          return `data:${imagePart.inlineData.mimeType || 'image/png'};base64,${data}`;
        }
      }

      // If only text was returned, the model might have refused without a safety trigger
      const textPart = parts.find(p => p.text)?.text;
      if (textPart) throw new Error(textPart);
    }

    throw new Error("The engine failed to output a visual result. Please try again.");
  } catch (error: any) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
