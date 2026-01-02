import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

export const getShoppingAdvice = async (
  userPrompt: string, 
  history: {role: string, parts: any[]}[],
  imageData?: { data: string; mimeType: string }
) => {
  try {
    // Initialize inside the function to use the latest process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const productList = PRODUCTS.map(p => `- ${p.name} ($${p.price}): ${p.description}`).join('\n');
    
    const parts: any[] = [{ text: userPrompt }];
    if (imageData) {
      parts.push({
        inlineData: imageData
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        {
          role: "user",
          parts: parts
        }
      ],
      config: {
        systemInstruction: `You are "Homie", a world-class interior designer for the store "Homie Pro". 
          We specialize in high-end bedding, lamps, and decorative items.
          
          Our Catalog:
          ${productList}
          
          Your Task:
          1. If the user provides a room image, analyze the colors, lighting, and style.
          2. Recommend 2-3 items from our catalog that would elevate their space.
          3. Be encouraging, sophisticated, and helpful.
          4. If they just want to chat, guide them towards our bestsellers.
          5. Keep responses concise and use markdown for readability.`,
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a slight connection issue with my design studio. Please try again in a moment, or tell me more about your style!";
  }
};