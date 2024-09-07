const nodemailer = require('nodemailer');

// Configurez le transporteur de mail en utilisant les informations de .env
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Fonction pour envoyer l'email
function sendEmail(to, subject, text, callback) {
    console.log('Préparation à l\'envoi de l\'email...');
    console.log('Destinataire:', to);
    console.log('Sujet:', subject);
    console.log('Message:', text);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            return callback(error);
        }
        console.log('E-mail envoyé:', info.response);
        callback(null, info);
    });
}

module.exports = sendEmail;