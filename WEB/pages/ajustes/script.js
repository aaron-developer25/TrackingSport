document.addEventListener("DOMContentLoaded", function() {
    cargarPartidos()
        .then(() => {
            ejecutar();
        })
        .catch(error => {
            notificacion('Error', 'Hubo un problema al cargar los datos iniciales.', '', 'Advertencia');
        });
});

const ajusteId = config.ajusteId;

function guardar() {
    const partidoId = document.getElementById("partidoSelect").value;
    const porcentajeRegular = document.getElementById("porcentajeRegular").value.trim();
    const porcentajeBueno = document.getElementById("porcentajeBueno").value.trim();
    const porcentajeMuyBueno = document.getElementById("porcentajeMuyBueno").value.trim();
    const porcentajeExcelente = document.getElementById("porcentajeExcelente").value.trim();

    if (partidoId === "" || 
        porcentajeRegular === "" || 
        porcentajeBueno === "" || 
        porcentajeMuyBueno === "" || 
        porcentajeExcelente === "") {
        notificacion('Restricción', 'Debe completar todos los campos de forma correcta.', '', 'Advertencia');
        return;
    } else {
        updateAjuste(ajusteId, partidoId, porcentajeRegular, porcentajeBueno, porcentajeMuyBueno, porcentajeExcelente, function (error) {
            if (error) {
                notificacion('Restricción', 'No se ha podido guardar el ajuste, comuníquese con un desarrollador.', '', 'Advertencia');
                return;
            }
            notificacion('En hora buena', 'Ajuste actualizado correctamente.', '', 'Exito');
        });
    }
}

function ejecutar() {

    getAjusteById(ajusteId, function (error, ajuste) {
        if (error) {
            notificacion('Restricción', 'No se ha podido guardar el ajuste, comuníquese con un desarrollador.', '', 'Advertencia');
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
            return;
        }
        else{
            document.getElementById("partidoSelect").value = ajuste.partidoActual;
            document.getElementById("porcentajeRegular").value = ajuste.porcentajeRegular;
            document.getElementById("porcentajeBueno").value = ajuste.porcentajeBueno;
            document.getElementById("porcentajeMuyBueno").value = ajuste.porcentajeMuyBueno;
            document.getElementById("porcentajeExcelente").value = ajuste.porcentajeExcelente;
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
        }
    });
}

function cargarPartidos() {
    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    return new Promise((resolve, reject) => {
        getAllPartidos(function (error, partidos) {
            if (error) {
                console.error('Error al obtener los partidos:', error);
                reject(error);
                return;
            }

            const partidoSelect = document.getElementById('partidoSelect');
            partidos.forEach(partido => {
                const option = document.createElement('option');
                option.value = partido.partidoId;
                option.textContent = partido.titulo;
                partidoSelect.appendChild(option);
            });

            resolve();
        });
    });
}
