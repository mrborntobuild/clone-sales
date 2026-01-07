
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// generateResearch utilizes the Gemini API to research company details and provide sales insights.
export const generateResearch = async (prompt: string): Promise<string> => {
  try {
    // Correct initialization following guidelines: use named parameter and process.env.API_KEY directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Generate content using the recommended model for basic text/research tasks.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are 'Claygent', an AI specialized in company research and sales outreach for the tool Clay.com. 
      Your goal is to help users research companies, identify pain points, and draft highly personalized sales emails.
      
      User request: ${prompt}`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        // maxOutputTokens is omitted to allow the model to manage its output length naturally.
      }
    });

    // response.text is an accessor property, not a function.
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong while communicating with the AI. Please try again.";
  }
};
