document.addEventListener("DOMContentLoaded", () => {
  cargarCitas();
  generarCalendario();
  document.getElementById("especialidad").addEventListener("change", cargarMedicos);

  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", (event) => {

    event.preventDefault();
    const { fecha,hora,especialidad,medico } = obtenerDatosFormulario();
    guardarCita(fecha,hora,especialidad,medico);

});

});

function obtenerDatosFormulario(){
  const fecha = document.getElementById("fecha").value.trim();
  const hora = document.getElementById("hora").value.trim();
  const especialidad = document.getElementById("especialidad").value.trim();
  const medico = document.getElementById("medico").value.trim();
  return {fecha,hora,especialidad,medico};

}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Función para cargar los médicos basados en la especialidad seleccionada
function cargarMedicos() {
  // Seleccionamos el elemento del menú desplegable de especialidades y el de médicos
  var especialidadSelect = document.getElementById("especialidad");
  var medicoSelect = document.getElementById("medico");
  
  // Limpiamos las opciones existentes de médicos
  medicoSelect.innerHTML = "";
  
  // Obtenemos la especialidad seleccionada
  var especialidad = especialidadSelect.value;
  
  // Filtramos los médicos que corresponden a la especialidad seleccionada
  var medicosEspecialidad = data.filter(function(medico) {
      return medico.especialidad === especialidad;
  });
  
  // Creamos opciones para cada médico y las agregamos al menú desplegable de médicos
  medicosEspecialidad.forEach(function(medico) {
      var option = document.createElement("option");
      option.text = medico.nombre;
      option.value = medico.nombre;
      medicoSelect.add(option);
  });
}

let fechaActual = new Date();

  
let citas = [];

function mostrarMes(desplazamiento) {
  fechaActual.setMonth(fechaActual.getMonth() + desplazamiento);
  generarCalendario();
}

var citaAbierta = [];

function mostrarInformacionCita(cita) {
  citaAbierta = cita;
  const citaInfo = `
    Fecha: ${cita.fecha}
    Hora: ${cita.hora}
    Especialidad: ${cita.especialidad}
    Médico: ${cita.medico}
  `;
  document.getElementById('cita-info').textContent = citaInfo;
  document.getElementById('modal').style.display = 'block';
}


function cancelarCita() {
    
  // Aquí puedes agregar la lógica para cancelar la cita
  var result = confirm('desea cancelar la cita');

  if(result){
    const citasGuardadas = localStorage.getItem('citas');
    if (citasGuardadas) {
        let citas = JSON.parse(citasGuardadas);
        citas = citas.filter(cita => !(cita.fecha === citaAbierta.fecha && cita.hora === citaAbierta.hora && cita.cedulaUsuario === citaAbierta.cedulaUsuario));
        localStorage.setItem('citas', JSON.stringify(citas));
        cargarCitas();
        generarCalendario();
        document.getElementById('popup').style.display = 'none';
        document.getElementById('popup-overlay').style.display = 'none';
    }
  }
}

function generarCalendario() {
  const primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
  const ultimoDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);
  
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  document.getElementById('mesYAnio').textContent = `${meses[fechaActual.getMonth()]} ${fechaActual.getFullYear()}`;
  
  const diasEnSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const primerDiaSemana = primerDiaMes.getDay() - 1;
  
  const dias = [];
  let dia = 1;
  
  for (let i = 0; i < 6; i++) {
    const fila = document.createElement('tr');
    
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < primerDiaSemana) || dia > ultimoDiaMes.getDate()) {
        const celda = document.createElement('td');
        fila.appendChild(celda);
      } else {
        const celda = document.createElement('td');
        celda.textContent = dia;
        const fecha = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
        
        // Buscar citas correspondientes a la fecha actual y al usuario activo en el array de citas
        const citasFechaUsuario = citas.filter(cita => cita.fecha === fecha && cita.cedulaUsuario === localStorage.getItem("Activo"));
        
        if (citasFechaUsuario.length > 0) {
          citasFechaUsuario.forEach(function(cita) {
            celda.classList.add('cita'); // Agregar la clase 'cita' para resaltar la celda con cita
            celda.setAttribute('title', cita.descripcion); // Establecer el atributo de título de la celda como la descripción de la cita
            celda.addEventListener('click', function() {
              mostrarInformacionCita(cita); // Mostrar información de la cita al hacer clic en la celda
            });
            colorCita(cita, celda);
          });
        }
        
        fila.appendChild(celda);
        dia++;
      }
    }
    
    dias.push(fila);
  }
  
  const tbody = document.getElementById('dias');
  tbody.innerHTML = '';
  dias.forEach(fila => tbody.appendChild(fila));
}




