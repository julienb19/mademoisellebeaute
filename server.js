require('dotenv').config();
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
console.log('PORT:', process.env.PORT);

const express = require('express');
const path = require('path');
const app = express();
const contactRouter = require('./routes/contact'); // Assurez-vous que ce chemin est correct

// Middleware pour gérer les requêtes JSON et les données URL-encodées
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Utiliser le routeur pour les routes '/contact'
app.use('/contact', contactRouter);

// Middleware pour gérer les erreurs 404 (non trouvé)
app.use((req, res, next) => {
    res.status(404).send('Page non trouvée');
});

// Middleware pour gérer les erreurs générales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erreur interne du serveur');
});

// Définir le port et démarrer le serveur
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});