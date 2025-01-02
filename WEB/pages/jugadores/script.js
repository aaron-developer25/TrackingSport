document.addEventListener("DOMContentLoaded", function() {
    obtenerJugadores();
});

function crear() {
    window.parent.document.getElementById("descripcionPrincipal").textContent = "Nuevo Jugador";
    window.location.href = "./create";
}

function editar(jugadorId) {
    addAlmacenamiento("jugadorId", jugadorId).then(resulAlmacenamiento => {
        if (resulAlmacenamiento.Validacion == "Exitoso") {
            window.parent.document.getElementById("descripcionPrincipal").textContent = "Actualizar Jugador";
            window.location.href = "./edit";
        }
        else{
            notificacion('Restrincción', 'Se ha detectado un error al tratar de trasladarlo.', '', 'Error');
        }
    });
}

function eliminar(jugadorId) {
    addAlmacenamiento("jugadorId", jugadorId).then(resulAlmacenamiento => {
        if (resulAlmacenamiento.Validacion == "Exitoso") {
            window.parent.document.getElementById("descripcionPrincipal").textContent = "Eliminar Jugador";
            window.location.href = "./delete";
        } else {
            notificacion('Restrincción', 'Se ha detectado un error al tratar de trasladarlo.', '', 'Error');
        }
    });
}

function obtenerJugadores() {
    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    getAllJugadores(function (error, data) {
        const sistemasContainer = document.querySelector('.sistemas-container');
        sistemasContainer.innerHTML = ''; 

        if (error || data.length === 0) {
            document.querySelector('.mensaje-personalizado').style.display = "block";
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
            return;
        }

        let pendingRequests = data.length;

        data.forEach(jugador => {
            getEquipoById(jugador.equipoId, function (errorEquipo, equipo) {
                const equipoTitulo = (errorEquipo || !equipo) ? "Equipo desconocido" : equipo.titulo + " (" + equipo.descripcion + ")";

                const sistemaCard = document.createElement('div');
                sistemaCard.className = 'tarjeta';
                sistemaCard.innerHTML = `
                    <div class="tarjeta-info">
                        <h3>${jugador.nombre} ${jugador.apellido}</h3>
                        <p>Equipo: ${equipoTitulo}</p>
                        <p>Nacionalidad: ${jugador.nacionalidad}</p>
                    </div>
                    <div class="tarjeta-acciones">
                        <button class="accion editar" onclick="editar(${jugador.jugadorId})">
                            <img src="../../resources/imagenes/ico_editar.png" alt="Editar">
                        </button>
                        <button class="accion eliminar" onclick="eliminar(${jugador.jugadorId})">
                            <img src="../../resources/imagenes/ico_eliminar.png" alt="Eliminar">
                        </button>
                    </div>
                `;
                sistemasContainer.appendChild(sistemaCard);

                pendingRequests--;
                if (pendingRequests === 0) {
                    document.querySelector('.cargando-mini-contenedor').style.display = "none";
                }
            });
        });
        
        if (data.length === 0) {
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
        }
    });
}

