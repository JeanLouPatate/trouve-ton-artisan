// Service API - Gère toutes les requêtes HTTP vers le backend
// Utilise Axios pour les appels API

import axios from 'axios';
import API_CONFIG from '../config/api';

// Configuration d'Axios
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS
});

// Intercepteur de réponse pour gérer les erreurs globalement
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erreur API:', error);
    return Promise.reject(error);
  }
);

/**
 * Service API pour les catégories
 */
export const categoriesAPI = {
  /**
   * Récupère toutes les catégories avec leurs spécialités
   */
  getAll: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des catégories');
    }
  },

  /**
   * Récupère une catégorie par son ID
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération de la catégorie');
    }
  }
};

/**
 * Service API pour les artisans
 */
export const artisansAPI = {
  /**
   * Récupère tous les artisans avec filtres optionnels
   * @param {Object} params - Paramètres de recherche { categorie, search }
   */
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/artisans', { params });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des artisans');
    }
  },

  /**
   * Récupère les 3 artisans du mois
   */
  getTop: async () => {
    try {
      const response = await api.get('/artisans/top');
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des artisans du mois');
    }
  },

  /**
   * Récupère un artisan par son ID
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/artisans/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération de l\'artisan');
    }
  }
};

/**
 * Service API pour le formulaire de contact
 */
export const contactAPI = {
  /**
   * Envoie un message à un artisan
   * @param {Object} formData - { nom, email, objet, message, artisanEmail }
   */
  sendMessage: async (formData) => {
    try {
      const response = await api.post('/contact', formData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.errors) {
        throw error.response.data.errors;
      }
      throw new Error('Erreur lors de l\'envoi du message');
    }
  }
};

export default api;
