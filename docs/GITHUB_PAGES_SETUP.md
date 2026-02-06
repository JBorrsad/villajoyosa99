# Guía de Configuración de GitHub Pages

## Pasos para hacer funcionar tu sitio en GitHub Pages

### 1. Habilitar GitHub Pages en el repositorio

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, busca **Pages** (Páginas)
4. En **Source** (Fuente), selecciona:
   - **Source**: `GitHub Actions` (no "Deploy from a branch")
5. Guarda los cambios

### 2. Verificar la configuración del repositorio

**Si tu repositorio se llama `villajoyosa99` y es un repositorio de proyecto** (no el repositorio principal de tu usuario), necesitas cambiar el `base` en `astro.config.mjs`:

```javascript
base: "/villajoyosa99/",  // Si el repo es github.com/tu-usuario/villajoyosa99
```

**Si es tu repositorio principal** (github.com/tu-usuario/tu-usuario.github.io) o **tienes un dominio personalizado**, deja:

```javascript
base: "/",  // Para dominio raíz o repositorio principal
```

### 3. Verificar que el workflow esté funcionando

1. Ve a la pestaña **Actions** en tu repositorio
2. Deberías ver el workflow "Build & Deploy (with Google Reviews)"
3. Si hay errores, haz click en el workflow fallido para ver los logs

### 4. Configurar Secrets (si es necesario)

Si el workflow falla al obtener reseñas de Google, configura estos secrets en **Settings** → **Secrets and variables** → **Actions**:

- `GOOGLE_MAPS_API_KEY`
- `GOOGLE_PLACE_ID_1`
- `GOOGLE_PLACE_ID_2`

**Nota**: Si no tienes estos secrets, el workflow seguirá funcionando pero saltará el paso de fetch de reseñas.

### 5. Ejecutar el workflow manualmente

1. Ve a **Actions** → **Build & Deploy (with Google Reviews)**
2. Click en **Run workflow** → **Run workflow**
3. Espera a que termine (puede tardar 2-5 minutos)
4. Una vez completado, tu sitio debería estar disponible

### 6. Verificar la URL de tu sitio

Después del deploy exitoso, tu sitio estará disponible en:

- **Si es repositorio principal**: `https://tu-usuario.github.io`
- **Si es repositorio de proyecto**: `https://tu-usuario.github.io/villajoyosa99`
- **Si tienes dominio personalizado**: La URL que configuraste

### 7. Solución de problemas comunes

#### ❌ "404 Not Found" después del deploy

**Solución**: Verifica el `base` en `astro.config.mjs`. Si tu repositorio NO es el principal, debe ser `"/nombre-repositorio/"`

#### ❌ El workflow falla en "Build Astro site"

**Solución**: 
- Verifica que `package.json` tenga todas las dependencias
- Revisa los logs del workflow para ver el error específico

#### ❌ Los assets (imágenes, CSS) no cargan

**Solución**: 
- Verifica que el `base` esté correcto
- Asegúrate de que las rutas en el código usen rutas relativas o la función `asset()`

#### ❌ GitHub Pages no muestra nada

**Solución**:
1. Verifica que GitHub Pages esté habilitado (Settings → Pages)
2. Verifica que el workflow haya completado exitosamente
3. Espera 1-2 minutos después del deploy (puede haber un delay)

### 8. Verificar el estado del deploy

1. Ve a **Settings** → **Pages**
2. Deberías ver "Your site is live at..." con la URL
3. Si no aparece, el workflow puede no haber completado o haber fallado

## Checklist rápido

- [ ] GitHub Pages habilitado en Settings → Pages (Source: GitHub Actions)
- [ ] Workflow ejecutado y completado exitosamente
- [ ] `base` en `astro.config.mjs` correcto según tu tipo de repositorio
- [ ] Secrets configurados (opcional, solo si usas reseñas de Google)
- [ ] Esperado 1-2 minutos después del deploy para que el sitio esté disponible
