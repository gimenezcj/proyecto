-- gama_database_development.adquiridos definition

CREATE TABLE `adquiridos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nroPieza` int DEFAULT NULL,
  `personajeId` int NOT NULL,
  `grupoDecorativoId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.distractores definition

CREATE TABLE `distractores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orden` int DEFAULT NULL,
  `recorridoId` int DEFAULT NULL,
  `distractorDisponibleId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.distractoresDisponibles definition

CREATE TABLE `distractoresDisponibles` (
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


-- gama_database_development.grupoDecorativos definition

CREATE TABLE `grupoDecorativos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.imagenes definition

CREATE TABLE `imagenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombreArchivo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.ingresos definition

CREATE TABLE `ingresos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fechaHora` datetime DEFAULT NULL,
  `cuentaId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.obrasSociales definition

CREATE TABLE `obrasSociales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.personajesDecorativos definition

CREATE TABLE `personajesDecorativos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `decoId` int NOT NULL,
  `personajeId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.personas definition

CREATE TABLE `personas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.recorridos definition

CREATE TABLE `recorridos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `xInicial` int DEFAULT NULL,
  `yInicial` int DEFAULT NULL,
  `xAFinal` int DEFAULT NULL,
  `yAFinal` int DEFAULT NULL,
  `xBFinal` int DEFAULT NULL,
  `yBFinal` int DEFAULT NULL,
  `puntaje` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `giroInicial` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.contactos definition

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


-- gama_database_development.cuentas definition

CREATE TABLE `cuentas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clave` varchar(255) DEFAULT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `personaId` int DEFAULT NULL,
  `imagenId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `personaId` (`personaId`),
  KEY `imagenId` (`imagenId`),
  CONSTRAINT `cuentas_ibfk_1` FOREIGN KEY (`personaId`) REFERENCES `personas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `cuentas_ibfk_2` FOREIGN KEY (`imagenId`) REFERENCES `imagenes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.decorativos definition

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
  CONSTRAINT `decorativos_ibfk_1` FOREIGN KEY (`grupoDecorativoId`) REFERENCES `grupoDecorativos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `decorativos_ibfk_2` FOREIGN KEY (`baseId`) REFERENCES `imagenes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `decorativos_ibfk_3` FOREIGN KEY (`auxiliarId`) REFERENCES `imagenes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.decorativosAvatares definition

CREATE TABLE `decorativosAvatares` (
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
  CONSTRAINT `decorativosAvatares_ibfk_1` FOREIGN KEY (`imagenId`) REFERENCES `imagenes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.escenarios definition

CREATE TABLE `escenarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `sueloPlanoId` int NOT NULL,
  `sueloColisionId` int NOT NULL,
  `fondoId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `escenarios_imagenes_FK` (`sueloPlanoId`),
  KEY `escenarios_imagenes_FK_1` (`sueloColisionId`),
  KEY `escenarios_imagenes_FK_2` (`fondoId`),
  CONSTRAINT `escenarios_imagenes_FK` FOREIGN KEY (`sueloPlanoId`) REFERENCES `imagenes` (`id`),
  CONSTRAINT `escenarios_imagenes_FK_1` FOREIGN KEY (`sueloColisionId`) REFERENCES `imagenes` (`id`),
  CONSTRAINT `escenarios_imagenes_FK_2` FOREIGN KEY (`fondoId`) REFERENCES `imagenes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.familiares definition

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


-- gama_database_development.fonoaudiologos definition

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


-- gama_database_development.pacientes definition

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
  CONSTRAINT `pacientes_ibfk_2` FOREIGN KEY (`obraSocialId`) REFERENCES `obrasSociales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pacientes_ibfk_3` FOREIGN KEY (`fonoaudiologoId`) REFERENCES `fonoaudiologos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.personajes definition

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


-- gama_database_development.rehabilitaciones definition

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
  PRIMARY KEY (`id`),
  KEY `rehabilitaciones_escenarios_FK` (`escenarioId`),
  KEY `rehabilitaciones_fonoaudiologos_FK` (`fonoaudiologoId`),
  KEY `rehabilitaciones_pacientes_FK` (`pacienteId`),
  CONSTRAINT `rehabilitaciones_escenarios_FK` FOREIGN KEY (`escenarioId`) REFERENCES `escenarios` (`id`),
  CONSTRAINT `rehabilitaciones_fonoaudiologos_FK` FOREIGN KEY (`fonoaudiologoId`) REFERENCES `fonoaudiologos` (`id`),
  CONSTRAINT `rehabilitaciones_pacientes_FK` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.actividadesDisponibles definition

CREATE TABLE `actividadesDisponibles` (
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
  PRIMARY KEY (`id`),
  KEY `actividadesDisponibles_recorridos_FK` (`recorridoId`),
  KEY `actividadesDisponibles_escenarios_FK` (`escenarioId`),
  KEY `actividadesDisponibles_imagenes_FK` (`estimuloAuditivoId`),
  CONSTRAINT `actividadesDisponibles_escenarios_FK` FOREIGN KEY (`escenarioId`) REFERENCES `escenarios` (`id`),
  CONSTRAINT `actividadesDisponibles_imagenes_FK` FOREIGN KEY (`estimuloAuditivoId`) REFERENCES `imagenes` (`id`),
  CONSTRAINT `actividadesDisponibles_recorridos_FK` FOREIGN KEY (`recorridoId`) REFERENCES `recorridos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.comprarProductos definition

CREATE TABLE `comprarProductos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `actividadId` int DEFAULT NULL,
  `cantidadItems` int DEFAULT NULL,
  `estimuloAuditivo` tinyint(1) DEFAULT NULL,
  `estimuloVisual` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `comprarProductos_actividadesDisponibles_FK` FOREIGN KEY (`id`) REFERENCES `actividadesDisponibles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.evaluacionesPresenciales definition

CREATE TABLE `evaluacionesPresenciales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `dificultad` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pacienteId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pacienteId` (`pacienteId`),
  CONSTRAINT `evaluacionesPresenciales_ibfk_1` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.productos definition

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
  PRIMARY KEY (`id`),
  KEY `productos_comprarProductos_FK` (`comprarProductoId`),
  KEY `productos_imagenes_FK` (`imagenId`),
  KEY `productos_imagenes_FK_1` (`ayudaSonoraId`),
  CONSTRAINT `productos_comprarProductos_FK` FOREIGN KEY (`comprarProductoId`) REFERENCES `comprarProductos` (`id`),
  CONSTRAINT `productos_imagenes_FK` FOREIGN KEY (`imagenId`) REFERENCES `imagenes` (`id`),
  CONSTRAINT `productos_imagenes_FK_1` FOREIGN KEY (`ayudaSonoraId`) REFERENCES `imagenes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.actividades definition

CREATE TABLE `actividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rehabilitacionId` int NOT NULL,
  `actividadDisponibleId` int NOT NULL,
  `orden` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `actividades_actividadesDisponibles_FK` (`actividadDisponibleId`),
  KEY `actividades_rehabilitaciones_FK` (`rehabilitacionId`),
  CONSTRAINT `actividades_actividadesDisponibles_FK` FOREIGN KEY (`actividadDisponibleId`) REFERENCES `actividadesDisponibles` (`id`),
  CONSTRAINT `actividades_rehabilitaciones_FK` FOREIGN KEY (`rehabilitacionId`) REFERENCES `rehabilitaciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.resultadosActividades definition

CREATE TABLE `resultadosActividades` (
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
  KEY `resultadosActividades_actividades_FK` (`actividadId`),
  CONSTRAINT `resultadosActividades_actividades_FK` FOREIGN KEY (`actividadId`) REFERENCES `actividades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=270 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.resultadosComprarProductos definition

CREATE TABLE `resultadosComprarProductos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `equivocoSeleccion` tinyint(1) DEFAULT '0',
  `ordenQueSelecciono` varchar(255) DEFAULT '',
  `resultadoActividadId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cuando` int DEFAULT NULL COMMENT 'Es en que segundo',
  `productoId` int DEFAULT NULL,
  `opcionCorrecta` int unsigned DEFAULT NULL COMMENT 'cual del listadaItems es el correcto',
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFinaliza` datetime DEFAULT NULL,
  `abandono` tinyint(1) DEFAULT '0',
  `segundosQueSelecciono` varchar(255) DEFAULT '',
  `listaItems` varchar(30) DEFAULT '',
  `completo` tinyint(1) DEFAULT '0',
  `ayudaVisual` varchar(100) DEFAULT '' COMMENT 'Lista en segundo del pedido de ayuda visual',
  `ayudaSonora` varchar(100) DEFAULT '' COMMENT 'Lista en segundo cuando solicito la ayuda sonora',
  PRIMARY KEY (`id`),
  KEY `resultadosComprarProductos_resultadosActividades_FK` (`resultadoActividadId`),
  KEY `resultadosComprarProductos_productos_FK` (`productoId`),
  CONSTRAINT `resultadosComprarProductos_productos_FK` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`),
  CONSTRAINT `resultadosComprarProductos_resultadosActividades_FK` FOREIGN KEY (`resultadoActividadId`) REFERENCES `resultadosActividades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gama_database_development.resultadosRecorridos definition

CREATE TABLE `resultadosRecorridos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chocoElemento` tinyint(1) DEFAULT '0',
  `chocoCasa` tinyint(1) DEFAULT '0',
  `completo` tinyint(1) DEFAULT '0',
  `fecha` datetime DEFAULT NULL,
  `recorrioDistancia` int DEFAULT '0',
  `recorrioTiempo` int DEFAULT '0',
  `actividadId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sinCombustible` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `resultadosRecorridos_resultadosActividades_FK` (`actividadId`),
  CONSTRAINT `resultadosRecorridos_resultadosActividades_FK` FOREIGN KEY (`actividadId`) REFERENCES `resultadosActividades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=347 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;