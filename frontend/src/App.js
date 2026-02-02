// App.js - Composant principal de l'application React
// Gère le routing et la structure générale

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ArtisansList from './pages/ArtisansList/ArtisansList';
import ArtisanDetail from './pages/ArtisanDetail/ArtisanDetail';
import NotFound from './pages/NotFound/NotFound';
import LegalPage from './pages/LegalPage/LegalPage';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artisans" element={<ArtisansList />} />
              <Route path="/artisan/:id" element={<ArtisanDetail />} />
              
              {/* Pages légales */}
              <Route path="/mentions-legales" element={<LegalPage title="Mentions légales" />} />
              <Route path="/donnees-personnelles" element={<LegalPage title="Données personnelles" />} />
              <Route path="/accessibilite" element={<LegalPage title="Accessibilité" />} />
              <Route path="/cookies" element={<LegalPage title="Cookies" />} />
              
              {/* Page 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
