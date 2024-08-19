-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-08-2024 a las 06:48:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `chat_socket_io`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `chat_name` varchar(255) DEFAULT NULL,
  `is_group` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat_members`
--

CREATE TABLE `chat_members` (
  `chat_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `joined_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `group_invitations`
--

CREATE TABLE `group_invitations` (
  `id` int(11) NOT NULL,
  `chat_id` int(11) DEFAULT NULL,
  `inviter_id` int(11) DEFAULT NULL,
  `invitee_id` int(11) DEFAULT NULL,
  `invited_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','accepted','declined') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `chat_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `message` text NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `correo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `imagen`, `correo`, `password`, `estado`, `created_at`) VALUES
(1, 'Admin', 'userAdmin.jpg', 'admin@gmail.com', '$2b$12$V.RrJmFzGzDbtkNJRB.XpuDOva75Cakc4p9z80StiA/0kgpOhPqL6', 'activo', '2024-08-18 01:34:41'),
(4, 'Juan', NULL, 'juan@gmail.com', '$2b$12$qYmO5ivvCEgUdL4YdXf4e.0Cg3Q4Z0b8gVzZEI9p7UFPDyveS7C2W', 'activo', '2024-08-19 04:25:49'),
(5, 'Pepe', 'userAdmin.jpg', 'pepe@gmail.com', '$2b$12$vCa8qC5xSRP3IV1QwXGgbuTt/BEVMvTb8pB7yPCcedxQbCg.15pDe', 'activo', '2024-08-19 04:34:15'),
(6, 'Camilo', 'userAdmin.jpg', 'cami@gmail.com', '$2b$12$jxqGc66oB5f9bsfjwurf0OPloNHW.NIFj/XSwSFYoSZGG5JJYO5ri', 'activo', '2024-08-19 04:44:50'),
(7, 'Song', 'background.jpg', 'song@gmail.com', '$2b$12$xx7oJuiNa6tRU41nsjKEM.1XZR3YC7XNGFCZS7rPoDPuMfL8x0zUu', 'activo', '2024-08-19 04:45:32');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `chat_members`
--
ALTER TABLE `chat_members`
  ADD PRIMARY KEY (`chat_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `group_invitations`
--
ALTER TABLE `group_invitations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_id` (`chat_id`),
  ADD KEY `inviter_id` (`inviter_id`),
  ADD KEY `invitee_id` (`invitee_id`);

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_id` (`chat_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `group_invitations`
--
ALTER TABLE `group_invitations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `chat_members`
--
ALTER TABLE `chat_members`
  ADD CONSTRAINT `chat_members_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`),
  ADD CONSTRAINT `chat_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `group_invitations`
--
ALTER TABLE `group_invitations`
  ADD CONSTRAINT `group_invitations_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`),
  ADD CONSTRAINT `group_invitations_ibfk_2` FOREIGN KEY (`inviter_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `group_invitations_ibfk_3` FOREIGN KEY (`invitee_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
