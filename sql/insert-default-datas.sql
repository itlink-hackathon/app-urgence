
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-----------------------------------------------------------
INSERT INTO 'alert_type' ('id' ,'name') VALUES (1, 'Médical'),(2, 'Aggression'),(3, 'Incendie'),(4, 'Attentat');

-- --------------------------------------------------------
INSERT INTO 'severity' ('id', 'name') VALUES (1, 'Mineure'),(2, 'Majeure'),(3, 'Critique');

