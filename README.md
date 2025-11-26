# Autopublisher 🚀

Plataforma de publicación automática en redes sociales con backend Node.js/Express, frontend React/Vite, MongoDB y scheduler.

**Estado:** ✅ MVP en producción en [Render](https://autopuplicador.onrender.com/)

## Características

- ✅ **Backend API RESTful** — Express + Mongoose
- ✅ **Autenticación JWT** — Register/Login con bcrypt
- ✅ **Base de datos** — MongoDB Atlas + fallback in-memory
- ✅ **Scheduler** — Publicación automática de posts con cron
- ✅ **Frontend** — React + Vite + Tailwind CSS + Proxy
- ✅ **Security** — Helmet, express-validator, rate limiting
- ✅ **Tests** — Jest + Supertest (auth)
- ✅ **CI/CD** — GitHub Actions + Deploy automático a Render
- ✅ **Documentación** — Guía de deploy completa

## Inicio Rápido (Local)

### Requisitos
- Node.js 18+
- MongoDB Atlas URI (o usa la opción in-memory para dev)
- npm o yarn

### 1. Clonar y instalar
```bash
git clone https://github.com/gustavoalebettiol-web/autopublisher.git
cd autopublisher
npm install
```

### 2. Configurar variables de entorno

**Backend** (`backend/.env`):
```env
NODE_ENV=development
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/autopublisher
JWT_SECRET=tu_jwt_secret_super_seguro
FRONTEND_ORIGIN=http://localhost:3000
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000
```

### 3. Instalar dependencias por carpeta
```bash
# Backend
cd backend
npm install

# Frontend (en otra terminal)
cd frontend
npm install
```

### 4. Ejecutar en desarrollo

**Terminal 1 — Backend (puerto 5000):**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend (puerto 3000):**
```bash
cd frontend
npm run dev
```

Abre http://localhost:3000 en tu navegador.

## Tests

### Ejecutar tests del backend
```bash
cd backend
npm test
```

Ejecuta tests de autenticación con Jest + Supertest usando MongoDB in-memory.

### Test manual de API
```bash
cd backend
node scripts/api-test.js
```

Registra un usuario, hace login, crea un post y valida que funciona.

## Estructura del Proyecto

```
autopublisher/
├── backend/
│   ├── app.js              # Express app
│   ├── server.js           # Server startup (await DB)
│   ├── database/
│   │   └── connection.js   # Mongoose + MongoDB connection
│   ├── routes/
│   │   ├── auth.js         # Register/Login (JWT)
│   │   └── posts.js        # Create/Get posts
│   ├── models/
│   │   ├── User.js         # Schema User
│   │   └── Post.js         # Schema Post
│   ├── jobs/
│   │   └── scheduler.js    # Cron job (publish pending posts)
│   ├── scripts/
│   │   ├── api-test.js     # Smoke test
│   │   └── test-connection.js
│   ├── tests/
│   │   └── auth.test.js    # Auth tests (Jest + Supertest)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── PostForm.jsx
│   │   │   └── PostList.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   └── App.jsx
│   ├── vite.config.mjs     # Vite config (ESM, proxy /api)
│   └── package.json
├── .github/workflows/
│   ├── ci-basic.yml        # Run tests + build
│   ├── ci-deploy.yml       # Deploy a Render
│   └── ci.yml              # Alternative CI
├── DEPLOYMENT.md           # Guía de variables env
├── RENDER_DEPLOYMENT_GUIDE.md  # Guía paso a paso Render
└── README.md
```

## Deploy en Producción (Render)

### Opción Fácil — Auto-deploy desde GitHub

1. **Crear servicios en Render:**
   - Ve a [render.com](https://render.com)
   - Crea Web Service para backend (`cd backend && npm install` → `cd backend && npm start`)
   - Crea Web Service para frontend (`cd frontend && npm install && npm run build` → `cd frontend && npx serve -s dist -l 3000`)

2. **Obtener Service IDs:**
   - Copia el Service ID de cada servicio (en Settings o en la URL)

3. **Crear API Key de Render:**
   - Ve a Render → Account → API Keys → Create API Key

4. **Añadir secrets a GitHub:**
   - Ve a Settings → Secrets and variables → Actions
   - Añade: `RENDER_API_KEY`, `RENDER_BACKEND_SERVICE_ID`, `RENDER_FRONTEND_SERVICE_ID`

5. **Hacer push:**
   ```bash
   git push
   ```
   GitHub Actions automáticamente desplegará a Render.

**Ver guía completa:** [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)

## URLs en Producción

- **Frontend:** https://autopuplicador.onrender.com
- **Backend:** https://autopuplicador-backend.onrender.com (si existe)
- **API Base:** `https://autopuplicador-backend.onrender.com/api`

## Endpoints API

### Auth
- `POST /api/auth/register` — Registrar usuario
- `POST /api/auth/login` — Login (retorna JWT)

### Posts
- `POST /api/posts` — Crear post (requiere JWT)
- `GET /api/posts` — Obtener posts (requiere JWT)

### Otros
- `GET /health` — Health check

## Seguridad

- ✅ JWT tokens con bcrypt hashing
- ✅ Helmet middleware (headers de seguridad)
- ✅ Rate limiting (express-rate-limit)
- ✅ Input validation (express-validator)
- ✅ CORS restringido a `FRONTEND_ORIGIN`
- ✅ MongoDB con whitelisting de IPs

## CI/CD

### Workflows GitHub Actions

- **ci-basic.yml** — Ejecuta tests backend + build frontend en cada push
- **ci-deploy.yml** — Deploy automático a Render cuando CI pasa

### Monitorear builds

Ve a tu repo → **Actions** → selecciona un workflow para ver logs.

## Variables de Entorno

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para lista completa de variables necesarias por ambiente.

## Solución de Problemas

### El backend no conecta a MongoDB
- Verifica que `MONGO_URI` es correcto
- Verifica que MongoDB Atlas permite conexiones desde tu IP (Network Access → Add IP)
- Para Render, añade rangos de IP de Render a la whitelist

### El frontend no se conecta al backend
- Verifica que `VITE_API_URL` apunta a la URL correcta del backend
- En desarrollo, verifica que el proxy de Vite (`vite.config.mjs`) apunta a `http://localhost:5000`

### Los tests fallan
- Verifica que `mongodb-memory-server` se instaló correctamente: `npm ls mongodb-memory-server`
- Ejecuta: `npm test -- --clearCache`

## Próximos Pasos

- [ ] Agregar pruebas E2E (Playwright/Cypress)
- [ ] Integrar providers reales (Twitter, Facebook, Instagram)
- [ ] Agregar monitoreo (Sentry, UptimeRobot)
- [ ] Dashboard de analytics
- [ ] Webhooks para proveedores

## Licencia

MIT

## Autor

Gustavo Bettiol — AI Boot Project