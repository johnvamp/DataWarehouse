document.getElementById("nav-usuarios").addEventListener("click", cargarUsuarios);

function cargarUsuarios() {
	eliminarContenido();
	let cabeUsuarios = document.createElement("h2");
	document.getElementById("usuarios").appendChild(cabeUsuarios);
	cabeUsuarios.innerHTML = "USUARIOS";
	getUsuario();
}

// MANIPULACION DE USUARIOS
function getUsuario() {
	let requestOptions = {
		method: "GET",
		headers: myHeaders,
	};

	const urlUsuarios = "http://localhost:3500/usuarios";
	fetch(urlUsuarios, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			// console.log(json);
			if (json.msj == "Solo acceso Administrador") {
				let conteNoAdmin = document.createElement("div");
				let noAdmin = document.createElement("h2");
				document.getElementById("usuarios").appendChild(conteNoAdmin);
				conteNoAdmin.appendChild(noAdmin);
				noAdmin.innerHTML = "SOLO ACCESO ADMINISTRADORES";
			} else {
				let conteNuevoUsuario = document.createElement("div");
				let nuevoUsuario = document.createElement("h2");
				document.getElementById("usuarios").appendChild(conteNuevoUsuario);
				conteNuevoUsuario.appendChild(nuevoUsuario);
				nuevoUsuario.innerHTML = "Agregar Usuario";
				nuevoUsuario.style.cursor = "pointer";
				conteNuevoUsuario.addEventListener("click", newUser);

				let tablaUsuarios = document.createElement("table");
				document.getElementById("usuarios").appendChild(tablaUsuarios);
				let headTablaUsu = document.createElement("thead");
				tablaUsuarios.appendChild(headTablaUsu);
				let trUsuarioHead = document.createElement("tr");
				headTablaUsu.appendChild(trUsuarioHead);
				let tituloUsuario = document.createElement("th");
				let tituloAdmin = document.createElement("th");
				let tituloAccion = document.createElement("th");
				trUsuarioHead.appendChild(tituloUsuario);
				trUsuarioHead.appendChild(tituloAdmin);
				trUsuarioHead.appendChild(tituloAccion);
				tituloUsuario.innerHTML = "Usuario";
				tituloAdmin.innerHTML = "Administrador";
				tituloAccion.innerHTML = "Acciones";

				let tablaUsuariosDatos = document.createElement("tbody");
				tablaUsuarios.appendChild(tablaUsuariosDatos);

				for (i = 0; i < json.length; i++) {
					let trUsuarioDetalle = document.createElement("tr");
					let usuario = document.createElement("th");
					let administrador = document.createElement("th");
					let accion = document.createElement("th");
					let editar = document.createElement("h3");
					let eliminar = document.createElement("h3");
					tablaUsuariosDatos.appendChild(trUsuarioDetalle);
					trUsuarioDetalle.appendChild(usuario);
					trUsuarioDetalle.appendChild(administrador);
					trUsuarioDetalle.appendChild(accion);
					accion.appendChild(editar);
					accion.appendChild(eliminar);
					editar.setAttribute("class", "editar");
					editar.style.cursor = "pointer";
					eliminar.setAttribute("class", "eliminar");
					eliminar.style.cursor = "pointer";
					usuario.innerHTML = json[i].p_nombre + " " + json[i].apellido;
					let id_user = json[i].id_usuario;
					let ufname = json[i].p_nombre;
					let ulname = json[i].apellido;
					let uemail = json[i].email;
					let uadmin = json[i].admin;
					if (json[i].admin == 1) {
						administrador.innerHTML = "Si";
					} else {
						administrador.innerHTML = "No";
					}
					editar.innerHTML = "Editar";
					editar.addEventListener("click", function () {
						editarUsuario(id_user, ufname, ulname, uemail, uadmin);
					});
					eliminar.innerHTML = "Eliminar";
					eliminar.addEventListener("click", function () {
						eliminarUsuario(id_user);
					});
				}
			}
		})
		.catch((error) => console.error("Error:", error));
}

function newUser() {
	generarFormulario();
	let botonAccion = document.getElementById("botonaccion");
	botonAccion.innerHTML = "Crear";
	botonAccion.addEventListener("click", function () {
		if (document.getElementById("upass").value === document.getElementById("urpass").value) {
			postUser();
		} else {
			alert("Las contraseñas no coinciden");
		}
	});
}

function editarUsuario(id_user, ufname, ulname, uemail, uadmin) {
	generarFormulario(ufname, ulname, uemail, uadmin);
	let botonAccion = document.getElementById("botonaccion");
	botonAccion.innerHTML = "Modificar";
	botonAccion.addEventListener("click", function () {
		if (document.getElementById("upass").value === document.getElementById("urpass").value) {
			patchUser(id_user);
		} else {
			alert("Las contraseñas no coinciden");
		}
	});
}

function eliminarUsuario(id_user) {
	let confirmacion = confirm("¿Realmente desea eliminar el usuario?");
	if (confirmacion == true) {
		deleteUsuario(id_user);
		cargarUsuarios();
	}
}

function postUser() {
	let userAdmin;
	if (document.getElementById("admin").checked == true) {
		userAdmin = 1;
	} else {
		userAdmin = 0;
	}
	let newUser = {
		p_nombre: unombre.value,
		apellido: uapellido.value,
		email: uemail.value,
		clave: upass.value,
		admin: userAdmin,
	};

	console.log(newUser);

	let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: JSON.stringify(newUser),
	};

	const urlUsuarios = "http://localhost:3500/usuarios";
	fetch(urlUsuarios, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			if (json.msj == "Usuario creado exitosamente") {
				cargarUsuarios();
			} else alert("Error al generar el usuario, el mismo ya existe o faltan campos por completar");
		})
		.catch((error) => console.error("Error:", error));
}

