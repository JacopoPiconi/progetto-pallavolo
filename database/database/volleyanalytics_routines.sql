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
-- Temporary view structure for view `vista_calendario_completo`
--

DROP TABLE IF EXISTS `vista_calendario_completo`;
/*!50001 DROP VIEW IF EXISTS `vista_calendario_completo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_calendario_completo` AS SELECT 
 1 AS `id_partita`,
 1 AS `data_partita`,
 1 AS `nome_lega`,
 1 AS `squadra_casa`,
 1 AS `squadra_trasferta`,
 1 AS `risultato_set`,
 1 AS `stato`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vista_calendario_completo`
--

/*!50001 DROP VIEW IF EXISTS `vista_calendario_completo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_calendario_completo` AS select `p`.`id_partita` AS `id_partita`,`p`.`data_partita` AS `data_partita`,`l`.`nome_lega` AS `nome_lega`,`sq_casa`.`nome_squadra` AS `squadra_casa`,`sq_trasferta`.`nome_squadra` AS `squadra_trasferta`,`p`.`risultato_set` AS `risultato_set`,`p`.`stato` AS `stato` from (((`partite` `p` join `squadre` `sq_casa` on((`p`.`id_squadra_casa` = `sq_casa`.`id_squadra`))) join `squadre` `sq_trasferta` on((`p`.`id_squadra_trasferta` = `sq_trasferta`.`id_squadra`))) join `leghe` `l` on((`sq_casa`.`id_lega` = `l`.`id_lega`))) order by `p`.`data_partita` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-16 20:32:55
