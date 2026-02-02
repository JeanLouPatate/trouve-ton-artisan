// Composant Footer - Pied de page avec menu légal et coordonnées
// Présent sur toutes les pages

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* Menu légal */}
          <Col md={6} className="mb-3 mb-md-0">
            <h5>Informations légales</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link to="/donnees-personnelles">Données personnelles</Link>
              </li>
              <li>
                <Link to="/accessibilite">Accessibilité</Link>
              </li>
              <li>
                <Link to="/cookies">Cookies</Link>
              </li>
            </ul>
          </Col>

          {/* Coordonnées */}
          <Col md={6}>
            <h5>Nous contacter</h5>
            <address>
              <strong>Région Auvergne-Rhône-Alpes</strong><br />
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
            </address>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Région Auvergne-Rhône-Alpes - Tous droits réservés
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
