// Middleware de sécurité pour l'API
// Protection contre les attaques courantes et vérification de la clé API

require('dotenv').config();

/**
 * Middleware de vérification de la clé API
 * Protège l'API contre les accès non autorisés
 * La clé API doit être envoyée dans le header 'x-api-key'
 */
const verifyApiKey = (req, res, next) => {
  // En développement, on peut désactiver la vérification de la clé API
  if (process.env.NODE_ENV === 'development' && !process.env.API_KEY) {
    return next();
  }

  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'Clé API manquante. Accès non autorisé.'
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      success: false,
      message: 'Clé API invalide. Accès refusé.'
    });
  }

  next();
};

/**
 * Middleware de logging des requêtes
 * Enregistre toutes les requêtes pour le suivi et le débogage
 */
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  next();
};

/**
 * Middleware de gestion des erreurs 404
 * Retourne une réponse JSON pour les routes non trouvées
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    path: req.originalUrl
  });
};

/**
 * Middleware de gestion des erreurs globales
 * Capture toutes les erreurs non gérées
 */
const errorHandler = (err, req, res, next) => {
  console.error('Erreur globale:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = {
  verifyApiKey,
  requestLogger,
  notFound,
  errorHandler
};
