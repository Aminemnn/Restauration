const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: "medmnedla@outlook.com",
        pass: "amine12345",
    },
});

module.exports.sendConfirmationEmail = (email , activationcode) => {
    transport.sendMail({
        from: 'medmnedla@outlook.com',
        to: email,
        subject: "Confirmer votre email",
        html: `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                        color: #333;
                    }
                    h2 {
                        color: #333;
                    }
                    p {
                        margin-bottom: 15px;
                    }
                    .verification-code {
                        font-weight: bold;
                        font-size: 1.2em;
                    }
                </style>
            </head>
            <body>
                <h2>Confirmation d'email</h2>
                <p>Bonjour,</p>
                <p>Nous sommes ravis de vous accueillir dans notre communauté ! Pour finaliser votre inscription et confirmer votre adresse e-mail, veuillez saisir le code de vérification ci-dessous :</p>
                <p class="verification-code">Code de vérification : ${activationcode}</p>
                <p>Si vous n'avez pas demandé cette vérification, veuillez ignorer ce message.</p>
                <p>Merci de rejoindre [Nom de votre entreprise/plateforme].</p>
                <p>Cordialement,<br/>[Votre nom ou nom de l'entreprise]</p>
            </body>
        </html>
    `

    })
    .then(info => {
        console.log(`Email envoyé avec succès a : ${email}`);
    })
    .catch(err => {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', err);
    });
}