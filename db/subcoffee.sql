-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 04, 2024 at 10:36 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_subcoffee`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `pk_id_chat` int NOT NULL,
  `mensaje_chat` varchar(255) NOT NULL,
  `fecha_chat` date NOT NULL,
  `fk_id_subasta` int NOT NULL,
  `fk_id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `finca`
--

CREATE TABLE `finca` (
  `pk_id_fin` int NOT NULL,
  `nombre_fin` varchar(50) NOT NULL,
  `ubicacion_fin` varchar(255) NOT NULL,
  `imagen_fin` blob NOT NULL,
  `descripcion_fin` varchar(255) NOT NULL,
  `departamento_fin` varchar(50) NOT NULL,
  `municipio_fin` varchar(50) NOT NULL,
  `fk_id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notificaciones`
--

CREATE TABLE `notificaciones` (
  `pk_id_not` int NOT NULL,
  `tipo_not` enum('oferta','mensaje','cierre') NOT NULL,
  `fecha_not` date NOT NULL,
  `texto_not` varchar(255) NOT NULL,
  `fk_id_subasta` int NOT NULL,
  `fk_id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `postulacion`
--

CREATE TABLE `postulacion` (
  `pk_id_pos` int NOT NULL,
  `fecha_pos` date NOT NULL,
  `estado_pos` enum('aceptada','rechazada') NOT NULL,
  `monto_inicial_pos` int NOT NULL,
  `sentimiento_pos` enum('positivo','neutro','negativo') NOT NULL,
  `oferta_pos` int NOT NULL,
  `fk_id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produccion`
--

CREATE TABLE `produccion` (
  `pk_id_pro` int NOT NULL,
  `cantidad_pro` int NOT NULL,
  `fk_id_variedad` int NOT NULL,
  `fk_id_finca` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seguimiento`
--

CREATE TABLE `seguimiento` (
  `pk_id_seg` int NOT NULL,
  `certificacion_seg` enum('certificado','sin certificacion') NOT NULL,
  `puntuacion_seg` varchar(255) NOT NULL,
  `fecha_seg` date NOT NULL,
  `imagen_seg` blob NOT NULL,
  `fk_id_postulacion` int NOT NULL,
  `fk_id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subasta`
--

CREATE TABLE `subasta` (
  `pk_id_sub` int NOT NULL,
  `fecha_inicio_sub` date NOT NULL,
  `fecha_fin_sub` date NOT NULL,
  `precio_final_sub` int NOT NULL,
  `estado_sub` enum('abierta','cerrada') NOT NULL,
  `fk_id_produccion` int NOT NULL,
  `fk_id_postulacion` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `pk_cedula_user` int NOT NULL,
  `nombre_user` varchar(100) NOT NULL,
  `email_user` varchar(100) NOT NULL,
  `password_user` char(50) NOT NULL,
  `rol_user` enum('vendedor','comprador') NOT NULL,
  `descripcion_user` varchar(255) NOT NULL,
  `imagen_user` blob NOT NULL,
  `telefono_user` varchar(12) NOT NULL,
  `fecha_nacimiento_user` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `variedad`
--

CREATE TABLE `variedad` (
  `pk_id_vari` int NOT NULL,
  `tipo_vari` enum('Tipica','Borbon','Maragogipe','Tabi','Caturro','Variedad Colombia', 'Pergamino', 'Catimore', 'Chapola', 'Castillo', 'Supremo', 'Tambo', 'Geisha', 'Catuay', 'Bourboun Rosado', 'Papayo') NOT NULL,
  `descripcion_vari` varchar(255) NOT NULL,
  `imagen_vari` blob NOT NULL,
  `puntuacion_vari` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`pk_id_chat`),
  ADD KEY `subastac` (`fk_id_subasta`),
  ADD KEY `chatUser` (`fk_id_usuario`);

--
-- Indexes for table `finca`
--
ALTER TABLE `finca`
  ADD PRIMARY KEY (`pk_id_fin`),
  ADD KEY `fincaUser` (`fk_id_usuario`);

--
-- Indexes for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`pk_id_not`),
  ADD KEY `subastaNo` (`fk_id_subasta`),
  ADD KEY `notificacionUser` (`fk_id_usuario`);

--
-- Indexes for table `postulacion`
--
ALTER TABLE `postulacion`
  ADD PRIMARY KEY (`pk_id_pos`),
  ADD KEY `PostulaUser` (`fk_id_usuario`);

--
-- Indexes for table `produccion`
--
ALTER TABLE `produccion`
  ADD PRIMARY KEY (`pk_id_pro`),
  ADD KEY `produccionvariedad` (`fk_id_variedad`),
  ADD KEY `produccionFin` (`fk_id_finca`);

--
-- Indexes for table `seguimiento`
--
ALTER TABLE `seguimiento`
  ADD PRIMARY KEY (`pk_id_seg`),
  ADD KEY `postulaSegui` (`fk_id_postulacion`),
  ADD KEY `SeguimiUser` (`fk_id_usuario`);

--
-- Indexes for table `subasta`
--
ALTER TABLE `subasta`
  ADD PRIMARY KEY (`pk_id_sub`),
  ADD KEY `subastaPo` (`fk_id_postulacion`),
  ADD KEY `subastaPro` (`fk_id_produccion`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`pk_cedula_user`);

--
-- Indexes for table `variedad`
--
ALTER TABLE `variedad`
  ADD PRIMARY KEY (`pk_id_vari`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `pk_id_chat` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `finca`
--
ALTER TABLE `finca`
  MODIFY `pk_id_fin` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `pk_id_not` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `postulacion`
--
ALTER TABLE `postulacion`
  MODIFY `pk_id_pos` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produccion`
--
ALTER TABLE `produccion`
  MODIFY `pk_id_pro` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seguimiento`
--
ALTER TABLE `seguimiento`
  MODIFY `pk_id_seg` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subasta`
--
ALTER TABLE `subasta`
  MODIFY `pk_id_sub` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `pk_cedula_user` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `variedad`
--
ALTER TABLE `variedad`
  MODIFY `pk_id_vari` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chatUser` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`pk_cedula_user`),
  ADD CONSTRAINT `subastac` FOREIGN KEY (`fk_id_subasta`) REFERENCES `subasta` (`pk_id_sub`);

--
-- Constraints for table `finca`
--
ALTER TABLE `finca`
  ADD CONSTRAINT `fincaUser` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`pk_cedula_user`);

--
-- Constraints for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificacionUser` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`pk_cedula_user`),
  ADD CONSTRAINT `subastaNo` FOREIGN KEY (`fk_id_subasta`) REFERENCES `subasta` (`pk_id_sub`);

--
-- Constraints for table `postulacion`
--
ALTER TABLE `postulacion`
  ADD CONSTRAINT `PostulaUser` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`pk_cedula_user`);

--
-- Constraints for table `produccion`
--
ALTER TABLE `produccion`
  ADD CONSTRAINT `produccionFin` FOREIGN KEY (`fk_id_finca`) REFERENCES `finca` (`pk_id_fin`),
  ADD CONSTRAINT `produccionvariedad` FOREIGN KEY (`fk_id_variedad`) REFERENCES `variedad` (`pk_id_vari`);

--
-- Constraints for table `seguimiento`
--
ALTER TABLE `seguimiento`
  ADD CONSTRAINT `postulaSegui` FOREIGN KEY (`fk_id_postulacion`) REFERENCES `postulacion` (`pk_id_pos`),
  ADD CONSTRAINT `SeguimiUser` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`pk_cedula_user`);

--
-- Constraints for table `subasta`
--
ALTER TABLE `subasta`
  ADD CONSTRAINT `subastaPo` FOREIGN KEY (`fk_id_postulacion`) REFERENCES `postulacion` (`pk_id_pos`),
  ADD CONSTRAINT `subastaPro` FOREIGN KEY (`fk_id_produccion`) REFERENCES `produccion` (`pk_id_pro`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
