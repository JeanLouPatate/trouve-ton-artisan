// Page NotFound - Page 404 personnalisée
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import './NotFound.scss';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page non trouvée - Trouve ton artisan</title>
        <meta name="description" content="La page que vous recherchez n'existe pas" />
      </Helmet>

      <div className="not-found-page">
        <Container className="text-center py-5">
          <div className="error-icon mb-4">
            <i className="bi bi-exclamation-triangle"></i>
          </div>
          
          <h1 className="error-code">404</h1>
          <h2 className="error-title mb-3">Page non trouvée</h2>
          
          <p className="error-message mb-4">
            Désolé, la page que vous avez demandée n'existe pas ou a été déplacée.
          </p>

          <Button as={Link} to="/" variant="primary" size="lg">
            <i className="bi bi-house-door me-2"></i>
            Retour à l'accueil
          </Button>
        </Container>
      </div>
    </>
  );
};

export default NotFound;
