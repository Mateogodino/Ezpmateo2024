


function GetEjerciciosFisicos() {{
    $.ajax({
        // la URL para la petición
        url: '../../EjerciciosFisicos/ListadoEjercicios',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: {  },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (Ejercicios) {

            $("#ModalTipoEjercicio").modal("hide");
            LimpiarModal();
            let contenidoTabla = ``;
            

            $.each(Ejercicios, function (Index, Ejercicio) {  

                console.log(Ejercicio);
                
                contenidoTabla += `
                <tr${Index === Ejercicios.length - 1 ? ' class="ultima-fila fila-resaltar"' : ''} class="fila-resaltar">
                    <td class="borde-td align-middle"><div><p>${Ejercicio.ejercicioNombre}</p></div></td>
                    <td class="borde-td align-middle" style="max-width: 8rem;"><div><p>${Ejercicio.inicioString}</p></div></td>
                    <td class="borde-td align-middle" style="max-width: 8rem;"><div><p>${Ejercicio.finString}</p></div></td>
                    <td class="borde-td align-middle"><div><p>${Ejercicio.estadoInicio}</p></div></td>
                    <td class="borde-td align-middle"><div><p>${Ejercicio.estadoFin}</p></div></td>
                    <td class="borde-td align-middle" style=" max-width: 12rem;"><div><p>${Ejercicio.observaciones}</p></div></td>
                    <td class="text-center">
                    <button type="button" class="btn btn-success" onclick="AbrirModalEditar(${Ejercicio.idEjercicioFisico})">
                    <i class="bi bi-pencil-square"></i>
                    </button>
                    </td>
                    <td class="text-center">
                    <button type="button" class="btn btn-danger" onclick="EliminarRegistro(${Ejercicio.idEjercicioFisico})"><i class="bi bi-trash3"></i<
                    </button>
                    </td>
                </tr>
             `;

            });

            document.getElementById("tbody-ejerciciosFisicos").innerHTML = contenidoTabla;

        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el listado');
        }
    });
}}

window.onload = GetEjerciciosFisicos

function NuevoRegistro(){
    $("#ModalTitulo").text("Nuevo Tipo de Ejercicio");
}

function GuardarRegistro(){
    //GUARDAMOS EN UNA VARIABLE LO ESCRITO EN EL INPUT DESCRIPCION
    let idEjerciciofisico = document.getElementById("EjercicioFisicoID").value;
    let tipoEjercicioID = document.getElementById("IdEjercicio").value;
    let inicio = document.getElementById("Inicio").value;
    let fin = document.getElementById("Fin").value;
    let estadoInicio = document.getElementById("EstadoInicio").value;
    let estadoFin = document.getElementById("EstadoFin").value;
    let observaciones = document.getElementById("Observaciones").value;

    //POR UN LADO PROGRAMAR VERIFICACIONES DE DATOS EN EL FRONT CUANDO SON DE INGRESO DE VALORES Y NO SE NECESITA VERIFICAR EN BASES DE DATOS
    //LUEGO POR OTRO LADO HACER VERIFICACIONES DE DATOS EN EL BACK, SI EXISTE EL ELEMENTO SI NECESITAMOS LA BASE DE DATOS.
    $.ajax({
        // la URL para la petición
        url: '../../EjerciciosFisicos/GuardarEjercicioFisico',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { idEjerciciofisico: idEjerciciofisico,tipoEjercicioID: tipoEjercicioID, 
                inicio: inicio, fin: fin, estadoInicio: estadoInicio, estadoFin: estadoFin, 
                observaciones: observaciones},
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {

            if(resultado != ""){
                alert(resultado);
            }
            GetEjerciciosFisicos();
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el registro');
        }
    });    
}


  function LimpiarModal(){
    document.getElementById("IdEjercicio").value = 0;
    document.getElementById("Inicio").value = "";
    document.getElementById("Inicio").classList.remove("expanded");
    document.getElementById("EstadoInicio").value = 0;
    document.getElementById("Fin").value = "";
    document.getElementById("Fin").classList.remove("expanded");
    document.getElementById("EstadoFin").value = 0;
    document.getElementById("Observaciones").value = "";
}

function AbrirModalEditar(idEjerciciofisico){
    $.ajax({
        // la URL para la petición
        url: '../../EjerciciosFisicos/GetEjerciciosFisicos',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { idEjerciciofisico: idEjerciciofisico},
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (EjercicioFisico) {
            let ejercicio = EjercicioFisico[0];
            document.getElementById("EjercicioFisicoID").value = idEjerciciofisico;
            $("#ModalTitulo").text("Editar Tipo de Ejercicio");
            document.getElementById("IdEjercicio").value = ejercicio.tipoEjercicioID;
            document.getElementById("Inicio").value = ejercicio.inicio;
            document.getElementById("Inicio").classList.add("expanded");
            document.getElementById("Fin").value = ejercicio.fin;
            document.getElementById("Fin").classList.add("expanded");
            document.getElementById("EstadoInicio").value = ejercicio.estadoInicio;
            document.getElementById("EstadoFin").value = ejercicio.estadoFin;
            document.getElementById("Observaciones").value = ejercicio.observaciones;

            $("#ModalTipoEjercicio").modal("show");
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al consultar el registro para ser modificado.');
        }
    });
}

function EliminarRegistro(IdEjercicioFisico){
    console.log(IdEjercicioFisico);
    $.ajax({
        // la URL para la petición
        url: '../../EjerciciosFisicos/DeleteEjercicioFisico',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { IdEjercicioFisico: IdEjercicioFisico},
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {           
            GetEjerciciosFisicos();
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al eliminar el registro.');
        }
    });    

}


  function expanded(input) {
    if (input.value !== "") {
        input.classList.add("expanded"); // Agregar la clase si hay una fecha cargada
    } else {
        input.classList.remove("expanded"); // Quitar la clase si no hay fecha cargada
    }
}


$(document).ready(function() {
    $('#fecha').change(function() {
      $(this).removeClass('input-circulo'); // Quita la clase de círculo
    });
  });

  function mostrarFecha() {
    var fechaInput = document.getElementById("fecha");
    var fechaSeleccionada = fechaInput.value;
    if (fechaSeleccionada !== "") {
      fechaInput.setAttribute("value", fechaSeleccionada); // Establecer el valor del input como la fecha seleccionada
    }
  }
