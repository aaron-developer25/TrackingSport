document.addEventListener("DOMContentLoaded", function() {
    ejecutar();
});

function confirmarEliminacion() {
    deletePartido(partidoId, function (error) {
        if (error) {
            notificacion('Restrincción', 'No se ha podido eliminar este partido, comunicate con un desarrollador.', '', 'Error');
            return;
        }
        else{
            notificacion('En hora buena', 'Datos eliminados satifactoriamente.', '', 'Exito');
            window.location.replace("../");
        }
    });
}

function cancelarEliminacion() {
    window.location.replace("../"); 
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
                    document.querySelector(".mensaje-confirmacion").textContent = "¿Estás seguro que deseas eliminar este partido " + partido.titulo + "?";
                    document.querySelector('.cargando-mini-contenedor').style.display = "none";
                }
            });

        }
        else{
            notificacion('Restrincción', 'Se ha detectado un error inesperado.', '', 'Error');
        }

    });
}