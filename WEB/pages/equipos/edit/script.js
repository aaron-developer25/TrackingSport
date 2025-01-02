document.addEventListener("DOMContentLoaded", function() {
    Promise.all([cargarPartidos(), cargarPaises()])
        .then(() => {
            ejecutar();
        })
        .catch(error => {
            notificacion('Error', 'Hubo un problema al cargar los datos iniciales.', '', 'Advertencia');
        });
});

let equipoId = 0;

function guardar() {
    const tituloEquipo = document.getElementById("tituloEquipo").value.trim();
    const descripcionEquipo = document.getElementById("descripcionEquipo").value.trim();
    const partidoId = document.getElementById("partidoSelect").value;
    const pais = document.getElementById("paisSelect").value;

    if (tituloEquipo === "" || descripcionEquipo === "" || partidoId === "" || pais === "") {
        notificacion('Restricción', 'Debe completar todos los campos de forma correcta.', '', 'Advertencia');
        return;
    } else {
        createOrUpdateEquipo(equipoId, partidoId, tituloEquipo, descripcionEquipo, pais, function (error) {
            if (error) {
                notificacion('Restricción', 'No se ha podido guardar el equipo, comuníquese con un desarrollador.', '', 'Advertencia');
                return;
            }
            notificacion('Éxito', 'Equipo actualizado correctamente.', '', 'Éxito');
            window.location.replace("../");
        });
    }
}

function ejecutar() {
    document.querySelector('.cargando-mini-contenedor').style.display = "flex";

    getAlmacenamiento("equipoId").then(resulAlmacenamiento => {
        if (resulAlmacenamiento.Validacion == "Exitoso") {
            equipoId = resulAlmacenamiento.value;

            getEquipoById(equipoId, function (error, equipo) {
                if (error) {
                    notificacion('Restricción', 'No se ha encontrado este equipo, comuníquese con un desarrollador.', '', 'Advertencia');
                    document.querySelector('.cargando-mini-contenedor').style.display = "none"
                    return;
                } else {
                    document.getElementById("tituloEquipo").value = equipo.titulo;
                    document.getElementById("descripcionEquipo").value = equipo.descripcion;
                    document.getElementById("partidoSelect").value = equipo.partidoId;
                    document.getElementById("paisSelect").value = equipo.pais;

                    document.querySelector('.cargando-mini-contenedor').style.display = "none"; 
                }
            });
        } else {
            notificacion('Restricción', 'Se ha detectado un error inesperado.', '', 'Error');
            document.querySelector('.cargando-mini-contenedor').style.display = "none";
        }
    });
}

function cargarPartidos() {
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

function cargarPaises() {
    return new Promise((resolve) => {
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

        resolve(); 
    });
}
