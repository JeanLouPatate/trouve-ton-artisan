// Configuration de la connexion à la base de données MySQL avec Sequelize
// Gestion sécurisée des informations sensibles via variables d'environnement

require('dotenv').config();
const { Sequelize } = require('sequelize');

// Création de l'instance Sequelize avec les paramètres de connexion
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    
    // Options de logging
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    
    // Pool de connexions pour optimiser les performances
    pool: {
      max: 5,           // Nombre maximum de connexions
      min: 0,           // Nombre minimum de connexions
      acquire: 30000,   // Temps max (ms) pour obtenir une connexion
      idle: 10000       // Temps max (ms) avant de fermer une connexion inactive
    },
    
    // Options de sécurité
    define: {
      timestamps: true,         // Active created_at et updated_at
      underscored: false,       // Utilise camelCase pour les noms
      freezeTableName: true     // Empêche Sequelize de pluraliser les noms de tables
    },
    
    // Timezone
    timezone: '+01:00'
  }
);

// Test de la connexion à la base de données
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à MySQL réussie !');
  } catch (error) {
    console.error('❌ Erreur de connexion à MySQL:', error.message);
    process.exit(1); // Arrête le serveur si la connexion échoue
  }
};

module.exports = { sequelize, testConnection };
