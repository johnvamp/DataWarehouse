const sequelize = require("../conexion.js");

module.exports = {
	crearContacto: async (req, res) => {
		console.log(req.body);
		const {
			p_nombre,
			apellido,
			cargo,
			email,
			id_compania,
			id_ciudad,
			direccion,
			telefono_compania,
			whatsapp_compania,
			instagram_compania,
			facebook_compania,
			linkedin_compania,
		} = req.body;
		const activo = 1;
		const interes = req.body.interes ? req.body.interes : 0;
		const telefono_personal = req.body.telefono_personal ? req.body.telefono_personal : 1;
		const whatsapp_personal = req.body.whatsapp_personal ? req.body.whatsapp_personal : 1;
		const instagram_personal = req.body.instagram_personal ? req.body.instagram_personal : 1;
		const facebook_personal = req.body.facebook_personal ? req.body.facebook_personal : 1;
		const linkedin_personal = req.body.linkedin_personal ? req.body.linkedin_personal : 1;
		try {
			const contactExistente = await sequelize.query("SELECT email FROM contactos WHERE email=?", {
				replacements: [email],
				type: sequelize.QueryTypes.SELECT,
			});
			if (contactExistente.length == 0) {
				try {
					const data = await sequelize.query(
						"INSERT INTO contactos (p_nombre,apellido,cargo,email,id_compania,id_ciudad,direccion,interes,telefono_compania,telefono_personal,whatsapp_compania,whatsapp_personal,instagram_compania,instagram_personal,facebook_compania,facebook_personal,linkedin_compania,linkedin_personal,activo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
						{
							replacements: [
								p_nombre,
								apellido,
								cargo,
								email,
								id_compania,
								id_ciudad,
								direccion,
								interes,
								telefono_compania,
								telefono_personal,
								whatsapp_compania,
								whatsapp_personal,
								instagram_compania,
								instagram_personal,
								facebook_compania,
								facebook_personal,
								linkedin_compania,
								linkedin_personal,
								activo,
							],
							type: sequelize.QueryTypes.INSERT,
						}
					);
					res.status(201).json({ msj: "Contacto creado exitosamente" });
				} catch (err) {
					console.log("error" + err);
				}
			} else {
				res.status(400).json({ msj: "Contacto existente - Correo registrado" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},
	getContacto: async (req, res) => {
		try {
			const contactCompleto = await sequelize.query(
				"SELECT contactos.id_contacto,contactos.p_nombre,contactos.apellido,contactos.cargo,contactos.email,contactos.id_compania,companias.nombre AS nombre_compania,contactos.id_ciudad,ciudades.nombre AS nombre_ciudad,paises.id_pais,paises.nombre AS nombre_pais,regiones.id_region,regiones.nombre AS nombre_region,contactos.direccion,contactos.interes,contactos.telefono_compania,contactos.telefono_personal,pre_pho.nombre AS telefono_personal,contactos.whatsapp_compania,contactos.whatsapp_personal,pre_wha.nombre AS preferencia_whatsapp,contactos.instagram_compania,contactos.instagram_personal,pre_ins.nombre AS preferencia_instagram,contactos.facebook_compania,contactos.facebook_personal,pre_fac.nombre AS preferencia_facebook,contactos.linkedin_compania,contactos.linkedin_personal,pre_lin.nombre AS preferencia_linkedin FROM contactos INNER JOIN companias ON contactos.id_compania=companias.id_compania INNER JOIN preferencias AS pre_pho ON contactos.telefono_personal=pre_pho.id_preferencia INNER JOIN preferencias AS pre_wha ON contactos.whatsapp_personal=pre_wha.id_preferencia INNER JOIN preferencias AS pre_ins ON contactos.instagram_personal=pre_ins.id_preferencia INNER JOIN preferencias AS pre_fac ON contactos.facebook_personal=pre_fac.id_preferencia INNER JOIN preferencias AS pre_lin ON contactos.linkedin_personal=pre_lin.id_preferencia INNER JOIN ciudades ON contactos.id_ciudad=ciudades.id_ciudad INNER JOIN paises ON ciudades.id_pais=paises.id_pais INNER JOIN regiones ON paises.id_region=regiones.id_region WHERE contactos.activo=1",
				{
					type: sequelize.QueryTypes.SELECT,
				}
			);
			res.status(200).json(contactCompleto);
		} catch (err) {
			console.log("error" + err);
		}
	},
	updateContacto: async (req, res) => {
		const {
			p_nombre,
			apellido,
			cargo,
			email,
			id_compania,
			id_ciudad,
			interes,
			telefono_compania,
			whatsapp_compania,
			instagram_compania,
			facebook_compania,
			linkedin_compania,
		} = req.body;
		const idContact = req.params.id_contacto;
		const telefono_personal = req.body.telefono_personal ? req.body.telefono_personal : 1;
		const whatsapp_personal = req.body.whatsapp_personal ? req.body.whatsapp_personal : 1;
		const instagram_personal = req.body.instagram_personal ? req.body.instagram_personal : 1;
		const facebook_personal = req.body.facebook_personal ? req.body.facebook_personal : 1;
		const linkedin_personal = req.body.linkedin_personal ? req.body.linkedin_personal : 1;
		try {
			const contactExistente = await sequelize.query("SELECT id_contacto FROM contactos WHERE id_contacto=?", {
				replacements: [idContact],
				type: sequelize.QueryTypes.SELECT,
			});
			if (contactExistente.length != 0) {
				if (
					p_nombre &&
					apellido &&
					cargo &&
					email &&
					id_compania &&
					id_ciudad &&
					interes &&
					telefono_personal &&
					whatsapp_personal &&
					instagram_personal &&
					facebook_personal &&
					linkedin_personal
				) {
					try {
						const data = await sequelize.query(
							"UPDATE contactos SET p_nombre=?, apellido=?, cargo=?, email=?, id_compania=?, id_ciudad=?, interes=?, telefono_compania=?, telefono_personal=?, whatsapp_compania=?, whatsapp_personal=?, instagram_compania=?, instagram_personal=?,facebook_compania=?,  facebook_personal=?,linkedin_compania=?,  linkedin_personal=? WHERE id_contacto=?",
							{
								replacements: [
									p_nombre,
									apellido,
									cargo,
									email,
									id_compania,
									id_ciudad,
									interes,
									telefono_compania,
									telefono_personal,
									whatsapp_compania,
									whatsapp_personal,
									instagram_compania,
									instagram_personal,
									facebook_compania,
									facebook_personal,
									linkedin_compania,
									linkedin_personal,
									idContact,
								],
								type: sequelize.QueryTypes.UPDATE,
							}
						);
						console.log(data);
						res.status(200).json({ msj: "Contacto modificado exitosamente" });
					} catch (err) {
						console.log("error" + err);
					}
				} else {
					res.status(400).json({ msj: "Todos los campos deben estar completos" });
				}
			} else {
				res.status(400).json({ msj: "Id contacto erroneo - No se encuentra en Base de Datos" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},
	deleteContacto: async (req, res) => {
		const idContacto = req.params.id_contacto;
		const activo = 0;
		try {
			const contactoExistente = await sequelize.query("SELECT id_contacto FROM contactos WHERE id_contacto=?", {
				replacements: [idContacto],
				type: sequelize.QueryTypes.SELECT,
			});
			if (contactoExistente.length != 0) {
				try {
					const data = await sequelize.query("UPDATE contactos SET activo=? WHERE id_contacto=?", {
						replacements: [activo, idContacto],
						type: sequelize.QueryTypes.UPDATE,
					});
					res.status(200).json({ msj: "Contacto desactivado exitosamente" });
				} catch (err) {
					console.log("error" + err);
				}
			} else {
				res.status(400).json({ msj: "Id contacto erroneo - No se encuentra en Base de Datos" });
			}
		} catch (err) {
			console.log("error" + err);
		}
	},
};
