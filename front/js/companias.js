document.getElementById("nav-companias").addEventListener("click", cargarCompanias);

function cargarCompanias() {
	eliminarContenido();
	let cabeCompania = document.createElement("h2");
	document.getElementById("companias").appendChild(cabeCompania);
	cabeCompania.innerHTML = "COMPAÑÍAS";
	getCompania();
	traerCiudades();
}

// DATOS PARA MANEJAR IDs
let arrayCiudades = [];
function traerCiudades() {
	let requestOptions = {
		method: "GET",
		headers: myHeaders,
	};

	const urlCiudades = "http://localhost:3500/ciudades";
	fetch(urlCiudades, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			// console.log(json);
			if (arrayCiudades.length == 0) {
				for (y = 0; y < json.length; y++) {
					arrayCiudades.push(json[y]);
				}
			}
			console.log(arrayCiudades);
		})
		.catch((error) => console.error("Error:", error));
}

// MANIPULACION DE COMPAÑIAS
function getCompania() {
	let requestOptions = {
		method: "GET",
		headers: myHeaders,
	};

	const urlCompanias = "http://localhost:3500/companias";
	fetch(urlCompanias, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			let conteNuevaCompania = document.createElement("div");
			let nuevaCompania = document.createElement("h2");
			document.getElementById("companias").appendChild(conteNuevaCompania);
			conteNuevaCompania.appendChild(nuevaCompania);
			nuevaCompania.innerHTML = "Agregar Compañía";
			nuevaCompania.style.cursor = "pointer";
			conteNuevaCompania.addEventListener("click", newCompany);

			let tablaCompanias = document.createElement("table");
			document.getElementById("companias").appendChild(tablaCompanias);
			let headTablaCom = document.createElement("thead");
			tablaCompanias.appendChild(headTablaCom);
			let trCompaniaHead = document.createElement("tr");
			headTablaCom.appendChild(trCompaniaHead);
			let tituloNombre = document.createElement("th");
			let tituloDireccion = document.createElement("th");
			let tituloEmail = document.createElement("th");
			let tituloCiudad = document.createElement("th");
			let tituloAccion = document.createElement("th");
			trCompaniaHead.appendChild(tituloNombre);
			trCompaniaHead.appendChild(tituloDireccion);
			trCompaniaHead.appendChild(tituloEmail);
			trCompaniaHead.appendChild(tituloCiudad);
			trCompaniaHead.appendChild(tituloAccion);
			tituloNombre.innerHTML = "Compañía";
			tituloDireccion.innerHTML = "Dirección";
			tituloEmail.innerHTML = "Email";
			tituloCiudad.innerHTML = "Ciudad";
			tituloAccion.innerHTML = "Acciones";

			let tablaCompaniasDatos = document.createElement("tbody");
			tablaCompanias.appendChild(tablaCompaniasDatos);

			for (i = 0; i < json.length; i++) {
				let trCompaniaDetalle = document.createElement("tr");
				let nombre = document.createElement("th");
				let direccion = document.createElement("th");
				let email = document.createElement("th");
				let ciudad = document.createElement("th");
				let accion = document.createElement("th");
				let editar = document.createElement("h3");
				let eliminar = document.createElement("h3");
				tablaCompaniasDatos.appendChild(trCompaniaDetalle);
				trCompaniaDetalle.appendChild(nombre);
				trCompaniaDetalle.appendChild(direccion);
				trCompaniaDetalle.appendChild(email);
				trCompaniaDetalle.appendChild(ciudad);
				trCompaniaDetalle.appendChild(accion);
				accion.appendChild(editar);
				accion.appendChild(eliminar);
				editar.setAttribute("class", "editar");
				editar.style.cursor = "pointer";
				eliminar.setAttribute("class", "eliminar");
				eliminar.style.cursor = "pointer";
				nombre.innerHTML = json[i].nombre;
				direccion.innerHTML = json[i].direccion;
				email.innerHTML = json[i].email;
				ciudad.innerHTML = json[i].nombre_ciudad;

				let id_company = json[i].id_compania;
				let cname = json[i].nombre;
				let caddress = json[i].direccion;
				let cemail = json[i].email;
				let cphone = json[i].telefono;
				let id_city = json[i].id_ciudad;
				let nombre_ciudad = json[i].nombre_ciudad;
				editar.innerHTML = "Editar";
				editar.addEventListener("click", function () {
					editarCompania(id_company, cname, caddress, cemail, cphone, nombre_ciudad);
				});
				eliminar.innerHTML = "Eliminar";
				eliminar.addEventListener("click", function () {
					eliminarCompania(id_company);
				});
			}
		})
		.catch((error) => console.error("Error:", error));
}

