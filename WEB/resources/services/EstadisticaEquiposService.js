function getAllEstadisticasEquipos(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://sistemadeportes.azurewebsites.net/api/EstadisticaEquipos", true);
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

function getEstadisticaEquipoById(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://sistemadeportes.azurewebsites.net/api/EstadisticaEquipos/${id}`, true);
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

function createEstadisticaEquipo(equipoId, gp, w, l, wp, ppg, papg, pd, hr, ar, r, pc, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sistemadeportes.azurewebsites.net/api/EstadisticaEquipos", true);
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

    const estadisticaEquipoData = {
        equipoId: equipoId,
        gp: gp,
        w: w,
        l: l,
        wp: wp,
        ppg: ppg,
        papg: papg,
        pd: pd,
        hr: hr,
        ar: ar,
        r: r,
        pc: pc
    };

    xhr.send(JSON.stringify(estadisticaEquipoData));
}

function updateEstadisticaEquipo(estadisticaEquipoId, equipoId, gp, w, l, wp, ppg, papg, pd, hr, ar, r, pc, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://sistemadeportes.azurewebsites.net/api/EstadisticaEquipos/${estadisticaEquipoId}`, true);
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

    const estadisticaEquipoData = {
        estadisticaEquipoId: estadisticaEquipoId,
        equipoId: equipoId,
        gp: gp,
        w: w,
        l: l,
        wp: wp,
        ppg: ppg,
        papg: papg,
        pd: pd,
        hr: hr,
        ar: ar,
        r: r,
        pc: pc
    };

    xhr.send(JSON.stringify(estadisticaEquipoData));
}

function deleteEstadisticaEquipo(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://sistemadeportes.azurewebsites.net/api/EstadisticaEquipos/${id}`, true);
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

function createOrUpdateEstadisticaEquipo(estadisticaEquipoId, equipoId, gp, w, l, wp, ppg, papg, pd, hr, ar, r, pc, callback) {
    if (estadisticaEquipoId <= 0) {
        createEstadisticaEquipo(equipoId, gp, w, l, wp, ppg, papg, pd, hr, ar, r, pc, callback);
    } else {
        updateEstadisticaEquipo(estadisticaEquipoId, equipoId, gp, w, l, wp, ppg, papg, pd, hr, ar, r, pc, callback);
    }
}
