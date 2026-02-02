// Modèle Sequelize pour la table des spécialités
// Chaque spécialité appartient à une catégorie (ex: Boulanger -> Alimentation)

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Specialite = sequelize.define('specialites', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Identifiant unique de la spécialité'
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Le nom de la spécialité ne peut pas être vide'
      },
      len: {
        args: [2, 100],
        msg: 'Le nom doit contenir entre 2 et 100 caractères'
      }
    },
    comment: 'Nom de la spécialité (ex: Boulanger, Plombier)'
  },
  categorie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    },
    onDelete: 'CASCADE',
    comment: 'Référence vers la catégorie parente'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'specialites',
  indexes: [
    {
      name: 'idx_categorie',
      fields: ['categorie_id']
    }
  ],
  comment: 'Table des spécialités d\'artisans'
});

module.exports = Specialite;
