document.addEventListener("DOMContentLoaded", function() {
    Promise.all([cargarNacionalidad(), cargarEquipos()])
        .then(() => {
            ejecutar();
        })
      
});

let jugadorId = 0;

function guardar() {
    const nombreJugador = document.getElementById("nombreJugador").value.trim();
    const apellidoJugador = document.getElementById("apellidoJugador").value.trim();
    const equipoId = document.getElementById("equipoSelect").value;
    const sexo = document.getElementById("sexoSelect").value;
    const nacionalidad = document.getElementById("nacionalidadSelect").value;

    if (nombreJugador === "" || apellidoJugador === "" || equipoId === "" || sexo === "" || nacionalidad === "") {
        notificacion('Restricción', 'Debe completar todos los campos de forma correcta.', '', 'Advertencia');
        return;
    } else {
        createOrUpdateJugador(jugadorId, equipoId, nombreJugador, apellidoJugador, sexo, nacionalidad, function (error) {
            if (error) {
                notificacion('Restricción', 'No se ha podido guardar el jugador, comuníquese con un desarrollador.', '', 'Advertencia');
                return;
            }
            notificacion('Éxito', 'Jugador actualizado correctamente.', '', 'Éxito');
            window.location.replace("../");
        });
    }
}

function ejecutar() {
    
    getAlmacenamiento("jugadorId").then(resulAlmacenamiento => {
        if (resulAlmacenamiento.Validacion == "Exitoso") {
            jugadorId = resulAlmacenamiento.value;

            getJugadorById(jugadorId, function (error, jugador) {
                if (error) {
                    notificacion('Restricción', 'No se ha encontrado este jugador, comuníquese con un desarrollador.', '', 'Advertencia');
                    document.querySelector('.cargando-mini-contenedor').style.display = "none";
                    return;
                } 
                else {
                    document.getElementById("nombreJugador").value = jugador.nombre;
                    document.getElementById("apellidoJugador").value = jugador.apellido;
                    document.getElementById("equipoSelect").value = jugador.equipoId;
                    document.getElementById("sexoSelect").value = jugador.sexo;
                    document.getElementById("nacionalidadSelect").value = jugador.nacionalidad;

                    document.querySelector('.cargando-mini-contenedor').style.display = "none"; 
                }
            });
        } else {
            notificacion('Restricción', 'Se ha detectado un error inesperado.', '', 'Error');
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
        }
    });
}

function cargarNacionalidad() {
    const nacionalidades = [
        'Dominicana',  
        'Estadounidense',
        'Brasileña', 
        'Española',   
        'Francesa',   
        'Alemana',     
        'Argentina',    
        'Mexicana', 
        'Italiana',    
        'Colombiana'   
    ];

    const nacionalidadSelect = document.getElementById('nacionalidadSelect');
    nacionalidades.forEach(nacionalidad => {
        const option = document.createElement('option');
        option.value = nacionalidad;
        option.textContent = nacionalidad;
        nacionalidadSelect.appendChild(option);
    });
}

function cargarEquipos() {

    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    return new Promise((resolve, reject) => {
        getAllEquipos(function (error, equipos) {
            if (error) {
                console.error('Error al obtener los equipos:', error);
                reject(error);
                return;
            }

            const equipoSelect = document.getElementById('equipoSelect');
            equipos.forEach(equipo => {
                const option = document.createElement('option');
                option.value = equipo.equipoId;
                option.textContent = equipo.titulo + " (" + equipo.descripcion + ")"; 
                equipoSelect.appendChild(option);
            });

            resolve();
        });
    });
}
