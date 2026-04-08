import { GoogleGenAI, Type } from "@google/genai";

// En Vite, process.env.GEMINI_API_KEY es reemplazado por el valor real durante la compilación
// gracias a la configuración en vite.config.js
const API_KEY = process.env.GEMINI_API_KEY || "";

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Función auxiliar para esperar (delay)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Sistema de caché simple en memoria
const searchCache = new Map();

export const plantService = {
  async searchPlants(query, retries = 2) {
    if (!API_KEY) {
      console.error("GEMINI_API_KEY is missing");
      return [];
    }

    // Normalizar la consulta para la caché
    const cacheKey = (query || "plantas populares").toLowerCase().trim();

    // Si ya tenemos el resultado en caché, lo devolvemos inmediatamente
    if (searchCache.has(cacheKey)) {
      console.log(`Caché hit para: "${cacheKey}"`);
      return searchCache.get(cacheKey);
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Genera una lista de 6 plantas relacionadas con la búsqueda o categoría: "${query || "plantas populares"}". Proporciona información detallada para cada una en idioma ESPAÑOL. Asegúrate de que las plantas sean variadas y representativas.`,
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
      const processedPlants = plants.map((p) => ({
        ...p,
        imageUrl: `https://loremflickr.com/800/600/${encodeURIComponent(p.name + " plant")}/all`,
      }));

      // Guardar en caché antes de devolver
      searchCache.set(cacheKey, processedPlants);
      return processedPlants;
    } catch (error) {
      // Si es un error de cuota (429) y tenemos reintentos disponibles
      if (error.message?.includes("429") && retries > 0) {
        const waitTime = (3 - retries) * 5000; // Esperar más en cada reintento (5s, 10s)
        console.log(
          `Cuota excedida. Reintentando en ${waitTime / 1000} segundos... (${retries} reintentos restantes)`,
        );
        await sleep(waitTime);
        return this.searchPlants(query, retries - 1);
      }

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
