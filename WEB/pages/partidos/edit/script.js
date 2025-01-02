document.addEventListener("DOMContentLoaded", function() {
    ejecutar();
});

function guardar() {
    const tituloPartido = document.getElementById("tituloPartido").value.trim();
    const descripcionPartido = document.getElementById("descripcionPartido").value.trim();

    if (tituloPartido === "" || descripcionPartido === "") {
        notificacion('Restrincción', 'Debe completar todos los campos de forma correcta.', '', 'Advertencia');
        return;
    }
    else{
        createOrUpdatePartido(partidoId, tituloPartido, descripcionPartido, function (error) {
            if (error) {
                notificacion('Restrincción', 'No se ha encontrado este partido, comunicate con un desarrollador.', '', 'Advertencia');
                return;
            }
            else{
                notificacion('En hora buena', 'Datos actualizados satifactoriamente.', '', 'Exito');
                window.location.replace("../");
            }
        });
    }
}

let partidoId = 0;

function ejecutar(){
    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    getAlmacenamiento("partidoId").then(resulAlmacenamiento =>{

        if(resulAlmacenamiento.Validacion == "Exitoso"){
            partidoId = resulAlmacenamiento.value;

            getPartidoById(partidoId, function (error, partido) {
                if (error) {
                    notificacion('Restrincción', 'No se ha encontrado este partido, comunicate con un desarrollador.', '', 'Advertencia');
                    return;
                }
                else{
                    document.getElementById("tituloPartido").value = partido.titulo;
                    document.getElementById("descripcionPartido").value = partido.descripcion;

                    document.querySelector('.cargando-mini-contenedor').style.display = "none";
                }
            });

        }
        else{
            notificacion('Restrincción', 'Se ha detectado un error inesperado.', '', 'Error');
        }

    });
}