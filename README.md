# Clínica Dental Sada Borrás

Sitio web oficial de la Clínica Dental Sada Borrás, con presencia en Pamplona y Tafalla (Navarra, España).

## 🦷 Sobre el Proyecto

Este es el repositorio de la página web de la Clínica Dental Sada Borrás, una clínica con más de 20 años de experiencia dedicados a mejorar la salud dental de familias en Pamplona y Tafalla.

## 🚀 Stack Tecnológico

- **Framework**: Astro
- **Lenguaje**: TypeScript
- **Estilos**: CSS moderno (CSS Grid, Flexbox, Variables CSS)
- **Metodología**: Clean Code, SOLID principles
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## 🔄 Actualización Automática de Reseñas

El sitio se actualiza automáticamente con las reseñas de Google Places mediante GitHub Actions:

> **🌐 URL del sitio**: `https://sadaborras.com`
>
> El proyecto está configurado para GitHub Pages **con dominio personalizado**. La configuración de `astro.config.mjs` usa `base: "/"` para el dominio raíz.

### Frecuencia de Actualización

- **En cada push a `main`**: Deploy automático inmediato
- **Manualmente**: Ejecutando el workflow desde Actions → "Build & Deploy"
- **Diariamente a medianoche**: Cron automático a las 00:00 hora de Madrid (CET/CEST)

### Configuración de Secrets

Para que funcione la integración con Google Places API, necesitas configurar estos secrets en el repositorio:

1. Ve a **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

2. Crea los siguientes secrets:

#### `GOOGLE_MAPS_API_KEY`

Tu clave de API de Google Cloud con acceso a Places API (New) v1:

- Crea/obtén la clave en [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- **Importante**: Restringe la clave solo a **Places API (New)**
- **Recomendado**: Añade restricciones de IP/HTTP referrer para producción

#### `GOOGLE_PLACE_ID_1` y `GOOGLE_PLACE_ID_2`

Los `place_id` de las ubicaciones de la clínica (un secret por clínica):

- `GOOGLE_PLACE_ID_1`: place_id de Pamplona
- `GOOGLE_PLACE_ID_2`: place_id de Tafalla

**¿Cómo obtener un `place_id`?**

1. Busca tu negocio en [Google Maps](https://www.google.com/maps)
2. Copia la URL (ej: `https://www.google.com/maps/place/.../@xxx,yyy,zzz/...`)
3. Usa la [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder) de Google
4. O extrae directamente de la URL tras `/@` y antes de `/data=`

**Ejemplo:**

- `GOOGLE_PLACE_ID_1`: `ChIJxxx...` (Pamplona)
- `GOOGLE_PLACE_ID_2`: `ChIJyyy...` (Tafalla)

### Funcionamiento del Pipeline

1. **Fetch**: El workflow ejecuta `scripts/fetch-google-reviews.mjs` que descarga las últimas reseñas y las guarda en `content/reviews/google.json` (en memoria, sin commitear)
2. **Build**: Astro construye el sitio estático con las reseñas frescas incluidas
3. **Deploy**: GitHub Pages publica automáticamente el sitio actualizado

**Nota**: Las reseñas NO se commitean al repositorio, son efímeras y se regeneran en cada build. Esto evita contaminación del historial y problemas de permisos.

### Verificación

Después de configurar los secrets:

1. Ve a **Actions** → **Build & Deploy (with Google Reviews)**
2. Click en **Run workflow** → **Run workflow**
3. Verifica en los logs:
   - ✅ "Fetch Google Reviews" debe completarse sin errores
   - ✅ "Upload artifact" sube `dist` correctamente
   - ✅ "Deploy to GitHub Pages" publica exitosamente

### Troubleshooting

**❌ "GOOGLE_MAPS_API_KEY no está configurada"**

→ Verifica que el secret exista y esté bien nombrado (sin typos)

**❌ "GOOGLE_PLACE_ID_1 o GOOGLE_PLACE_ID_2 no están configurados"**

→ Añade los secrets con los place_id de cada clínica

**❌ Reseñas no aparecen en el sitio**

→ Revisa los logs del step "Fetch Google Reviews" en Actions

**❌ Assets no cargan (404)**

→ Verifica que el `base: "/"` en `astro.config.mjs` sea correcto para tu dominio

## 📞 Información de Contacto

### Pamplona

- **Dirección**: Avenida Pío XII, 8, bajo - 31008 Pamplona
- **Teléfono**: 948 172 617
- **Móvil**: 683 438 077
- **Email**: admin@clinicaborras.es

### Tafalla

- **Dirección**: Diputación Foral, 2 - 2º C y D - 31300 Tafalla
- **Teléfono**: 948 702 057
- **Email**: tafalla@clinicasadaborras.com

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Desarrollo con fetch automático de reseñas (http://localhost:4321)
npm run dev

# Desarrollo sin fetch (más rápido)
npm run dev:no-fetch

# Build de producción (actualiza reseñas automáticamente)
npm run build

# Build sin actualizar reseñas (más rápido)
npm run build:no-fetch

# Obtener reseñas de Google manualmente
npm run fetch:reviews

# Preview del build
npm run preview
```

### Variables de Entorno para Desarrollo Local

Para actualizar las reseñas localmente, crea un archivo `.env` en la raíz:

```bash
GOOGLE_MAPS_API_KEY=tu_api_key_aqui
GOOGLE_PLACE_IDS=place_id_1,place_id_2
```

Ver [docs/RESEÑAS.md](docs/RESEÑAS.md) para más información sobre la gestión de reseñas.

---

© 2025 Clínica Dental Sada Borrás. Todos los derechos reservados.
