**Despliegue rápido — Guía**

- **Resumen:** El repositorio contiene imágenes Docker para frontend y backend. El workflow `ci-deploy.yml` construye y publica imágenes a GitHub Container Registry (GHCR) cuando haces push a `main`/`master`.

- **Requisitos previos:**
  - Tener el repositorio en GitHub.
  - Activar GitHub Actions (por defecto en repositorios públicos/privados).

- **Variables/Secrets:**
  - Para publicar en GHCR no necesitas secretos adicionales si usas `GITHUB_TOKEN` (ya incluido por Actions).
  - Para desplegar en un servicio como Render, Heroku o un VPS, necesitarás añadir las variables de entorno de producción (`MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`) en la plataforma destino.
  - Para el despliegue automático a Render, añade estos secrets en GitHub (Repo Settings > Secrets):
    - `RENDER_API_KEY`: tu API key de Render (create in Render dashboard - Account > API Keys).
    - `RENDER_BACKEND_SERVICE_ID`: el service ID del servicio backend en Render (ver detalles del servicio en la UI).
    - `RENDER_FRONTEND_SERVICE_ID`: el service ID del servicio frontend en Render.

  Cómo obtener el Service ID en Render: abre el servicio en la consola de Render, haz click en "Settings" y copia el campo `Service ID` (o mira la URL que contiene `services/<ID>`).

- **Opciones de despliegue:**
  1. **Render / Railway / Heroku (Backend)**
     - Crea un nuevo servicio Web y elige "Docker" o conectar con GitHub repo.
     - Si usas Docker image (GHCR), configura Render para usar la imagen `ghcr.io/<owner>/<repo>/autopublisher-backend:latest`.
     - Configura variables de entorno en la plataforma: `MONGO_URI`, `JWT_SECRET`, `PORT`.

  2. **Vercel / Netlify (Frontend)**
     - Conecta el repo a Vercel/Netlify y apunta al directorio `frontend`.
     - Build command: `npm ci && npm run build` (o `npm run build` si ya instalaste deps).
     - Output dir: `dist`.

  3. **Despliegue manual con Docker Compose (VPS)**
     - Sube el repo al servidor, crea archivo `.env` con variables.
     - Ejecuta `docker-compose up -d --build` (modifica `docker-compose.yml` para usar las imágenes públicas o locales).

- **Notas de seguridad:**
  - Nunca subas `backend/.env` con credenciales a un repo público.
  - Usa secretos/provisión de variables en la plataforma de despliegue.

Si quieres, configuro el workflow para desplegar automáticamente a Render o puedo darte pasos concretos para conectarlo a Vercel/Render y completar el proceso.
