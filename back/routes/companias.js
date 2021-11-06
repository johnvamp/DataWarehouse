const sequelize = require("../conexion.js");

module.exports = {
	createCompania: async (req, res) => {
		const { nombre, direccion, email, telefono, id_ciudad } = req.body;
		const activo = 1;
		try {
			const companiaExistente = await sequelize.query("SELECT nombre FROM companias WHERE nombre=?", {
				replacements: [nombre],
				type: sequelize.QueryTypes.SELECT,
			});
			if (companiaExistente.length == 0) {
				try {
					const data = await sequelize.query(
						"INSERT INTO companias (nombre,direccion,email,telefono,id_ciudad,activo) VALUES (?,?,?,?,?,?)",
						{
							replacements: [nombre, direccion, email, telefono, id_ciudad, activo],
							type: sequelize.QueryTypes.INSERT,
						}
					);
					res.status(201).json({ msj: "Compañia creada exitosamente" });
				} catch (err) {
					console.log("error" + err);
				}
			} else {
				res.status(400).json({ msj: "Compañia existente - registrada" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},
	getCompania: async (req, res) => {
		try {
			const companiaCompleto = await sequelize.query(
				"SELECT companias.id_compania,companias.nombre,companias.direccion,companias.email,companias.telefono,companias.id_ciudad,ciudades.nombre AS nombre_ciudad,paises.id_pais,paises.nombre AS nombre_pais,regiones.id_region,regiones.nombre AS nombre_region FROM companias INNER JOIN ciudades ON companias.id_ciudad=ciudades.id_ciudad INNER JOIN paises ON ciudades.id_pais=paises.id_pais INNER JOIN regiones ON paises.id_region=regiones.id_region WHERE companias.activo=1",
				{
					type: sequelize.QueryTypes.SELECT,
				}
			);
			res.status(200).json(companiaCompleto);
		} catch (err) {
			console.log("error" + err);
		}
	},
	updateCompania: async (req, res) => {
		const { nombre, direccion, email, telefono, id_ciudad } = req.body;
		const idCompania = req.params.id_compania;
		try {
			const companiaExistente = await sequelize.query("SELECT id_compania FROM companias WHERE id_compania=?", {
				replacements: [idCompania],
				type: sequelize.QueryTypes.SELECT,
			});
			if (companiaExistente.length != 0) {
				if (nombre && direccion && email && telefono && id_ciudad) {
					try {
						const data = await sequelize.query(
							"UPDATE companias SET nombre=?, direccion=?, email=?, telefono=?, id_ciudad=? WHERE id_compania=?",
							{
								replacements: [nombre, direccion, email, telefono, id_ciudad, idCompania],
								type: sequelize.QueryTypes.UPDATE,
							}
						);
						console.log(data);
						res.status(200).json({ msj: "Compañia modificada exitosamente" });
					} catch (err) {
						console.log("error" + err);
					}
				} else {
					res.status(400).json({ msj: "Todos los campos deben estar completos" });
				}
			} else {
				res.status(400).json({ msj: "Id compañia erroneo - No se encuentra en Base de Datos" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},
	deleteCompania: async (req, res) => {
		const idCompania = req.params.id_compania;
		const activo = 0;
		try {
			const companyUse = await sequelize.query("SELECT id_compania FROM contactos WHERE id_compania=? AND activo=1 ", {
				replacements: [idCompania],
				type: sequelize.QueryTypes.SELECT,
			});
			if (companyUse.length == 0) {
				try {
					const companiaExistente = await sequelize.query("SELECT id_compania FROM companias WHERE id_compania=?", {
						replacements: [idCompania],
						type: sequelize.QueryTypes.SELECT,
					});
					if (companiaExistente.length != 0) {
						try {
							const data = await sequelize.query("UPDATE companias SET activo=? WHERE id_compania=?", {
								replacements: [activo, idCompania],
								type: sequelize.QueryTypes.UPDATE,
							});
							res.status(200).json({ msj: "Compañia desactivada exitosamente" });
						} catch (err) {
							console.log("error" + err);
						}
					} else {
						res.status(400).json({ msj: "Id compañia erroneo - No se encuentra en Base de Datos" });
					}
				} catch (err) {
					console.log("error" + err);
				}
			} else {
				res.status(400).json({ msj: "La compañia esta en uso, no esta permitido eliminarla" });
			}
		} catch (error) {
			console.log("error" + err);
		}
	},
};