function colorCita(infoCita, celda) {
    // Supongamos que el formato de infoCita es 'Descripción,estado'
    const citaInfo = infoCita.estado; // Dividir la información de la cita
    
    // Muestra la descripción de la cita en la celda
    //celda.textContent = citaInfo[0];
    
    const estadoCita = citaInfo[1]; // Obtenemos el estado de la cita
    
    if (citaInfo === 'confirmada') {
      // Cambia el color de fondo de la celda a verde si la cita está confirmada
      celda.style.backgroundColor = 'green';
    } else if (citaInfo === 'pendiente') {
      // Cambia el color de fondo de la celda a amarillo si la cita está pendiente
      celda.style.backgroundColor = 'yellow';
    } else {
      // Si no es confirmada ni pendiente, deja el color de fondo predeterminado
      // Aquí puedes definir otro color si lo deseas
    }
  }

  function guardarCita(fecha,hora,especialidad,medico) {
      // Obtener los valores seleccionados
      var fecha = fecha;
      var hora = hora;
      var especialidad = especialidad;
      var medico = medico;
      var cedulaUsuario = localStorage.getItem("Activo");
      // Verificar si ya existe una cita con el mismo médico a la misma hora
      var citaExistente = citas.find(function (cita) {
          return cita.medico === medico && cita.fecha === fecha && cita.hora === hora;
      });
  
      if (citaExistente) {
          alert("Ya hay una cita programada con este médico a la misma hora. Por favor, selecciona otra hora.");
          return; // Detener la función si la cita ya existe
      }
      
      citaExistente = citas.find(function (cita) {
        return cita.cedulaUsuario === cedulaUsuario && cita.fecha === fecha;
      });

      if (citaExistente) {
        alert("Ya hay una cita programada para ese dia. Por favor, selecciona otro dia.");
        return; // Detener la función si la cita ya existe
      }

      // Verificar si la hora de la cita está dentro del horario del médico
      var medicoData = data.find(function (item) {
          return item.nombre === medico;
      });
  
      if (!medicoData) {
          alert("No se encontraron datos del médico. Por favor, selecciona otro médico.");
          return; // Detener la función si no se encontraron datos del médico
      }
  
      var horario = medicoData.horarios.split(" a ");
      var horaInicio = new Date("01/01/2000 " + horario[0]);
      var horaFin = new Date("01/01/2000 " + horario[1]);
      var horaCita = new Date("01/01/2000 " + hora);
  
      if (horaCita < horaInicio || horaCita > horaFin) {
          alert("La hora de la cita está fuera del horario del médico. Por favor, selecciona otra hora.");
          return; // Detener la función si la hora de la cita está fuera del horario del médico
      }
  
      // Crear un objeto con los datos de la cita
      var cita = {
          fecha: fecha,
          hora: hora,
          especialidad: especialidad,
          medico: medico,
          cedulaUsuario: cedulaUsuario,  // No se necesita la cedula del usuario aquí
          estado: "pendiente"
      };
      console.log(cita.cedulaUsuario);
      // Agregar la cita a la lista de citas guardadas
      citas.push(cita);
      guardarCitasEnLocalStorage();
  }
  
  function cargarCitas() {
    const citasGuardadas = localStorage.getItem('citas');
    if (citasGuardadas) {
        citas = JSON.parse(citasGuardadas);
    } else {
        citas = []; // Si no hay citas guardadas, inicializamos el arreglo como vacío
    }
}

function guardarCitasEnLocalStorage() {
    localStorage.setItem('citas', JSON.stringify(citas));
}


  