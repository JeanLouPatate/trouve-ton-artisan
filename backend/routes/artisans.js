// Routes API pour les artisans
// Endpoint : /api/artisans

const express = require('express');
const router = express.Router();
const { Artisan, Specialite, Categorie } = require('../models');
const { Op } = require('sequelize');

/**
 * GET /api/artisans
 * Récupère tous les artisans avec filtres optionnels
 * Query params : 
 * - categorie : ID de la catégorie
 * - search : Recherche par nom
 */
router.get('/', async (req, res) => {
  try {
    const { categorie, search } = req.query;
    
    // Construction des conditions de recherche
    let whereClause = {};
    let includeClause = [{
      model: Specialite,
      as: 'specialite',
      attributes: ['id', 'nom', 'categorie_id'],
      include: [{
        model: Categorie,
        as: 'categorie',
        attributes: ['id', 'nom']
      }]
    }];

    // Filtre par recherche (nom de l'artisan)
    if (search) {
      whereClause.nom = {
        [Op.like]: `%${search}%`
      };
    }

    // Filtre par catégorie
    if (categorie) {
      includeClause[0].where = { categorie_id: categorie };
      includeClause[0].required = true;
    }

    const artisans = await Artisan.findAll({
      where: whereClause,
      include: includeClause,
      order: [['note', 'DESC'], ['nom', 'ASC']]
    });

    res.json({
      success: true,
      count: artisans.length,
      data: artisans
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des artisans:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des artisans',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/artisans/top
 * Récupère les 3 artisans du mois (top = true)
 * Utilisé pour la page d'accueil
 */
router.get('/top', async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top: true },
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom'],
        include: [{
          model: Categorie,
          as: 'categorie',
          attributes: ['id', 'nom']
        }]
      }],
      limit: 3,
      order: [['note', 'DESC']]
    });

    res.json({
      success: true,
      count: artisans.length,
      data: artisans
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des artisans du mois:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des artisans du mois',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/artisans/:id
 * Récupère un artisan spécifique par son ID
 * Utilisé pour la page fiche artisan
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const artisan = await Artisan.findByPk(id, {
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom'],
        include: [{
          model: Categorie,
          as: 'categorie',
          attributes: ['id', 'nom']
        }]
      }]
    });

    if (!artisan) {
      return res.status(404).json({
        success: false,
        message: 'Artisan non trouvé'
      });
    }

    res.json({
      success: true,
      data: artisan
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'artisan:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'artisan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
