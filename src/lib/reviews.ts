/**
 * Utilidades para manejo de reseñas de Google
 */

import type { ReviewsData } from '../types/reviews';

/**
 * Carga los datos de reseñas desde el JSON generado
 */
export async function loadReviews(): Promise<ReviewsData> {
    try {
        const reviewsData = await import('../../content/reviews/google.json');
        return reviewsData.default as ReviewsData;
    } catch (error) {
        console.warn('No se pudieron cargar las reseñas de Google:', error);
        return {
            last_updated: new Date().toISOString(),
            places: []
        };
    }
}

/**
 * Convierte una puntuación numérica a estrellas HTML
 * @param rating Puntuación de 1 a 5
 * @returns String con estrellas HTML
 */
export function ratingToStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';

    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }

    // Media estrella
    if (hasHalfStar) {
        stars += '☆';
    }

    // Estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }

    return stars;
}

/**
 * Formatea una fecha ISO a formato español
 * @param dateString Fecha en formato ISO
 * @returns Fecha formateada en español
 */
export function formatDateSpanish(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

/**
 * Trunca texto a un número máximo de caracteres
 * @param text Texto a truncar
 * @param maxLength Longitud máxima
 * @returns Texto truncado con '...' si es necesario
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    }

    return text.slice(0, maxLength).trim() + '...';
}

/**
 * Extrae las iniciales de un nombre para usar en avatar
 * @param name Nombre completo
 * @returns Iniciales (máximo 2 caracteres)
 */
export function getInitials(name: string): string {
    const words = name.trim().split(' ');
    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    }

    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}
