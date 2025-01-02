document.addEventListener("DOMContentLoaded", function() {
    obtenerEquipos();
});


function metrica(equipoId) {
    addAlmacenamiento("equipoId", equipoId).then(resulAlmacenamiento => {
        if (resulAlmacenamiento.Validacion == "Exitoso") {
            window.location.href = "./metrica";
        } else {
            notificacion('Restrincción', 'Se ha detectado un error al tratar de trasladarlo.', '', 'Error');
        }
    });
}

function obtenerEquipos() {
    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    getAllEquipos(function (error, data) {
        const sistemasContainer = document.querySelector('.sistemas-container');
        sistemasContainer.innerHTML = '';

        if (error || data.length === 0) {
            document.querySelector('.mensaje-personalizado').style.display = "block";
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
            return;
        }

        let pendingRequests = data.length;
        let contador = 1;
        data.forEach(equipo => {
            sistemasContainer.innerHTML += `
                <div class="tarjeta"
                     data-nombre="${equipo.titulo.toLowerCase()}" 
                     data-descripcion="${equipo.descripcion.toLowerCase()}" 
                     data-pais="${equipo.pais.toLowerCase()}" onclick="metrica(${equipo.equipoId})">
                    <div class="tarjeta-info">
                        <h3>${contador}</h3>
                        <p>${equipo.titulo}</p>
                        <p>${equipo.descripcion}</p>
                        <p>${equipo.pais}</p>
                    </div>
                    <div class="tarjeta-acciones">
                        <button class="accion editar" onclick="metrica(${equipo.equipoId})">
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
}

function buscarEnTiempoReal() {
    const input = document.querySelector('.busqueda-input').value.toLowerCase();
    const tarjetas = document.querySelectorAll('.tarjeta');
    let hayResultados = false;

    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.getAttribute('data-nombre');
        const descripcion = tarjeta.getAttribute('data-descripcion');
        const pais = tarjeta.getAttribute('data-pais');

        if (nombre.includes(input) || descripcion.includes(input) || pais.includes(input)) {
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
