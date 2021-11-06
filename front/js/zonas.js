document.getElementById("nav-zonas").addEventListener("click", cargarZonas);

function cargarZonas() {
	eliminarContenido();
	let cabeZonas = document.createElement("h2");
	document.getElementById("zonas").appendChild(cabeZonas);
	cabeZonas.innerHTML = "CIUDADES / PAISES / REGIONES";
	getRegiones();
}

// MANIPULACION DE REGIONES
function getRegiones() {
	let requestOptions = {
		method: "GET",
		headers: myHeaders,
	};

	const urlRegiones = "http://localhost:3500/regiones";
	fetch(urlRegiones, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			let conteNuevaRegion = document.createElement("div");
			let nuevaRegion = document.createElement("h2");
			document.getElementById("zonas").appendChild(conteNuevaRegion);
			conteNuevaRegion.appendChild(nuevaRegion);
			nuevaRegion.innerHTML = "Agregar Región";
			nuevaRegion.style.cursor = "pointer";
			conteNuevaRegion.addEventListener("click", newRegion);

			for (i = 0; i < json.length; i++) {
				let conteReg = document.createElement("div");
				let regiones = document.createElement("h3");
				document.getElementById("zonas").appendChild(conteReg);
				conteReg.setAttribute("id", "region" + json[i].id_region);
				conteReg.setAttribute("class", "region");
				regiones.innerHTML = json[i].nombre;

				let conR = document.createElement("div");
				let editar = document.createElement("h4");
				let eliminar = document.createElement("h4");
				let agregarPais = document.createElement("h4");
				conteReg.appendChild(conR);
				conR.appendChild(regiones);
				conR.appendChild(editar);
				conR.appendChild(eliminar);
				conR.appendChild(agregarPais);
				editar.setAttribute("id", "editar-region" + json[i].id_region);
				eliminar.setAttribute("id", "eliminar-region" + json[i].id_region);
				editar.innerHTML = "Editar";
				editar.setAttribute("class", "editar");
				editar.style.cursor = "pointer";

				let id_region = json[i].id_region;
				let nombreRegion = json[i].nombre;
				editar.addEventListener("click", function () {
					editarRegiones(id_region, nombreRegion);
				});
				eliminar.innerHTML = "Eliminar";
				eliminar.setAttribute("class", "eliminar");
				eliminar.style.cursor = "pointer";
				eliminar.addEventListener("click", function () {
					eliminarRegiones(id_region);
				});

				agregarPais.innerHTML = "Agregar País";
				agregarPais.style.cursor = "pointer";
				agregarPais.setAttribute("id", "agregarPais" + id_region);
				agregarPais.setAttribute("class", "agregarpais");
				agregarPais.addEventListener("click", function () {
					newCountry(id_region);
				});

				let idReg = json[i].id_region;
				getPaises(idReg);
			}
		})
		.catch((error) => console.error("Error:", error));
}

function newRegion() {
	formularioRegiones();
	let botonAccion = document.getElementById("botonaccion");
	botonAccion.innerHTML = "Crear";
	botonAccion.addEventListener("click", function () {
		postRegion();
	});
}

function postRegion() {
	let zregion = document.getElementById("zregion");
	let newRegion = {
		nombre: zregion.value,
	};

	console.log(newRegion);

	let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: JSON.stringify(newRegion),
	};

	const urlRegiones = "http://localhost:3500/regiones";
	fetch(urlRegiones, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			if (json.msj == "Region creada exitosamente") {
				alert("Region creada exitosamente");
				cargarZonas();
			} else {
				alert("Error al generar la region, la mismo ya existe o faltan campos por completar");
			}
		})
		.catch((error) => console.error("Error:", error));
}

function editarRegiones(id_region, nombreRegion) {
	formularioRegiones(nombreRegion);
	let botonAccion = document.getElementById("botonaccion");
	botonAccion.innerHTML = "Modificar";
	botonAccion.addEventListener("click", function () {
		patchRegion(id_region);
	});
}

function patchRegion(id_region) {
	let editRegion = {
		nombre: zregion.value,
	};
	// console.log(editRegion);

	let requestOptions = {
		method: "PATCH",
		headers: myHeaders,
		body: JSON.stringify(editRegion),
	};

	const urlRegiones = `http://localhost:3500/regiones/${id_region}`;
	fetch(urlRegiones, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			// console.log(json);
			if (json.msj == "Region modificada exitosamente") {
				alert("Region modificada exitosamente");
				cargarZonas();
			} else {
				alert("Error al modificar la region, faltan campos por completar");
			}
		})
		.catch((error) => console.error("Error:", error));
}

