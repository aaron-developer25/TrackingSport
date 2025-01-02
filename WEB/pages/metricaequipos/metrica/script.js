document.addEventListener("DOMContentLoaded", function() {
    obtenerEstadisticasEquipo();
});

let estadisticaEquipoId = 0;
let equipoId = 0;

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

function obtenerEstadisticasEquipo() {
    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    getAlmacenamiento("equipoId").then(resulAlmacenamiento => {
        if (resulAlmacenamiento.Validacion == "Exitoso") {
            equipoId = resulAlmacenamiento.value;

            getEquipoById(equipoId, function(error, equipo) {
                if (error) {
                    notificacion('Error', 'No se pudo obtener los datos del equipo.', '', 'Error');
                    document.querySelector('.cargando-mini-contenedor').style.display = "none";
                    window.location.replace("../");
                    return;
                } else {
                    document.getElementById("nombreEquipo").textContent = equipo.titulo;
                    document.getElementById("descripcionEquipo").textContent = equipo.descripcion;
                    document.getElementById("paisEquipo").textContent = equipo.pais;

                    getAllEstadisticasEquipos(function(error, estadisticasEquipos) {
                        if (error) {
                            notificacion('Restricción', 'No se ha podido encontrar las estadísticas de los equipos, comuníquese con un desarrollador.', '', 'Advertencia');
                            document.querySelector('.cargando-mini-contenedor').style.display = "none";
                            return;
                        } else {
                            let equipoEstadistica = estadisticasEquipos.find(estadistica => estadistica.equipoId == equipoId);

                            if (equipoEstadistica) {
                                estadisticaEquipoId = equipoEstadistica.estadisticaEquipoId;
                                document.getElementById('gpValue').innerText = equipoEstadistica.gp || 0;
                                document.getElementById('wValue').innerText = equipoEstadistica.w || 0;
                                document.getElementById('lValue').innerText = equipoEstadistica.l || 0;
                                document.getElementById('wpValue').innerText = equipoEstadistica.wp || 0;
                                document.getElementById('ppgValue').innerText = equipoEstadistica.ppg || 0;
                                document.getElementById('papgValue').innerText = equipoEstadistica.papg || 0;
                                document.getElementById('pdValue').innerText = equipoEstadistica.pd || 0;
                                document.getElementById('hrValue').innerText = equipoEstadistica.hr || 0;
                                document.getElementById('arValue').innerText = equipoEstadistica.ar || 0;
                                document.getElementById('rValue').innerText = equipoEstadistica.r || 0;
                                document.getElementById('pcValue').innerText = equipoEstadistica.pc || 0;

                                document.querySelector('.cargando-mini-contenedor').style.display = "none";
                            } else {
                                createEstadisticaEquipo(equipoId, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, function(error, respuesta) {
                                    if (error) {
                                        notificacion('Error', 'No se pudo crear la estadística del equipo.', '', 'Error');
                                        document.querySelector('.cargando-mini-contenedor').style.display = "none";
                                        return;
                                    } else {
                                        estadisticaEquipoId = respuesta.estadisticaEquipoId; 
                                        document.querySelector('.cargando-mini-contenedor').style.display = "none";
                                        notificacion('En hora buena', 'Este equipo no tenía métrica asociada, se ha creado satisfactoriamente.', '', 'Exito');
                                    }
                                });
                            }
                        }
                    });
                }
            });
        } else {
            notificacion('Error', 'No se pudo obtener el ID del equipo.', '', 'Error');
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
        }
    });
}

function actualizarEstadistica(cantidad, tipoEstadistica) {
    getEstadisticaEquipoById(estadisticaEquipoId, function(error, estadisticaActual) {
        if (error) {
            notificacion('Error', 'No se pudo obtener la estadística del equipo.', '', 'Error');
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
            return;
        }
        else{

            const gp = tipoEstadistica === 'gp' ? cantidad : estadisticaActual.gp;
            const w = tipoEstadistica === 'w' ? cantidad : estadisticaActual.w;
            const l = tipoEstadistica === 'l' ? cantidad : estadisticaActual.l;
            const wp = tipoEstadistica === 'wp' ? cantidad : estadisticaActual.wp;
            const ppg = tipoEstadistica === 'ppg' ? cantidad : estadisticaActual.ppg;
            const papg = tipoEstadistica === 'papg' ? cantidad : estadisticaActual.papg;
            const pd = tipoEstadistica === 'pd' ? cantidad : estadisticaActual.pd;
            const hr = tipoEstadistica === 'hr' ? cantidad : estadisticaActual.hr;
            const ar = tipoEstadistica === 'ar' ? cantidad : estadisticaActual.ar;
            const r = tipoEstadistica === 'r' ? cantidad : estadisticaActual.r;
            const pc = tipoEstadistica === 'pc' ? cantidad : estadisticaActual.pc;
    
            updateEstadisticaEquipo(estadisticaEquipoId, equipoId, gp, w, l, wp, ppg, papg, pd, hr, ar, r, pc, function(error) {
                document.querySelector('.cargando-mini-contenedor').style.display = "none";
                if (error) {
                    notificacion('Error', 'No se pudo actualizar la estadística del equipo.', '', 'Error');
                    return;
                }

            });
        }

    });
}
