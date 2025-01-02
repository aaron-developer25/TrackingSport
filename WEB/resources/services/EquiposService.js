function getAllEquipos(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://sistemadeportes.azurewebsites.net/api/Equipos", true);
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

function getEquipoById(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://sistemadeportes.azurewebsites.net/api/Equipos/${id}`, true);
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

function createEquipo(partidoId, titulo, descripcion, pais, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sistemadeportes.azurewebsites.net/api/Equipos", true);
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

    const equipoData = {
        partidoId: partidoId,
        titulo: titulo,
        descripcion: descripcion,
        pais: pais
    };

    xhr.send(JSON.stringify(equipoData));
}

function updateEquipo(equipoId, partidoId, titulo, descripcion, pais, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://sistemadeportes.azurewebsites.net/api/Equipos/${equipoId}`, true);
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

    const equipoData = {
        equipoId: equipoId,
        partidoId: partidoId,
        titulo: titulo,
        descripcion: descripcion,
        pais: pais
    };

    xhr.send(JSON.stringify(equipoData));
}

function deleteEquipo(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://sistemadeportes.azurewebsites.net/api/Equipos/${id}`, true);
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

function createOrUpdateEquipo(equipoId, partidoId, titulo, descripcion, pais, callback) {
    if (equipoId <= 0) {
        createEquipo(partidoId, titulo, descripcion, pais, callback);
    } else {
        updateEquipo(equipoId, partidoId, titulo, descripcion, pais, callback);
    }
}