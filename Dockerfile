FROM node:18-slim
WORKDIR /app

# Copiar package.json y tsconfig primero para aprovechar cache
COPY package.json tsconfig.json ./
RUN npm install --production=false

COPY . .
RUN npm run build || true

EXPOSE 3000
CMD ["node", "dist/index.js"]
