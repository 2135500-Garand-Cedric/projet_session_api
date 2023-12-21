Procédure d'installation de l'api sur un poste local:
1. Cloner le repo github
2. Ouvrir dans Visual Studio Code
3. Ouvrir un terminal à la racine du projet
4. Lancer la commande "npm install" pour installer les dépendances du projet
5. Pour utiliser la bd qui est installé sur un poste local (optionnel):
    1. Voir la procédure d'installation de la bd mongoDB sur un poste local
    2. Aller dans le fichier /env/development.env
    3. Mettre en commentaire la ligne sous "## Connexion a MongoDB Atlas ##"
    4. Enlever le commentaire de la ligne sous "## Connexion a la bd sur un poste local ##"
6. Lancer la commande "npm run dev" pour lancer l'api
7. La documentation des routes de l'api peut être accédé à l'adresse "http://127.0.0.1:3000/"

Procédure d'installation de la base de données mongoDB sur un poste local:
1. Ouvrir mongoDB Compass
2. Se connecter à l'url "mongodb://localhost:27017"
3. Appuyer sur le + à côté "Databases" pour ajouter une nouvelle bd
4. Entrer "projet-session" pour le nom de la bd et "etudiants" pour le nom de la collection
5. Ouvrir la collection créée
6. Appuyer sur "ADD DATA" puis sur "Import JSON"
7. Choisir le fichier "etudiants.json" qui est dans le dossier "dev"

Url de l'api en ligne: https://api-web3.netlify.app/
Elle ne marche pas donc pour utiliser l'application, il faut avoir installé l'api en local