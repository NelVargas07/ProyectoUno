document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();
        const { cedula, password } = obtenerDatosFormulario();
        const esValido = validarCedula(cedula) && validarContrasenna(password);
        if (esValido) {
            if (ValidarSesion(cedula,password)) {
                    manejarExito(cedula);
            }else{
                manejarError();
            }
        } else {
            manejarError();
        }

    });

});

function ValidarPassword(password) {
    // Iterar sobre las claves del localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        // Verificar si la clave corresponde a un registro de usuario
        if (clave !== 'usuario') {
            // Obtener los datos del usuario en formato JSON y convertirlos a objeto
            const datosUsuarioString = localStorage.getItem(clave);
            if (datosUsuarioString.password === password) {
                return true; // Si se encuentra la cédula, retornar true
            }
        }
    }
    // Si no se encontró la cédula en ningún registro, retornar false
    return false;
}

function ValidarSesion(cedula, password) {
    // Iterar sobre las claves del localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        // Verificar si la clave corresponde a un registro de usuario
        if (clave.startsWith('usuario_')) { // Modificamos la condición para que solo procese las claves de usuarios
            // Obtener los datos del usuario en formato JSON y convertirlos a objeto
            const datosUsuarioString = localStorage.getItem(clave);
            const datosUsuario = JSON.parse(datosUsuarioString);
            // Verificar si la cédula coincide
            if (datosUsuario.cedula === cedula) {
                // Verificar si la contraseña coincide
                if (datosUsuario.password === password) {
                    return true; // Si se encuentra la cédula y la contraseña coincide, retornar true
                }
            }
        }
    }
    // Si no se encontró la cédula en ningún registro de usuarios o la contraseña no coincide, retornar false
    return false;
}



const validarCedula = (cedula) =>
 /^\d{2}-\d{4}-\d{4}$/.test(cedula);

const validarNombre = (nombre) =>
/^.{1,20}$/.test(nombre)

const validarApellidos = (apellidos) =>
/^(.|\s){1,30}$/.test(apellidos);

const validarTelefono = (telefono) =>
 /^\d{4}-\d{4}$/.test(telefono);

const validarCorreo = (correo)=>
 /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo);

const validarContrasenna = (password)=>
/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,11}$/.test(password);

function validarConfirmPassword(password,confirmPassword){
    return password == confirmPassword
}

const obtenerDatosFormulario = () => {

    const cedula = document.getElementById("cedula").value.trim();
    const password = document.getElementById("password").value.trim();
    return { cedula, password };

};

const manejarExito = (cedula) => {
    localStorage.removeItem('Activo');
    localStorage.setItem('Activo',cedula)
    alert("Inicio de Sesion exitoso");
    window.location.href = 'agendaCita.html';
}

const manejarErrorUsuario = () => {

    alert("Usuario no registrado");

}

const manejarErrorPassword = () => {

    alert("Contrasenia incorrecta");

}

const manejarError = () => {

    alert("Datos no son validos");

}

const limpiarCamposDeTexto = () => {

    const campos = document.querySelectorAll("#formulario input[type='cedula'],#formulario input[type='nombre'],#formulario input[type='apellidos'],#formulario input[type='telefono'],#formulario input[type='correo'],#formulario input[type='password'],#formulario input[type='confirmPassword']");
    campos.forEach((campo) => campo.value = "");

};