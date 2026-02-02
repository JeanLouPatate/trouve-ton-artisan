// Page ArtisanDetail - Fiche détaillée d'un artisan avec formulaire de contact
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import StarRating from '../../components/StarRating/StarRating';
import { artisansAPI, contactAPI } from '../../services/api';
import './ArtisanDetail.scss';

const ArtisanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // État du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  // Récupération des données de l'artisan
  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const response = await artisansAPI.getById(id);
        if (response.success) {
          setArtisan(response.data);
        } else {
          navigate('/404');
        }
      } catch (err) {
        setError('Erreur lors du chargement de l\'artisan');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisan();
  }, [id, navigate]);

  // Gestion du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFormStatus({ type: '', message: '' });

    try {
      const response = await contactAPI.sendMessage({
        ...formData,
        artisanEmail: artisan.email
      });

      setFormStatus({
        type: 'success',
        message: response.message
      });

      // Réinitialiser le formulaire
      setFormData({ nom: '', email: '', objet: '', message: '' });
    } catch (err) {
      setFormStatus({
        type: 'danger',
        message: 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </Container>
    );
  }

  if (error || !artisan) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || 'Artisan non trouvé'}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>{artisan.nom} - Trouve ton artisan</title>
        <meta name="description" content={`${artisan.nom} - ${artisan.specialite?.nom} à ${artisan.ville}. Note: ${artisan.note}/5`} />
      </Helmet>

      <div className="artisan-detail-page">
        <Container className="py-5">
          <Row className="g-4">
            {/* Informations de l'artisan */}
            <Col lg={7}>
              <Card className="shadow-sm">
                <Card.Body className="p-4">
                  <h1 className="artisan-name mb-3">{artisan.nom}</h1>

                  <div className="rating-section mb-3">
                    <StarRating rating={artisan.note} />
                    <span className="rating-value ms-2">{parseFloat(artisan.note).toFixed(1)}/5</span>
                  </div>

                  <div className="info-item mb-2">
                    <i className="bi bi-briefcase me-2 text-primary"></i>
                    <strong>Spécialité :</strong> {artisan.specialite?.nom}
                  </div>

                  <div className="info-item mb-2">
                    <i className="bi bi-geo-alt me-2 text-primary"></i>
                    <strong>Localisation :</strong> {artisan.ville}
                  </div>

                  <div className="info-item mb-3">
                    <i className="bi bi-tag me-2 text-primary"></i>
                    <strong>Catégorie :</strong> {artisan.specialite?.categorie?.nom}
                  </div>

                  {artisan.site_web && (
                    <div className="info-item mb-3">
                      <i className="bi bi-globe me-2 text-primary"></i>
                      <a href={artisan.site_web} target="_blank" rel="noopener noreferrer">
                        Visiter le site web
                      </a>
                    </div>
                  )}

                  <hr />

                  <h3 className="h5 mb-3">À propos</h3>
                  <p className="text-muted">{artisan.a_propos}</p>
                </Card.Body>
              </Card>
            </Col>

            {/* Formulaire de contact */}
            <Col lg={5}>
              <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
                <Card.Body className="p-4">
                  <h2 className="h4 mb-3">Contactez {artisan.nom}</h2>
                  <p className="text-muted mb-4">
                    Remplissez ce formulaire pour contacter l'artisan. Une réponse vous sera apportée sous 48h.
                  </p>

                  {formStatus.message && (
                    <Alert variant={formStatus.type} dismissible onClose={() => setFormStatus({ type: '', message: '' })}>
                      {formStatus.message}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Votre nom *</Form.Label>
                      <Form.Control
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        required
                        placeholder="Jean Dupont"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Votre email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="jean.dupont@email.com"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Objet *</Form.Label>
                      <Form.Control
                        type="text"
                        name="objet"
                        value={formData.objet}
                        onChange={handleInputChange}
                        required
                        placeholder="Demande de devis"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Bonjour, je souhaiterais..."
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send me-2"></i>
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ArtisanDetail;
