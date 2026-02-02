// Composant StarRating - Affichage des notes avec des étoiles
// Gère les demi-étoiles pour les notes décimales

import React from 'react';
import './StarRating.scss';

const StarRating = ({ rating, maxStars = 5 }) => {
  // Calcul du nombre d'étoiles pleines, demi-étoiles et vides
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating" role="img" aria-label={`Note: ${rating} sur ${maxStars}`}>
      {/* Étoiles pleines */}
      {[...Array(fullStars)].map((_, index) => (
        <i key={`full-${index}`} className="bi bi-star-fill text-warning"></i>
      ))}

      {/* Demi-étoile */}
      {hasHalfStar && <i className="bi bi-star-half text-warning"></i>}

      {/* Étoiles vides */}
      {[...Array(emptyStars)].map((_, index) => (
        <i key={`empty-${index}`} className="bi bi-star text-warning"></i>
      ))}
    </div>
  );
};

export default StarRating;
