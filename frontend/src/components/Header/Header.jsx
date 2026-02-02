// Composant Header - En-tête du site avec logo, menu et recherche
// Présent sur toutes les pages

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { categoriesAPI } from '../../services/api';
import './Header.scss';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Récupération des catégories au chargement du composant
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesAPI.getAll();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Gestion de la recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/artisans?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="header">
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="/logo.png"
              alt="Trouve ton artisan - Région Auvergne-Rhône-Alpes"
              height="50"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          
          <Navbar.Collapse id="navbar-nav">
            {/* Menu de navigation */}
            <Nav className="me-auto">
              {categories.map((categorie) => (
                <Nav.Link
                  key={categorie.id}
                  as={Link}
                  to={`/artisans?categorie=${categorie.id}`}
                  className="nav-link-custom"
                >
                  {categorie.nom}
                </Nav.Link>
              ))}
            </Nav>

            {/* Barre de recherche */}
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Rechercher un artisan..."
                className="me-2"
                aria-label="Rechercher"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Rechercher
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
