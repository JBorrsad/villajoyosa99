/**
 * Tipos para datos de reseñas de Google Places API
 */

export interface GoogleReview {
    /** ID único de la reseña (extraído de reviews[].name si existe) */
    id: string;
    /** Puntuación de 1 a 5 */
    rating: number;
    /** Texto de la reseña */
    text: string;
    /** Fecha en formato YYYY-MM-DD */
    time: string;
    /** Nombre del autor */
    author: string;
    /** URI del perfil del autor en Google Maps */
    author_uri: string;
    /** Enlace directo a la reseña específica */
    deep_link: string;
}

export interface GooglePlace {
    /** ID único del lugar en Google Places */
    place_id: string;
    /** Nombre del lugar */
    name: string;
    /** Calificación promedio (1-5) */
    rating: number;
    /** Número total de reseñas */
    userRatingCount: number;
    /** URI del lugar en Google Maps */
    googleMapsUri: string;
    /** URI para escribir una reseña */
    writeReviewUri: string;
    /** Lista de reseñas (máximo 10) */
    reviews: GoogleReview[];
}

export interface ReviewsData {
    /** Timestamp ISO-8601 de la última actualización */
    last_updated: string;
    /** Lista de lugares con sus reseñas */
    places: GooglePlace[];
}
