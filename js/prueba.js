document.addEventListener("DOMContentLoaded",()=>{
// Función para encriptar contraseña de manera simple
function encryptPassword(password) {
    // Invertir la cadena de contraseña
    var encryptedPassword = password.split('').reverse().join('');
    return encryptedPassword;
}

// Función para desencriptar contraseña
function decryptPassword(encryptedPassword) {
    // Invertir la cadena de contraseña nuevamente
    var decryptedPassword = encryptedPassword.split('').reverse().join('');
    return decryptedPassword;
}

// Ejemplo de uso
var password = "miContraseña123";

// Encriptar la contraseña
var encryptedPassword = encryptPassword(password);
console.log("Contraseña encriptada:", encryptedPassword);

// Desencriptar la contraseña
var decryptedPassword = decryptPassword(encryptedPassword);
console.log("Contraseña desencriptada:", decryptedPassword);

});