function eliminarRegiones(id_region) {
	let confirmacion = confirm("¿Realmente desea eliminar la región?");
	if (confirmacion == true) {
		deleteRegion(id_region);
		cargarZonas();
	}
}

function deleteRegion(id_region) {
	let requestOptions = {
		method: "DELETE",
		headers: myHeaders,
	};

	const urlRegiones = `http://localhost:3500/regiones/${id_region}`;
	fetch(urlRegiones, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			// console.log(json);
			if (json.msj == "Region desactivada exitosamente") {
				alert("Region eliminada exitosamente");
				cargarZonas();
			} else {
				alert("Error al eliminar la region, esta siendo utilizada por algun contacto o compañia");
			}
		})
		.catch((error) => console.error("Error:", error));
}

function formularioRegiones(nombreRegion) {
	eliminarContenido();

	let cabeZonas = document.createElement("h2");
	document.getElementById("zonas").appendChild(cabeZonas);
	cabeZonas.innerHTML = "REGIONES";

	let formulario = document.createElement("form");
	let ulForm = document.createElement("ul");
	let li1 = document.createElement("li");
	let lblForm1 = document.createElement("label");
	let inputForm1 = document.createElement("input");

	document.getElementById("zonas").appendChild(formulario);
	formulario.appendChild(ulForm);
	ulForm.appendChild(li1);
	li1.appendChild(lblForm1);
	li1.appendChild(inputForm1);

	lblForm1.setAttribute("for", "zregion");
	lblForm1.innerHTML = "Nueva región*";
	if (nombreRegion !== undefined) {
		lblForm1.innerHTML = "Nombre de la región a modificar:";
		inputForm1.placeholder = nombreRegion;
	}

	inputForm1.setAttribute("type", "text");
	inputForm1.setAttribute("id", "zregion");

	var botonAccion = document.createElement("h2");
	formulario.appendChild(botonAccion);
	botonAccion.setAttribute("id", "botonaccion");
	botonAccion.style.cursor = "pointer";
}

// MANUPILACION DE PAISES
function getPaises(idReg) {
	let requestOptions = {
		method: "GET",
		headers: myHeaders,
	};

	const urlPaises = "http://localhost:3500/paises";
	fetch(urlPaises, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			// console.log(json);
			for (x = 0; x < json.length; x++) {
				if (json[x].id_region == idReg) {
					let contePai = document.createElement("div");
					let paises = document.createElement("h3");
					document.getElementById("region" + idReg).appendChild(contePai);
					contePai.setAttribute("id", "pais" + json[x].id_pais);
					contePai.setAttribute("class", "pais");
					paises.innerHTML = json[x].nombre;

					let conP = document.createElement("div");
					let editar = document.createElement("h4");
					let eliminar = document.createElement("h4");
					let agregarCiudad = document.createElement("h4");
					contePai.appendChild(conP);
					conP.appendChild(paises);
					conP.appendChild(editar);
					conP.appendChild(eliminar);
					conP.appendChild(agregarCiudad);
					editar.setAttribute("id", "editar-pais" + json[x].id_pais);
					eliminar.setAttribute("id", "eliminar-pais" + json[x].id_pais);
					editar.innerHTML = "Editar";
					editar.setAttribute("class", "editar");
					editar.style.cursor = "pointer";

					let id_pais = json[x].id_pais;
					let nombrePais = json[x].nombre;
					let countryRegion = json[x].id_region;
					editar.addEventListener("click", function () {
						editarPais(id_pais, nombrePais, countryRegion);
					});
					eliminar.innerHTML = "Eliminar";
					eliminar.setAttribute("class", "eliminar");
					eliminar.style.cursor = "pointer";
					eliminar.addEventListener("click", function () {
						eliminarPais(id_pais, countryRegion);
					});
					agregarCiudad.innerHTML = "Agregar Ciudad";
					agregarCiudad.style.cursor = "pointer";
					agregarCiudad.setAttribute("id", "agregarCiudad" + id_pais);
					agregarCiudad.setAttribute("class", "agregarciudad");
					agregarCiudad.addEventListener("click", function () {
						newCity(id_pais, idReg);
					});

					let idPai = json[x].id_pais;
					getCiudades(idPai);
				}
			}
		})
		.catch((error) => console.error("Error:", error));
}

function newCountry(id_region) {
	formularioPaises();
	let botonAccion = document.getElementById("botonaccion");
	botonAccion.innerHTML = "Crear";
	botonAccion.addEventListener("click", function () {
		postCountry(id_region);
	});
}

