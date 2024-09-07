const express = require('express');
const router = express.Router();
const sendEmail = require('../mailers'); // Assurez-vous que ce chemin est correct

router.post('/', (req, res) => {
    const { lastname, firstname, email, subject, message } = req.body;

    console.log('Requête reçue avec les données :', req.body);

    if (!lastname || !firstname || !email || !subject || !message) {
        return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    sendEmail(email, subject, message, (error, response) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
        }
        res.json({ message: 'E-mail envoyé avec succès' });
    });
});

module.exports = router;