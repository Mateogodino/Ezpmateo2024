window.onload = MostrarListadoEjercicios();


function MostrarListadoEjercicios() {
    $.ajax({
        // la URL para la petición
        url: '../../EjerciciosFisicos/MostrarListadoEjercicios',
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

            $("#ModalEjerciciosFisicos").modal("hide");
            LimpiarModal();
            let contenidoTabla = ``;
            

            $.each(Ejercicios, function (Index, Ejercicio) {  

                console.log(Ejercicio);
                
                contenidoTabla += `
                <tr>
                <td class="text-center">${Ejercicio.ejercicioDescripcion}</td>
                <td class="text-center">${Ejercicio.inicioString}</td>
                <td class="text-center">${Ejercicio.finString}</td>
                <td class="text-center">${Ejercicio.estadoEmocionalInicio}</td>
                <td class="text-center">${Ejercicio.estadoEmocionalFin}</td>
                <td class="text-center">${Ejercicio.observaciones}</td>
                <td class="text-center">
                <button type="button" class="btn btn-primary shadow" onclick="AbrirEditar(${Ejercicio.ejerciciosFisicosID})">
                Editar
                </button>
                </td>
                <td class="text-center">
                <button type="button" class="btn btn-danger shadow" onclick="EliminarEjercicio(${Ejercicio.ejerciciosFisicosID})">
                Eliminar
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
}



function NuevoRegistro(){
    $("#ModalTitulo").text("Nuevo Tipo de Ejercicio");
}

function GuardarRegistro(){
    //GUARDAMOS EN UNA VARIABLE LO ESCRITO EN EL INPUT DESCRIPCION
    let ejercicioFisicoID = document.getElementById("EjerciciosFisicosID").value;
    let tipoEjercicioID = document.getElementById("TipoEjercicioID").value;
    let inicio = document.getElementById("FechaInicio").value;
    let estadoEmocionalInicio = document.getElementById("EstadoEmocionalInicio").value;
    let fin = document.getElementById("FechaFin").value;
    let estadoEmocionalFin = document.getElementById("EstadoEmocionalFin").value;
    let observaciones = document.getElementById("Observaciones").value;

    //POR UN LADO PROGRAMAR VERIFICACIONES DE DATOS EN EL FRONT CUANDO SON DE INGRESO DE VALORES Y NO SE NECESITA VERIFICAR EN BASES DE DATOS
    //LUEGO POR OTRO LADO HACER VERIFICACIONES DE DATOS EN EL BACK, SI EXISTE EL ELEMENTO SI NECESITAMOS LA BASE DE DATOS.
    $.ajax({
        // la URL para la petición
        url: '../../EjerciciosFisicos/GuardarEjercicioFisico',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { ejercicioFisicoID: ejercicioFisicoID,
                tipoEjercicioID: tipoEjercicioID, 
                inicio: inicio,
                fin: fin, 
                estadoEmocionalInicio: estadoEmocionalInicio, 
                estadoEmocionalFin: estadoEmocionalFin, 
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
            MostrarListadoEjercicios();
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

    document.getElementById("EjerciciosFisicosID").value = 0;
    document.getElementById("TipoEjercicioID").value = 0;
    document.getElementById("FechaInicio").value = "";
    document.getElementById("EstadoEmocionalInicio").value = 0;
    document.getElementById("FechaFin").value = "";
    document.getElementById("EstadoEmocionalFin").value = 0;
    document.getElementById("Observaciones").value = "";
}

function AbrirEditar(ejerciciosFisicosID){
    $.ajax({
        // la URL para la petición
        url: '../../EjerciciosFisicos/TraerListaEjercicios',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { ejerciciosFisicosID: ejerciciosFisicosID},
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (EjercicioFisico) {
            let ejercicio = EjercicioFisico[0];
            document.getElementById("EjerciciosFisicosID").value = ejerciciosFisicosID;
            $("#ModalTitulo").text("Editar ejercicio fisico");
            document.getElementById("TipoEjercicioID").value = ejercicio.tipoEjercicioID;
            document.getElementById("FechaInicio").value = ejercicio.inicio;
            document.getElementById("FechaFin").value = ejercicio.fin;
            document.getElementById("EstadoEmocionalInicio").value = ejercicio.EstadoEmocionalInicio;
            document.getElementById("EstadoEmocionalFin").value = ejercicio.EstadoEmocionalFin;
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

function EliminarEjercicio(EjerciciosFisicosID){
    console.log(EjerciciosFisicosID);
    $.ajax({
        // la URL para la petición
        url: '../../EjerciciosFisicos/EliminarEjercicioFisico',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { EjerciciosFisicosID: EjerciciosFisicosID},
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {           
            MostrarListadoEjercicios();
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al eliminar el registro.');
        }
    });    

}


//   function expanded(input) {
//     if (input.value !== "") {
//         input.classList.add("expanded"); // Agregar la clase si hay una fecha cargada
//     } else {
//         input.classList.remove("expanded"); // Quitar la clase si no hay fecha cargada
//     }
// }


// $(document).ready(function() {
//     $('#fecha').change(function() {
//       $(this).removeClass('input-circulo'); // Quita la clase de círculo
//     });
//   });

//   function mostrarFecha() {
//     var fechaInput = document.getElementById("fecha");
//     var fechaSeleccionada = fechaInput.value;
//     if (fechaSeleccionada !== "") {
//       fechaInput.setAttribute("value", fechaSeleccionada); // Establecer el valor del input como la fecha seleccionada
//     }
//   }
