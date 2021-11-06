const jwt = require("jsonwebtoken");
const tokenKey = "keyParaEncriptacionJWToken";

module.exports = {
	validarDatosUsuario: (req, res, next) => {
		if (req.body.p_nombre && req.body.apellido && req.body.email && req.body.clave) {
			next();
		} else {
			res.status(400).json({ msj: "Todos los campos deben estar completos" });
		}
	},
	validarDatosCompania: (req, res, next) => {
		if (req.body.nombre && req.body.direccion && req.body.email && req.body.telefono && req.body.id_ciudad) {
			next();
		} else {
			res.status(400).json({ msj: "Todos los campos deben estar completos" });
		}
	},
	validarDatosContacto: (req, res, next) => {
		if (req.body.p_nombre && req.body.apellido && req.body.cargo && req.body.email && req.body.id_compania) {
			next();
		} else {
			res.status(400).json({ msj: "Los campos obligatorios deben estar completos" });
		}
	},
	validarDatosCiudad: (req, res, next) => {
		if (req.body.nombre && req.body.id_pais) {
			next();
		} else {
			res.status(400).json({ msj: "Todos los campos deben estar completos" });
		}
	},
	validarDatosPais: (req, res, next) => {
		if (req.body.nombre && req.body.id_region) {
			next();
		} else {
			res.status(400).json({ msj: "Todos los campos deben estar completos" });
		}
	},
	validarDatosRegion: (req, res, next) => {
		if (req.body.nombre) {
			next();
		} else {
			res.status(400).json({ msj: "Todos los campos deben estar completos" });
		}
	},
	validacionJWT: (req, res, next) => {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const verificarToken = jwt.verify(token, tokenKey);
			if (verificarToken) {
				req.infoToken = verificarToken;
				return next();
			}
		} catch (error) {
			res.status(401).json({ msj: "Error al validar usuario" });
		}
	},
	validacionJWTAdmin: (req, res, next) => {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const verificarToken = jwt.verify(token, tokenKey);
			if (verificarToken) {
				req.infoToken = verificarToken;
				if (req.infoToken.admin == true) {
					return next();
				} else {
					res.status(401).json({ msj: "Solo acceso Administrador" });
				}
			}
		} catch (error) {
			res.status(401).json({ msj: "Error al validar usuario" });
		}
	},
};
