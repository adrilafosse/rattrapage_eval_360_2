# Utilisez une image de Node.js comme base
FROM node:latest AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et le package-lock.json pour installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application Angular
RUN npm run build --prod

# Utiliser une image légère d'nginx pour servir l'application construite
FROM nginx:alpine

# Copier les fichiers de l'application construite dans le répertoire d'hébergement d'nginx
COPY --from=build /app/dist/your-angular-app /usr/share/nginx/html

# Exposer le port 80 pour que l'application soit accessible depuis l'extérieur
EXPOSE 80

# Commande à exécuter lorsque le conteneur démarre
CMD ["nginx", "-g", "daemon off;"]
