document.addEventListener("DOMContentLoaded", function() {
    ejecutar();
});

function confirmarEliminacion() {
    deleteEquipo(equipoId, function (error) {
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


let equipoId = 0;

function ejecutar(){
    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    getAlmacenamiento("equipoId").then(resulAlmacenamiento =>{

        if(resulAlmacenamiento.Validacion == "Exitoso"){
            equipoId = resulAlmacenamiento.value;

            getEquipoById(equipoId, function (error, equipo) {
                if (error) {
                    notificacion('Restrincción', 'No se ha encontrado este equipo, comunicate con un desarrollador.', '', 'Advertencia');
                    return;
                }
                else{
                    document.querySelector(".mensaje-confirmacion").textContent = "¿Estás seguro que deseas eliminar este equipo " + equipo.titulo + "?";
                    document.querySelector('.cargando-mini-contenedor').style.display = "none";
                }
            });

        }
        else{
            notificacion('Restrincción', 'Se ha detectado un error inesperado.', '', 'Error');
        }

    });
}