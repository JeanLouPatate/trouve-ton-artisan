// Fichier principal des modèles - Définit les relations entre les tables
// Relations : Catégorie -> Spécialité -> Artisan

const Categorie = require('./Categorie');
const Specialite = require('./Specialite');
const Artisan = require('./Artisan');

// Définition des relations entre les modèles

// Une catégorie a plusieurs spécialités
Categorie.hasMany(Specialite, {
  foreignKey: 'categorie_id',
  as: 'specialites',
  onDelete: 'CASCADE'
});

// Une spécialité appartient à une catégorie
Specialite.belongsTo(Categorie, {
  foreignKey: 'categorie_id',
  as: 'categorie'
});

// Une spécialité a plusieurs artisans
Specialite.hasMany(Artisan, {
  foreignKey: 'specialite_id',
  as: 'artisans',
  onDelete: 'CASCADE'
});

// Un artisan appartient à une spécialité
Artisan.belongsTo(Specialite, {
  foreignKey: 'specialite_id',
  as: 'specialite'
});

// Export de tous les modèles avec leurs relations
module.exports = {
  Categorie,
  Specialite,
  Artisan
};
