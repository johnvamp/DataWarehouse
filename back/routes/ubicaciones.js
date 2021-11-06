const sequelize = require("../conexion.js");

module.exports = {
	crearCiudad: async (req, res) => {
		const { nombre, id_pais } = req.body;
		const activo = 1;
		try {
			const ciudadExistente = await sequelize.query("SELECT nombre FROM ciudades WHERE nombre=?", {
				replacements: [nombre],
				type: sequelize.QueryTypes.SELECT,
			});
			if (ciudadExistente.length == 0) {
				try {
					const data = await sequelize.query("INSERT INTO ciudades (nombre,id_pais,activo) VALUES (?,?,?)", {
						replacements: [nombre, id_pais, activo],
						type: sequelize.QueryTypes.INSERT,
					});
					res.status(201).json({ msj: "Ciudad creada exitosamente" });
				} catch (err) {
					console.log("error" + err);
				}
			} else {
				res.status(400).json({ msj: "Ciudad existente - registrada" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},
	crearPais: async (req, res) => {
		const { nombre, id_region } = req.body;
		const activo = 1;
		try {
			const paisExistente = await sequelize.query("SELECT nombre FROM paises WHERE nombre=?", {
				replacements: [nombre],
				type: sequelize.QueryTypes.SELECT,
			});
			if (paisExistente.length == 0) {
				try {
					const data = await sequelize.query("INSERT INTO paises (nombre,id_region,activo) VALUES (?,?,?)", {
						replacements: [nombre, id_region, activo],
						type: sequelize.QueryTypes.INSERT,
					});
					res.status(201).json({ msj: "Pais creado exitosamente" });
				} catch (err) {
					console.log("error" + err);
				}
			} else {
				res.status(400).json({ msj: "Pais existente - registrado" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},
	crearRegion: async (req, res) => {
		const nombre = req.body.nombre;
		const activo = 1;
		try {
			const regionExistente = await sequelize.query("SELECT nombre FROM regiones WHERE nombre=?", {
				replacements: [nombre],
				type: sequelize.QueryTypes.SELECT,
			});
			if (regionExistente.length == 0) {
				try {
					const data = await sequelize.query("INSERT INTO regiones (nombre,activo) VALUES (?,?)", {
						replacements: [nombre, activo],
						type: sequelize.QueryTypes.INSERT,
					});
					res.status(201).json({ msj: "Region creada exitosamente" });
				} catch (err) {
					console.log("error" + err);
				}
			} else {
				res.status(400).json({ msj: "Region existente - registrada" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},
	getCiudad: async (req, res) => {
		try {
			const ciudadCompleto = await sequelize.query(
				"SELECT ciudades.id_ciudad,ciudades.nombre,ciudades.id_pais,paises.nombre AS nombre_pais,paises.id_region,regiones.nombre AS nombre_region FROM ciudades INNER JOIN paises ON ciudades.id_pais=paises.id_pais INNER JOIN regiones ON paises.id_region=regiones.id_region WHERE ciudades.activo=1",
				{
					type: sequelize.QueryTypes.SELECT,
				}
			);
			res.status(200).json(ciudadCompleto);
		} catch (err) {
			console.log("error" + err);
		}
	},
	getPais: async (req, res) => {
		try {
			const countryCompleto = await sequelize.query(
				"SELECT paises.id_pais,paises.nombre,paises.id_region,regiones.nombre AS nombre_region FROM paises INNER JOIN regiones ON paises.id_region=regiones.id_region WHERE paises.activo=1",
				{
					type: sequelize.QueryTypes.SELECT,
				}
			);
			res.status(200).json(countryCompleto);
		} catch (err) {
			console.log("error" + err);
		}
	},
	getRegion: async (req, res) => {
		try {
			const regionCompleto = await sequelize.query("SELECT id_region,nombre FROM regiones WHERE activo=1", {
				type: sequelize.QueryTypes.SELECT,
			});
			res.status(200).json(regionCompleto);
		} catch (err) {
			console.log("error" + err);
		}
	},
	updateCiudad: async (req, res) => {
		const { nombre, id_pais } = req.body;
		const idCiudad = req.params.id_ciudad;
		try {
			const ciudadExistente = await sequelize.query("SELECT id_ciudad FROM ciudades WHERE id_ciudad=?", {
				replacements: [idCiudad],
				type: sequelize.QueryTypes.SELECT,
			});
			if (ciudadExistente.length != 0) {
				if (nombre && id_pais) {
					try {
						const data = await sequelize.query("UPDATE ciudades SET nombre=?, id_pais=? WHERE id_ciudad=?", {
							replacements: [nombre, id_pais, idCiudad],
							type: sequelize.QueryTypes.UPDATE,
						});
						console.log(data);
						res.status(200).json({ msj: "Ciudad modificada exitosamente" });
					} catch (err) {
						console.log("error" + err);
					}
				} else {
					res.status(400).json({ msj: "Todos los campos deben estar completos" });
				}
			} else {
				res.status(400).json({ msj: "Id ciudad erroneo - No se encuentra en Base de Datos" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},
	updatePais: async (req, res) => {
		const { nombre, id_region } = req.body;
		const idPais = req.params.id_pais;
		try {
			const paisExistente = await sequelize.query("SELECT id_pais FROM paises WHERE id_pais=?", {
				replacements: [idPais],
				type: sequelize.QueryTypes.SELECT,
			});
			if (paisExistente.length != 0) {
				if (nombre && id_region) {
					try {
						const data = await sequelize.query("UPDATE paises SET nombre=?, id_region=? WHERE id_pais=?", {
							replacements: [nombre, id_region, idPais],
							type: sequelize.QueryTypes.UPDATE,
						});
						console.log(data);
						res.status(200).json({ msj: "Pais modificado exitosamente" });
					} catch (err) {
						console.log("error" + err);
					}
				} else {
					res.status(400).json({ msj: "Todos los campos deben estar completos" });
				}
			} else {
				res.status(400).json({ msj: "Id pais erroneo - No se encuentra en Base de Datos" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},
	updateRegion: async (req, res) => {
		const nombre = req.body.nombre;
		const idRegion = req.params.id_region;
		try {
			const regionExistente = await sequelize.query("SELECT id_region FROM regiones WHERE id_region=?", {
				replacements: [idRegion],
				type: sequelize.QueryTypes.SELECT,
			});
			if (regionExistente.length != 0) {
				if (nombre) {
					try {
						const data = await sequelize.query("UPDATE regiones SET nombre=? WHERE id_region=?", {
							replacements: [nombre, idRegion],
							type: sequelize.QueryTypes.UPDATE,
						});
						console.log(data);
						res.status(200).json({ msj: "Region modificada exitosamente" });
					} catch (err) {
						console.log("error" + err);
					}
				} else {
					res.status(400).json({ msj: "Todos los campos deben estar completos" });
				}
			} else {
				res.status(400).json({ msj: "Id region erroneo - No se encuentra en Base de Datos" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},
	deleteCiudad: async (req, res) => {
		const idCiudad = req.params.id_ciudad;
		const activo = 0;
		try {
			const cityUse = await sequelize.query("SELECT id_ciudad FROM contactos WHERE id_ciudad=? AND activo=1 ", {
				replacements: [idCiudad],
				type: sequelize.QueryTypes.SELECT,
			});
			if (cityUse.length == 0) {
				try {
					const ciudadExistente = await sequelize.query("SELECT id_ciudad FROM ciudades WHERE id_ciudad=?", {
						replacements: [idCiudad],
						type: sequelize.QueryTypes.SELECT,
					});
					if (ciudadExistente.length != 0) {
						try {
							const data = await sequelize.query("UPDATE ciudades SET activo=? WHERE id_ciudad=?", {
								replacements: [activo, idCiudad],
								type: sequelize.QueryTypes.UPDATE,
							});
							res.status(200).json({ msj: "Ciudad desactivada exitosamente" });
						} catch (err) {
							console.log("error" + err);
						}
					} else {
						res.status(400).json({ msj: "Id ciudad erroneo - No se encuentra en Base de Datos" });
					}
				} catch (err) {
					console.log("error" + err);
				}
			} else {
				res.status(400).json({ msj: "La ciudad esta en uso, no esta permitido eliminarla" });
			}
		} catch (error) {
			console.log("error" + err);
		}
	},
	deletePais: async (req, res) => {
		const idPais = req.params.id_pais;
		const activo = 0;
		try {
			const countryUse = await sequelize.query("SELECT id_pais FROM ciudades WHERE id_pais=? AND activo=1 ", {
				replacements: [idPais],
				type: sequelize.QueryTypes.SELECT,
			});
			if (countryUse.length == 0) {
				try {
					const countryExistente = await sequelize.query("SELECT id_pais FROM paises WHERE id_pais=?", {
						replacements: [idPais],
						type: sequelize.QueryTypes.SELECT,
					});
					if (countryExistente.length != 0) {
						try {
							const data = await sequelize.query("UPDATE paises SET activo=? WHERE id_pais=?", {
								replacements: [activo, idPais],
								type: sequelize.QueryTypes.UPDATE,
							});
							res.status(200).json({ msj: "Pais desactivado exitosamente" });
						} catch (err) {
							console.log("error" + err);
						}
					} else {
						res.status(400).json({ msj: "Id pais erroneo - No se encuentra en Base de Datos" });
					}
				} catch (err) {
					console.log("error" + err);
				}
			} else {
				res.status(400).json({ msj: "El pais esta en uso, no esta permitido eliminarlo" });
			}
		} catch (error) {
			console.log("error" + err);
		}
	},
	deleteRegion: async (req, res) => {
		const idRegion = req.params.id_region;
		const activo = 0;
		try {
			const regionUse = await sequelize.query("SELECT id_region FROM paises WHERE id_region=? AND activo=1 ", {
				replacements: [idRegion],
				type: sequelize.QueryTypes.SELECT,
			});
			if (regionUse.length == 0) {
				try {
					const regionExistente = await sequelize.query("SELECT id_region FROM regiones WHERE id_region=?", {
						replacements: [idRegion],
						type: sequelize.QueryTypes.SELECT,
					});
					if (regionExistente.length != 0) {
						try {
							const data = await sequelize.query("UPDATE regiones SET activo=? WHERE id_region=?", {
								replacements: [activo, idRegion],
								type: sequelize.QueryTypes.UPDATE,
							});
							res.status(200).json({ msj: "Region desactivada exitosamente" });
						} catch (err) {
							console.log("error" + err);
						}
					} else {
						res.status(400).json({ msj: "Id region erroneo - No se encuentra en Base de Datos" });
					}
				} catch (err) {
					console.log("error" + err);
				}
			} else {
				res.status(400).json({ msj: "La region esta en uso, no esta permitido eliminarla" });
			}
		} catch (error) {
			console.log("error" + err);
		}
	},
};
