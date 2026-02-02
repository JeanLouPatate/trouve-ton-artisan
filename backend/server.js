// Serveur Express principal pour l'API "Trouve ton artisan"
// Point d'entrée de l'application backend

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { testConnection } = require('./config/database');
const { requestLogger, notFound, errorHandler } = require('./middleware/security');

// Import des routes
const categoriesRoutes = require('./routes/categories');
const artisansRoutes = require('./routes/artisans');
const contactRoutes = require('./routes/contact');

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 5000;

// ========================
// MIDDLEWARES DE SÉCURITÉ
// ========================

// Helmet : Protection contre les vulnérabilités web courantes
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  },
  hsts: {
    maxAge: 31536000, // 1 an
    includeSubDomains: true,
    preload: true
  }
}));

// CORS : Autorisation des requêtes depuis le frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

// Rate limiting : Limite le nombre de requêtes par IP
//const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum 100 requêtes par fenêtre
  message: {
    success: false,
    message: 'Trop de requêtes. Veuillez réessayer dans 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
//app.use('/api/', limiter);

// Rate limiting spécifique pour le formulaire de contact
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5, // Maximum 5 emails par heure
  message: {
    success: false,
    message: 'Trop de messages envoyés. Veuillez réessayer dans une heure.'
  }
});
app.use('/api/contact', contactLimiter);

// Parsing du body JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logger personnalisé
app.use(requestLogger);

// ========================
// ROUTES DE L'API
// ========================

// Route de santé (health check)
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API "Trouve ton artisan" opérationnelle',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes principales
app.use('/api/categories', categoriesRoutes);
app.use('/api/artisans', artisansRoutes);
app.use('/api/contact', contactRoutes);

// Route racine
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bienvenue sur l\'API Trouve ton artisan - Région Auvergne-Rhône-Alpes',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      categories: '/api/categories',
      artisans: '/api/artisans',
      artisansDuMois: '/api/artisans/top',
      contact: '/api/contact'
    }
  });
});

// ========================
// GESTION DES ERREURS
// ========================

// Route 404 - Non trouvée
app.use(notFound);

// Gestion globale des erreurs
app.use(errorHandler);

// ========================
// DÉMARRAGE DU SERVEUR
// ========================

const startServer = async () => {
  try {
    // Test de la connexion à la base de données
    await testConnection();

    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log('========================================');
      console.log('🚀 Serveur démarré avec succès !');
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
      console.log('========================================');
      console.log('Endpoints disponibles :');
      console.log(`  GET  http://localhost:${PORT}/health`);
      console.log(`  GET  http://localhost:${PORT}/api/categories`);
      console.log(`  GET  http://localhost:${PORT}/api/artisans`);
      console.log(`  GET  http://localhost:${PORT}/api/artisans/top`);
      console.log(`  GET  http://localhost:${PORT}/api/artisans/:id`);
      console.log(`  POST http://localhost:${PORT}/api/contact`);
      console.log('========================================');
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Démarrage
startServer();

// Gestion propre de l'arrêt du serveur
process.on('SIGTERM', () => {
  console.log('SIGTERM reçu, arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT reçu, arrêt du serveur...');
  process.exit(0);
});