function postCountry(id_region) {
	let zpais = document.getElementById("zpais");
	let newPais = {
		nombre: zpais.value,
		id_region: id_region,
	};

	// console.log(newPais);

	let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: JSON.stringify(newPais),
	};

	const urlPais = "http://localhost:3500/paises";
	fetch(urlPais, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			// console.log(json);
			if (json.msj == "Pais creado exitosamente") {
				alert("País creado exitosamente");
				cargarZonas();
			} else {
				alert("Error al generar la ciudad, la misma ya existe o faltan campos por completar");
			}
		})
		.catch((error) => console.error("Error:", error));
}

function editarPais(id_pais, nombrePais, countryRegion) {
	formularioPaises(nombrePais);
	let botonAccion = document.getElementById("botonaccion");
	botonAccion.innerHTML = "Modificar";
	botonAccion.addEventListener("click", function () {
		patchCountry(id_pais, countryRegion);
	});
}

function patchCountry(id_pais, countryRegion) {
	let editPais = {
		nombre: zpais.value,
		id_region: countryRegion,
	};
	// console.log(editPais);

	let requestOptions = {
		method: "PATCH",
		headers: myHeaders,
		body: JSON.stringify(editPais),
	};

	const urlPaises = `http://localhost:3500/paises/${id_pais}`;
	fetch(urlPaises, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			// console.log(json);
			if (json.msj == "País modificado exitosamente") {
				alert("País modificado exitosamente");
				cargarZonas();
			} else {
				alert("Error al modificar el país, faltan campos por completar");
			}
		})
		.catch((error) => console.error("Error:", error));
}

function eliminarPais(id_pais) {
	let confirmacion = confirm("¿Realmente desea eliminar el país?");
	if (confirmacion == true) {
		deletePais(id_pais);
		cargarZonas();
	}
}

function deletePais(id_pais) {
	let requestOptions = {
		method: "DELETE",
		headers: myHeaders,
	};

	const urlPais = `http://localhost:3500/paises/${id_pais}`;
	fetch(urlPais, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			// console.log(json);
			if (json.msj == "Pais desactivado exitosamente") {
				alert("País eliminado exitosamente");
				cargarZonas();
			} else {
				alert("Error al eliminar el país, esta siendo utilizada por algun contacto o compañia");
			}
		})
		.catch((error) => console.error("Error:", error));
}

function formularioPaises(nombrePais) {
	eliminarContenido();

	let cabeZonas = document.createElement("h2");
	document.getElementById("zonas").appendChild(cabeZonas);
	cabeZonas.innerHTML = "PAISES";

	let formulario = document.createElement("form");
	let ulForm = document.createElement("ul");
	let li1 = document.createElement("li");
	let lblForm1 = document.createElement("label");
	let inputForm1 = document.createElement("input");

	document.getElementById("zonas").appendChild(formulario);
	formulario.appendChild(ulForm);
	ulForm.appendChild(li1);
	li1.appendChild(lblForm1);
	li1.appendChild(inputForm1);

	lblForm1.setAttribute("for", "zpais");
	lblForm1.innerHTML = "Nuevo país*";
	if (nombrePais !== undefined) {
		lblForm1.innerHTML = "Nombre del país a modificar:";
		inputForm1.placeholder = nombrePais;
	}

	inputForm1.setAttribute("type", "text");
	inputForm1.setAttribute("id", "zpais");

	var botonAccion = document.createElement("h2");
	formulario.appendChild(botonAccion);
	botonAccion.setAttribute("id", "botonaccion");
	botonAccion.style.cursor = "pointer";
}

// MANUPILACION DE CIUDADES
function getCiudades(idPai) {
	let requestOptions = {
		method: "GET",
		headers: myHeaders,
	};

	const urlCiudades = "http://localhost:3500/ciudades";
	fetch(urlCiudades, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			// console.log(json);
			for (z = 0; z < json.length; z++) {
				if (json[z].id_pais == idPai) {
					let conteCiu = document.createElement("div");
					let ciudades = document.createElement("h3");
					document.getElementById("pais" + idPai).appendChild(conteCiu);
					conteCiu.setAttribute("id", "ciudad" + json[z].id_ciudad);
					conteCiu.setAttribute("class", "ciudad");
					ciudades.innerHTML = json[z].nombre;

					let conC = document.createElement("div");
					let editar = document.createElement("h4");
					let eliminar = document.createElement("h4");
					conteCiu.appendChild(conC);
					conC.appendChild(ciudades);
					conC.appendChild(editar);
					conC.appendChild(eliminar);
					editar.setAttribute("id", "editar-ciudad" + json[z].id_ciudad);
					editar.innerHTML = "Editar";
					editar.setAttribute("class", "editar");
					editar.style.cursor = "pointer";

					let id_ciudad = json[z].id_ciudad;
					let nombreCiudad = json[z].nombre;
					let cityCountry = json[z].id_pais;
					editar.addEventListener("click", function () {
						editarCiudad(id_ciudad, nombreCiudad, cityCountry);
					});
					eliminar.innerHTML = "Eliminar";
					eliminar.setAttribute("class", "eliminar");
					eliminar.style.cursor = "pointer";
					eliminar.addEventListener("click", function () {
						eliminarCiudad(id_ciudad, cityCountry);
					});
				}
			}
		})
		.catch((error) => console.error("Error:", error));
}

