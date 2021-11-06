const sequelize = require("../conexion");
const jwt = require("jsonwebtoken");
const tokenKey = "keyParaEncriptacionJWToken";

module.exports = {
	crearUsuario: async (req, res) => {
		const { p_nombre, apellido, email, clave, admin } = req.body;
		const activo = 1;
		try {
			const usuarioExistente = await sequelize.query("SELECT email FROM usuarios WHERE email=?", {
				replacements: [email],
				type: sequelize.QueryTypes.SELECT,
			});
			if (usuarioExistente.length == 0) {
				try {
					const data = await sequelize.query(
						"INSERT INTO usuarios (p_nombre,apellido,email,clave,admin,activo) VALUES (?,?,?,?,?,?)",
						{
							replacements: [p_nombre, apellido, email, clave, admin, activo],
							type: sequelize.QueryTypes.INSERT,
						}
					);
					res.status(201).json({ msj: "Usuario creado exitosamente" });
				} catch (err) {
					console.log("error" + err);
				}
			} else {
				res.status(400).json({ msj: "Usuario existente - Correo registrado" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},

	logIn: async (req, res) => {
		const { email, clave } = req.body;
		try {
			const data = await sequelize.query("SELECT * FROM usuarios WHERE email=? AND clave=?", {
				replacements: [email, clave],
				type: sequelize.QueryTypes.SELECT,
			});
			if (data.length == 0) {
				res.status(401).json({ msj: "Error en LogIn" });
			} else {
				const dataToken = {
					id_usuario: data[0].id_usuario,
					email: data[0].email,
					p_nombre: data[0].p_nombre,
					apellido: data[0].apellido,
					admin: data[0].admin,
				};
				infoToken = jwt.sign(dataToken, tokenKey, { expiresIn: "365d" });
				//console.log(infoToken);
				//console.log(dataToken);
				res.status(200).json({ msj: "Usuario logueado exitosamente", token: infoToken, admin: data[0].admin });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},

	getUsuario: async (req, res) => {
		try {
			const usuarioCompleto = await sequelize.query(
				"SELECT id_usuario,p_nombre,apellido,email,admin FROM usuarios WHERE activo=1",
				{
					type: sequelize.QueryTypes.SELECT,
				}
			);
			res.status(200).json(usuarioCompleto);
		} catch (err) {
			console.log("error" + err);
		}
	},
	updateUsuario: async (req, res) => {
		const { p_nombre, apellido, email, clave } = req.body;
		const admin = req.body.admin ? req.body.admin : 0;
		const idUsuario = req.params.id_usuario;
		try {
			const usuarioExistente = await sequelize.query("SELECT id_usuario FROM usuarios WHERE id_usuario=?", {
				replacements: [idUsuario],
				type: sequelize.QueryTypes.SELECT,
			});
			if (usuarioExistente.length != 0) {
				if (p_nombre && apellido && email && clave) {
					try {
						const data = await sequelize.query(
							"UPDATE usuarios SET p_nombre=?, apellido=?, email=?, clave=?,admin=? WHERE id_usuario=?",
							{
								replacements: [p_nombre, apellido, email, clave, admin, idUsuario],
								type: sequelize.QueryTypes.UPDATE,
							}
						);
						console.log(data);
						res.status(200).json({ msj: "Usuario modificado exitosamente" });
					} catch (err) {
						console.log("error" + err);
					}
				} else {
					res.status(400).json({ msj: "Todos los campos deben estar completos" });
				}
			} else {
				res.status(400).json({ msj: "Id usuario erroneo - No se encuentra en Base de Datos" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},
	deleteUsuario: async (req, res) => {
		const idUsuario = req.params.id_usuario;
		const activo = 0;
		try {
			const productoExistente = await sequelize.query("SELECT id_usuario FROM usuarios WHERE id_usuario=?", {
				replacements: [idUsuario],
				type: sequelize.QueryTypes.SELECT,
			});
			if (productoExistente.length != 0) {
				try {
					const data = await sequelize.query("UPDATE usuarios SET activo=? WHERE id_usuario=?", {
						replacements: [activo, idUsuario],
						type: sequelize.QueryTypes.UPDATE,
					});
					res.status(200).json({ msj: "Usuario desactivado exitosamente" });
				} catch (err) {
					console.log("error" + err);
				}
			} else {
				res.status(400).json({ msj: "Id usuario erroneo - No se encuentra en Base de Datos" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},
};
