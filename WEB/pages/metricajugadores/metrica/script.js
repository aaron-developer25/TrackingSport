document.addEventListener("DOMContentLoaded", function() {
    obtenerEstadisticasJugador();
});

let estadisticaJugadorId = 0;
let jugadorId = 0;

function incrementar(valueId, tipoEstadistica) {
    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    const valueElement = document.getElementById(valueId);
    let currentValue = parseFloat(valueElement.innerText);
    currentValue++;
    valueElement.innerText = currentValue;

    actualizarEstadistica(currentValue, tipoEstadistica);
}

function decrementar(valueId, tipoEstadistica) {
    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    const valueElement = document.getElementById(valueId);
    let currentValue = parseFloat(valueElement.innerText);

    if (currentValue > 0) {
        currentValue--;
        valueElement.innerText = currentValue;

        actualizarEstadistica(currentValue, tipoEstadistica);
    } else {
        notificacion('Advertencia', 'El valor no puede ser menor a cero.', '', 'Advertencia');
        document.querySelector('.cargando-mini-contenedor').style.display = "none";
    }
}


function obtenerEstadisticasJugador() {
    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    getAlmacenamiento("jugadorId").then(resulAlmacenamiento => {
        if (resulAlmacenamiento.Validacion == "Exitoso") {
            jugadorId = resulAlmacenamiento.value;


            getJugadorById(jugadorId, function(error, jugador) {
                if (error) {
                    notificacion('Error', 'No se pudo obtener los datos del jugador.', '', 'Error');
                    document.querySelector('.cargando-mini-contenedor').style.display = "none";
                    window.location.replace("../");
                    return;
                }
                else{

                    getEquipoById(jugador.equipoId, function(error, equipo) {
                        if (error) {
                            notificacion('Error', 'No se pudo obtener los datos del jugador.', '', 'Error');
                            document.querySelector('.cargando-mini-contenedor').style.display = "none";
                            window.location.replace("../");
                            return;
                        }
                        else{

                            document.getElementById("nombreJugador").textContent = jugador.nombre + " " + jugador.apellido;
                            document.getElementById("equipoJugador").textContent = equipo.titulo + " (" + equipo.descripcion + ")";
                            document.getElementById("nacionalidadJugador").textContent = jugador.nacionalidad;

                            getAllEstadisticasJugadores(function(error, estadisticasJugadores) {
                                if (error) {
                                    notificacion('Restricción', 'No se ha podido encontrar las estadisticas de los jugadores, comuníquese con un desarrollador.', '', 'Advertencia');
                                    document.querySelector('.cargando-mini-contenedor').style.display = "none";
                                    return;
                                } 
                                else {
                                    let jugadorEstadistica = estadisticasJugadores.find(estadistica => estadistica.jugadorId == jugadorId);
                
                                    if (jugadorEstadistica) {
                                        estadisticaJugadorId = jugadorEstadistica.estadisticaJugadorId;
                                        document.getElementById('ppgValue').innerText = jugadorEstadistica.ppg || 0;
                                        document.getElementById('apgValue').innerText = jugadorEstadistica.apg || 0;
                                        document.getElementById('rpgValue').innerText = jugadorEstadistica.rpg || 0;
                                        document.getElementById('spgValue').innerText = jugadorEstadistica.spg || 0;
                                        document.getElementById('bpgValue').innerText = jugadorEstadistica.bpg || 0;
                                        document.getElementById('fgValue').innerText = jugadorEstadistica.fg || 0;
                                        document.getElementById('trespValue').innerText = jugadorEstadistica.tresp || 0;
                                        document.getElementById('ftValue').innerText = jugadorEstadistica.ft || 0;
                                        document.getElementById('mpgValue').innerText = jugadorEstadistica.mpg || 0;
                                        document.getElementById('toValue').innerText = jugadorEstadistica.to || 0;

                                        document.querySelector('.cargando-mini-contenedor').style.display = "none";
                                    } 
                                    else {
                                        createEstadisticaJugador(jugadorId, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, function(error, respuesta) {
                                            if (error) {
                                                notificacion('Error', 'No se pudo crear la estadística del jugador.', '', 'Error');
                                                document.querySelector('.cargando-mini-contenedor').style.display = "none";
                                                return;
                                            }
                                            else{
                                                estadisticaJugadorId = respuesta.estadisticaJugadorId; 
                                                document.querySelector('.cargando-mini-contenedor').style.display = "none";
                                                notificacion('En hora buena', 'Este juegador no tenia metrica asociada, se ha creado satifactoriamente.', '', 'Exito');
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }

            });

        } else {
            notificacion('Error', 'No se pudo obtener el ID del jugador.', '', 'Error');
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
        }
    });
}

function actualizarEstadistica(cantidad, tipoEstadistica) {

    getEstadisticaJugadorById(estadisticaJugadorId, function(error, estadisticaActual) {
        if (error) {
            notificacion('Error', 'No se pudo obtener la estadística del jugador.', '', 'Error');
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
            return;
        }

        const ppg = tipoEstadistica === 'ppg' ? cantidad : estadisticaActual.ppg;
        const apg = tipoEstadistica === 'apg' ? cantidad : estadisticaActual.apg;
        const rpg = tipoEstadistica === 'rpg' ? cantidad : estadisticaActual.rpg;
        const spg = tipoEstadistica === 'spg' ? cantidad : estadisticaActual.spg;
        const bpg = tipoEstadistica === 'bpg' ? cantidad : estadisticaActual.bpg;
        const fg = tipoEstadistica === 'fg' ? cantidad : estadisticaActual.fg;
        const tresp = tipoEstadistica === 'tresp' ? cantidad : estadisticaActual.tresp;
        const ft = tipoEstadistica === 'ft' ? cantidad : estadisticaActual.ft;
        const mpg = tipoEstadistica === 'mpg' ? cantidad : estadisticaActual.mpg;
        const to = tipoEstadistica === 'to' ? cantidad : estadisticaActual.to;

        updateEstadisticaJugador(estadisticaJugadorId, jugadorId, ppg, apg, rpg, spg, bpg, fg, tresp, ft, mpg, to, function(error) {
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
            if (error) {
                notificacion('Error', 'No se pudo actualizar la estadística del jugador.', '', 'Error');
                return;
            }
        });
    });
}