# Guía de Despliegue en Railway - autopublisher

## Paso 1: Conectar Repositorio GitHub
1. Ve a https://railway.app/project/c3b89169-4779-460c-8d94-94d5d0d1b39c
2. Click en "+ New"
3. Selecciona "Service"
4. Elige "GitHub Repo"
5. Busca y selecciona `gustavoalebettiol-web/autopublisher`
6. Click "Deploy"

Railway detectará automáticamente que tienes múltiples servicios.

## Paso 2: Configurar Servicio Backend

Cuando Railway pregunta qué desplegar:

### Opción A: Railway Auto-detectará el Dockerfile
- Railway detectará `./backend/Dockerfile` automáticamente
- **NO necesitas hacer nada especial**

### Opción B: Si necesitas configurar manualmente:
1. **Build Command**: 
   ```
   cd backend && npm install
   ```

2. **Start Command**:
   ```
   cd backend && npm start
   ```

3. **Root Directory**: `backend`

4. **Port**: `5000`

5. **Environment Variables** (en Railway Dashboard → Variables):
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://gustavoabettiol_db_user:h8qHCmdzQfej1nH2@cluster0.6anjcc1.mongodb.net/autopublisher?retryWrites=true&w=majority
   JWT_SECRET=tu_jwt_secret_aqui
   FRONTEND_URL=https://autopublisher-frontend.up.railway.app
   GITHUB_TOKEN=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
   DEEPSEEK_API_KEY=sk-420ac702b58d49d485452650abbc5589
   ```

## Paso 3: Configurar Servicio Frontend

Cuando agregues el segundo servicio:

### Opción A: Railway Auto-detectará
- Railway detectará `./frontend/Dockerfile`
- **NO necesitas hacer nada especial**

### Opción B: Si necesitas configurar manualmente:
1. **Build Command**:
   ```
   cd frontend && npm install && npm run build
   ```

2. **Start Command**:
   ```
   cd frontend && npx serve -s dist -l 3000
   ```

3. **Root Directory**: `frontend`

4. **Port**: `3000`

5. **Environment Variables**:
   ```
   NODE_ENV=production
   VITE_API_URL=https://autopublisher-backend.up.railway.app
   ```

## Paso 4: Variables de Entorno (Si Railway no auto-detecta)

En el Dashboard de Railway:
- Ve a cada servicio
- Variables → Agregar cada variable de arriba
- Click Deploy

## Paso 5: Verificar Despliegue

Una vez que ambos servicios estén corriendo (estado "Success"):

- **Backend**: Abre la URL que Railway te proporciona (ej: `https://autopublisher-backend.up.railway.app`)
- **Frontend**: Abre la URL del frontend (ej: `https://autopublisher-frontend.up.railway.app`)

## Solución de Problemas

Si algún servicio no levanta:
1. Ve a "Logs" en Railway
2. Busca mensajes de error
3. Verifica que todas las Environment Variables están correctas
4. Asegúrate de que `MONGO_URI` es accesible (MongoDB Atlas debe permitir conexiones desde cualquier IP)

## Notas Importantes

- Railway ofrece **$5 USD gratis por mes** (suficiente para este proyecto)
- Los dominios son automáticos y gratuitos
- Los logs se pueden ver en tiempo real en el Dashboard
- Para escalar o mejorar, ve a "Plan" en Railway

¡Listo! Tu autopublisher estará en vivo en pocos minutos.
