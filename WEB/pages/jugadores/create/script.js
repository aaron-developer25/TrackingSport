document.addEventListener('DOMContentLoaded', function () {
    cargarEquipos();
    cargarNacionalidad();
});

function cargarEquipos() {
    getAllEquipos(function (error, equipos) {
        if (error) {
            console.error('Error al obtener los equipos:', error);
            return;
        }

        const equipoSelect = document.getElementById('equipoSelect');
        equipos.forEach(equipo => {
            const option = document.createElement('option');
            option.value = equipo.equipoId;
            option.textContent = equipo.titulo + " (" + equipo.descripcion + ")"; 
            equipoSelect.appendChild(option);
        });
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

function guardarJugador() {
    const nombreJugador = document.getElementById("nombreJugador").value.trim();
    const apellidoJugador = document.getElementById("apellidoJugador").value.trim();
    const equipoId = document.getElementById("equipoSelect").value;
    const sexo = document.getElementById("sexoSelect").value;
    const nacionalidad = document.getElementById("nacionalidadSelect").value;

    if (nombreJugador === "" || apellidoJugador === "" || equipoId === "" || sexo === "" || nacionalidad === "") {
        notificacion('Restricción', 'Debe completar todos los campos de forma correcta.', '', 'Advertencia');
        return;
    }

    createOrUpdateJugador(0, equipoId, nombreJugador, apellidoJugador, sexo, nacionalidad, function (error) {
        if (error) {
            notificacion('Restricción', 'No se ha podido guardar el jugador, comuníquese con un desarrollador.', '', 'Advertencia');
            return;
        }
        notificacion('Éxito', 'Jugador guardado correctamente.', '', 'Éxito');
        window.location.replace("../");
    });
}
