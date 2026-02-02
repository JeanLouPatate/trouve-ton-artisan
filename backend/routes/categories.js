// Routes API pour les catégories
// Endpoint : /api/categories

const express = require('express');
const router = express.Router();
const { Categorie, Specialite } = require('../models');

/**
 * GET /api/categories
 * Récupère toutes les catégories avec leurs spécialités
 * Utilisé pour alimenter le menu de navigation
 */
router.get('/', async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom']
      }],
      order: [['nom', 'ASC']]
    });

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des catégories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/categories/:id
 * Récupère une catégorie spécifique par son ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const categorie = await Categorie.findByPk(id, {
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom']
      }]
    });

    if (!categorie) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }

    res.json({
      success: true,
      data: categorie
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la catégorie:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la catégorie',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
