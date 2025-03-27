# Utilise une image Node officielle (ici la version 18 sur Alpine pour une image légère)
FROM node:18-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie uniquement les fichiers de dépendances pour profiter du cache Docker
COPY package*.json ./

# Installe les dépendances de l’application
RUN npm install

# Copie le reste du code source dans le conteneur
COPY . .

# Expose le port utilisé par l’application (ici 3000, à adapter si nécessaire)
EXPOSE 3000

# Définit la commande de démarrage de l’application
CMD ["npm", "start"]
