# Utilisez une version plus récente de l'image Node.js
FROM node:16

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Installe Angular CLI
RUN npm install -g @angular/cli

# Copie le reste de l'application
COPY . .

# Construit l'application en mode production
RUN ng build --configuration=production

# Expose le port
EXPOSE 4200
