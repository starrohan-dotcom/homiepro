
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

// Corrected initialization using process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getShoppingAdvice = async (userPrompt: string, history: {role: string, parts: any[]}[]) => {
  try {
    const productList = PRODUCTS.map(p => `${p.name} ($${p.price}) - ${p.description}`).join('\n');
    
    // Using generateContent with systemInstruction in config as per standard best practices
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        {
          role: "user",
          parts: [{ text: userPrompt }]
        }
      ],
      config: {
        systemInstruction: `You are "Homie", an expert interior design assistant for the store "Homie Pro". 
          Our current inventory is:
          ${productList}
          
          Guidelines:
          1. Be helpful, friendly, and professional.
          2. Recommend specific products from the list above.
          3. Ask clarifying questions about their room style if they aren't sure.
          4. Keep responses concise and focused on home decor.`,
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 500,
      }
    });

    // Accessing .text property directly as it's a property, not a method
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of trouble connecting to my design database. How else can I help you today?";
  }
};
