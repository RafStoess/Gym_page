//*********Boton cerrar secion */
function logout() {
    localStorage.removeItem("usuarioActual");
    window.location.href = "index.html";
  }
//*****************ABRIR Y CERRAR CUADRO DE REGISTRAR USUARIOS************** */
//abrir el cuadro de registro de usuarios
document.getElementById('login-btn').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('formNuevoUsuario').classList.remove('hidden');
  document.getElementById('overlay').classList.remove('hidden');
});

 // cerrar el cuadro de registro de usuarios
 document.querySelector('.close').addEventListener('click', function () {
  document.getElementById('formNuevoUsuario').classList.add('hidden');
  document.getElementById('overlay').classList.add('hidden');
});
//************************************************** */
   const actual = JSON.parse(localStorage.getItem("usuarioActual"));
    if (!actual || actual.rol !== "Gerente") {
      window.location.href = "index.html";
    }

    document.getElementById("bienvenida").textContent = `Bienvenido, ${actual.username}`;

    // Registrar nuevo usuario
    document.getElementById("formNuevoUsuario").addEventListener("submit", function (e) {
      e.preventDefault();

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const nuevoUsuario = {
        username: document.getElementById("nuevoUsername").value.trim(),
        password: document.getElementById("nuevoPassword").value.trim(),
        nombre: document.getElementById("nuevoNombre").value.trim(),
        apellido: document.getElementById("nuevoApellido").value.trim(),
        edad: parseInt(document.getElementById("nuevoEdad").value),
        rol: document.getElementById("nuevoRol").value,
        asistencias: []
      };

      if (!nuevoUsuario.rol || !["Usuario", "Entrenador", "Administrador"].includes(nuevoUsuario.rol)) {
        document.getElementById("mensajeRegistro").textContent = "❌ Rol no válido.";
        document.getElementById("mensajeRegistro").className = "error";
        return;
      }

      if (usuarios.some(u => u.username === nuevoUsuario.username)) {
        document.getElementById("mensajeRegistro").textContent = "❌ Usuario ya existe.";
        document.getElementById("mensajeRegistro").className = "error";
        return;
      }

      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      document.getElementById("mensajeRegistro").textContent = "✅ Usuario registrado correctamente.";
      document.getElementById("mensajeRegistro").className = "success";
      this.reset();

      cargarUsuarios();
    });

    // Mostrar todos los usuarios
    function cargarUsuarios() {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const tabla = document.getElementById("tablaUsuarios");
      tabla.innerHTML = "";

      usuarios.forEach(u => {
        const puedeEliminar = u.username !== actual.username && u.rol !== "Gerente";
        const fila = `
          <tr>
            <td>${u.username}</td>
            <td>${u.nombre}</td>
            <td>${u.apellido}</td>
            <td>${u.edad}</td>
            <td>${u.rol}</td>
            <td>
              ${puedeEliminar ? `<button onclick="eliminarUsuario('${u.username}')">Eliminar</button>` : "-"}
            </td>
          </tr>`;
        tabla.innerHTML += fila;
      });
    }

    function eliminarUsuario(username) {
      if (confirm("¿Deseas eliminar este usuario?")) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios = usuarios.filter(u => u.username !== username);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        cargarUsuarios();
      }
    }

    cargarUsuarios();