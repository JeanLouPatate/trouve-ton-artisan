// Configuration de l'API
// Centralise l'URL de base de l'API et les clés d'accès

const API_CONFIG = {
  // URL de base de l'API
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  // Clé API (pour la sécurité)
  API_KEY: process.env.REACT_APP_API_KEY || '',
  
  // Timeout pour les requêtes (en ms)
  TIMEOUT: 10000,
  
  // Headers par défaut
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY || ''
  }
};

export default API_CONFIG;
