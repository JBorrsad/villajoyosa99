#!/usr/bin/env node

/**
 * Script para obtener reseñas de Google Places API v1
 * Genera content/reviews/google.json para consumo estático
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const API_BASE_URL = "https://places.googleapis.com/v1/places";
const FIELDS = "displayName,rating,userRatingCount,googleMapsUri,reviews";
const MAX_REVIEWS_PER_PLACE = 50; // Aumentado para obtener más reseñas

/**
 * Obtiene variables de entorno con validación
 */
function getEnvVars() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeIds = process.env.GOOGLE_PLACE_IDS;

  if (!apiKey) {
    throw new Error("GOOGLE_MAPS_API_KEY no está configurada");
  }

  if (!placeIds) {
    console.warn(
      "⚠️  GOOGLE_PLACE_IDS no está configurada. Generando archivo vacío."
    );
    return { apiKey: null, placeIds: [] };
  }

  return {
    apiKey,
    placeIds: placeIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  };
}

/**
 * Extrae ID de reseña desde el campo name de la API
 * @param {string} name - Campo name de la reseña (formato: places/{place_id}/reviews/{review_id})
 * @returns {string} - ID de la reseña o string vacío
 */
function extractReviewId(name) {
  if (!name) return "";

  const match = name.match(/\/reviews\/([^\/]+)$/);
  return match ? match[1] : "";
}

/**
 * Construye deep link a una reseña específica
 * @param {Object} review - Objeto reseña de la API
 * @param {string} placeId - ID del lugar
 * @returns {string} - URL del deep link
 */
function buildDeepLink(review, placeId) {
  const reviewId = extractReviewId(review.name);

  if (reviewId) {
    return `https://www.google.com/maps/place/?q=place_id:${placeId}&reviewId=${reviewId}`;
  }

  if (review.authorUri) {
    return review.authorUri;
  }

  return `https://maps.google.com/?cid=${placeId}`;
}

/**
 * Normaliza una reseña de la API a nuestro formato
 * @param {Object} apiReview - Reseña de la API
 * @param {string} placeId - ID del lugar
 * @returns {Object} - Reseña normalizada
 */
function normalizeReview(apiReview, placeId) {
  let time;
  try {
    const publishTime = apiReview.publishTime;
    if (publishTime) {
      // Intentar parsear como timestamp con seconds
      if (publishTime.seconds) {
        time = new Date(publishTime.seconds * 1000).toISOString().split("T")[0];
      }
      // Intentar parsear como string ISO
      else if (typeof publishTime === "string") {
        time = new Date(publishTime).toISOString().split("T")[0];
      }
      // Si tiene el formato completo de objeto Date
      else {
        time = new Date(publishTime).toISOString().split("T")[0];
      }
    }
  } catch (error) {
    console.warn(`⚠️  Error parseando fecha de reseña, usando fecha actual`);
  }

  // Fallback a fecha actual si no se pudo parsear
  if (!time) {
    time = new Date().toISOString().split("T")[0];
  }

  return {
    id: extractReviewId(apiReview.name),
    rating: apiReview.rating || 0,
    text: apiReview.text?.text || "",
    time,
    author: apiReview.authorAttribution?.displayName || "Usuario anónimo",
    author_uri: apiReview.authorAttribution?.uri || "",
    deep_link: buildDeepLink(apiReview, placeId),
  };
}

/**
 * Obtiene datos de un lugar desde la API
 * @param {string} placeId - ID del lugar
 * @param {string} apiKey - Clave de la API
 * @returns {Promise<Object>} - Datos del lugar normalizados
 */
async function fetchPlaceData(placeId, apiKey) {
  const url = `${API_BASE_URL}/${placeId}?fields=${FIELDS}&languageCode=es`;

  console.log(`📡 Obteniendo datos para lugar: ${placeId}`);

  try {
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "Content-Type": "application/json",
        "Accept-Language": "es-ES,es;q=0.9",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Normalizar reseñas y filtrar las que no tienen texto
    const reviews = (data.reviews || [])
      .map((review) => normalizeReview(review, placeId))
      .filter((review) => review.text && review.text.trim().length > 0) // Solo reseñas con texto
      .slice(0, MAX_REVIEWS_PER_PLACE)
      .sort((a, b) => {
        // Ordenar por rating (5★ primero) y luego por fecha
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return new Date(b.time) - new Date(a.time);
      });

    return {
      place_id: placeId,
      name: data.displayName?.text || "Lugar sin nombre",
      rating: data.rating || 0,
      userRatingCount: data.userRatingCount || 0,
      googleMapsUri:
        data.googleMapsUri || `https://maps.google.com/?cid=${placeId}`,
      writeReviewUri: `https://search.google.com/local/writereview?placeid=${placeId}`,
      reviews,
    };
  } catch (error) {
    console.error(`❌ Error obteniendo datos para ${placeId}:`, error.message);
    return null;
  }
}

/**
 * Guarda los datos en el archivo JSON
 * @param {Object} data - Datos a guardar
 */
function saveData(data) {
  const outputDir = path.join(__dirname, "..", "content", "reviews");
  const outputFile = path.join(outputDir, "google.json");

  // Crear directorio si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`💾 Datos guardados en: ${outputFile}`);
}

/**
 * Función principal
 */
async function main() {
  console.log("🚀 Iniciando obtención de reseñas de Google Places...");

  const { apiKey, placeIds } = getEnvVars();

  if (!apiKey || placeIds.length === 0) {
    // Crear archivo vacío si no hay configuración
    const emptyData = {
      last_updated: new Date().toISOString(),
      places: [],
    };
    saveData(emptyData);
    console.log(
      "📝 Archivo vacío generado. Configura GOOGLE_PLACE_IDS para obtener datos reales."
    );
    return;
  }

  const results = [];

  for (const placeId of placeIds) {
    const placeData = await fetchPlaceData(placeId, apiKey);
    if (placeData) {
      results.push(placeData);
    }

    // Pequeña pausa entre requests para ser respetuoso con la API
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const finalData = {
    last_updated: new Date().toISOString(),
    places: results,
  };

  saveData(finalData);

  console.log(`✅ Proceso completado. ${results.length} lugares procesados.`);
  console.log(
    `📊 Total de reseñas: ${results.reduce(
      (sum, place) => sum + place.reviews.length,
      0
    )}`
  );
}

// Ejecutar siempre
main().catch((error) => {
  console.error("💥 Error fatal:", error.message);
  process.exit(1);
});
