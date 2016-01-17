-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Dim 17 Janvier 2016 à 11:12
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `app-urgence`
--
CREATE DATABASE IF NOT EXISTS `app-urgence` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `app-urgence`;

-- --------------------------------------------------------

--
-- Structure de la table `alert`
--

DROP TABLE IF EXISTS `alert`;
CREATE TABLE IF NOT EXISTS `alert` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_parse` varchar(80) DEFAULT NULL,
  `public_user_id` int(11) DEFAULT NULL,
  `alert_type_id` int(11) NOT NULL,
  `severity_id` int(11) NOT NULL,
  `info` varchar(255) DEFAULT NULL,
  `lat_pos` float(10,6) NOT NULL,
  `long_pos` float(10,6) NOT NULL,
  `datetime_sent` datetime NOT NULL,
  `datetime_received` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `alert_type_id` (`alert_type_id`),
  KEY `severity_id` (`severity_id`),
  KEY `public_user_id` (`public_user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Structure de la table `alert_type`
--

DROP TABLE IF EXISTS `alert_type`;
CREATE TABLE IF NOT EXISTS `alert_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `alert_type`
--

INSERT INTO `alert_type` (`id`, `name`) VALUES
(1, 'Medical'),
(2, 'Aggression'),
(3, 'Incendie'),
(4, 'Attentat');

-- --------------------------------------------------------

--
-- Structure de la table `public_user`
--

DROP TABLE IF EXISTS `public_user`;
CREATE TABLE IF NOT EXISTS `public_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `genre` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Structure de la table `severity`
--

DROP TABLE IF EXISTS `severity`;
CREATE TABLE IF NOT EXISTS `severity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `severity`
--

INSERT INTO `severity` (`id`, `name`) VALUES
(1, 'Critique'),
(2, 'Majeure'),
(3, 'Mineure');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `alert`
--
ALTER TABLE `alert`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`public_user_id`) REFERENCES `public_user` (`id`),
  ADD CONSTRAINT `fk_severity` FOREIGN KEY (`severity_id`) REFERENCES `severity` (`id`),
  ADD CONSTRAINT `fk_type` FOREIGN KEY (`alert_type_id`) REFERENCES `alert_type` (`id`);