function newCompany() {
	formularioCompania();
	let botonAccion = document.getElementById("botonaccion");
	botonAccion.innerHTML = "Crear";
	botonAccion.addEventListener("click", function () {
		postCompany();
	});
}

function postCompany() {
	let cityCompany = document.getElementById("id_city").value;
	let newCompany = {
		nombre: cname.value,
		direccion: caddress.value,
		email: cemail.value,
		telefono: cphone.value,
		id_ciudad: cityCompany,
	};

	console.log(newCompany);

	let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: JSON.stringify(newCompany),
	};

	const urlUsuarios = "http://localhost:3500/companias";
	fetch(urlUsuarios, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			if (json.msj == "Compañia creada exitosamente") {
				alert("Compañia creada exitosamente");
				cargarCompanias();
			} else {
				alert("Error al generar la compañia, la mismo ya existe o faltan campos por completar");
			}
		})
		.catch((error) => console.error("Error:", error));
}

function editarCompania(id_company, cname, caddress, cemail, cphone, nombre_ciudad) {
	formularioCompania(cname, caddress, cemail, cphone, nombre_ciudad);
	let botonAccion = document.getElementById("botonaccion");
	botonAccion.innerHTML = "Modificar";
	botonAccion.addEventListener("click", function () {
		patchCompany(id_company);
	});
}

function patchCompany(id_compania) {
	let cityCompany = document.getElementById("id_city").value;
	let editCompany = {
		nombre: cname.value,
		direccion: caddress.value,
		email: cemail.value,
		telefono: cphone.value,
		id_ciudad: cityCompany,
	};

	console.log(editCompany);

	let requestOptions = {
		method: "PATCH",
		headers: myHeaders,
		body: JSON.stringify(editCompany),
	};

	const urlUsuarios = `http://localhost:3500/companias/${id_compania}`;
	fetch(urlUsuarios, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			if (json.msj == "Compañia modificada exitosamente") {
				alert("Compañía modificada exitosamente");
				cargarCompanias();
			} else alert("Error al modificar la compañía, faltan campos por completar");
		})
		.catch((error) => console.error("Error:", error));
}

function eliminarCompania(id_company) {
	let confirmacion = confirm("¿Realmente desea eliminar la compañía?");
	if (confirmacion == true) {
		deleteCompania(id_company);
		cargarCompanias();
	}
}

function deleteCompania(id_compania) {
	let requestOptions = {
		method: "DELETE",
		headers: myHeaders,
	};

	const urlUsuarios = `http://localhost:3500/companias/${id_compania}`;
	fetch(urlUsuarios, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			if (json.msj == "Compañia desactivada exitosamente") {
				alert("Compañia eliminada exitosamente");
				cargarCompanias();
			} else alert("Error al eliminar la compañia, la misma esta en uso");
		})
		.catch((error) => console.error("Error:", error));
}

