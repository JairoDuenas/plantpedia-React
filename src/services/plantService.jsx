import { GoogleGenAI, Type } from "@google/genai";

// En Vite, las variables de entorno pueden venir de import.meta.env o ser inyectadas vía define en vite.config.js
const PERENUAL_API_KEY =
  (typeof process !== "undefined" && process.env?.PERENUAL_API_KEY) ||
  import.meta.env.VITE_PERENUAL_API_KEY ||
  "";
const PERENUAL_BASE_URL = "https://perenual.com/api";

// Sistema de caché simple en memoria
const searchCache = new Map();

// Log de diagnóstico inicial (solo en desarrollo)
if (import.meta.env.DEV) {
  console.log(
    "FitoPedia: Estado de API Key:",
    PERENUAL_API_KEY
      ? "Detectada (comienza con " + PERENUAL_API_KEY.substring(0, 3) + "...)"
      : "No detectada",
  );
}

export const plantService = {
  async searchPlants(query, filters = {}) {
    // Limpiar la consulta para la API
    const cleanQuery = (query || "")
      .replace(/plantas de /gi, "")
      .replace(/plantas /gi, "")
      .trim();

    // Crear una clave de caché única basada en query y filtros
    const filterString = Object.entries(filters)
      .map(([k, v]) => `${k}:${v}`)
      .join("_");
    const cacheKey = `search_${(cleanQuery || "popular").toLowerCase()}_${filterString}`;

    if (searchCache.has(cacheKey)) {
      return searchCache.get(cacheKey);
    }

    try {
      if (!PERENUAL_API_KEY) {
        console.warn(
          "FitoPedia: VITE_PERENUAL_API_KEY no encontrada. Usando datos de respaldo.",
        );
        return this.getFallbackPlants(cleanQuery);
      }

      // Construir URL con parámetros de filtro
      let url = `${PERENUAL_BASE_URL}/species-list?key=${PERENUAL_API_KEY}`;

      if (cleanQuery) url += `&q=${encodeURIComponent(cleanQuery)}`;
      if (filters.indoor !== undefined) url += `&indoor=${filters.indoor}`;
      if (filters.edible !== undefined) url += `&edible=${filters.edible}`;
      if (filters.poisonous !== undefined)
        url += `&poisonous=${filters.poisonous}`;
      if (filters.cycle) url += `&cycle=${filters.cycle}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        `FitoPedia: Datos recibidos para "${cleanQuery}" con filtros:`,
        filters,
        data.data?.length || 0,
        "plantas",
      );

      if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
        console.info(`FitoPedia: No se encontraron resultados.`);
        return cleanQuery || Object.keys(filters).length > 0
          ? []
          : this.getFallbackPlants("");
      }

      // No buscamos resúmenes de Wikipedia aquí para mejorar el rendimiento de la lista
      const processedPlants = data.data.slice(0, 12).map((p) => {
        const rawUrl =
          p.default_image?.medium_url || p.default_image?.original_url;
        const imageUrl = this.isValidImageUrl(rawUrl)
          ? rawUrl
          : `https://loremflickr.com/800/600/${encodeURIComponent(p.common_name || "plant")}/all`;

        console.log(`FitoPedia: Planta "${p.common_name}" -> Image:`, imageUrl);

        return {
          id: p.id.toString(),
          name: p.common_name || "Planta Desconocida",
          scientificName: p.scientific_name[0] || "N/A",
          family: p.cycle || "Botánica",
          care: {
            water: this.mapWatering(p.watering),
            light: this.mapSunlight(p.sunlight),
          },
          imageUrl,
        };
      });

      searchCache.set(cacheKey, processedPlants);
      return processedPlants;
    } catch (error) {
      console.error("Error fetching plants from Perenual:", error);
      return this.getFallbackPlants(cleanQuery);
    }
  },

  async getPlantDetails(id) {
    const cacheKey = `details_${id}`;
    if (searchCache.has(cacheKey)) {
      return searchCache.get(cacheKey);
    }

    try {
      if (!PERENUAL_API_KEY || id.startsWith("f")) {
        // Si es fallback o no hay API key, buscamos en los datos estáticos
        const fallback = this.getFallbackPlants("");
        const plant = fallback.find((p) => p.id === id);
        return plant || null;
      }

      const response = await fetch(
        `${PERENUAL_BASE_URL}/species/details/${id}?key=${PERENUAL_API_KEY}`,
      );
      const p = await response.json();

      // Obtener descripción enriquecida de Wikipedia
      const description = await this.getWikipediaSummary(
        p.common_name || p.scientific_name[0],
      );

      const rawUrl = p.default_image?.original_url;
      const imageUrl = this.isValidImageUrl(rawUrl)
        ? rawUrl
        : `https://loremflickr.com/800/600/${encodeURIComponent(p.common_name || "plant")}/all`;

      const details = {
        id: p.id.toString(),
        name: p.common_name || "Planta Desconocida",
        scientificName: p.scientific_name[0] || "N/A",
        family: p.family || "Botánica",
        description:
          description ||
          p.description ||
          "Una especie vegetal fascinante que aporta vida y frescura a cualquier espacio botánico.",
        care: {
          water: this.mapWatering(p.watering),
          light: this.mapSunlight(p.sunlight),
          temperature: p.maintenance || "15°C - 28°C",
          soil: "Sustrato nutritivo con drenaje eficiente.",
        },
        origin: p.origin?.[0] || "Global",
        imageUrl,
        propagation: p.propagation?.[0] || "Semillas / Esquejes",
        flowers: p.flowers || false,
        fruits: p.fruits || false,
        edible: p.edible_fruit || false,
      };

      searchCache.set(cacheKey, details);
      return details;
    } catch (error) {
      console.error("Error fetching plant details:", error);
      return null;
    }
  },

  isValidImageUrl(url) {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();
    // Filtrar imágenes de "upgrade access" de Perenual que suelen dar 404 o ser placeholders
    if (lowerUrl.includes("upgrade_access")) return false;
    if (lowerUrl.includes("placeholder")) return false;
    if (lowerUrl.includes("no-image")) return false;
    if (lowerUrl.includes("default-image")) return false;
    return true;
  },

  async getWikipediaSummary(title) {
    try {
      // Intentar primero en español
      let response = await fetch(
        `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      );
      let data = await response.json();

      if (data.extract) return data.extract;

      // Si no hay en español, intentar en inglés
      response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      );
      data = await response.json();
      return data.extract || null;
    } catch {
      return null;
    }
  },

  mapWatering(w) {
    const map = {
      Frequent: "Frecuente",
      Average: "Moderado",
      Minimum: "Mínimo",
      None: "Casi nulo",
    };
    return map[w] || "Moderado";
  },

  mapSunlight(s) {
    if (!s || s.length === 0) return "Luz indirecta";
    const light = s[0].toLowerCase();
    if (light.includes("full sun")) return "Pleno sol";
    if (light.includes("part shade")) return "Semisombra";
    return "Interior";
  },

  getFallbackPlants(query) {
    // Datos estáticos para cuando no hay API Key o falla la red
    const fallback = [
      {
        id: "f1",
        name: "Monstera Deliciosa",
        scientificName: "Monstera deliciosa",
        family: "Araceae",
        description:
          "Conocida como Costilla de Adán, es una planta trepadora famosa por sus grandes hojas verdes con agujeros naturales.",
        care: {
          water: "Moderado, dejar secar el sustrato entre riegos.",
          light: "Luz indirecta brillante, evitar sol directo.",
          temperature: "18°C - 27°C",
          soil: "Sustrato universal con buen drenaje.",
        },
        origin: "Selvas tropicales de México y Centroamérica",
        imageUrl:
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "f2",
        name: "Lavanda",
        scientificName: "Lavandula angustifolia",
        family: "Lamiaceae",
        description:
          "Planta aromática muy apreciada por su fragancia y sus flores púrpuras. Ideal para jardines exteriores y polinizadores.",
        care: {
          water: "Bajo, muy resistente a la sequía.",
          light: "Pleno sol, mínimo 6 horas diarias.",
          temperature: "10°C - 30°C",
          soil: "Suelo arenoso, calcáreo y muy bien drenado.",
        },
        origin: "Región mediterránea",
        imageUrl:
          "https://images.unsplash.com/photo-1591017403286-fd8ba821bf21?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "f3",
        name: "Lirio de la Paz",
        scientificName: "Spathiphyllum",
        family: "Araceae",
        description:
          "Planta de interior elegante que purifica el aire. Sus flores blancas contrastan hermosamente con su follaje verde oscuro.",
        care: {
          water: "Mantener el sustrato siempre ligeramente húmedo.",
          light: "Sombra parcial o luz indirecta baja.",
          temperature: "15°C - 25°C",
          soil: "Tierra rica en nutrientes y turba.",
        },
        origin: "Regiones tropicales de América",
        imageUrl:
          "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=800",
      },
    ];

    if (!query) return fallback;
    return fallback.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.family.toLowerCase().includes(query.toLowerCase()),
    );
  },

  async getFeaturedPlants() {
    return this.searchPlants("");
  },
};
