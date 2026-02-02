// Page LegalPage - Page générique pour les pages légales
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from 'react-bootstrap';
import './LegalPage.scss';

const LegalPage = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title} - Trouve ton artisan</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className="legal-page">
        <Container className="py-5">
          <h1 className="page-title mb-4">{title}</h1>
          
          <div className="legal-content">
            <p className="text-muted text-center py-5">
              <i className="bi bi-hourglass-split display-4 d-block mb-3"></i>
              Page en construction
            </p>
            <p className="text-center text-muted">
              Cette page sera complétée prochainement par un cabinet spécialisé.
            </p>
          </div>
        </Container>
      </div>
    </>
  );
};

export default LegalPage;
