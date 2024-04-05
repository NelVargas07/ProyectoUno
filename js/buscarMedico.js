document.addEventListener("DOMContentLoaded",()=>{
    fillTable();
    console.log(data);
});

// Variables para la paginación
var currentPage = 1;
var rowsPerPage = 20;
var totalPages = Math.ceil(data.length / rowsPerPage);

// Función para llenar la tabla con los datos
function fillTable() {
    var startIndex = (currentPage - 1) * rowsPerPage;
    var endIndex = startIndex + rowsPerPage;
    var tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Limpiar contenido anterior

    for (var i = startIndex; i < endIndex && i < data.length; i++) {
        var row = document.createElement("tr");
        var nameCell = document.createElement("td");
        var specialtyCell = document.createElement("td");
        var phoneCell = document.createElement("td");

        // Agregar la referencia para abrir el modal
        nameCell.innerHTML = `<a href="#" onclick="openModal('${data[i].nombre}')">${data[i].nombre}</a>`;
        
        specialtyCell.textContent = data[i].especialidad;
        phoneCell.textContent = data[i].contacto.telefono;
        
        row.appendChild(nameCell);
        row.appendChild(specialtyCell);
        row.appendChild(phoneCell);
        
        tableBody.appendChild(row);
    }

    document.getElementById("prevPageBtn").disabled = currentPage === 1;
    document.getElementById("nextPageBtn").disabled = currentPage === totalPages;
}

// Función para ir a la página anterior
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fillTable();
    }
}

// Función para ir a la página siguiente
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        fillTable();
    }
}

// Función para abrir el modal y mostrar la información del médico
function openModal(doctorName) {
    var doctor = data.find(function(item) {
        return item.nombre === doctorName;
    });
    document.getElementById("modalTitle").textContent = doctor.nombre;
    document.getElementById("modalInfo").innerHTML = `Especialidad: ${doctor.especialidad}<br>Teléfono: ${doctor.contacto.telefono}<br>Ubicación: ${doctor.ubicacion}<br>Horarios: ${doctor.horarios}<br>Correo: ${doctor.contacto.correo}<br>Reseñas: ${doctor.reseñas}<br>Biografía: ${doctor.biografia}`;
    document.getElementById("myModal").style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Función para realizar la búsqueda en la tabla
function searchTable() {
    var input, filter, table, tr, td, i, selectIndex;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableBody");
    tr = table.getElementsByTagName("tr");
    selectIndex = document.getElementById("searchSelect").value;

    // Función para eliminar las tildes de una cadena de texto
    function removeAccents(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    // Convertir el filtro de búsqueda a texto sin tildes
    var filterWithoutAccents = removeAccents(filter);

    for (i = 0; i < tr.length; i++) {
        var found = false;
        td = tr[i].getElementsByTagName("td")[selectIndex];
        if (td) {
            var fieldValue = removeAccents(td.textContent || td.innerText).toUpperCase();
            if (fieldValue.indexOf(filterWithoutAccents) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

// Función para actualizar el placeholder del campo de búsqueda
function updatePlaceholder() {
    var selectIndex = document.getElementById("searchSelect").value;
    var placeholderText = "";
    if (selectIndex == 0) {
        placeholderText = "Buscar por nombre...";
    } else if (selectIndex == 1) {
        placeholderText = "Buscar por especialidad...";
    } else if (selectIndex == 2) {
        placeholderText = "Buscar por teléfono...";
    }
    document.getElementById("searchInput").setAttribute("placeholder", placeholderText);
}

// Función para ordenar la tabla por la columna seleccionada
function sortTable(columnIndex) {
    var table, rows, switching, i, shouldSwitch, sortOrder;
    table = document.getElementById("tableBody");
    switching = true;
    sortOrder = table.getAttribute("data-order");
    if (!sortOrder || sortOrder === "desc") {
        sortOrder = "asc";
    } else {
        sortOrder = "desc";
    }

    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("tr");

        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            var x = rows[i].getElementsByTagName("td")[columnIndex];
            var y = rows[i + 1].getElementsByTagName("td")[columnIndex];

            var xText = x.textContent || x.innerText;
            var yText = y.textContent || y.innerText;

            if (sortOrder === "asc") {
                if (xText.localeCompare(yText, 'es', { sensitivity: 'base' }) > 0) {
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (xText.localeCompare(yText, 'es', { sensitivity: 'base' }) < 0) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

    table.setAttribute("data-order", sortOrder);
}
