# Étape 1 : build avec Vite
FROM node:24 AS builder

WORKDIR /app

COPY . .

WORKDIR /app/V4_bento

RUN npm install
RUN npm run build

# Étape 2 : serveur avec http-server
FROM node:24

WORKDIR /app

# Installer http-server globalement
RUN npm install -g http-server

# Copier uniquement les fichiers buildés
COPY --from=builder /app/V4_bento/dist /app

EXPOSE 5000

CMD ["http-server", "-p", "5000", "-c-1", "."]
