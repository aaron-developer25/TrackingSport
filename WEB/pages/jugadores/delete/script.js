document.addEventListener("DOMContentLoaded", function() {
    ejecutar();
});

let jugadorId = 0;

function confirmarEliminacion() {
    deleteJugador(jugadorId, function (error) {
        if (error) {
            notificacion('Restricción', 'No se ha podido eliminar este jugador, comuníquese con un desarrollador.', '', 'Error');
            return;
        } else {
            notificacion('Enhorabuena', 'Jugador eliminado satisfactoriamente.', '', 'Éxito');
            window.location.replace("../");
        }
    });
}

function cancelarEliminacion() {
    window.location.replace("../"); 
}

function ejecutar() {
    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    getAlmacenamiento("jugadorId").then(resulAlmacenamiento => {
        if (resulAlmacenamiento.Validacion == "Exitoso") {
            jugadorId = resulAlmacenamiento.value;

            getJugadorById(jugadorId, function (error, jugador) {
                if (error) {
                    notificacion('Restricción', 'No se ha encontrado este jugador, comuníquese con un desarrollador.', '', 'Advertencia');
                    document.querySelector('.cargando-mini-contenedor').style.display = "none";
                    return;
                } else {
                    document.querySelector(".mensaje-confirmacion").textContent = "¿Estás seguro que deseas eliminar al jugador " + jugador.nombre + " " + jugador.apellido + "?";
                    document.querySelector('.cargando-mini-contenedor').style.display = "none";
                }
            });
        } else {
            notificacion('Restricción', 'Se ha detectado un error inesperado.', '', 'Error');
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
        }
    });
}
