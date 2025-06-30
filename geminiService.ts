
import { GoogleGenAI } from "@google/genai";
import { COMPANY_LEAVE_POLICY } from '../constants';

if (!process.env.API_KEY) {
  // In a real app, you'd have better error handling or a check at app startup.
  // For this example, we'll log a warning.
  console.warn("API_KEY environment variable not set. Gemini API will not be available.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getPolicyAnswer = async (question: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "The AI assistant is currently unavailable because the API key is not configured.";
  }
  
  const systemInstruction = `You are an expert HR assistant for a company named Zenith. Your only task is to answer employee questions based *strictly* on the provided company leave policy. Do not use any external knowledge. If the answer is not found in the policy, state that you cannot find the information in the provided policy document. Keep your answers concise and clear.`;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: `Policy Document:\n---\n${COMPANY_LEAVE_POLICY}\n---\n\nEmployee Question: "${question}"`,
        config: {
            systemInstruction,
            temperature: 0.2,
        },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while trying to answer your question. Please try again later.";
  }
};
