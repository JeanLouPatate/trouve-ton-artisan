// Modèle Sequelize pour la table des artisans
// Contient toutes les informations des artisans de la région

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Artisan = sequelize.define('artisans', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Identifiant unique de l\'artisan'
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Le nom de l\'artisan ne peut pas être vide'
      },
      len: {
        args: [2, 255],
        msg: 'Le nom doit contenir entre 2 et 255 caractères'
      }
    },
    comment: 'Nom de l\'artisan ou de l\'entreprise'
  },
  specialite_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'specialites',
      key: 'id'
    },
    onDelete: 'CASCADE',
    comment: 'Référence vers la spécialité de l\'artisan'
  },
  note: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'La note doit être supérieure ou égale à 0'
      },
      max: {
        args: [5],
        msg: 'La note doit être inférieure ou égale à 5'
      }
    },
    comment: 'Note sur 5 étoiles'
  },
  ville: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La ville ne peut pas être vide'
      }
    },
    comment: 'Ville où se trouve l\'artisan'
  },
  a_propos: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Description de l\'artisan et de ses services'
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'L\'adresse email doit être valide'
      }
    },
    comment: 'Email de contact de l\'artisan'
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'L\'URL du site web doit être valide'
      }
    },
    comment: 'Site web de l\'artisan (optionnel)'
  },
  top: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Indique si l\'artisan est mis en avant (artisan du mois)'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'artisans',
  indexes: [
    {
      name: 'idx_specialite',
      fields: ['specialite_id']
    },
    {
      name: 'idx_nom',
      fields: ['nom']
    },
    {
      name: 'idx_top',
      fields: ['top']
    },
    {
      name: 'idx_note',
      fields: ['note']
    }
  ],
  comment: 'Table des artisans de la région'
});

module.exports = Artisan;
