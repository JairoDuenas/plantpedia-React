import { GoogleGenAI, Type } from "@google/genai";

// En Vite, process.env.GEMINI_API_KEY es reemplazado por el valor real durante la compilación
// gracias a la configuración en vite.config.js
const API_KEY = process.env.GEMINI_API_KEY || "";

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const plantService = {
  async searchPlants(query) {
    if (!API_KEY) {
      console.error("GEMINI_API_KEY is missing");
      return [];
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Genera una lista de 6 plantas relacionadas con la búsqueda: "${query}". Proporciona información detallada para cada una en idioma ESPAÑOL.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                scientificName: { type: Type.STRING },
                family: { type: Type.STRING },
                description: { type: Type.STRING },
                care: {
                  type: Type.OBJECT,
                  properties: {
                    water: { type: Type.STRING },
                    light: { type: Type.STRING },
                    temperature: { type: Type.STRING },
                    soil: { type: Type.STRING },
                  },
                  required: ["water", "light", "temperature", "soil"],
                },
                origin: { type: Type.STRING },
                imagePrompt: { type: Type.STRING },
              },
              required: [
                "id",
                "name",
                "scientificName",
                "family",
                "description",
                "care",
                "origin",
                "imagePrompt",
              ],
            },
          },
        },
      });

      const plants = JSON.parse(response.text || "[]");
      return plants.map((p) => ({
        ...p,
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(p.name)}/800/600`,
      }));
    } catch (error) {
      console.error("Error fetching plants:", error);
      return [];
    }
  },

  async getFeaturedPlants() {
    return this.searchPlants(
      "popular indoor and outdoor plants for a botanical encyclopedia",
    );
  },
};