function newCity(id_pais) {
	formularioCiudades();
	let botonAccion = document.getElementById("botonaccion");
	botonAccion.innerHTML = "Crear";
	botonAccion.addEventListener("click", function () {
		postCity(id_pais);
	});
}

function postCity(id_pais) {
	let zciudad = document.getElementById("zciudad");
	let newCity = {
		nombre: zciudad.value,
		id_pais: id_pais,
	};

	console.log(newCity);

	let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: JSON.stringify(newCity),
	};

	const urlCiudad = "http://localhost:3500/ciudades";
	fetch(urlCiudad, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			if (json.msj == "Ciudad creada exitosamente") {
				alert("Ciudad creada exitosamente");
				cargarZonas();
			} else {
				alert("Error al generar la ciudad, la mismo ya existe o faltan campos por completar");
			}
		})
		.catch((error) => console.error("Error:", error));
}

function editarCiudad(id_ciudad, nombreCiudad, cityCountry) {
	formularioCiudades(nombreCiudad);
	let botonAccion = document.getElementById("botonaccion");
	botonAccion.innerHTML = "Modificar";
	botonAccion.addEventListener("click", function () {
		patchCity(id_ciudad, cityCountry);
	});
}

function patchCity(id_ciudad, cityCountry) {
	let editCiudad = {
		nombre: zciudad.value,
		id_pais: cityCountry,
	};

	// console.log(editCiudad);

	let requestOptions = {
		method: "PATCH",
		headers: myHeaders,
		body: JSON.stringify(editCiudad),
	};

	const urlCiudades = `http://localhost:3500/ciudades/${id_ciudad}`;
	fetch(urlCiudades, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			// console.log(json);
			if (json.msj == "Ciudad modificada exitosamente") {
				alert("Ciudad modificada exitosamente");
				cargarZonas();
			} else {
				alert("Error al modificar la ciudad, faltan campos por completar");
			}
		})
		.catch((error) => console.error("Error:", error));
}

function eliminarCiudad(id_ciudad) {
	let confirmacion = confirm("¿Realmente desea eliminar la ciudad?");
	if (confirmacion == true) {
		deleteCiudad(id_ciudad);
		cargarZonas();
	}
}

function deleteCiudad(id_ciudad) {
	let requestOptions = {
		method: "DELETE",
		headers: myHeaders,
	};

	const urlCiudades = `http://localhost:3500/ciudades/${id_ciudad}`;
	fetch(urlCiudades, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			// console.log(json);
			if (json.msj == "Ciudad desactivada exitosamente") {
				alert("Ciudad eliminado exitosamente");
				cargarZonas();
			} else {
				alert("Error al eliminar la ciudad, esta siendo utilizada por algun contacto o compañia");
			}
		})
		.catch((error) => console.error("Error:", error));
}

function formularioCiudades(nombreCiudad) {
	eliminarContenido();

	let cabeZonas = document.createElement("h2");
	document.getElementById("zonas").appendChild(cabeZonas);
	cabeZonas.innerHTML = "CIUDADES";

	let formulario = document.createElement("form");
	let ulForm = document.createElement("ul");
	let li1 = document.createElement("li");
	let lblForm1 = document.createElement("label");
	let inputForm1 = document.createElement("input");

	document.getElementById("zonas").appendChild(formulario);
	formulario.appendChild(ulForm);
	ulForm.appendChild(li1);
	li1.appendChild(lblForm1);
	li1.appendChild(inputForm1);

	lblForm1.setAttribute("for", "zciudad");
	lblForm1.innerHTML = "Nueva ciudad*";
	if (nombreCiudad !== undefined) {
		lblForm1.innerHTML = "Nombre de la ciudad a modificar:";
		inputForm1.placeholder = nombreCiudad;
	}

	inputForm1.setAttribute("type", "text");
	inputForm1.setAttribute("id", "zciudad");

	var botonAccion = document.createElement("h2");
	formulario.appendChild(botonAccion);
	botonAccion.setAttribute("id", "botonaccion");
	botonAccion.style.cursor = "pointer";
}
