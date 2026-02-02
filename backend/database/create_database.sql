-- Script de création de la base de données "Trouve ton artisan"
-- Auteur : Projet Auvergne-Rhône-Alpes
-- Date : 2026-02-02

-- Suppression de la base si elle existe déjà
DROP DATABASE IF EXISTS trouve_ton_artisan;

-- Création de la base de données
CREATE DATABASE trouve_ton_artisan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utilisation de la base de données
USE trouve_ton_artisan;

-- Table des catégories (Bâtiment, Services, Fabrication, Alimentation)
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table des spécialités (Boucher, Boulanger, Chauffagiste, etc.)
CREATE TABLE specialites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL UNIQUE,
    categorie_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_categorie (categorie_id)
) ENGINE=InnoDB;

-- Table des artisans
CREATE TABLE artisans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    specialite_id INT NOT NULL,
    note DECIMAL(2,1) NOT NULL CHECK (note >= 0 AND note <= 5),
    ville VARCHAR(100) NOT NULL,
    a_propos TEXT,
    email VARCHAR(255) NOT NULL,
    site_web VARCHAR(255),
    top BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (specialite_id) REFERENCES specialites(id) ON DELETE CASCADE,
    INDEX idx_specialite (specialite_id),
    INDEX idx_nom (nom),
    INDEX idx_top (top),
    INDEX idx_note (note)
) ENGINE=InnoDB;
