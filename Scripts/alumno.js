$(document).ready(function () {
    cargarGrid();

    $("#btnNuevo").on("click", function () {
        abrirFormulario();
    });
});

function cargarGrid() {
    // uso de dxDataGrid para el grid de visualización de datos
    $("#gridContainer").dxDataGrid({
        dataSource: "/Alumno/GetAlumnos",
        keyExpr: "IdAlumno",
        showBorders: true,
        columns: [
            {
                dataField: "Nombre",
                caption: "Nombre",
                cellTemplate: function (container, options) {
                    if (!options.data.Activo) {
                        $("<span>")
                            .text("Alumno inactivo")
                            .css({
                                color: "#999",
                                fontStyle: "italic"
                            })
                            .appendTo(container);
                    } else {
                        $("<span>")
                            .text(options.value)
                            .appendTo(container);
                    }
                }
            },
            { dataField: "Grado", caption: "Grado" },
            { dataField: "Edad", caption: "Edad", width: 80 },
            {
                type: "buttons",
                width: 150,
                buttons: [
                    {
                        hint: "Más Información",
                        icon: "info",
                        onClick: (e) => verMasInfo(e.row.data)
                    },
                    {
                        hint: "Editar",
                        icon: "edit",
                        onClick: (e) => abrirFormulario(e.row.data)
                    },
                    {
                        hint: "Eliminar",
                        icon: "trash",
                        onClick: (e) => eliminarRegistro(e.row.data.IdAlumno)
                    }
                ]
            }
        ],
        paging: { pageSize: 10 },
        searchPanel: { visible: true }
    });
}

function abrirFormulario(data = null) {
    const esEdicion = !!data;

    Swal.fire({
        title: esEdicion ? 'Editar Registro' : 'Nuevo Registro',
        html: `
            <div id="dxNombre" class="mb-2"></div>
            <div id="dxGrado" class="mb-2"></div>
            <div id="dxEdad" class="mb-2"></div>
            <div id="dxActivo" class="mt-2" style="text-align: left;"></div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        didOpen: () => {
            $("#dxNombre").dxTextBox({
                placeholder: "Escriba el nombre...",
                value: esEdicion ? data.Nombre : ""
            });
            // uso de dxLookup para el combobox
            $("#dxGrado").dxLookup({
                dataSource: ["1º Grado", "2º Grado", "3º Grado", "4º Grado", "5º Grado", "6º Grado"],
                placeholder: "Seleccione Grado",
                value: esEdicion ? data.Grado : null
            });
            // uso de dxCheckBox para los checkbox
            $("#dxActivo").dxCheckBox({
                text: "Alumno activo",
                value: esEdicion ? (data.Activo ?? true) : true,
                iconSize: 20
            });
            // uso de dxNumberBox para el input numerico
            $("#dxEdad").dxNumberBox({
                placeholder: "Edad",
                showSpinButtons: true,
                value: esEdicion ? data.Edad : 18,
                min: 1
            });
        },
        preConfirm: () => {
            return {
                IdAlumno: esEdicion ? data.IdAlumno : 0,
                Nombre: $("#dxNombre").dxTextBox("instance").option("value"),
                Grado: $("#dxGrado").dxLookup("instance").option("value"),
                Edad: $("#dxEdad").dxNumberBox("instance").option("value"),
                Activo: $("#dxActivo").dxCheckBox("instance").option("value")
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const url = esEdicion ? "/Alumno/UpdateAlumnos" : "/Alumno/InsertAlumnos";
            enviarDatos(url, result.value, function () {

                if (
                    esEdicion &&
                    data.Activo !== result.value.Activo
                ) {
                    cambiarEstado(
                        result.value.IdAlumno,
                        result.value.Activo
                    );
                }
            });
        }
    });
}

function enviarDatos(url, modelo, callback) {
    $.post(url, modelo, function (res) {
        if (res.success) {
            Swal.fire("Éxito", "Operación realizada", "success");
            $("#gridContainer").dxDataGrid("instance").refresh();
            if (callback) callback();
        }
    });
}

function eliminarRegistro(id) {
    Swal.fire({
        title: '¿Eliminar alumno?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.post("/Alumno/DeleteAlumnos", { id: id }, function (res) {
                if (res.success) {
                    Swal.fire("Eliminado", "El alumno ha sido borrado", "success");
                    $("#gridContainer").dxDataGrid("instance").refresh();
                }
            });
        }
    });
}

function verMasInfo(data) {
    Swal.fire({
        title: 'Mas información',
        icon: 'info',
        html: `<b>Nombre:</b> ${data.Nombre} <br> <b>Grado:</b> ${data.Grado} <br> <b>Edad:</b> ${data.Edad}`
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
    console.log('ID a eliminar:', id);

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


function cambiarEstado(id, activo) {
    $.post("/Alumno/CambiarEstado", { id: id, activo: activo }, function (res) {
        if (!res.success) {
            Swal.fire("Error", "No se pudo cambiar el estado", "error");
            $("#gridContainer").dxDataGrid("instance").refresh();
        }
    });
}

