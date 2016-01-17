-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Sam 16 Janvier 2016 à 10:44
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `app-urgence`
--

-- --------------------------------------------------------

--
-- Structure de la table `ALERT`
--

CREATE TABLE IF NOT EXISTS `ALERT` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_parse` varchar(80) DEFAULT NULL,
  `public_user_id` int(11),
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `ALERT_TYPE`
--

CREATE TABLE IF NOT EXISTS `ALERT_TYPE` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `PUBLIC_USER`
--

CREATE TABLE IF NOT EXISTS `PUBLIC_USER` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `SEVERITY`
--

CREATE TABLE IF NOT EXISTS `SEVERITY` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `alert`
--
ALTER TABLE `alert`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`public_user_id`) REFERENCES `PUBLIC_USER` (`id`),
  ADD CONSTRAINT `fk_severity` FOREIGN KEY (`severity_id`) REFERENCES `SEVERITY` (`id`),
  ADD CONSTRAINT `fk_type` FOREIGN KEY (`alert_type_id`) REFERENCES `ALERT_TYPE` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
