# Clínica Dental Sada Borrás

Sitio web de la Clínica Dental Sada Borrás en Pamplona y Tafalla.

## Despliegue

Este sitio se despliega automáticamente en GitHub Pages cada vez que se hace push a la rama `main`.

**URL del sitio**: https://sadaborras.com

## Desarrollo Local

```bash
npm install

# Desarrollo con fetch automático de reseñas
npm run dev

# Desarrollo sin fetch (más rápido)
npm run dev:no-fetch
```

## Build

```bash
# Build con fetch automático de reseñas (requiere variables de entorno)
npm run build

# Build sin actualizar reseñas (usa el JSON existente)
npm run build:no-fetch
```

El sitio se construye en el directorio `dist/`.

## Reseñas de Google

El sitio muestra reseñas de Google Places API automáticamente. Las reseñas se actualizan:

- **Automáticamente cada día a las 00:00** (medianoche hora española)
- **En cada build** cuando ejecutas `npm run build`
- **Manualmente** ejecutando `npm run fetch:reviews`

### Configuración de Variables de Entorno

Para obtener las reseñas de Google, necesitas configurar las siguientes variables de entorno:

#### Localmente (archivo `.env`)

Crea un archivo `.env` en la raíz del proyecto:

```bash
GOOGLE_MAPS_API_KEY=tu_api_key_aqui
GOOGLE_PLACE_IDS=place_id_1,place_id_2
```

#### En GitHub (Secrets)

Configura los siguientes secrets en tu repositorio de GitHub (Settings > Secrets and variables > Actions):

- `GOOGLE_MAPS_API_KEY`: Tu clave de API de Google Maps
- `GOOGLE_PLACE_ID_1`: ID del primer lugar (Clínica Pamplona)
- `GOOGLE_PLACE_ID_2`: ID del segundo lugar (Clínica Tafalla)

### Obtener las IDs de los Lugares

Para obtener el Place ID de cada clínica:

1. Ve a [Google Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Busca tu clínica
3. Copia el Place ID que aparece

### Comandos Disponibles

```bash
# Obtener reseñas manualmente
npm run fetch:reviews

# Desarrollo (sin fetch automático)
npm run dev

# Build con reseñas actualizadas
npm run build

# Build sin actualizar reseñas
npm run build:no-fetch
```