function patchUser(id_usuario) {
	let userAdmin;
	if (document.getElementById("admin").checked == true) {
		userAdmin = 1;
	} else {
		userAdmin = 0;
	}
	let editUser = {
		p_nombre: unombre.value,
		apellido: uapellido.value,
		email: uemail.value,
		clave: upass.value,
		admin: userAdmin,
	};

	console.log(editUser);

	let requestOptions = {
		method: "PATCH",
		headers: myHeaders,
		body: JSON.stringify(editUser),
	};

	const urlUsuarios = `http://localhost:3500/usuarios/${id_usuario}`;
	fetch(urlUsuarios, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			if (json.msj == "Usuario modificado exitosamente") {
				cargarUsuarios();
			} else alert("Error al modificar el usuario, faltan campos por completar");
		})
		.catch((error) => console.error("Error:", error));
}

function deleteUsuario(id_usuario) {
	let requestOptions = {
		method: "DELETE",
		headers: myHeaders,
	};

	const urlUsuarios = `http://localhost:3500/usuarios/${id_usuario}`;
	fetch(urlUsuarios, requestOptions)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			if (json.msj == "Usuario desactivado exitosamente") {
				alert("Usuario eliminado exitosamente");
				cargarUsuarios();
			} else alert("Error al eliminar el usuario, el mismo no existe en nuestra base");
		})
		.catch((error) => console.error("Error:", error));
}

// GENERACION DE FORMULARIO
function generarFormulario(ufname, ulname, uemail, uadmin) {
	eliminarContenido();
	let cabeUsuarios = document.createElement("h2");
	document.getElementById("usuarios").appendChild(cabeUsuarios);
	cabeUsuarios.innerHTML = "USUARIOS";

	let formulario = document.createElement("form");
	let ulForm = document.createElement("ul");
	let li1 = document.createElement("li");
	let li2 = document.createElement("li");
	let li3 = document.createElement("li");
	let li4 = document.createElement("li");
	let li5 = document.createElement("li");
	let li6 = document.createElement("li");
	let lblForm1 = document.createElement("label");
	let lblForm2 = document.createElement("label");
	let lblForm3 = document.createElement("label");
	let lblForm4 = document.createElement("label");
	let lblForm5 = document.createElement("label");
	let lblForm6 = document.createElement("label");
	let inputForm1 = document.createElement("input");
	let inputForm2 = document.createElement("input");
	let inputForm3 = document.createElement("input");
	let inputForm4 = document.createElement("input");
	let inputForm5 = document.createElement("input");
	let inputForm6 = document.createElement("input");

	document.getElementById("usuarios").appendChild(formulario);
	formulario.appendChild(ulForm);
	ulForm.appendChild(li1);
	ulForm.appendChild(li2);
	ulForm.appendChild(li3);
	ulForm.appendChild(li4);
	ulForm.appendChild(li5);
	ulForm.appendChild(li6);
	li1.appendChild(lblForm1);
	li2.appendChild(lblForm2);
	li3.appendChild(lblForm3);
	li4.appendChild(lblForm4);
	li5.appendChild(lblForm5);
	li6.appendChild(lblForm6);
	li1.appendChild(inputForm1);
	li2.appendChild(inputForm2);
	li3.appendChild(inputForm3);
	li4.appendChild(inputForm4);
	li5.appendChild(inputForm5);
	li6.appendChild(inputForm6);

	lblForm1.setAttribute("for", "unombre");
	lblForm1.innerHTML = "Nombre*";
	lblForm2.setAttribute("for", "uapellido");
	lblForm2.innerHTML = "Apellido*";
	lblForm3.setAttribute("for", "uemail");
	lblForm3.innerHTML = "Correo electrónico*";
	lblForm4.setAttribute("for", "utipo");
	lblForm4.innerHTML = "¿Perfil Administrador?*";
	lblForm5.setAttribute("for", "upass");
	lblForm5.innerHTML = "Contraseña*";
	lblForm6.setAttribute("for", "urpass");
	lblForm6.innerHTML = "Repetir Contraseña*";

	inputForm1.setAttribute("type", "text");
	inputForm1.setAttribute("id", "unombre");
	inputForm2.setAttribute("type", "text");
	inputForm2.setAttribute("id", "uapellido");
	inputForm3.setAttribute("type", "email");
	inputForm3.setAttribute("id", "uemail");
	inputForm4.setAttribute("type", "checkbox");
	inputForm4.setAttribute("id", "admin");
	inputForm5.setAttribute("type", "password");
	inputForm5.setAttribute("id", "upass");
	inputForm6.setAttribute("type", "password");
	inputForm6.setAttribute("id", "urpass");

	if (ufname && ulname && uemail) {
		inputForm1.setAttribute("value", ufname);
		inputForm2.setAttribute("value", ulname);
		inputForm3.setAttribute("value", uemail);
		inputForm4.checked = uadmin;
	}
	var botonAccion = document.createElement("h2");
	formulario.appendChild(botonAccion);
	botonAccion.setAttribute("id", "botonaccion");
	botonAccion.style.cursor = "pointer";
}
