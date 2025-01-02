function getAllPartidos(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://sistemadeportes.azurewebsites.net/api/Partidos", true);
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

function getPartidoById(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://sistemadeportes.azurewebsites.net/api/Partidos/${id}`, true);
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

function createPartido(titulo, descripcion, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sistemadeportes.azurewebsites.net/api/Partidos", true);
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

    const partidoData = {
        titulo: titulo,
        descripcion: descripcion
    };

    xhr.send(JSON.stringify(partidoData));
}

function updatePartido(partidoId, titulo, descripcion, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://sistemadeportes.azurewebsites.net/api/Partidos/${partidoId}`, true);
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

    const partidoData = {
        partidoId: partidoId,
        titulo: titulo,
        descripcion: descripcion
    };

    xhr.send(JSON.stringify(partidoData));
}

function deletePartido(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://sistemadeportes.azurewebsites.net/api/Partidos/${id}`, true);
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

function createOrUpdatePartido(partidoId, titulo, descripcion, callback) {
    if (partidoId <= 0) {
        createPartido(titulo, descripcion, callback);
    } else {
        updatePartido(partidoId, titulo, descripcion, callback);
    }
}