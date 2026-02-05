# Gestión de Reseñas de Google

Este documento explica cómo funcionan las reseñas de Google en el sitio web y cómo solucionar problemas comunes.

## ¿Cómo funciona?

El sistema de reseñas utiliza la **Google Places API (New)** para obtener las reseñas de las clínicas. Las reseñas se guardan en un archivo JSON estático (`content/reviews/google.json`) que se genera automáticamente.

## Actualización Automática

Las reseñas se actualizan automáticamente en los siguientes casos:

### 1. Diariamente a Medianoche (00:00 hora española)

El workflow de GitHub Actions se ejecuta automáticamente todos los días a las 00:00 (medianoche) para:

- Obtener las reseñas más recientes de Google
- Reconstruir el sitio web
- Desplegar la nueva versión en GitHub Pages

**Configuración del cron:**

```yaml
schedule:
  # 00:00 CET (invierno) = 23:00 UTC
  - cron: "0 23 * * *"
  # 00:00 CEST (verano) = 22:00 UTC
  - cron: "0 22 * * *"
```

### 2. En cada Push a Main

Cuando haces push de cambios a la rama `main`, el workflow automáticamente:

1. Obtiene las reseñas actualizadas
2. Construye el sitio
3. Despliega a GitHub Pages

### 3. En cada Build Local

Cuando ejecutas `npm run build`, automáticamente se ejecuta `npm run fetch:reviews` antes del build de Astro.

## Comandos Disponibles

```bash
# Obtener reseñas manualmente (sin build)
npm run fetch:reviews

# Desarrollo con fetch automático de reseñas
npm run dev

# Desarrollo sin fetch (más rápido, usa JSON existente)
npm run dev:no-fetch

# Build completo con reseñas actualizadas
npm run build

# Build sin actualizar reseñas (más rápido, usa JSON existente)
npm run build:no-fetch
```

## Configuración Necesaria

### Variables de Entorno Locales

Crea un archivo `.env` en la raíz del proyecto:

```bash
GOOGLE_MAPS_API_KEY=AIzaSy...tu_clave_aqui
GOOGLE_PLACE_IDS=ChIJYUcBB4snQg0RgXCK6ZOEHP8
```

### Secrets de GitHub

En tu repositorio de GitHub, ve a: **Settings > Secrets and variables > Actions**

Configura estos secrets:

| Secret                | Descripción                                | Ejemplo                         |
| --------------------- | ------------------------------------------ | ------------------------------- |
| `GOOGLE_MAPS_API_KEY` | Tu API Key de Google Maps                  | `AIzaSy...`                     |
| `GOOGLE_PLACE_ID_1`   | Place ID de Clínica Dental Villajoyosa 99  | `ChIJYUcBB4snQg0RgXCK6ZOEHP8`   |

## Solución de Problemas

### Las reseñas no se actualizan

**Causas posibles:**

1. **Los secrets no están configurados en GitHub**

   - Ve a Settings > Secrets and variables > Actions
   - Verifica que existan `GOOGLE_MAPS_API_KEY`, `GOOGLE_PLACE_ID_1` y `GOOGLE_PLACE_ID_2`

2. **La API Key no tiene permisos**

   - Ve a [Google Cloud Console](https://console.cloud.google.com)
   - Asegúrate de que la API Key tenga habilitada **Places API (New)**
   - Verifica que no haya restricciones de dominio/IP que bloqueen GitHub Actions

3. **Has alcanzado el límite de la API**

   - Revisa los logs del workflow en GitHub Actions
   - Verifica el uso de la API en Google Cloud Console

4. **Los Place IDs son incorrectos**
   - Verifica los Place IDs en [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
   - Asegúrate de que corresponden a las clínicas correctas

### Cómo verificar que el workflow funciona

1. Ve a tu repositorio en GitHub
2. Click en la pestaña **Actions**
3. Busca el workflow "Build & Deploy (with Google Reviews)"
4. Verifica que se esté ejecutando correctamente
5. Revisa los logs del paso "Fetch Google Reviews"

### El workflow no se ejecuta a medianoche

Verifica que:

- El workflow esté habilitado en la pestaña Actions
- El repositorio no esté archivado
- Los scheduled workflows estén habilitados en la configuración del repositorio

**Nota:** GitHub Actions puede tener un retraso de hasta 15 minutos en los cron jobs debido a la carga del sistema.

### Forzar actualización manual

Si necesitas actualizar las reseñas inmediatamente:

1. Ve a Actions > Build & Deploy (with Google Reviews)
2. Click en "Run workflow"
3. Selecciona la rama `main`
4. Click en "Run workflow"

Esto ejecutará el workflow manualmente y actualizará las reseñas de inmediato.

## Criterios de las Reseñas

El script aplica los siguientes criterios automáticamente:

- **Solo reseñas con texto**: Las reseñas sin contenido escrito se filtran automáticamente
- **Rating mínimo**: Solo se muestran reseñas de 3⭐ o más (se ocultan reseñas negativas de 1⭐ y 2⭐)
- **Ordenación inteligente**:
  1. Primero por rating (5⭐ → 4⭐ → 3⭐)
  2. Dentro de cada rating, por fecha (más recientes primero)
- **Máximo 50 reseñas por lugar** (las que cumplan los criterios)
- **En español** (languageCode=es en la API)
- **Con datos completos** (rating, texto, autor, fecha)

## Archivo de Reseñas

Las reseñas se guardan en: `content/reviews/google.json`

Estructura del archivo:

```json
{
  "last_updated": "2025-10-04T05:39:35.767Z",
  "places": [
    {
      "place_id": "ChIJ...",
      "name": "Nombre de la clínica",
      "rating": 4.6,
      "userRatingCount": 14,
      "reviews": [
        {
          "id": "ChZ...",
          "rating": 5,
          "text": "Excelente servicio...",
          "time": "2024-08-02",
          "author": "Nombre del autor",
          "author_uri": "https://...",
          "deep_link": "https://..."
        }
      ]
    }
  ]
}
```

## Contacto

Si tienes problemas con las reseñas que no puedes resolver, contacta al administrador del sistema.
