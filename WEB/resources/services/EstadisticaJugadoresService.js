function getAllEstadisticasJugadores(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://sistemadeportes.azurewebsites.net/api/EstadisticaJugadores", true);
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

function getEstadisticaJugadorById(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://sistemadeportes.azurewebsites.net/api/EstadisticaJugadores/${id}`, true);
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

function createEstadisticaJugador(jugadorId, ppg, apg, rpg, spg, bpg, fg, tresp, ft, mpg, to, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sistemadeportes.azurewebsites.net/api/EstadisticaJugadores", true);
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

    const estadisticaJugadorData = {
        jugadorId: jugadorId,
        ppg: ppg,
        apg: apg,
        rpg: rpg,
        spg: spg,
        bpg: bpg,
        fg: fg,
        tresp: tresp,
        ft: ft,
        mpg: mpg,
        to: to
    };

    xhr.send(JSON.stringify(estadisticaJugadorData));
}

function updateEstadisticaJugador(estadisticaJugadorId, jugadorId, ppg, apg, rpg, spg, bpg, fg, tresp, ft, mpg, to, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://sistemadeportes.azurewebsites.net/api/EstadisticaJugadores/${estadisticaJugadorId}`, true);
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

    const estadisticaJugadorData = {
        estadisticaJugadorId: estadisticaJugadorId,
        jugadorId: jugadorId,
        ppg: ppg,
        apg: apg,
        rpg: rpg,
        spg: spg,
        bpg: bpg,
        fg: fg,
        tresp: tresp,
        ft: ft,
        mpg: mpg,
        to: to
    };

    xhr.send(JSON.stringify(estadisticaJugadorData));
}

function deleteEstadisticaJugador(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://sistemadeportes.azurewebsites.net/api/EstadisticaJugadores/${id}`, true);
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

function createOrUpdateEstadisticaJugador(estadisticaJugadorId, jugadorId, ppg, apg, rpg, spg, bpg, fg, tresp, ft, mpg, to, callback) {
    if (estadisticaJugadorId <= 0) {
        createEstadisticaJugador(jugadorId, ppg, apg, rpg, spg, bpg, fg, tresp, ft, mpg, to, callback);
    } else {
        updateEstadisticaJugador(estadisticaJugadorId, jugadorId, ppg, apg, rpg, spg, bpg, fg, tresp, ft, mpg, to, callback);
    }
}