// GENERACION DE FORMULARIO
function formularioCompania(cname, caddress, cemail, cphone, nombre_ciudad) {
	eliminarContenido();
	let cabeCompanias = document.createElement("h2");
	document.getElementById("companias").appendChild(cabeCompanias);
	cabeCompanias.innerHTML = "COMPAÑÍAS";

	let formulario = document.createElement("form");
	let ulForm = document.createElement("ul");
	let li1 = document.createElement("li");
	let li2 = document.createElement("li");
	let li3 = document.createElement("li");
	let li4 = document.createElement("li");
	let li5 = document.createElement("li");
	let lblForm1 = document.createElement("label");
	let lblForm2 = document.createElement("label");
	let lblForm3 = document.createElement("label");
	let lblForm4 = document.createElement("label");
	let lblForm5 = document.createElement("label");
	let inputForm1 = document.createElement("input");
	let inputForm2 = document.createElement("input");
	let inputForm3 = document.createElement("input");
	let inputForm4 = document.createElement("input");
	let selectForm5 = document.createElement("select");

	document.getElementById("companias").appendChild(formulario);
	formulario.appendChild(ulForm);
	ulForm.appendChild(li1);
	ulForm.appendChild(li2);
	ulForm.appendChild(li3);
	ulForm.appendChild(li4);
	ulForm.appendChild(li5);
	li1.appendChild(lblForm1);
	li2.appendChild(lblForm2);
	li3.appendChild(lblForm3);
	li4.appendChild(lblForm4);
	li5.appendChild(lblForm5);
	li1.appendChild(inputForm1);
	li2.appendChild(inputForm2);
	li3.appendChild(inputForm3);
	li4.appendChild(inputForm4);
	li5.appendChild(selectForm5);

	lblForm1.setAttribute("for", "cname");
	lblForm1.innerHTML = "Compañía*";
	lblForm2.setAttribute("for", "caddress");
	lblForm2.innerHTML = "Dirección*";
	lblForm3.setAttribute("for", "cemail");
	lblForm3.innerHTML = "Correo electrónico*";
	lblForm4.setAttribute("for", "cphone");
	lblForm4.innerHTML = "Número de teléfono*";
	lblForm5.setAttribute("for", "id_city");
	lblForm5.innerHTML = "Ciudad*";
	lblForm5.setAttribute("disabled", "disabled");

	inputForm1.setAttribute("type", "text");
	inputForm1.setAttribute("id", "cname");
	inputForm2.setAttribute("type", "text");
	inputForm2.setAttribute("id", "caddress");
	inputForm3.setAttribute("type", "email");
	inputForm3.setAttribute("id", "cemail");
	inputForm4.setAttribute("type", "tel");
	inputForm4.setAttribute("id", "cphone");
	selectForm5.setAttribute("id", "id_city");

	let opcion0 = document.createElement("option");
	opcion0.innerHTML = "Seleccione una ciudad...";
	selectForm5.appendChild(opcion0);
	for (i = 0; i < arrayCiudades.length; i++) {
		let opcion = document.createElement("option");
		opcion.innerHTML = arrayCiudades[i].nombre;
		selectForm5.appendChild(opcion);
		opcion.setAttribute("value", arrayCiudades[i].id_ciudad);
		opcion.innerHTML = arrayCiudades[i].nombre + " - " + arrayCiudades[i].nombre_pais;
	}

	let select = document.getElementById("id_city");
	select.addEventListener("change", function () {
		var optionCity = this.options[select.selectedIndex].value;
		console.log(optionCity);
		selectForm5.setAttribute("value", optionCity);
	});

	if (cname && caddress && cemail && cphone) {
		inputForm1.setAttribute("value", cname);
		inputForm2.setAttribute("value", caddress);
		inputForm3.setAttribute("value", cemail);
		inputForm4.setAttribute("value", cphone);
		let dataAntCiu = document.createElement("h4");
		li5.append(dataAntCiu);
		dataAntCiu.innerHTML = "(Anterior: " + nombre_ciudad + ")";
	}

	var botonAccion = document.createElement("h2");
	formulario.appendChild(botonAccion);
	botonAccion.setAttribute("id", "botonaccion");
	botonAccion.style.cursor = "pointer";
}
