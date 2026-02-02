// Composant ArtisanCard - Carte d'artisan utilisée dans les listes
// Affiche les informations essentielles avec un lien vers la fiche complète

import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import StarRating from '../StarRating/StarRating';
import './ArtisanCard.scss';

const ArtisanCard = ({ artisan }) => {
  return (
    <Card className="artisan-card h-100 shadow-sm">
      <Link to={`/artisan/${artisan.id}`} className="text-decoration-none">
        <Card.Body>
          <Card.Title className="artisan-name">{artisan.nom}</Card.Title>
          
          <div className="artisan-rating mb-2">
            <StarRating rating={artisan.note} />
            <span className="rating-value ms-2">{parseFloat(artisan.note).toFixed(1)}/5</span>
          </div>

          <Card.Text className="artisan-speciality">
            <i className="bi bi-briefcase me-2"></i>
            {artisan.specialite?.nom}
          </Card.Text>

          <Card.Text className="artisan-location text-muted">
            <i className="bi bi-geo-alt me-2"></i>
            {artisan.ville}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ArtisanCard;
