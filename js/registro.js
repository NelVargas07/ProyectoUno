document.addEventListener("DOMContentLoaded",()=>{
    
    const formulario = document.getElementById("formulario");
    
    formulario.addEventListener("submit",(event)=>{

        event.preventDefault();
        const {cedula,nombre,apellidos,telefono,correo,password,confirmPassword} = obtenerDatosFormulario();
        console.log(nombre);
        const esValido = validarCedula(cedula) && validarNombre(nombre) && validarApellidos(apellidos) && validarTelefono(telefono) &&
         validarContrasenna(password) && validarCorreo(correo) && validarConfirmPassword(password,confirmPassword);
        if(esValido){
           if(ValidarRegistro){
                manejarErrorUsuario();
           }else{
                guardarUsuario(cedula, nombre, apellidos, telefono, correo, password);
           }
        }else{
            manejarError();
        }

    });

});

const obtenerDatosFormulario = ()=>{

    const cedula = document.getElementById("cedula").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    return {cedula,nombre,apellidos,telefono, correo, password, confirmPassword};

};

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

const manejarExito = () =>{

    alert("Registro exitoso");
    imprimirRegistrosUsuarios();
    window.location.href = 'iniciosesion.html';

}

const manejarErrorUsuario = () =>{

    alert("Usuario ya registrado");

}

const manejarError = () =>{

    alert("Datos no son validos");

}

const limpiarCamposDeTexto = () =>{

    const campos = document.querySelectorAll("#formulario input[type='cedula'],#formulario input[type='nombre'],#formulario input[type='apellidos'],#formulario input[type='telefono'],#formulario input[type='correo'],#formulario input[type='password'],#formulario input[type='confirmPassword']");
    campos.forEach((campo) => campo.value="");

};

function guardarUsuario(cedula, nombre, apellidos, telefono, correo, password) {
    // Crear un objeto con los valores del usuario
    const datosUsuario = {
        cedula: cedula,
        nombre: nombre,
        apellidos: apellidos,
        telefono: telefono,
        correo: correo,
        password: password
    };

    // Convertir el objeto a formato JSON y utilizar la cédula como clave única
    localStorage.setItem(cedula, JSON.stringify(datosUsuario));
    manejarExito();
}

function ValidarRegistro(cedula) {
    // Array para almacenar los registros de usuarios
    const registrosUsuarios = [];

    // Iterar sobre las claves del localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        // Verificar si la clave corresponde a un registro de usuario
        if (clave !== 'usuario') {
            // Obtener los datos del usuario en formato JSON y convertirlos a objeto
            const datosUsuarioString = localStorage.getItem(clave);
            const datosUsuario = JSON.parse(datosUsuarioString);
            registrosUsuarios.push(datosUsuario);
        }
    }

    if (registrosUsuarios.length > 0) {
        registrosUsuarios.forEach((usuario, index) => {
            if(usuario.cedula == cedula){
                console.log("entra");
                return true;
            }
        });
        return false;
    } else {
        return false;
    }
}

function imprimirRegistrosUsuarios() {
    // Array para almacenar los registros de usuarios
    const registrosUsuarios = [];

    // Iterar sobre las claves del localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        // Verificar si la clave corresponde a un registro de usuario
        if (clave !== 'usuario') {
            // Obtener los datos del usuario en formato JSON y convertirlos a objeto
            const datosUsuarioString = localStorage.getItem(clave);
            const datosUsuario = JSON.parse(datosUsuarioString);
            registrosUsuarios.push(datosUsuario);
        }
    }

    // Verificar si se encontraron registros de usuarios en el localStorage
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
        console.log('No se encontraron registros de usuarios en el localStorage');
    }
}
