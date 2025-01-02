document.addEventListener("DOMContentLoaded", function() {
    obtenerPartidos();

});


function crear() {
    window.parent.document.getElementById("descripcionPrincipal").textContent = "Nuevo";
    window.location.href = "./create";
}

function editar(partidoId) {

    addAlmacenamiento("partidoId", partidoId).then(resulAlmacenamiento =>{

        if(resulAlmacenamiento.Validacion == "Exitoso"){
            window.parent.document.getElementById("descripcionPrincipal").textContent = "Actualizar";
            window.location.href = "./edit";
        }
        else{
            notificacion('Restrincción', 'Se ha detectado un error al tratar de trasladarlo.', '', 'Error');
        }

    });
    
}

function eliminar(partidoId) {

    addAlmacenamiento("partidoId", partidoId).then(resulAlmacenamiento =>{

        if(resulAlmacenamiento.Validacion == "Exitoso"){
            window.parent.document.getElementById("descripcionPrincipal").textContent = "Eliminar";
            window.location.href = "./delete";
        }
        else{
            notificacion('Restrincción', 'Se ha detectado un error al tratar de trasladarlo.', '', 'Error');
        }

    });
}


function obtenerPartidos() {

    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    getAllPartidos(function (error, data) {
        if (error || data.length === 0) {
            document.querySelector('.mensaje-personalizado').style.display = "block";
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
            return;
        }
        
        const sistemasContainer = document.querySelector('.sistemas-container');
        sistemasContainer.innerHTML = ''; 

        data.forEach(partido => {
            const sistemaCard = document.createElement('div');
            sistemaCard.className = 'tarjeta';
            sistemaCard.innerHTML = `
                <div class="tarjeta-info">
                    <h3>${partido.titulo}</h3>
                    <p>${partido.descripcion}</p>
                </div>
                <div class="tarjeta-acciones">
                    <button class="accion editar" onclick="editar(${partido.partidoId})">
                        <img src="../../resources/imagenes/ico_editar.png" alt="Editar">
                    </button>
                    <button class="accion eliminar" onclick="eliminar(${partido.partidoId})">
                        <img src="../../resources/imagenes/ico_eliminar.png" alt="Eliminar">
                    </button>
                </div>
            `;
            sistemasContainer.appendChild(sistemaCard);
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
        });
    });
}