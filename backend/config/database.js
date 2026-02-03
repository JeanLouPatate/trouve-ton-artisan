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
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    
    // Options de sécurité
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
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
    process.exit(1);
  }
};

// Synchroniser les modèles avec la base de données (crée les tables automatiquement)
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Tables créées/synchronisées avec succès !');
  } catch (error) {
    console.error('❌ Erreur de synchronisation:', error.message);
  }
};

module.exports = { sequelize, testConnection, syncDatabase };