// Route API pour le formulaire de contact
// Endpoint : /api/contact

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

/**
 * POST /api/contact
 * Envoie un email à l'artisan via le formulaire de contact
 * Body : { nom, email, objet, message, artisanEmail }
 */
router.post('/',
  // Validation des champs
  [
    body('nom')
      .trim()
      .notEmpty().withMessage('Le nom est requis')
      .isLength({ min: 2, max: 100 }).withMessage('Le nom doit contenir entre 2 et 100 caractères'),
    body('email')
      .trim()
      .notEmpty().withMessage('L\'email est requis')
      .isEmail().withMessage('L\'email doit être valide'),
    body('objet')
      .trim()
      .notEmpty().withMessage('L\'objet est requis')
      .isLength({ min: 3, max: 200 }).withMessage('L\'objet doit contenir entre 3 et 200 caractères'),
    body('message')
      .trim()
      .notEmpty().withMessage('Le message est requis')
      .isLength({ min: 10, max: 2000 }).withMessage('Le message doit contenir entre 10 et 2000 caractères'),
    body('artisanEmail')
      .trim()
      .notEmpty().withMessage('L\'email de l\'artisan est requis')
      .isEmail().withMessage('L\'email de l\'artisan doit être valide')
  ],
  async (req, res) => {
    try {
      // Vérification des erreurs de validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Erreurs de validation',
          errors: errors.array()
        });
      }

      const { nom, email, objet, message, artisanEmail } = req.body;

      // Configuration du transporteur d'email (Nodemailer)
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true pour port 465, false pour les autres ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      // Configuration de l'email
      const mailOptions = {
        from: `"Trouve ton artisan" <${process.env.EMAIL_USER}>`,
        to: artisanEmail,
        replyTo: email,
        subject: `[Trouve ton artisan] ${objet}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0066cc;">Nouveau message via Trouve ton artisan</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p><strong>De :</strong> ${nom}</p>
              <p><strong>Email :</strong> ${email}</p>
              <p><strong>Objet :</strong> ${objet}</p>
            </div>
            <div style="padding: 20px; border-left: 4px solid #0066cc;">
              <p><strong>Message :</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">
              Ce message a été envoyé depuis la plateforme Trouve ton artisan - Région Auvergne-Rhône-Alpes
            </p>
          </div>
        `
      };

      // Envoi de l'email
      await transporter.sendMail(mailOptions);

      res.json({
        success: true,
        message: 'Votre message a été envoyé avec succès. L\'artisan vous répondra sous 48h.'
      });

    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

module.exports = router;
