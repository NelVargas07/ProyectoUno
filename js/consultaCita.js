document.addEventListener("DOMContentLoaded", () => {
    cargarCitasDesdeLocalStorage();    
});

function cargarCitasDesdeLocalStorage() {
    const citasGuardadas = localStorage.getItem('citas');
    if (citasGuardadas) {
        const citas = JSON.parse(citasGuardadas);
        const tablaBody = document.getElementById('tabla-citas-body');
        tablaBody.innerHTML = '';
        citas.forEach(cita => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
            <td>${cita.fecha}</td>
            <td>${cita.hora}</td>
            <td>${cita.cedulaUsuario}</td>
            <td>${cita.estado}</td>
            <td>
                <button onclick="aceptarCita('${cita.fecha}', '${cita.hora}', '${cita.cedulaUsuario}')">Aceptar</button>
                <button onclick="rechazarCita('${cita.fecha}', '${cita.hora}', '${cita.cedulaUsuario}')">Rechazar</button>
                <button onclick="EsperaCita('${cita.fecha}', '${cita.hora}', '${cita.cedulaUsuario}')">Espera</button>
            </td>
        `;
            tablaBody.appendChild(fila);
        });
    } else {
        console.log('No hay citas guardadas en el localStorage');
    }
}

function aceptarCita(fecha, hora, cedulaUsuario) {
    // Buscar la cita en el localStorage
    const citasGuardadas = localStorage.getItem('citas');
    if (citasGuardadas) {
        const citas = JSON.parse(citasGuardadas);
        const citaAceptada = citas.find(cita => cita.fecha === fecha && cita.hora === hora && cita.cedulaUsuario === cedulaUsuario);
        if (citaAceptada) {
            // Cambiar el estado de la cita a "confirmada"
            citaAceptada.estado = 'confirmada';
            // Guardar las citas actualizadas en el localStorage
            localStorage.setItem('citas', JSON.stringify(citas));
            // Recargar la lista de citas
            cargarCitasDesdeLocalStorage();
            alert('cambio efectuado');
        }
    }
}

function EsperaCita(fecha, hora, cedulaUsuario) {
    // Buscar la cita en el localStorage
    const citasGuardadas = localStorage.getItem('citas');
    if (citasGuardadas) {
        const citas = JSON.parse(citasGuardadas);
        const citaAceptada = citas.find(cita => cita.fecha === fecha && cita.hora === hora && cita.cedulaUsuario === cedulaUsuario);
        if (citaAceptada) {
            // Cambiar el estado de la cita a "confirmada"
            citaAceptada.estado = 'pendiente';
            // Guardar las citas actualizadas en el localStorage
            localStorage.setItem('citas', JSON.stringify(citas));
            // Recargar la lista de citas
            cargarCitasDesdeLocalStorage();
            alert('cambio efectuado');
        }
    }
}

function rechazarCita(fecha, hora, cedulaUsuario) {
    const citasGuardadas = localStorage.getItem('citas');
    if (citasGuardadas) {
        let citas = JSON.parse(citasGuardadas);
        console.log('Citas antes de eliminar:', citas); // Agrega esta línea para imprimir las citas antes de eliminar
        citas = citas.filter(cita => !(cita.fecha === fecha && cita.hora === hora && cita.cedulaUsuario === cedulaUsuario));
        console.log('Citas después de eliminar:', citas); // Agrega esta línea para imprimir las citas después de eliminar
        localStorage.setItem('citas', JSON.stringify(citas));
        cargarCitasDesdeLocalStorage();
        alert('cita eliminada');
    }
}