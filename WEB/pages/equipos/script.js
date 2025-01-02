document.addEventListener("DOMContentLoaded", function() {
    obtenerEquipo();

});


function crear() {
    window.parent.document.getElementById("descripcionPrincipal").textContent = "Nuevo";
    window.location.href = "./create";
}

function editar(equipoId) {

    addAlmacenamiento("equipoId", equipoId).then(resulAlmacenamiento =>{

        if(resulAlmacenamiento.Validacion == "Exitoso"){
            window.parent.document.getElementById("descripcionPrincipal").textContent = "Actualizar";
            window.location.href = "./edit";
        }
        else{
            notificacion('Restrincción', 'Se ha detectado un error al tratar de trasladarlo.', '', 'Error');
        }

    });
    
}

function eliminar(equipoId) {

    addAlmacenamiento("equipoId", equipoId).then(resulAlmacenamiento =>{

        if(resulAlmacenamiento.Validacion == "Exitoso"){
            window.parent.document.getElementById("descripcionPrincipal").textContent = "Eliminar";
            window.location.href = "./delete";
        }
        else{
            notificacion('Restrincción', 'Se ha detectado un error al tratar de trasladarlo.', '', 'Error');
        }

    });
}


function obtenerEquipo() {
    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    getAllEquipos(function (error, data) {
        const sistemasContainer = document.querySelector('.sistemas-container');
        sistemasContainer.innerHTML = ''; 

        if (error || data.length === 0) {
            document.querySelector('.mensaje-personalizado').style.display = "block";
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
            return;
        }

        data.forEach(equipo => {
            const sistemaCard = document.createElement('div');
            sistemaCard.className = 'tarjeta';
            sistemaCard.innerHTML = `
                <div class="tarjeta-info">
                    <h3>${equipo.titulo}</h3>
                    <p>${equipo.descripcion}</p>
                    <p>${equipo.pais}</p>
                </div>
                <div class="tarjeta-acciones">
                    <button class="accion editar" onclick="editar(${equipo.equipoId})">
                        <img src="../../resources/imagenes/ico_editar.png" alt="Editar">
                    </button>
                    <button class="accion eliminar" onclick="eliminar(${equipo.equipoId})">
                        <img src="../../resources/imagenes/ico_eliminar.png" alt="Eliminar">
                    </button>
                </div>
            `;
            sistemasContainer.appendChild(sistemaCard);
        });

        document.querySelector('.cargando-mini-contenedor').style.display = "none";
    });
}