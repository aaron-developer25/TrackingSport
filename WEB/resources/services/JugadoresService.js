function getAllJugadores(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://sistemadeportes.azurewebsites.net/api/Jugadores", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                callback(null, data);
            } else {
                callback('Ocurrió un error: ' + xhr.statusText);
            }
        }
    };
    xhr.send();
}

function getJugadorById(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://sistemadeportes.azurewebsites.net/api/Jugadores/${id}`, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                callback(null, data);
            } else {
                callback('Ocurrió un error: ' + xhr.statusText);
            }
        }
    };
    xhr.send();
}

function createJugador(equipoId, nombre, apellido, sexo, nacionalidad, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sistemadeportes.azurewebsites.net/api/Jugadores", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                callback(null, data);
            } else {
                callback('Ocurrió un error al intentar crear: ' + xhr.statusText);
            }
        }
    };

    const jugadorData = {
        equipoId: equipoId,
        nombre: nombre,
        apellido: apellido,
        sexo: sexo,
        nacionalidad: nacionalidad
    };

    xhr.send(JSON.stringify(jugadorData));
}

function updateJugador(jugadorId, equipoId, nombre, apellido, sexo, nacionalidad, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://sistemadeportes.azurewebsites.net/api/Jugadores/${jugadorId}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                callback(null, data);
            } else {
                callback('Ocurrió un error al intentar actualizar: ' + xhr.statusText);
            }
        }
    };

    const jugadorData = {
        jugadorId: jugadorId,
        equipoId: equipoId,
        nombre: nombre,
        apellido: apellido,
        sexo: sexo,
        nacionalidad: nacionalidad
    };

    xhr.send(JSON.stringify(jugadorData));
}

function deleteJugador(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://sistemadeportes.azurewebsites.net/api/Jugadores/${id}`, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(null, 'Eliminación exitosa');
            } else {
                callback('Ocurrió un error al intentar eliminar: ' + xhr.statusText);
            }
        }
    };
    xhr.send();
}

function createOrUpdateJugador(jugadorId, equipoId, nombre, apellido, sexo, nacionalidad, callback) {
    if (jugadorId <= 0) {
        createJugador(equipoId, nombre, apellido, sexo, nacionalidad, callback);
    } else {
        updateJugador(jugadorId, equipoId, nombre, apellido, sexo, nacionalidad, callback);
    }
}