// Modèle Sequelize pour la table des catégories
// Représente les 4 catégories d'artisans : Alimentation, Bâtiment, Fabrication, Services

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Categorie = sequelize.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Identifiant unique de la catégorie'
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Le nom de la catégorie ne peut pas être vide'
      },
      len: {
        args: [2, 100],
        msg: 'Le nom doit contenir entre 2 et 100 caractères'
      }
    },
    comment: 'Nom de la catégorie (ex: Alimentation, Bâtiment)'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'categories',
  comment: 'Table des catégories d\'artisans'
});

module.exports = Categorie;
