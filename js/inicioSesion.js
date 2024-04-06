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
                manejarErrorPassword();
            }
        } else {
            manejarError();
        }

    });

});

const obtenerDatosFormulario = ()=>{

    const cedula = document.getElementById("cedula").value.trim();
    const password = document.getElementById("password").value.trim();
    return {cedula,password};

};

function ValidarSesion(cedula, password) {
    // Obtener los datos del usuario en formato JSON desde el localStorage
    const datosUsuarioString = localStorage.getItem(cedula);
    console.log(datosUsuarioString);
    // Verificar si se encontraron datos para la cédula proporcionada
    if (datosUsuarioString) {
        // Convertir los datos del usuario a objeto
        const datosUsuario = JSON.parse(datosUsuarioString);
        console.log(datosUsuario.password);
        console.log(password);
        // Verificar si la contraseña coincide
        if (decryptPassword(datosUsuario.password) == password) {
            return true; // Si la contraseña coincide, retornar true
        }
    }

    // Si no se encontraron datos para la cédula proporcionada o la contraseña no coincide, retornar false
    return false;
}

const validarCedula = (cedula) =>
 /^\d{2}-\d{4}-\d{4}$/.test(cedula);

const validarContrasenna = (password)=>
/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,11}$/.test(password);

const manejarExito = (cedula) => {
    localStorage.removeItem('Activo');
    localStorage.setItem('Activo',cedula);
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

// Función para desencriptar contraseña
function decryptPassword(encryptedPassword) {
    // Invertir la cadena de contraseña nuevamente
    var decryptedPassword = encryptedPassword.split('').reverse().join('');
    return decryptedPassword;
}