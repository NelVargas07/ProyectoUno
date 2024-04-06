document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
    cargarRegistrosUsuarios();
    formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        const { cedula, nombre, apellidos, telefono, correo, password, confirmPassword } = obtenerDatosFormulario();
        const esValido = validarCedula(cedula) && validarNombre(nombre) && validarApellidos(apellidos) && validarTelefono(telefono) &&
            validarContrasenna(password) && validarCorreo(correo) && validarConfirmPassword(password, confirmPassword);
        if (esValido) {
            if (ValidarRegistro(cedula)) {
                manejarErrorUsuario();
            } else {
                guardarUsuario(cedula, nombre, apellidos, telefono, correo, password);
            }
        } else {
            manejarError();
        }

    });

});

const obtenerDatosFormulario = () => {
    const cedula = document.getElementById("cedula").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    return { cedula, nombre, apellidos, telefono, correo, password, confirmPassword };
};

const validarCedula = (cedula) =>
    /^\d{2}-\d{4}-\d{4}$/.test(cedula);

const validarNombre = (nombre) =>
    /^.{1,20}$/.test(nombre);

const validarApellidos = (apellidos) =>
    /^(.|\s){1,30}$/.test(apellidos);

const validarTelefono = (telefono) =>
    /^\d{4}-\d{4}$/.test(telefono);

const validarCorreo = (correo) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo);

const validarContrasenna = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,11}$/.test(password);

function validarConfirmPassword(password, confirmPassword) {
    return password == confirmPassword;
}

const manejarExito = () => {
    alert("Registro exitoso");
    imprimirRegistrosUsuarios();
    guardarRegistrosUsuariosEnLocalStorage();
    window.location.href = 'iniciosesion.html';
}

const manejarErrorUsuario = () => {
    alert("Usuario ya registrado");
}

const manejarError = () => {
    alert("Datos no son válidos");
}

const limpiarCamposDeTexto = () => {
    const campos = document.querySelectorAll("#formulario input[type='cedula'],#formulario input[type='nombre'],#formulario input[type='apellidos'],#formulario input[type='telefono'],#formulario input[type='correo'],#formulario input[type='password'],#formulario input[type='confirmPassword']");
    campos.forEach((campo) => campo.value = "");
};

// Array para almacenar los registros de usuarios
let registrosUsuarios = [];

function guardarUsuario(cedula, nombre, apellidos, telefono, correo, password) {
    // Crear un objeto con los valores del usuario
    const datosUsuario = {
        cedula: cedula,
        nombre: nombre,
        apellidos: apellidos,
        telefono: telefono,
        correo: correo,
        password: encryptPassword(password)
    };

    // Convertir el objeto a formato JSON
    const datosUsuarioString = JSON.stringify(datosUsuario);

    // Utilizar la cédula como clave única en el localStorage y guardar los datos del usuario
    localStorage.setItem(cedula, datosUsuarioString);

    manejarExito();
}


function ValidarRegistro(cedula) {
    // Iterar sobre las claves del localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        // Verificar si la clave corresponde a un registro de usuario
        if (clave === cedula) {
            return true; // Si se encuentra la cédula, retorna true
        }
    }
    return false; // Si no se encuentra la cédula, retorna false
}


function imprimirRegistrosUsuarios() {
    // Verificar si se encontraron registros de usuarios en el array registrosUsuarios
    if (registrosUsuarios.length > 0) {
        // Imprimir los registros de usuarios en la consola
        console.log('Registros de usuarios:');
        registrosUsuarios.forEach((usuario, index) => {
            console.log(`Usuario ${index + 1}:`);
            console.log('Cédula:', usuario.cedula);
            console.log('Nombre:', usuario.nombre);
            console.log('Apellidos:', usuario.apellidos);
            console.log('Teléfono:', usuario.telefono);
            console.log('Correo:', usuario.correo);
            console.log('Contraseña:', usuario.password);
            console.log('\n');
        });
    } else {
        console.log('No se encontraron registros de usuarios en el array registrosUsuarios');
    }
}

function cargarRegistrosUsuarios() {
    const registrosGuardados = localStorage.getItem('registrosUsuarios');
    if (registrosGuardados) {
        registrosUsuarios = JSON.parse(registrosGuardados);
    }
}

function guardarRegistrosUsuariosEnLocalStorage() {
    localStorage.removeItem('registrosUsuarios');
    localStorage.setItem('registrosUsuarios', JSON.stringify(registrosUsuarios));
}

function encryptPassword(password) {
    // Invertir la cadena de contraseña
    var encryptedPassword = password.split('').reverse().join('');
    return encryptedPassword;
}