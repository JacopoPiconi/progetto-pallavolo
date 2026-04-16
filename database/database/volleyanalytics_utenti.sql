-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: volleyanalytics
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utenti` (
  `id_utente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `ruolo_assegnato` enum('admin','analista','tifoso') DEFAULT 'tifoso',
  PRIMARY KEY (`id_utente`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES (1,'Yashpreet','Singh','Yashpreet.singh@volleyanalytics.com','Admin2024!','admin'),(2,'Jacopo','Piconi','Jacopo.piconi@volleyanalytics.com','Analista2024!','analista'),(3,'Jacopo','Corrai','Jacopo.corrai@volleyanalytics.com','Analista2024!','analista'),(4,'Marco','Rossi','marco.rossi@email.it','Tifoso123!','tifoso'),(5,'Luca','Bianchi','luca.bianchi@email.it','Tifoso123!','tifoso'),(6,'Matteo','Ferrari','matteo.ferrari@email.it','Tifoso123!','tifoso'),(7,'Alessandro','Esposito','alessandro.esposito@email.it','Tifoso123!','tifoso'),(8,'Giulia','Ricci','giulia.ricci@email.it','Tifoso123!','tifoso'),(9,'Martina','Romano','martina.romano@email.it','Tifoso123!','tifoso'),(10,'Chiara','Colombo','chiara.colombo@email.it','Tifoso123!','tifoso'),(11,'Francesca','Gallo','francesca.gallo@email.it','Tifoso123!','tifoso'),(12,'Andrea','Conti','andrea.conti@email.it','Tifoso123!','tifoso'),(13,'Lorenzo','Marino','lorenzo.marino@email.it','Tifoso123!','tifoso'),(14,'Giovanni','De Luca','giovanni.deluca@email.it','Tifoso123!','tifoso'),(15,'Davide','Bruno','davide.bruno@email.it','Tifoso123!','tifoso'),(16,'Simone','Russo','simone.russo@email.it','Tifoso123!','tifoso'),(17,'Jakub','Kowalski','jakub.kowalski@email.pl','Tifoso123!','tifoso'),(18,'Kamil','Nowak','kamil.nowak@email.pl','Tifoso123!','tifoso'),(19,'Szymon','Wisniewski','szymon.wisniewski@email.pl','Tifoso123!','tifoso'),(20,'Michal','Wojcik','michal.wojcik@email.pl','Tifoso123!','tifoso'),(21,'Piotr','Kaminski','piotr.kaminski@email.pl','Tifoso123!','tifoso'),(22,'Bartosz','Lewandowski','bartosz.lewandowski@email.pl','Tifoso123!','tifoso'),(23,'Katarzyna','Zielinska','katarzyna.zielinska@email.pl','Tifoso123!','tifoso'),(24,'Agnieszka','Szymanska','agnieszka.szymanska@email.pl','Tifoso123!','tifoso'),(25,'Magdalena','Wozniak','magdalena.wozniak@email.pl','Tifoso123!','tifoso'),(26,'Edoardo','Lombardi','edoardo.lombardi@email.it','Tifoso123!','tifoso'),(27,'Leonardo','Moretti','leonardo.moretti@email.it','Tifoso123!','tifoso'),(28,'Gabriele','Fontana','gabriele.fontana@email.it','Tifoso123!','tifoso'),(29,'Riccardo','Santoro','riccardo.santoro@email.it','Tifoso123!','tifoso'),(30,'Emanuele','Caruso','emanuele.caruso@email.it','Tifoso123!','tifoso'),(31,'Nicola','Martini','nicola.martini@email.it','Tifoso123!','tifoso'),(32,'Tommaso','Riva','tommaso.riva@email.it','Tifoso123!','tifoso'),(33,'Alessio','Ferraro','alessio.ferraro@email.it','Tifoso123!','tifoso'),(34,'Giacomo','Serra','giacomo.serra@email.it','Tifoso123!','tifoso'),(35,'Christian','Conte','christian.conte@email.it','Tifoso123!','tifoso'),(36,'Federico','De Santis','federico.desantis@email.it','Tifoso123!','tifoso'),(37,'Mattia','Fiore','mattia.fiore@email.it','Tifoso123!','tifoso'),(38,'Pietro','Pellegrini','pietro.pellegrini@email.it','Tifoso123!','tifoso'),(39,'Stefano','Longo','stefano.longo@email.it','Tifoso123!','tifoso'),(40,'Alice','Galli','alice.galli@email.it','Tifoso123!','tifoso'),(41,'Sara','Vitale','sara.vitale@email.it','Tifoso123!','tifoso'),(42,'Elena','Giordano','elena.giordano@email.it','Tifoso123!','tifoso'),(43,'Sofia','Bianco','sofia.bianco@email.it','Tifoso123!','tifoso'),(44,'Anna','Rizzo','anna.rizzo@email.it','Tifoso123!','tifoso'),(45,'Giorgia','Barbieri','giorgia.barbieri@email.it','Tifoso123!','tifoso'),(46,'Silvia','Maciejewski','silvia.mac@email.pl','Tifoso123!','tifoso'),(47,'Valeria','Sorrentino','valeria.sorrentino@email.it','Tifoso123!','tifoso'),(48,'Ilaria','Costa','ilaria.costa@email.it','Tifoso123!','tifoso'),(49,'Veronica','Gatti','veronica.gatti@email.it','Tifoso123!','tifoso'),(50,'Alessia','Milani','alessia.milani@email.it','Tifoso123!','tifoso'),(51,'prova','123','prova123@prova.com','prova123','tifoso');
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-16 20:32:55
