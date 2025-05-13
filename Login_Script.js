//****************ABRIR Y CERRAR LOGIN*********************
//abrir el cuadro de login
    document.getElementById('login-btn').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('login-modal').classList.remove('hidden');
        document.getElementById('overlay').classList.remove('hidden');
    });
 // cerrar el cuadro de login
    document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('login-modal').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
});
//***************************** CREAR USUARIOS POR DEFECTO******************* */
// Inicializar usuarios si no existen
if (!localStorage.getItem("usuarios")) {
    const usuariosIniciales = [
        { username: "gerente", password: "1234", rol: "Gerente" },
        { username: "admin", password: "admin1234", rol: "Administrador" },
        { username: "entrenador", password: "entrenador1234", rol: "Entrenador" },
        { username: "usuario", password: "usuario1234", rol: "Usuario" }
        //{ username: "rafa", password: "rafa1234", rol: "Gerente" } * solo agregas un usuario contraseña y roll
        // para que funcione borrar variables (datos del navegador)
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
}
//******************************VALIDAR EL LOGIN****************************** */
// Validar login y redirigir según rol
function validarLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const mensaje = document.getElementById('mensaje');

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(
        user => user.username === username && user.password === password
    );

    if (usuarioEncontrado) {
        // Guardar sesión actual
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));
        mensaje.innerText = "Ingreso exitoso";

        // Redireccionar según el rol
        setTimeout(() => {
            switch (usuarioEncontrado.rol) {
                case "Usuario":
                    window.location.href = "usuario.html";
                    break;
                case "Entrenador":
                    window.location.href = "entrenador.html";
                    break;
                case "Administrador":
                    window.location.href = "admi.html";
                    break;
                case "Gerente":
                    window.location.href = "gerente.html";
                    break;
                default:
                    window.location.href = "index.html";
            }
        }, 1000); // Esperar 1 segundo para mostrar el mensaje
    } else {
        mensaje.innerText = "Usuario o contraseña incorrectos.";
    }
}
