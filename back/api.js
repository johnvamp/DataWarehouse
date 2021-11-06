const express = require("express");
const app = express();
const CORS = require("cors");
const {
	validarDatosUsuario,
	validarDatosContacto,
	validarDatosCompania,
	validarDatosCiudad,
	validarDatosPais,
	validarDatosRegion,
	validacionJWT,
	validacionJWTAdmin,
} = require("./middlewares/middlewares");
const { crearUsuario, logIn, getUsuario, updateUsuario, deleteUsuario } = require("./routes/usuarios");
const { crearContacto, getContacto, updateContacto, deleteContacto } = require("./routes/contactos");
const { createCompania, getCompania, updateCompania, deleteCompania } = require("./routes/companias");
const {
	crearCiudad,
	crearPais,
	crearRegion,
	getCiudad,
	getPais,
	getRegion,
	updateCiudad,
	updatePais,
	updateRegion,
	deleteCiudad,
	deletePais,
	deleteRegion,
} = require("./routes/ubicaciones");

app.use(express.json(), CORS());

app.listen(3500, () => {
	console.log("Servidor en puerto 3500");
});

// USUARIOS
app.post("/usuarios/login", logIn);
app.post("/usuarios", validarDatosUsuario, validacionJWTAdmin, crearUsuario);
app.get("/usuarios", validacionJWTAdmin, getUsuario);
app.patch("/usuarios/:id_usuario", validarDatosUsuario, validacionJWTAdmin, updateUsuario);
app.delete("/usuarios/:id_usuario", validacionJWTAdmin, deleteUsuario);

// COMPAÑIAS
app.post("/companias", validarDatosCompania, validacionJWT, createCompania);
app.get("/companias", validacionJWT, getCompania);
app.patch("/companias/:id_compania", validacionJWT, updateCompania);
app.delete("/companias/:id_compania", validacionJWT, deleteCompania);

// CONTACTOS
app.post("/contactos", validarDatosContacto, validacionJWT, crearContacto);
app.get("/contactos", validacionJWT, getContacto);
app.patch("/contactos/:id_contacto", validacionJWT, updateContacto);
app.delete("/contactos/:id_contacto", validacionJWT, deleteContacto);

// REGIONES
app.post("/regiones", validarDatosRegion, validacionJWT, crearRegion); //Listo
app.get("/regiones", validacionJWT, getRegion); //Listo
app.patch("/regiones/:id_region", validacionJWT, updateRegion); //Listo
app.delete("/regiones/:id_region", validacionJWT, deleteRegion); //Listo

// PAISES
app.post("/paises", validarDatosPais, validacionJWT, crearPais); // Listo
app.get("/paises", validacionJWT, getPais); //Listo
app.patch("/paises/:id_pais", validacionJWT, updatePais); //Listo
app.delete("/paises/:id_pais", validacionJWT, deletePais); //Listo

// CIUDADES
app.post("/ciudades", validarDatosCiudad, validacionJWT, crearCiudad); // Listo
app.get("/ciudades", validacionJWT, getCiudad); //Listo
app.patch("/ciudades/:id_ciudad", validacionJWT, updateCiudad); //Listo
app.delete("/ciudades/:id_ciudad", validacionJWT, deleteCiudad);
