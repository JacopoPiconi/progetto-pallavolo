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
-- Table structure for table `leghe`
--

DROP TABLE IF EXISTS `leghe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leghe` (
  `id_lega` int NOT NULL AUTO_INCREMENT,
  `nome_lega` varchar(100) NOT NULL,
  `nazione` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_lega`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leghe`
--

LOCK TABLES `leghe` WRITE;
/*!40000 ALTER TABLE `leghe` DISABLE KEYS */;
INSERT INTO `leghe` VALUES (1,'SuperLega','Italy'),(2,'Serie A1 Women','Italy'),(3,'Liga Siatkowki','Poland'),(4,'Liga Siatkowki, Women','Poland'),(5,'Serie A2','Italy'),(6,'Serie A2, Women','Italy'),(7,'Super Cup','Italy'),(8,'Coppa Italia Superlega','Italy'),(9,'Puchar Polski','Poland'),(10,'Puchar Polski, Women','Poland'),(11,'Super Cup, Women','Italy'),(12,'Coppa Italia A2/A3','Italy'),(13,'Coppa Italia A1, Women','Italy'),(14,'Coppa Italia A2, Women','Italy'),(15,'Superpuchar','Poland'),(16,'Superpuchar, Women','Poland'),(17,'1. Liga','Poland'),(18,'1. Liga, Women','Poland'),(19,'Serie A3','Italy'),(20,'SuperLega','Italy'),(21,'Serie A1 Women','Italy'),(22,'Liga Siatkowki','Poland'),(23,'Liga Siatkowki, Women','Poland'),(24,'Serie A2','Italy'),(25,'Serie A2, Women','Italy'),(26,'Super Cup','Italy'),(27,'Coppa Italia Superlega','Italy'),(28,'Puchar Polski','Poland'),(29,'Puchar Polski, Women','Poland'),(30,'Super Cup, Women','Italy'),(31,'Coppa Italia A2/A3','Italy'),(32,'Coppa Italia A1, Women','Italy'),(33,'Coppa Italia A2, Women','Italy'),(34,'Superpuchar','Poland'),(35,'Superpuchar, Women','Poland'),(36,'1. Liga','Poland'),(37,'1. Liga, Women','Poland'),(38,'Serie A3','Italy'),(39,'SuperLega','Italy'),(40,'SuperLega','Italy'),(41,'Serie A1 Women','Italy'),(42,'Liga Siatkowki','Poland'),(43,'Liga Siatkowki, Women','Poland'),(44,'Serie A2','Italy'),(45,'Serie A2, Women','Italy'),(46,'Super Cup','Italy'),(47,'Coppa Italia Superlega','Italy'),(48,'Puchar Polski','Poland'),(49,'Puchar Polski, Women','Poland'),(50,'Super Cup, Women','Italy'),(51,'Coppa Italia A2/A3','Italy'),(52,'SuperLega','Italy'),(53,'SuperLega','Italy'),(54,'SuperLega','Italy'),(55,'SuperLega','Italy'),(56,'Serie A1 Women','Italy'),(57,'Liga Siatkowki','Poland'),(58,'Liga Siatkowki, Women','Poland'),(59,'Serie A2','Italy'),(60,'Serie A2, Women','Italy'),(61,'Super Cup','Italy'),(62,'Coppa Italia Superlega','Italy'),(63,'Puchar Polski','Poland'),(64,'Puchar Polski, Women','Poland'),(65,'Super Cup, Women','Italy'),(66,'Coppa Italia A2/A3','Italy'),(67,'Coppa Italia A1, Women','Italy'),(68,'Coppa Italia A2, Women','Italy'),(69,'Superpuchar','Poland'),(70,'Superpuchar, Women','Poland'),(71,'1. Liga','Poland'),(72,'1. Liga, Women','Poland'),(73,'Serie A3','Italy');
/*!40000 ALTER TABLE `leghe` ENABLE KEYS */;
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
