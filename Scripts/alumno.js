$(document).ready(function () {
    cargarAlumnos();

    $("#btnNuevo").click(function () {
        abrirModalNuevo();
    });
});

function cargarAlumnos() {
    $.ajax({
        url: '/Alumno/GetAlumnos',
        type: 'GET',
        success: function (data) {
            let filas = '';
            $.each(data, function (i, a) {
                filas += `
                    <tr>
                        <td>${a.Nombre}</td>
                        <td>${a.Grado}</td>
                        <td>${a.Edad}</td>
                        <td>
                            <button class="btn btn-info btn-sm" onclick="verDetalles('${a.Nombre}', '${a.Grado}', ${a.Edad})">Ver</button>
                            <button class="btn btn-warning btn-sm" onclick="editar(${a.IdAlumno}, '${a.Nombre}', '${a.Grado}', ${a.Edad})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminar(${a.IdAlumno})">Eliminar</button>
                        </td>
                    </tr>`;
            });
            $("#tblAlumnos tbody").html(filas);
        },
        error: function (err) {
            console.error('Error al cargar alumnos:', err);
            Swal.fire('Error', 'No se pudieron cargar los alumnos', 'error');
        }
    });
}

function verDetalles(nombre, grado, edad) {
    Swal.fire({
        title: 'Información del Alumno',
        icon: 'info',
        html: `
            <div style="text-align: left;">
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Grado:</strong> ${grado}</p>
                <p><strong>Edad:</strong> ${edad} años</p>
            </div>
        `,
        confirmButtonText: 'Cerrar'
    });
}

function abrirModalNuevo() {
    Swal.fire({
        title: 'Nuevo Alumno',
        html: `
            <input id="nombre" class="swal2-input" placeholder="Nombre">
            <input id="grado" class="swal2-input" placeholder="Grado">
            <input id="edad" type="number" class="swal2-input" placeholder="Edad">
        `,
        preConfirm: () => {
            const nombre = $('#nombre').val();
            if (!nombre) {
                Swal.showValidationMessage(`El nombre es obligatorio`);
            }
            return {
                Nombre: $('#nombre').val(),
                Grado: $('#grado').val(),
                Edad: $('#edad').val()
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            guardarAlumno(result.value);
        }
    });
}

function guardarAlumno(data) {
    $.ajax({
        url: '/Alumno/InsertAlumnos',
        type: 'POST',
        data: data,
        success: function () {
            Swal.fire('Guardado', 'Alumno registrado', 'success');
            cargarAlumnos();
        }
    });
}


function editar(id, nombre, grado, edad) {
    Swal.fire({
        title: 'Editar Alumno',
        html: `
            <input id="swNombre" class="swal2-input" placeholder="Nombre" value="${nombre}">
            <input id="swGrado" class="swal2-input" placeholder="Grado" value="${grado}">
            <input id="swEdad" type="number" class="swal2-input" placeholder="Edad" value="${edad}">
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        preConfirm: () => {
            return {
                IdAlumno: id,
                Nombre: document.getElementById('swNombre').value,
                Grado: document.getElementById('swGrado').value,
                Edad: document.getElementById('swEdad').value
            };
        }
    }).then(result => {
        if (result.isConfirmed) {
            actualizarAlumno(result.value);
        }
    });
}



function eliminar(id) {
    console.log('ID a eliminar:', id); // Verifica que el ID sea válido

    Swal.fire({
        title: '¿Eliminar alumno?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar'
    }).then((r) => {
        if (r.isConfirmed) {
            $.ajax({
                url: '/Alumno/DeleteAlumnos',
                type: 'POST',
                data: { id: id },
                success: function (response) {
                    console.log('Response exitoso:', response);
                    Swal.fire('Eliminado', 'Alumno eliminado', 'success');
                    cargarAlumnos();
                },
                error: function (xhr, status, error) {
                    console.log('=== ERROR COMPLETO ===');
                    console.log('XHR completo:', xhr);
                    console.log('Status:', status);
                    console.log('Error:', error);
                    console.log('Response Text:', xhr.responseText);
                    console.log('Status Code:', xhr.status);

                    // Intenta parsear el HTML del error
                    var errorHtml = xhr.responseText;
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = errorHtml;
                    var errorMessage = tempDiv.textContent || tempDiv.innerText || '';
                    console.log('Mensaje de error parseado:', errorMessage);

                    Swal.fire('Error', 'Error al eliminar el alumno', 'error');
                }
            });
        }
    });
}


function actualizarAlumno(model) {
    $.ajax({
        url: '/Alumno/UpdateAlumnos',
        type: 'POST',
        data: model,
        success: function () {
            Swal.fire('Actualizado', 'Alumno actualizado correctamente', 'success');
            cargarAlumnos();
        },
        error: function () {
            Swal.fire('Error', 'No se pudo actualizar el alumno', 'error');
        }
    });
}


