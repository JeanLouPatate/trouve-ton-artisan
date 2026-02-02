// Page ArtisansList - Liste des artisans avec recherche et filtres
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ArtisanCard from '../../components/ArtisanCard/ArtisanCard';
import { artisansAPI, categoriesAPI } from '../../services/api';
import './ArtisansList.scss';

const ArtisansList = () => {
  const [searchParams] = useSearchParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTitle, setPageTitle] = useState('Tous les artisans');

  // Récupération des paramètres de recherche
  const categorieId = searchParams.get('categorie');
  const searchTerm = searchParams.get('search');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Si filtre par catégorie, récupérer le nom de la catégorie
        if (categorieId) {
          const catResponse = await categoriesAPI.getById(categorieId);
          if (catResponse.success) {
            setPageTitle(`Artisans - ${catResponse.data.nom}`);
          }
        } else if (searchTerm) {
          setPageTitle(`Résultats pour "${searchTerm}"`);
        } else {
          setPageTitle('Tous les artisans');
        }

        // Récupérer les artisans avec filtres
        const params = {};
        if (categorieId) params.categorie = categorieId;
        if (searchTerm) params.search = searchTerm;

        const response = await artisansAPI.getAll(params);
        if (response.success) {
          setArtisans(response.data);
        }
      } catch (err) {
        setError('Erreur lors du chargement des artisans');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorieId, searchTerm]);

  return (
    <>
      <Helmet>
        <title>{pageTitle} - Trouve ton artisan</title>
        <meta name="description" content={`Découvrez ${artisans.length} artisans qualifiés en Auvergne-Rhône-Alpes`} />
      </Helmet>

      <div className="artisans-list-page">
        <Container className="py-5">
          <h1 className="page-title mb-4">{pageTitle}</h1>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : artisans.length === 0 ? (
            <Alert variant="info">
              Aucun artisan trouvé pour cette recherche.
            </Alert>
          ) : (
            <>
              <p className="text-muted mb-4">
                {artisans.length} artisan{artisans.length > 1 ? 's' : ''} trouvé{artisans.length > 1 ? 's' : ''}
              </p>
              <Row className="g-4">
                {artisans.map((artisan) => (
                  <Col key={artisan.id} sm={6} lg={4}>
                    <ArtisanCard artisan={artisan} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default ArtisansList;
