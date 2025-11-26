# Autopublisher AI Boot

Scaffold de un aut publicador en redes sociales (TypeScript). Contiene la estructura básica para empezar a implementar providers (Twitter/X, Facebook, Instagram), scheduler y CLI.

Pasos rápidos:

- Copia `.env.example` a `.env` y llena las credenciales.
- Instala dependencias: `npm install`.
- En desarrollo: `npm run dev` (usa `ts-node`).
- Para build: `npm run build` y `npm start`.

Estructura creada:

- `src/` - código TypeScript
- `src/publisher/` - interfaz y base publisher
- `src/providers/` - stubs de providers
- `src/scheduler.ts` - programa publicaciones periódicas (placeholder)

Siguientes pasos recomendados:

1. Implementar providers con autenticación y llamadas reales a APIs.
2. Añadir persistencia (cola, base de datos) para posts programados.
3. Añadir tests unitarios y CI (GitHub Actions).