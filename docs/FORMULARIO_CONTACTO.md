# Configuración del Formulario de Contacto

## Descripción

El formulario de contacto está configurado para enviar emails automáticamente usando **EmailJS**, un servicio gratuito que permite enviar emails desde sitios web estáticos sin necesidad de un servidor backend.

## Configuración Inicial

### Paso 1: Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita (permite hasta 200 emails/mes)
3. Verifica tu email

### Paso 2: Configurar un servicio de email

1. En el dashboard de EmailJS, ve a **Email Services**
2. Haz clic en **Add New Service**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. **Guarda el Service ID** (ejemplo: `service_abc123`)

### Paso 3: Crear un template de email

1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. Configura el template con estos campos:

**Template Name:** Contacto Clínica

**Subject:** `Nuevo contacto de {{from_name}}`

**Content (HTML):**
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #2c3e50;">
  <h2 style="color: #00a097;">Nuevo mensaje de contacto</h2>
  
  <p><strong>Nombre:</strong> {{from_name}}</p>
  <p><strong>Email:</strong> {{from_email}}</p>
  <p><strong>Teléfono:</strong> {{phone}}</p>
  
  <div style="margin-top: 20px; padding: 15px; background-color: #f7f9fa; border-left: 3px solid #00a097;">
    <strong>Mensaje:</strong><br>
    {{message}}
  </div>
  
  <p style="margin-top: 20px; font-size: 12px; color: #999;">
    Este email fue enviado desde el formulario de contacto de la web.
  </p>
</div>
```

**Configuración de Email:**
- **To Email:** `admin@clinicaborras.es`
- **From Name:** `{{from_name}}`
- **From Email:** Marca "Use Default Email Address" (usará el email del servicio)
- **Reply To:** `{{from_email}}`
- **Bcc y Cc:** Déjalos vacíos

4. **Guarda el Template ID** (ejemplo: `template_xyz789`)

### Paso 4: Obtener tu Public Key

1. Ve a **Account** → **General**
2. Copia tu **Public Key** (ejemplo: `abcdefghijklmnop`)

### Paso 5: Configurar variables de entorno

#### Para desarrollo local:

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` y rellena con tus credenciales:
   ```env
   PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
   PUBLIC_EMAILJS_SERVICE_ID=tu_service_id_aqui
   PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
   PUBLIC_EMAILJS_RECIPIENT_EMAIL=admin@clinicaborras.es
   ```

#### Para producción en GitHub Pages:

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **New repository secret** y crea estos secrets:

   - **Name:** `EMAILJS_PUBLIC_KEY` → **Value:** Tu Public Key
   - **Name:** `EMAILJS_SERVICE_ID` → **Value:** Tu Service ID
   - **Name:** `EMAILJS_TEMPLATE_ID` → **Value:** Tu Template ID
   - **Name:** `EMAILJS_RECIPIENT_EMAIL` → **Value:** `admin@clinicaborras.es`

4. El workflow de GitHub Actions ya está configurado para usar estos secrets automáticamente

## Campos del Formulario

El formulario envía los siguientes campos:
- **nombre**: Nombre del contacto
- **apellido**: Apellido del contacto
- **email**: Email del contacto (usado como remitente y para responder)
- **telefono**: Teléfono del contacto
- **mensaje**: Mensaje opcional del contacto

## Personalización del Template

Puedes personalizar el template de email en EmailJS para incluir más información o cambiar el formato. Los campos disponibles son:

- `{{from_name}}` - Nombre completo
- `{{from_email}}` - Email del contacto
- `{{phone}}` - Teléfono
- `{{message}}` - Mensaje
- `{{subject}}` - Asunto del email
- `{{reply_to}}` - Email para responder (igual que from_email)

## Límites del Plan Gratuito

- **200 emails por mes**
- Suficiente para la mayoría de clínicas pequeñas/medianas
- Si necesitas más, puedes actualizar a un plan de pago

## Seguridad y GitHub Pages

### ¿Por qué las credenciales están en el código?

**Importante:** Las variables que empiezan con `PUBLIC_` en Astro se exponen al cliente (navegador). Esto es **normal y seguro** para EmailJS porque:

1. **Public Key está diseñada para ser pública**: EmailJS usa la Public Key para autenticar peticiones, pero no permite acceso no autorizado
2. **Service ID y Template ID son públicos por diseño**: EmailJS está diseñado para funcionar desde el frontend
3. **El Private Key NO se expone**: El Private Key nunca debe estar en el código del cliente

### GitHub Secrets

Aunque las credenciales se exponen en el código compilado, usamos GitHub Secrets para:
- **Mantener las credenciales fuera del repositorio**: No se commitean en el código fuente
- **Facilitar el cambio de credenciales**: Sin necesidad de editar código
- **Mejor práctica de seguridad**: Separar configuración de código

## Solución de Problemas

### El formulario no envía emails

1. Verifica que las variables de entorno estén configuradas correctamente
2. Revisa la consola del navegador para ver errores
3. Verifica que el template de EmailJS tenga los campos correctos
4. Asegúrate de que el servicio de email esté conectado correctamente

### Error: "EmailJS no está configurado"

Esto significa que las variables de entorno no están configuradas. Sigue el Paso 5 de la configuración.

### Error: "Failed to send email"

1. Verifica que tu cuenta de EmailJS esté activa
2. Revisa que no hayas excedido el límite de emails
3. Verifica que el Service ID y Template ID sean correctos

### Variables no funcionan en producción

1. Verifica que los secrets estén configurados en GitHub
2. Revisa que los nombres de los secrets coincidan exactamente con los del workflow
3. Verifica que el workflow se ejecute correctamente

## Actualización de Credenciales

### Desarrollo local:
Edita el archivo `.env` y reinicia el servidor de desarrollo.

### Producción:
1. Actualiza los secrets en GitHub (Settings → Secrets and variables → Actions)
2. Ejecuta el workflow manualmente o haz un push a `main`
3. Los cambios se aplicarán en el próximo build
