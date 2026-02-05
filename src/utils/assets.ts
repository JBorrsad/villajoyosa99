/**
 * Utilidad para construir URLs de assets con el base path correcto
 */

/**
 * Construye la URL completa de un asset incluyendo el base path
 * @param path Ruta relativa del asset (ej: "/img/photo.jpg")
 * @returns URL completa con base path (ej: "/img/photo.jpg" o "/clinica-sada-borras/img/photo.jpg" si hay subdirectorio)
 */
export function asset(path: string): string {
	// Asegurarnos de que path empiece con /
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	
	// Obtener el base URL de Astro (incluye el base path configurado)
	const base = import.meta.env.BASE_URL;
	
	// Si base es solo "/", devolver el path tal cual
	if (base === '/') {
		return normalizedPath;
	}
	
	// Combinar base y path, evitando doble slash
	return `${base.replace(/\/$/, '')}${normalizedPath}`;
}

