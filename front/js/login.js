document.getElementById("login-button").addEventListener("click", login);

function login() {
	const email = document.getElementById("email").value;
	const pass = document.getElementById("password").value;
	const login = { email: email, clave: pass };
	const url = "http://localhost:3500/usuarios/login";

	fetch(url, {
		method: "POST",
		body: JSON.stringify(login),
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "http://localhost:3500",
			"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		},
		mode: "cors",
		cache: "default",
	})
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			if (json.msj == "Error en LogIn") {
				alert("Error en login, verifique su email y contraseña");
			} else {
				console.log(json);
				localStorage.setItem("tokenLogin", JSON.stringify(json.token));
				localStorage.setItem("admin", JSON.stringify(json.admin));
				window.location.href = "dw.html";
			}
		})
		.catch((error) => console.error("Error:", error));
}
