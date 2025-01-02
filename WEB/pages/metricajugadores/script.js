document.addEventListener("DOMContentLoaded", function() {
    obtenerJugadores();
});

function metrica(jugadorId) {
    addAlmacenamiento("jugadorId", jugadorId).then(resulAlmacenamiento => {
        if (resulAlmacenamiento.Validacion == "Exitoso") {
            window.location.href = "./metrica";
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
        let contador = 1;
        data.forEach(jugador => {
            getEquipoById(jugador.equipoId, function (errorEquipo, equipo) {
                const equipoTitulo = (errorEquipo || !equipo) ? "Equipo desconocido" : `${equipo.titulo} (${equipo.descripcion})`;

                sistemasContainer.innerHTML += `
                    <div class="tarjeta" onclick="metrica(${jugador.jugadorId})" 
                         data-nombre="${jugador.nombre.toLowerCase()} ${jugador.apellido.toLowerCase()}" 
                         data-equipo="${equipoTitulo.toLowerCase()}">
                        <div class="tarjeta-info">
                            <h3>${contador}</h3>
                            <p>${jugador.nombre} ${jugador.apellido}</p>
                            <p>Equipo: ${equipoTitulo}</p>
                            <p>Sexo: ${jugador.sexo}</p>
                            <p>Nacionalidad: ${jugador.nacionalidad}</p>
                        </div>
                        <div class="tarjeta-acciones">
                            <button class="accion editar" onclick="metrica(${jugador.jugadorId})">
                                <img src="../../resources/imagenes/ico_check.png" alt="metrica">
                            </button>
                        </div>
                    </div>
                `;

                contador++;
                pendingRequests--;

                if (pendingRequests === 0) {
                    document.querySelector('.cargando-mini-contenedor').style.display = "none";
                }
            });
        });
    });
}

function buscarEnTiempoReal() {
    const input = document.querySelector('.busqueda-input').value.toLowerCase();
    const tarjetas = document.querySelectorAll('.tarjeta');
    let hayResultados = false;

    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.getAttribute('data-nombre');
        const equipo = tarjeta.getAttribute('data-equipo');

        if (nombre.includes(input) || equipo.includes(input)) {
            tarjeta.style.display = 'flex';
            hayResultados = true;
        } else {
            tarjeta.style.display = 'none';
        }
    });

    const mensajePersonalizado = document.querySelector('.mensaje-personalizado');
    if (hayResultados) {
        mensajePersonalizado.style.display = 'none';
    } else {
        mensajePersonalizado.style.display = 'block';
    }
}

