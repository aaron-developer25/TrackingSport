document.addEventListener('DOMContentLoaded', function () {
    cargarPartidos();
    cargarPaises();
});

function cargarPartidos() {
    getAllPartidos(function (error, partidos) {
        if (error) {
            console.error('Error al obtener los partidos:', error);
            return;
        }

        const partidoSelect = document.getElementById('partidoSelect');
        partidos.forEach(partido => {
            const option = document.createElement('option');
            option.value = partido.partidoId;
            option.textContent = partido.titulo;
            partidoSelect.appendChild(option);
        });
    });
}

function cargarPaises() {
    const paises = [
        'Republica Dominicana', 
        'Estados Unidos', 
        'Brasil', 
        'España', 
        'Francia', 
        'Alemania', 
        'Argentina', 
        'Mexico', 
        'Italia', 
        'Colombia'
    ];

    const paisSelect = document.getElementById('paisSelect');
    paises.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais;
        option.textContent = pais;
        paisSelect.appendChild(option);
    });
}

function guardar() {
    const tituloEquipo = document.getElementById("tituloEquipo").value.trim();
    const descripcionEquipo = document.getElementById("descripcionEquipo").value.trim();
    const partidoId = document.getElementById("partidoSelect").value;
    const pais = document.getElementById("paisSelect").value;

    if (tituloEquipo === "" || descripcionEquipo === "" || partidoId === "" || pais === "") {
        notificacion('Restricción', 'Debe completar todos los campos de forma correcta.', '', 'Advertencia');
        return;
    }

    createOrUpdateEquipo(0, partidoId, tituloEquipo, descripcionEquipo, pais, function (error) {
        if (error) {
            notificacion('Restricción', 'No se ha podido guardar el equipo, comuníquese con un desarrollador.', '', 'Advertencia');
            return;
        }
        notificacion('Éxito', 'Equipo guardado correctamente.', '', 'Éxito');
        window.location.replace("../");
    });
}
