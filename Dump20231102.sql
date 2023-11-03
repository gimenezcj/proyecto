CREATE DATABASE  IF NOT EXISTS `gama_database_development` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gama_database_development`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: gama_database_development
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `actividades`
--

DROP TABLE IF EXISTS `actividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rehabilitacionId` int NOT NULL,
  `actividadDisponibleId` int NOT NULL,
  `orden` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividades`
--

LOCK TABLES `actividades` WRITE;
/*!40000 ALTER TABLE `actividades` DISABLE KEYS */;
INSERT INTO `actividades` VALUES (1,1,1,1,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(2,1,2,2,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(3,1,3,3,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(8,3,13,0,'2023-10-29 13:45:46','2023-10-29 13:45:46'),(9,3,11,1,'2023-10-29 13:45:46','2023-10-29 13:45:46'),(13,4,10,0,'2023-11-03 00:53:51','2023-11-03 00:53:51'),(14,4,11,1,'2023-11-03 00:53:51','2023-11-03 00:53:51'),(15,4,12,2,'2023-11-03 00:53:51','2023-11-03 00:53:51'),(16,5,10,1,'2023-11-03 01:52:38','2023-11-03 01:52:38'),(17,6,11,1,'2023-11-03 01:52:55','2023-11-03 01:52:55');
/*!40000 ALTER TABLE `actividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actividadesdisponibles`
--

DROP TABLE IF EXISTS `actividadesdisponibles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividadesdisponibles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `estimuloVisual` varchar(255) DEFAULT NULL,
  `estimuloAuditivo` varchar(255) DEFAULT NULL,
  `puntosAOtorgar` int DEFAULT '0',
  `timpoMaximoResolucion` int DEFAULT NULL,
  `dificultad` enum('bajo','medio','alto') NOT NULL DEFAULT 'bajo',
  `detalle` varchar(255) DEFAULT NULL,
  `recorridoId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `escenarioId` int DEFAULT NULL,
  `permanenciaVisual` int DEFAULT NULL,
  `estimuloAuditivoId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividadesdisponibles`
--

LOCK TABLES `actividadesdisponibles` WRITE;
/*!40000 ALTER TABLE `actividadesdisponibles` DISABLE KEYS */;
INSERT INTO `actividadesdisponibles` VALUES (1,'actividad1','Seleccionar el menor precio','audio1.mp4',200,120,'bajo','actividad uno con distractor del grito de tarzan 3 segundos despues de iniciar',1,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,NULL,NULL),(2,'actividad2','Seleccionar el menor precio2','audio1.mp4',200,120,'bajo','algo que lo describa2',1,'2023-10-29 13:43:40','2023-10-29 13:43:40',2,NULL,NULL),(3,'actividad3','Seleccionar el menor precio3','audio2.mp4',200,120,'bajo','algo que lo describa3',1,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,NULL,NULL),(10,'Menor precio LUBRICANTE YPF','En esta actividad debe seleccionar el ACEITE de menor precio',NULL,200,120,'bajo','Tendras que llegar a la estacion de servicio y adquirir el lubricante de menor precio',10,'2023-10-29 13:43:40','2023-10-29 10:52:06',10,2,219),(11,'Menor precio MARTILLO','En esta actividad debe seleccionar el MARTILLO de menor precio',NULL,300,120,'bajo','A comprar un martillo economico para reparar la mesa',11,'2023-10-29 13:43:40','2023-10-29 10:52:06',10,2,220),(12,'Menor precio FLORES','En esta actividad debe seleccionar el RAMILLETE FLORAL de menor precio',NULL,400,120,'bajo','Una fecha especial, compra el ramillete de menor precio',12,'2023-10-29 13:43:40','2023-10-29 10:52:06',10,2,221),(13,'Menor precio HARINA','En esta actividad debe seleccionar el PAQUETE DE HARINA de menor precio',NULL,500,120,'bajo','Para preparar unas tortas fritas, necesitas harina. Consigue la mas barata!',13,'2023-10-29 13:43:40','2023-10-29 10:52:06',10,2,222);
/*!40000 ALTER TABLE `actividadesdisponibles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adquiridos`
--

DROP TABLE IF EXISTS `adquiridos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adquiridos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nroPieza` int DEFAULT NULL,
  `personajeId` int NOT NULL,
  `grupoDecorativoId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adquiridos`
--

LOCK TABLES `adquiridos` WRITE;
/*!40000 ALTER TABLE `adquiridos` DISABLE KEYS */;
/*!40000 ALTER TABLE `adquiridos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comprarproductos`
--

DROP TABLE IF EXISTS `comprarproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comprarproductos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `actividadId` int DEFAULT NULL,
  `cantidadItems` int DEFAULT NULL,
  `estimuloAuditivo` tinyint(1) DEFAULT NULL,
  `estimuloVisual` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comprarproductos`
--

LOCK TABLES `comprarproductos` WRITE;
/*!40000 ALTER TABLE `comprarproductos` DISABLE KEYS */;
INSERT INTO `comprarproductos` VALUES (1,1,3,1,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(10,10,3,1,1,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(11,11,3,1,1,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(12,12,3,1,1,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(13,13,3,1,1,'2023-10-29 13:43:40','2023-10-29 13:43:40');
/*!40000 ALTER TABLE `comprarproductos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactos`
--

DROP TABLE IF EXISTS `contactos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `celular` varchar(255) DEFAULT NULL,
  `fijo` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `personaId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `personaId` (`personaId`),
  CONSTRAINT `contactos_ibfk_1` FOREIGN KEY (`personaId`) REFERENCES `personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactos`
--

LOCK TABLES `contactos` WRITE;
/*!40000 ALTER TABLE `contactos` DISABLE KEYS */;
INSERT INTO `contactos` VALUES (1,'2214951946',NULL,'gimenez@gmail.com','2023-10-29 13:43:40','2023-10-29 13:43:40',1),(2,NULL,NULL,'silvia@algo.com','2023-10-29 13:43:40','2023-10-29 13:43:40',2),(3,NULL,NULL,'vanesa@algo.com','2023-10-29 13:43:40','2023-10-29 13:43:40',3),(5,NULL,NULL,'fono@algo.com','2023-10-29 13:43:40','2023-10-29 13:43:40',5),(10,'otro',NULL,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40',4),(11,NULL,'2213344556',NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40',6);
/*!40000 ALTER TABLE `contactos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuentas`
--

DROP TABLE IF EXISTS `cuentas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuentas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clave` varchar(255) DEFAULT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `personaId` int DEFAULT NULL,
  `imagenId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuentas`
--

LOCK TABLES `cuentas` WRITE;
/*!40000 ALTER TABLE `cuentas` DISABLE KEYS */;
INSERT INTO `cuentas` VALUES (1,'javier','javier',1,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,1),(2,'sil','silvia',1,'2023-10-29 13:43:40','2023-10-29 13:43:40',2,2),(3,'vane','vanesa',1,'2023-10-29 13:43:40','2023-10-29 13:43:40',3,3),(4,'fono','fono',1,'2023-10-29 13:43:40','2023-10-29 13:43:40',5,NULL);
/*!40000 ALTER TABLE `cuentas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `decorativos`
--

DROP TABLE IF EXISTS `decorativos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `decorativos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `x` int DEFAULT NULL,
  `y` int DEFAULT NULL,
  `grupoDecorativoId` int NOT NULL,
  `nroPieza` int DEFAULT NULL,
  `valor` int DEFAULT NULL,
  `baseId` int NOT NULL,
  `auxiliarId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `grupoDecorativoId` (`grupoDecorativoId`),
  KEY `baseId` (`baseId`),
  KEY `auxiliarId` (`auxiliarId`),
  CONSTRAINT `decorativos_ibfk_1` FOREIGN KEY (`grupoDecorativoId`) REFERENCES `grupodecorativos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `decorativos_ibfk_2` FOREIGN KEY (`baseId`) REFERENCES `imagenes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `decorativos_ibfk_3` FOREIGN KEY (`auxiliarId`) REFERENCES `imagenes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `decorativos`
--

LOCK TABLES `decorativos` WRITE;
/*!40000 ALTER TABLE `decorativos` DISABLE KEYS */;
INSERT INTO `decorativos` VALUES (10,NULL,NULL,10,NULL,10000,50,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(11,NULL,NULL,10,NULL,200,51,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(12,NULL,NULL,10,NULL,300,52,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(13,NULL,NULL,10,NULL,400,53,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(14,NULL,NULL,10,NULL,500,54,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(15,NULL,NULL,11,NULL,110,55,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(16,NULL,NULL,11,NULL,210,56,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(17,NULL,NULL,11,NULL,310,57,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(18,NULL,NULL,11,NULL,410,58,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(19,NULL,NULL,11,NULL,510,59,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(20,NULL,NULL,12,NULL,1000,60,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(21,NULL,NULL,12,NULL,1100,61,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(22,NULL,NULL,12,NULL,1200,62,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(23,NULL,NULL,12,NULL,1300,63,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(24,NULL,NULL,13,NULL,800,64,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(25,NULL,NULL,10,NULL,50,65,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(30,NULL,NULL,10,NULL,100,70,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(31,NULL,NULL,10,NULL,200,71,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(32,NULL,NULL,10,NULL,300,72,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(33,NULL,NULL,10,NULL,400,73,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(34,NULL,NULL,10,NULL,500,74,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(50,NULL,NULL,10,NULL,0,100,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40');
/*!40000 ALTER TABLE `decorativos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `decorativosavatares`
--

DROP TABLE IF EXISTS `decorativosavatares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `decorativosavatares` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `x` int NOT NULL DEFAULT '0',
  `y` int NOT NULL DEFAULT '0',
  `tipo` enum('sticker','vestimenta') NOT NULL DEFAULT 'vestimenta',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `imagenId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `imagenId` (`imagenId`),
  CONSTRAINT `decorativosavatares_ibfk_1` FOREIGN KEY (`imagenId`) REFERENCES `imagenes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `decorativosavatares`
--

LOCK TABLES `decorativosavatares` WRITE;
/*!40000 ALTER TABLE `decorativosavatares` DISABLE KEYS */;
INSERT INTO `decorativosavatares` VALUES (1,'buenos aires',1,1,'sticker','2023-10-29 13:43:40','2023-10-29 13:43:40',1),(2,'cordoba',1,2,'sticker','2023-10-29 13:43:40','2023-10-29 13:43:40',2),(3,'corbata',3,3,'vestimenta','2023-10-29 13:43:40','2023-10-29 13:43:40',3),(4,'pantalon',6,1,'vestimenta','2023-10-29 13:43:40','2023-10-29 13:43:40',1),(5,'camisa',4,1,'vestimenta','2023-10-29 13:43:40','2023-10-29 13:43:40',2);
/*!40000 ALTER TABLE `decorativosavatares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distractores`
--

DROP TABLE IF EXISTS `distractores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distractores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orden` int DEFAULT NULL,
  `recorridoId` int DEFAULT NULL,
  `distractorDisponibleId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distractores`
--

LOCK TABLES `distractores` WRITE;
/*!40000 ALTER TABLE `distractores` DISABLE KEYS */;
INSERT INTO `distractores` VALUES (1,1,1,1,'2023-10-29 13:43:40','2023-10-29 13:43:40');
/*!40000 ALTER TABLE `distractores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distractoresdisponibles`
--

DROP TABLE IF EXISTS `distractoresdisponibles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distractoresdisponibles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ejecuarEnBuble` tinyint(1) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `x` int DEFAULT NULL,
  `y` int DEFAULT NULL,
  `ruta` varchar(255) DEFAULT NULL,
  `tiempoEspera` int DEFAULT NULL,
  `tiempoInicial` int DEFAULT NULL,
  `tipo` enum('sonido','niebla','lluvia','atardecer','noche','obstaculo') DEFAULT NULL,
  `imagenId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distractoresdisponibles`
--

LOCK TABLES `distractoresdisponibles` WRITE;
/*!40000 ALTER TABLE `distractoresdisponibles` DISABLE KEYS */;
INSERT INTO `distractoresdisponibles` VALUES (1,NULL,'grito de tarzan',NULL,NULL,NULL,NULL,3,NULL,30,'2023-10-29 13:43:40','2023-10-29 13:43:40');
/*!40000 ALTER TABLE `distractoresdisponibles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `escenarios`
--

DROP TABLE IF EXISTS `escenarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `escenarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `sueloPlanoId` int NOT NULL,
  `sueloColisionId` int NOT NULL,
  `fondoId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escenarios`
--

LOCK TABLES `escenarios` WRITE;
/*!40000 ALTER TABLE `escenarios` DISABLE KEYS */;
INSERT INTO `escenarios` VALUES (1,'buenos aires',13,14,10,'2023-10-29 13:43:40','2023-10-29 13:43:40',NULL),(2,'cordoba',13,14,12,'2023-10-29 13:43:40','2023-10-29 13:43:40',NULL),(10,'CABA',213,214,215,'2023-10-29 13:43:40','2023-10-29 13:43:40','Paseamos por la ciudad Autonoma de Buenos Aires');
/*!40000 ALTER TABLE `escenarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluacionespresenciales`
--

DROP TABLE IF EXISTS `evaluacionespresenciales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluacionespresenciales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `dificultad` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pacienteId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pacienteId` (`pacienteId`),
  CONSTRAINT `evaluacionespresenciales_ibfk_1` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluacionespresenciales`
--

LOCK TABLES `evaluacionespresenciales` WRITE;
/*!40000 ALTER TABLE `evaluacionespresenciales` DISABLE KEYS */;
INSERT INTO `evaluacionespresenciales` VALUES (1,'2022-09-01 00:00:00','primer paciente, entrevista1',1,'2023-10-29 13:43:40','2023-10-29 13:43:40',1),(2,'2022-10-01 00:00:00','segundo paciente, entrevista2',2,'2023-10-29 13:43:40','2023-10-29 13:43:40',2);
/*!40000 ALTER TABLE `evaluacionespresenciales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familiares`
--

DROP TABLE IF EXISTS `familiares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familiares` (
  `id` int NOT NULL AUTO_INCREMENT,
  `familiar` enum('hijo','padre','tio','hermano','sobrino','ahijado','primo') NOT NULL,
  `personaId` int DEFAULT NULL,
  `familiarId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `personaId` (`personaId`),
  KEY `familiarId` (`familiarId`),
  CONSTRAINT `familiares_ibfk_1` FOREIGN KEY (`personaId`) REFERENCES `personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `familiares_ibfk_2` FOREIGN KEY (`familiarId`) REFERENCES `personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familiares`
--

LOCK TABLES `familiares` WRITE;
/*!40000 ALTER TABLE `familiares` DISABLE KEYS */;
INSERT INTO `familiares` VALUES (1,'hermano',1,4,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(2,'primo',1,6,'2023-10-29 13:43:40','2023-10-29 13:43:40');
/*!40000 ALTER TABLE `familiares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fonoaudiologos`
--

DROP TABLE IF EXISTS `fonoaudiologos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fonoaudiologos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `matricula` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `personaId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `personaId` (`personaId`),
  CONSTRAINT `fonoaudiologos_ibfk_1` FOREIGN KEY (`personaId`) REFERENCES `personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fonoaudiologos`
--

LOCK TABLES `fonoaudiologos` WRITE;
/*!40000 ALTER TABLE `fonoaudiologos` DISABLE KEYS */;
INSERT INTO `fonoaudiologos` VALUES (1,'3333','2023-10-29 13:43:40','2023-10-29 13:43:40',5);
/*!40000 ALTER TABLE `fonoaudiologos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupodecorativos`
--

DROP TABLE IF EXISTS `grupodecorativos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupodecorativos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupodecorativos`
--

LOCK TABLES `grupodecorativos` WRITE;
/*!40000 ALTER TABLE `grupodecorativos` DISABLE KEYS */;
INSERT INTO `grupodecorativos` VALUES (10,'presonajes','2023-10-29 13:43:40','2023-10-29 13:43:40'),(11,'valijas','2023-10-29 13:43:40','2023-10-29 13:43:40'),(12,'volante','2023-10-29 13:43:40','2023-10-29 13:43:40'),(13,'tablero','2023-10-29 13:43:40','2023-10-29 13:43:40');
/*!40000 ALTER TABLE `grupodecorativos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombreArchivo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (1,'archivo1.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(2,'archivo2.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(3,'archivo3.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(10,'ciudadBsAs.jpg','2023-10-29 13:43:40','2023-10-29 13:43:40'),(11,'arbolado.jpg','2023-10-29 13:43:40','2023-10-29 13:43:40'),(12,'montanas.jpg','2023-10-29 13:43:40','2023-10-29 13:43:40'),(13,'suelo1.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(14,'colision1.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(20,'aceite1.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(21,'aceite2.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(22,'aceite3.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(30,'tarzan.mp3','2023-10-29 13:43:40','2023-10-29 13:43:40'),(50,'shoppinera.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(51,'informatico.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(52,'graduada.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(53,'compradora.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(54,'chicoskate.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(55,'valijaArgentina.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(56,'valijaBeige.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(57,'valijaNegra.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(58,'valijaNaranja.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(59,'valijaOvalGris.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(60,'volanteHonda-400.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(61,'volanteBMW-400.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(62,'volanteBarco.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(63,'volanteBarco2.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(64,'tableroPrisma.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(65,'barba.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(70,'mujer1.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(71,'mujer2.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(72,'eldeportista.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(73,'deportista.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(74,'maestro.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(100,'generico.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(200,'aceitef30.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(201,'aceitef50.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(202,'aceitef50e.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(203,'aceitef50plus.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(204,'martillo1.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(205,'martillo2.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(206,'martillo3.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(207,'ramo1.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(208,'ramo2.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(209,'ramo3.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(210,'harina1.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(211,'harina2.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(212,'harina3.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(213,'suelo1.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(214,'colision1.png','2023-10-29 13:43:40','2023-10-29 13:43:40'),(215,'ciudadBsAs.jpg','2023-10-29 13:43:40','2023-10-29 13:43:40'),(216,'100.mp3','2023-10-29 13:43:40','2023-10-29 13:43:40'),(217,'120.mp3','2023-10-29 13:43:40','2023-10-29 13:43:40'),(218,'320.mp3','2023-10-29 13:43:40','2023-10-29 13:43:40'),(219,'ayudaSonora.mp3','2023-10-29 13:43:40','2023-10-29 13:43:40'),(220,'textoMenorPrecioMartillo.mp3','2023-10-29 13:43:40','2023-10-29 13:43:40'),(221,'textoMenorPrecioRamillete.mp3','2023-10-29 13:43:40','2023-10-29 13:43:40'),(222,'textoMenorPrecioHarina.mp3','2023-10-29 13:43:40','2023-10-29 13:43:40');
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingresos`
--

DROP TABLE IF EXISTS `ingresos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingresos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fechaHora` datetime DEFAULT NULL,
  `cuentaId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingresos`
--

LOCK TABLES `ingresos` WRITE;
/*!40000 ALTER TABLE `ingresos` DISABLE KEYS */;
INSERT INTO `ingresos` VALUES (1,'2022-05-01 00:00:00',1,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(2,'2022-05-02 00:00:00',1,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(3,'2022-06-01 00:00:00',2,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(4,'2022-05-03 00:00:00',1,'2023-10-29 13:43:40','2023-10-29 13:43:40');
/*!40000 ALTER TABLE `ingresos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obrassociales`
--

DROP TABLE IF EXISTS `obrassociales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obrassociales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obrassociales`
--

LOCK TABLES `obrassociales` WRITE;
/*!40000 ALTER TABLE `obrassociales` DISABLE KEYS */;
INSERT INTO `obrassociales` VALUES (1,'Sin obra social','2023-10-29 13:43:40','2023-10-29 13:43:40'),(2,'IOMA','2023-10-29 13:43:40','2023-10-29 13:43:40'),(3,'Petroleros','2023-10-29 13:43:40','2023-10-29 13:43:40'),(4,'Galeno','2023-10-29 13:43:40','2023-10-29 13:43:40');
/*!40000 ALTER TABLE `obrassociales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nroAfiliado` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `personaId` int NOT NULL,
  `obraSocialId` int NOT NULL DEFAULT '1',
  `fonoaudiologoId` int NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `personaId` (`personaId`),
  KEY `obraSocialId` (`obraSocialId`),
  KEY `fonoaudiologoId` (`fonoaudiologoId`),
  CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`personaId`) REFERENCES `personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pacientes_ibfk_2` FOREIGN KEY (`obraSocialId`) REFERENCES `obrassociales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pacientes_ibfk_3` FOREIGN KEY (`fonoaudiologoId`) REFERENCES `fonoaudiologos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` VALUES (1,'1235699249','2023-10-29 13:43:40','2023-10-29 13:43:40',1,2,1,1),(2,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40',2,1,1,1),(3,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40',3,1,1,1);
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personajes`
--

DROP TABLE IF EXISTS `personajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personajes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `puntajeAcumulado` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `imagenId` int DEFAULT NULL,
  `pacienteId` int DEFAULT NULL,
  `volanteId` int DEFAULT NULL,
  `tableroId` int DEFAULT NULL,
  `valijaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pacienteId` (`pacienteId`),
  KEY `personajes_volanteId_foreign_idx` (`volanteId`),
  KEY `personajes_tableroId_foreign_idx` (`tableroId`),
  KEY `personajes_valijaId_foreign_idx` (`valijaId`),
  KEY `imagenId` (`imagenId`),
  CONSTRAINT `personajes_ibfk_1` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `personajes_ibfk_2` FOREIGN KEY (`imagenId`) REFERENCES `decorativos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `personajes_tableroId_foreign_idx` FOREIGN KEY (`tableroId`) REFERENCES `decorativos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `personajes_valijaId_foreign_idx` FOREIGN KEY (`valijaId`) REFERENCES `decorativos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `personajes_volanteId_foreign_idx` FOREIGN KEY (`volanteId`) REFERENCES `decorativos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personajes`
--

LOCK TABLES `personajes` WRITE;
/*!40000 ALTER TABLE `personajes` DISABLE KEYS */;
INSERT INTO `personajes` VALUES (1,'cacho',6130,'2023-10-29 13:43:40','2023-11-03 01:54:31',25,1,20,24,15),(2,'rosalia',0,'2023-10-29 13:43:40','2023-10-29 13:43:40',10,2,23,24,19);
/*!40000 ALTER TABLE `personajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personajesdecorativos`
--

DROP TABLE IF EXISTS `personajesdecorativos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personajesdecorativos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `decoId` int NOT NULL,
  `personajeId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personajesdecorativos`
--

LOCK TABLES `personajesdecorativos` WRITE;
/*!40000 ALTER TABLE `personajesdecorativos` DISABLE KEYS */;
INSERT INTO `personajesdecorativos` VALUES (1,3,1,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(2,4,1,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(3,5,1,'2023-10-29 13:43:40','2023-10-29 13:43:40');
/*!40000 ALTER TABLE `personajesdecorativos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personas`
--

DROP TABLE IF EXISTS `personas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personas`
--

LOCK TABLES `personas` WRITE;
/*!40000 ALTER TABLE `personas` DISABLE KEYS */;
INSERT INTO `personas` VALUES (1,'Javier','Gimenez','23569924','2023-10-29 13:43:40','2023-10-29 13:43:40'),(2,'Silvia','Uzagasti','33333333','2023-10-29 13:43:40','2023-10-29 13:43:40'),(3,'Vanesa','Gonzalez','33333334','2023-10-29 13:43:40','2023-10-29 13:43:40'),(4,'Un contacto','Un Contacto','13333331','2023-10-29 13:43:40','2023-10-29 13:43:40'),(5,'Un fono','Un Fono','13333332','2023-10-29 13:43:40','2023-10-29 13:43:40'),(6,'Un contacto2','Un Contacto2','13333333','2023-10-29 13:43:40','2023-10-29 13:43:40'),(7,'Un contacto3','Un Contacto3','13333334','2023-10-29 13:43:40','2023-10-29 13:43:40');
/*!40000 ALTER TABLE `personas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comprarProductoId` int DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `imagenId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `hayAyudaSonora` int DEFAULT NULL,
  `ayudaSonoraId` int DEFAULT NULL,
  `permanenciaVisual` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,1,'aceite 1',105.2,20,'2023-10-29 13:43:40','2023-10-29 13:43:40',NULL,NULL,NULL),(2,1,'aceite 2',87.6,21,'2023-10-29 13:43:40','2023-10-29 13:43:40',NULL,NULL,NULL),(3,1,'aceite 3',125.7,22,'2023-10-29 13:43:40','2023-10-29 13:43:40',NULL,NULL,NULL),(10,10,'aceite F30',100,200,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,216,5),(11,10,'aceite F50plus',120,203,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,217,5),(12,10,'aceite F50',320,201,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,218,5),(13,11,'martillo1',100,204,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,216,5),(14,11,'martillo2',120,205,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,217,5),(15,11,'martillo3',320,206,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,218,5),(16,12,'ramillete1',100,207,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,216,5),(17,12,'ramillete2',120,208,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,217,5),(18,12,'ramillete3',320,209,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,218,5),(19,13,'paq.harina1',100,210,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,216,5),(20,13,'paq.harina2',120,211,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,217,5),(21,13,'paq.harina3',320,212,'2023-10-29 13:43:40','2023-10-29 13:43:40',1,218,5);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recorridos`
--

DROP TABLE IF EXISTS `recorridos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recorridos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `xInicial` int DEFAULT NULL,
  `yInicial` int DEFAULT NULL,
  `xAFinal` int DEFAULT NULL,
  `yAFinal` int DEFAULT NULL,
  `xBFinal` int DEFAULT NULL,
  `yBFinal` int DEFAULT NULL,
  `puntaje` int DEFAULT NULL,
  `actividadDisponibleId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `giroInicial` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recorridos`
--

LOCK TABLES `recorridos` WRITE;
/*!40000 ALTER TABLE `recorridos` DISABLE KEYS */;
INSERT INTO `recorridos` VALUES (1,6,3,-40,-70,-45,-80,400,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40',NULL),(10,18,10,160,252,170,257,400,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40',180),(11,256,144,335,27,342,34,400,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40',180),(12,340,42,50,261,60,287,400,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40',90),(13,227,288,68,93,70,98,400,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40',90);
/*!40000 ALTER TABLE `recorridos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rehabilitaciones`
--

DROP TABLE IF EXISTS `rehabilitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rehabilitaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fechaCreacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaRealizacion` datetime DEFAULT NULL,
  `realizada` tinyint(1) DEFAULT '0',
  `fonoaudiologoId` int NOT NULL,
  `pacienteId` int NOT NULL,
  `escenarioId` int NOT NULL,
  `dificultad` enum('bajo','medio','alto') NOT NULL DEFAULT 'bajo',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fechaHabilitadaDesde` datetime DEFAULT NULL,
  `fechaHabilitadaHasta` datetime DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rehabilitaciones`
--

LOCK TABLES `rehabilitaciones` WRITE;
/*!40000 ALTER TABLE `rehabilitaciones` DISABLE KEYS */;
INSERT INTO `rehabilitaciones` VALUES (1,'2023-10-29 13:43:40',NULL,0,1,1,1,'bajo','2023-10-29 13:43:40','2023-10-29 13:45:35',NULL,NULL,0),(2,'2023-10-29 13:43:40',NULL,0,1,2,2,'medio','2023-10-29 13:43:40','2023-10-29 13:43:40',NULL,NULL,1),(3,'2023-10-29 13:44:43',NULL,0,1,1,10,'bajo','2023-10-29 13:44:43','2023-10-29 13:45:46','2023-10-27 00:00:00','2023-10-31 00:00:00',1),(4,'2023-11-03 00:53:00','2023-11-03 01:48:20',1,1,1,10,'bajo','2023-11-03 00:53:00','2023-11-03 01:48:20','2023-10-31 00:00:00','2023-11-04 00:00:00',1),(5,'2023-11-03 01:52:38','2023-11-03 01:54:31',1,1,1,10,'bajo','2023-11-03 01:52:38','2023-11-03 01:54:31','2023-10-31 00:00:00','2023-11-10 00:00:00',1),(6,'2023-11-03 01:52:55',NULL,0,1,1,10,'bajo','2023-11-03 01:52:55','2023-11-03 01:52:55','2023-11-01 00:00:00','2023-11-09 00:00:00',1);
/*!40000 ALTER TABLE `rehabilitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultadosactividades`
--

DROP TABLE IF EXISTS `resultadosactividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultadosactividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ayudaAuditiva` tinyint(1) DEFAULT '0',
  `ayudaVisual` tinyint(1) DEFAULT '0',
  `completado` tinyint(1) DEFAULT '0',
  `inicio` datetime DEFAULT NULL,
  `finalizo` datetime DEFAULT NULL,
  `tiempoTranscurrido` int DEFAULT NULL,
  `actividadId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `actividadId` (`actividadId`),
  CONSTRAINT `resultadosactividades_ibfk_1` FOREIGN KEY (`actividadId`) REFERENCES `actividades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultadosactividades`
--

LOCK TABLES `resultadosactividades` WRITE;
/*!40000 ALTER TABLE `resultadosactividades` DISABLE KEYS */;
INSERT INTO `resultadosactividades` VALUES (1,0,0,0,'2022-09-20 00:00:00','2022-09-21 00:00:00',NULL,NULL,'2023-10-29 13:43:40','2023-10-29 13:43:40'),(2,0,0,1,'2023-10-29 13:46:48','2023-10-29 13:47:19',NULL,8,'2023-10-29 13:47:19','2023-10-29 13:47:19'),(3,0,0,1,'2023-10-29 13:50:22','2023-10-29 13:52:32',NULL,8,'2023-10-29 13:52:32','2023-10-29 13:52:32'),(4,0,0,1,'2023-10-29 13:53:31','2023-10-29 13:53:49',NULL,8,'2023-10-29 13:53:49','2023-10-29 13:53:49'),(5,0,0,1,'2023-11-03 00:54:46','2023-11-03 00:55:05',NULL,13,'2023-11-03 00:55:05','2023-11-03 00:55:05'),(6,0,0,1,'2023-11-03 01:01:25','2023-11-03 01:02:23',NULL,13,'2023-11-03 01:02:23','2023-11-03 01:02:23'),(7,0,0,1,'2023-11-03 01:40:51','2023-11-03 01:41:35',NULL,13,'2023-11-03 01:41:35','2023-11-03 01:41:35'),(8,0,0,1,'2023-11-03 01:44:56','2023-11-03 01:45:21',NULL,14,'2023-11-03 01:45:21','2023-11-03 01:45:21'),(9,0,0,1,'2023-11-03 01:48:02','2023-11-03 01:48:20',NULL,15,'2023-11-03 01:48:20','2023-11-03 01:48:20'),(10,0,0,1,'2023-11-03 01:54:11','2023-11-03 01:54:30',NULL,16,'2023-11-03 01:54:30','2023-11-03 01:54:30');
/*!40000 ALTER TABLE `resultadosactividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultadoscomprarproductos`
--

DROP TABLE IF EXISTS `resultadoscomprarproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultadoscomprarproductos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `equivocoSeleccion` tinyint(1) DEFAULT '0',
  `ordenQueSelecciono` varchar(255) DEFAULT '',
  `resultadoActividadId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cuando` int DEFAULT NULL,
  `productoId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultadoscomprarproductos`
--

LOCK TABLES `resultadoscomprarproductos` WRITE;
/*!40000 ALTER TABLE `resultadoscomprarproductos` DISABLE KEYS */;
INSERT INTO `resultadoscomprarproductos` VALUES (1,1,'1-2-x',1,'2023-10-29 13:43:40','2023-10-29 13:43:40',NULL,NULL),(2,0,'',2,'2023-10-29 13:47:19','2023-10-29 13:47:19',31,3),(3,0,'',3,'2023-10-29 13:52:32','2023-10-29 13:52:32',130,3),(4,0,'',4,'2023-10-29 13:53:49','2023-10-29 13:53:49',18,3),(5,0,'',5,'2023-11-03 00:55:05','2023-11-03 00:55:05',19,3),(6,0,'',6,'2023-11-03 01:02:23','2023-11-03 01:02:23',36,2),(7,0,'',6,'2023-11-03 01:02:23','2023-11-03 01:02:23',57,3),(8,0,'',7,'2023-11-03 01:41:35','2023-11-03 01:41:35',44,3),(9,0,'',8,'2023-11-03 01:45:21','2023-11-03 01:45:21',24,2),(10,0,'',8,'2023-11-03 01:45:21','2023-11-03 01:45:21',26,3),(11,0,'',9,'2023-11-03 01:48:20','2023-11-03 01:48:20',18,3),(12,0,'',10,'2023-11-03 01:54:30','2023-11-03 01:54:30',18,2),(13,0,'',10,'2023-11-03 01:54:30','2023-11-03 01:54:30',19,3);
/*!40000 ALTER TABLE `resultadoscomprarproductos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultadosrecorridos`
--

DROP TABLE IF EXISTS `resultadosrecorridos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultadosrecorridos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chocoElemento` tinyint(1) DEFAULT NULL,
  `chocoCasa` tinyint(1) DEFAULT NULL,
  `completo` tinyint(1) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `recorrioDistancia` int DEFAULT NULL,
  `recorrioTiempo` int DEFAULT NULL,
  `actividadId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultadosrecorridos`
--

LOCK TABLES `resultadosrecorridos` WRITE;
/*!40000 ALTER TABLE `resultadosrecorridos` DISABLE KEYS */;
INSERT INTO `resultadosrecorridos` VALUES (1,NULL,1,1,NULL,240,15,1,'2023-10-29 13:43:40','2023-10-29 13:43:40');
/*!40000 ALTER TABLE `resultadosrecorridos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20220924000010-create-obras-sociales.js'),('20220924000020-create-imagenes.js'),('20220924000040-create-decorativos-avatares.js'),('20220925002222-create-personas.js'),('20220925002223-create-contactos.js'),('20220925002224-create-familiares.js'),('20220925002225-create-cuentas.js'),('20220925002226-create-ingresos.js'),('20220925002227-create-fonoaudiologos.js'),('20220925003000-create-pacientes.js'),('20220925003010-create-evaluaciones-presenciales.js'),('20220926200146-create-personajes.js'),('20220930000010-create-escenarios.js'),('20220930000020-create-rehabilitaciones.js'),('20220930191327-create-actividadesDisponibles.js'),('20220930192054-create-comprar-productos.js'),('20221003031600-create-productos.js'),('20221004160806-create-recorridos.js'),('20221004161104-create-distractores-disponibles.js'),('20221004161134-create-distractores.js'),('20221004161150-actividades.js'),('20221004184734-create-resultados-actividades.js'),('20221004204706-create-resultados-comprar-productos.js'),('20221004210015-create-resultados-recorridos.js'),('20221011192801-create-grupo-decorativos.js'),('20221011192943-create-decorativos.js'),('20221011192944-create-personajes2.js'),('20221011193105-create-adquiridos.js'),('20221011202000-modificarTablaPersonajes.js'),('20221011215141-modificarTablaRehabilitaciones.js'),('20221017180908-modificarTablaDecorativos.js'),('20221029015332-ModificarTablaActividadesDisponibles.js'),('20221029030942-EscenarioAgregarDescripcion.js'),('20221121175432-modificaActividadesDisponibles.js'),('20221200000000-create-temptables.js'),('20221209145116-modificaPacientes.js'),('20221209174236-modificaRehabilitacion.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-02 23:10:38
