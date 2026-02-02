// Page Home - Page d'accueil du site
// Affiche les 4 étapes et les 3 artisans du mois

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ArtisanCard from '../../components/ArtisanCard/ArtisanCard';
import { artisansAPI } from '../../services/api';
import './Home.scss';

const Home = () => {
  const [topArtisans, setTopArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération des 3 artisans du mois
  useEffect(() => {
    const fetchTopArtisans = async () => {
      try {
        const response = await artisansAPI.getTop();
        if (response.success) {
          setTopArtisans(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des artisans du mois:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtisans();
  }, []);

  // Les 4 étapes pour trouver un artisan
  const steps = [
    {
      number: 1,
      title: 'Choisir la catégorie d\'artisanat dans le menu',
      icon: 'bi-list-ul'
    },
    {
      number: 2,
      title: 'Choisir un artisan',
      icon: 'bi-person-check'
    },
    {
      number: 3,
      title: 'Le contacter via le formulaire de contact',
      icon: 'bi-envelope'
    },
    {
      number: 4,
      title: 'Une réponse sera apportée sous 48h',
      icon: 'bi-clock'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Trouve ton artisan - Région Auvergne-Rhône-Alpes</title>
        <meta 
          name="description" 
          content="Trouvez facilement un artisan qualifié en Auvergne-Rhône-Alpes. Bâtiment, services, fabrication et alimentation. Plus de 221 000 artisans répertoriés." 
        />
      </Helmet>

      <div className="home-page">
        {/* Section Hero */}
        <section className="hero-section">
          <Container>
            <Row className="text-center">
              <Col>
                <h1 className="hero-title">Trouvez votre artisan en Auvergne-Rhône-Alpes</h1>
                <p className="hero-subtitle">
                  Plus de 221 000 artisans qualifiés à votre service
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Section Comment ça marche */}
        <section className="how-it-works-section">
          <Container>
            <h2 className="section-title text-center mb-5">
              Comment trouver mon artisan ?
            </h2>

            <Row className="g-4">
              {steps.map((step) => (
                <Col key={step.number} md={6} lg={3}>
                  <Card className="step-card h-100 text-center">
                    <Card.Body>
                      <div className="step-number">{step.number}</div>
                      <i className={`bi ${step.icon} step-icon`}></i>
                      <Card.Text className="step-text">{step.title}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Section Artisans du mois */}
        <section className="top-artisans-section">
          <Container>
            <h2 className="section-title text-center mb-5">
              Les artisans du mois
            </h2>

            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Chargement...</span>
                </div>
              </div>
            ) : topArtisans.length > 0 ? (
              <Row className="g-4">
                {topArtisans.map((artisan) => (
                  <Col key={artisan.id} md={6} lg={4}>
                    <ArtisanCard artisan={artisan} />
                  </Col>
                ))}
              </Row>
            ) : (
              <p className="text-center text-muted">
                Aucun artisan du mois disponible pour le moment.
              </p>
            )}
          </Container>
        </section>
      </div>
    </>
  );
};

export default Home;
