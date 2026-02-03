// Script pour insérer les données initiales
require('dotenv').config();
const { Categorie, Specialite, Artisan } = require('./models');
const { sequelize } = require('./config/database');

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion réussie');

    // Catégories
    const categories = await Categorie.bulkCreate([
      { nom: 'Alimentation' },
      { nom: 'Bâtiment' },
      { nom: 'Fabrication' },
      { nom: 'Services' }
    ], { ignoreDuplicates: true });
    console.log('✅ Catégories créées');

    // Spécialités
    const specialites = await Specialite.bulkCreate([
      { nom: 'Boucher', categorie_id: 1 },
      { nom: 'Boulanger', categorie_id: 1 },
      { nom: 'Chocolatier', categorie_id: 1 },
      { nom: 'Traiteur', categorie_id: 1 },
      { nom: 'Chauffagiste', categorie_id: 2 },
      { nom: 'Electricien', categorie_id: 2 },
      { nom: 'Menuisier', categorie_id: 2 },
      { nom: 'Plombier', categorie_id: 2 },
      { nom: 'Bijoutier', categorie_id: 3 },
      { nom: 'Couturier', categorie_id: 3 },
      { nom: 'Ferronier', categorie_id: 3 },
      { nom: 'Coiffeur', categorie_id: 4 },
      { nom: 'Fleuriste', categorie_id: 4 },
      { nom: 'Toiletteur', categorie_id: 4 },
      { nom: 'Webdesign', categorie_id: 4 }
    ], { ignoreDuplicates: true });
    console.log('✅ Spécialités créées');

    // Artisans
    await Artisan.bulkCreate([
      { nom: 'Boucherie Dumont', specialite_id: 1, note: 4.5, ville: 'Lyon', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'boucherie.dumond@gmail.com', site_web: null, top: false },
      { nom: 'Au pain chaud', specialite_id: 2, note: 4.8, ville: 'Montélimar', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'aupainchaud@hotmail.com', site_web: null, top: true },
      { nom: 'Chocolaterie Labbé', specialite_id: 3, note: 4.9, ville: 'Lyon', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'chocolaterie-labbe@gmail.com', site_web: 'https://chocolaterie-labbe.fr', top: true },
      { nom: 'Traiteur Truchon', specialite_id: 4, note: 4.1, ville: 'Lyon', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'contact@truchon-traiteur.fr', site_web: 'https://truchon-traiteur.fr', top: false },
      { nom: 'Orville Salmons', specialite_id: 5, note: 5.0, ville: 'Evian', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'o-salmons@live.com', site_web: null, top: true },
      { nom: 'Mont Blanc Eléctricité', specialite_id: 6, note: 4.5, ville: 'Chamonix', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'contact@mont-blanc-electricite.com', site_web: 'https://mont-blanc-electricite.com', top: false },
      { nom: 'Boutot & fils', specialite_id: 7, note: 4.7, ville: 'Bourg-en-bresse', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'boutot-menuiserie@gmail.com', site_web: 'https://boutot-menuiserie.com', top: false },
      { nom: 'Vallis Bellemare', specialite_id: 8, note: 4.0, ville: 'Vienne', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'v.bellemare@gmail.com', site_web: 'https://plomberie-bellemare.com', top: false },
      { nom: 'Claude Quinn', specialite_id: 9, note: 4.2, ville: 'Aix-les-bains', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'claude.quinn@gmail.com', site_web: null, top: false },
      { nom: 'Amitee Lécuyer', specialite_id: 10, note: 4.5, ville: 'Annecy', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'a.amitee@hotmail.com', site_web: 'https://lecuyer-couture.com', top: false },
      { nom: 'Ernest Carignan', specialite_id: 11, note: 5.0, ville: 'Le Puy-en-Velay', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'e-carigan@hotmail.com', site_web: null, top: false },
      { nom: 'Royden Charbonneau', specialite_id: 12, note: 3.8, ville: 'Saint-Priest', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'r.charbonneau@gmail.com', site_web: null, top: false },
      { nom: 'Leala Dennis', specialite_id: 12, note: 3.8, ville: 'Chambéry', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'l.dennos@hotmail.fr', site_web: 'https://coiffure-leala-chambery.fr', top: false },
      { nom: 'C\'est sup\'hair', specialite_id: 12, note: 4.1, ville: 'Romans-sur-Isère', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'sup-hair@gmail.com', site_web: 'https://sup-hair.fr', top: false },
      { nom: 'Le monde des fleurs', specialite_id: 13, note: 4.6, ville: 'Annonay', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'contact@le-monde-des-fleurs-annonay.fr', site_web: 'https://le-monde-des-fleurs-annonay.fr', top: false },
      { nom: 'Valérie Laderoute', specialite_id: 14, note: 4.5, ville: 'Valence', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'v-laredoute@gmail.com', site_web: null, top: false },
      { nom: 'CM Graphisme', specialite_id: 15, note: 4.4, ville: 'Valence', a_propos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'contact@cm-graphisme.com', site_web: 'https://cm-graphisme.com', top: false }
    ], { ignoreDuplicates: true });
    console.log('✅ Artisans créés');
    console.log('🎉 Base de données peuplée avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

seedDatabase();