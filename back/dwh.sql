--
-- Base de datos: `dwh`
--

CREATE DATABASE  IF NOT EXISTS `data_warehouse`;
USE `data_warehouse`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--
-- Table structure for table `usuarios`
DROP TABLE IF EXISTS `ciudades`;

CREATE TABLE `ciudades` (
  `id_ciudad` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `id_pais` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id_ciudad`, `nombre`, `id_pais`, `activo`) VALUES
(1, 'Buenos Aires', 1, 1),
(2, 'Cordoba', 1, 1),
(3, 'Bogota', 2, 1),
(4, 'Cucuta', 2, 1),
(5, 'Medellin', 2, 1),
(6, 'Atacama', 3, 1),
(7, 'Santiago de Chile', 3, 1),
(8, 'Valparaiso', 3, 1),
(9, 'Canelones', 4, 1),
(10, 'Maldonado', 4, 1),
(11, 'Montevideo', 4, 1),
(12, 'Ciudad de Mexico', 5, 1),
(13, 'Tijuana', 5, 1),
(14, 'Florida', 6, 1),
(15, 'Texas', 6, 1),
(16, 'Tocumen', 7, 1),
(17, 'Tucuman', 1, 1),
(18, 'La Paz', 8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companias`
--
-- Table structure for table `usuarios`
DROP TABLE IF EXISTS `companias`;

CREATE TABLE `companias` (
  `id_compania` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(30) NOT NULL,
  `id_ciudad` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `companias`
--

INSERT INTO `companias` (`id_compania`, `nombre`, `direccion`, `email`, `telefono`, `id_ciudad`, `activo`) VALUES
(1, 'Arquitectos Colon', 'Colon 2600', 'arquecolon@gmail.com', '3514852374', 2, 1),
(2, 'Nestlé', 'Cll 15 # 56-94', 'info@nestle.com', '03514859632', 2, 1),
(3, 'Canon', 'Cra 5 # 32-97', 'fotoscanon@canon.com', '3516521498', 8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--
-- Table structure for table `usuarios`
DROP TABLE IF EXISTS `contactos`;

CREATE TABLE `contactos` (
  `id_contacto` int(11) NOT NULL,
  `p_nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `id_compania` int(11) NOT NULL,
  `id_ciudad` int(11) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `interes` int(11) DEFAULT NULL,
  `telefono_compania` varchar(100) DEFAULT NULL,
  `telefono_personal` int(11) NOT NULL,
  `whatsapp_compania` varchar(100) DEFAULT NULL,
  `whatsapp_personal` int(11) NOT NULL,
  `instagram_compania` varchar(100) DEFAULT NULL,
  `instagram_personal` int(11) NOT NULL,
  `facebook_compania` varchar(100) DEFAULT NULL,
  `facebook_personal` int(11) NOT NULL,
  `linkedin_compania` varchar(100) DEFAULT NULL,
  `linkedin_personal` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id_contacto`, `p_nombre`, `apellido`, `cargo`, `email`, `id_compania`, `id_ciudad`, `direccion`, `interes`, `telefono_compania`, `telefono_personal`, `whatsapp_compania`, `whatsapp_personal`, `instagram_compania`, `instagram_personal`, `facebook_compania`, `facebook_personal`, `linkedin_compania`, `linkedin_personal`, `activo`) VALUES
(3, 'Pepe', 'Puerta', 'Gerente', 'pepepuerta@gmail.com', 1, 2, 'Roma 420', 75, '0351-4852341', 1, '351-3695218', 2, '@pepePuerta', 3, 'darppuertaena', 3, 'pepe.puerta', 2, 1),
(4, 'Esperanza', 'Gomez', 'Vendedor', 'panchagomez@picapiedra.com', 1, 12, 'Cordoba 3250', 75, '', 1, '', 1, '', 1, '', 1, '', 1, 1),
(5, 'Carlos', 'Duque', 'Operario', 'charlie@duque.com.ar', 2, 14, 'Colon 6200', 100, '', 1, '', 1, '', 1, '', 1, '', 1, 1),
(7, 'Juan', 'Valdez', 'Contador', 'elchavo@arcor.com', 2, 11, '9 de julio 620', 50, '', 1, '3513332255', 2, '', 1, '', 1, '', 1, 1),
(10, 'Aquiles', 'Bailo', 'Portero', 'aquiles@bailo.com', 3, 13, '', 50, '0365-5412398', 1, '3516778899', 1, '@panchos', 1, 'panchos-lalo', 1, '', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--
-- Table structure for table `usuarios`
DROP TABLE IF EXISTS `paises`;
CREATE TABLE `paises` (
  `id_pais` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_region` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`id_pais`, `nombre`, `id_region`, `activo`) VALUES
(1, 'Argentina', 1, 1),
(2, 'Colombia', 1, 1),
(3, 'Chile', 1, 1),
(4, 'Uruguay', 1, 1),
(5, 'Mexico', 2, 1),
(6, 'Estados Unidos', 2, 1),
(7, 'Panama', 3, 1),
(8, 'Bolivia', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferencias`
--
DROP TABLE IF EXISTS `preferencias`;
CREATE TABLE `preferencias` (
  `id_preferencia` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `preferencias`
--

INSERT INTO `preferencias` (`id_preferencia`, `nombre`) VALUES
(2, 'Canal favorito'),
(3, 'No molestar'),
(1, 'Sin preferencia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regiones`
--
DROP TABLE IF EXISTS `regiones`;
CREATE TABLE `regiones` (
  `id_region` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `regiones`
--

INSERT INTO `regiones` (`id_region`, `nombre`, `activo`) VALUES
(1, 'Sudamerica', 1),
(2, 'Norteamerica', 1),
(3, 'Centroamerica', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `p_nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `clave` varchar(50) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `p_nombre`, `apellido`, `email`, `clave`, `admin`, `activo`) VALUES
(1, 'Pepe', 'Puerta', 'pepepuerta@gmail.com', 'pepepuerta', 1, 1),
(2, 'Alirio', 'Penagos', 'alipena@gmail.com', 'alipena', 0, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id_ciudad`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `id_pais` (`id_pais`);

--
-- Indices de la tabla `companias`
--
ALTER TABLE `companias`
  ADD PRIMARY KEY (`id_compania`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD KEY `id_ciudad` (`id_ciudad`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id_contacto`),
  ADD KEY `id_compania` (`id_compania`),
  ADD KEY `id_ciudad` (`id_ciudad`),
  ADD KEY `contactos_ibfk_3` (`telefono_personal`),
  ADD KEY `contactos_ibfk_4` (`whatsapp_personal`),
  ADD KEY `contactos_ibfk_5` (`instagram_personal`),
  ADD KEY `contactos_ibfk_6` (`facebook_personal`),
  ADD KEY `contactos_ibfk_7` (`linkedin_personal`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id_pais`),
  ADD KEY `id_region` (`id_region`);

--
-- Indices de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  ADD PRIMARY KEY (`id_preferencia`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `regiones`
--
ALTER TABLE `regiones`
  ADD PRIMARY KEY (`id_region`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id_ciudad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `companias`
--
ALTER TABLE `companias`
  MODIFY `id_compania` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `id_pais` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  MODIFY `id_preferencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `regiones`
--
ALTER TABLE `regiones`
  MODIFY `id_region` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `ciudades_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`);

--
-- Filtros para la tabla `companias`
--
ALTER TABLE `companias`
  ADD CONSTRAINT `companias_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`);

--
-- Filtros para la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD CONSTRAINT `contactos_ibfk_1` FOREIGN KEY (`id_compania`) REFERENCES `companias` (`id_compania`),
  ADD CONSTRAINT `contactos_ibfk_2` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`),
  ADD CONSTRAINT `contactos_ibfk_3` FOREIGN KEY (`telefono_personal`) REFERENCES `preferencias` (`id_preferencia`),
  ADD CONSTRAINT `contactos_ibfk_4` FOREIGN KEY (`whatsapp_personal`) REFERENCES `preferencias` (`id_preferencia`),
  ADD CONSTRAINT `contactos_ibfk_5` FOREIGN KEY (`instagram_personal`) REFERENCES `preferencias` (`id_preferencia`),
  ADD CONSTRAINT `contactos_ibfk_6` FOREIGN KEY (`facebook_personal`) REFERENCES `preferencias` (`id_preferencia`),
  ADD CONSTRAINT `contactos_ibfk_7` FOREIGN KEY (`linkedin_personal`) REFERENCES `preferencias` (`id_preferencia`);

--
-- Filtros para la tabla `paises`
--
ALTER TABLE `paises`
  ADD CONSTRAINT `paises_ibfk_1` FOREIGN KEY (`id_region`) REFERENCES `regiones` (`id_region`);
COMMIT;
