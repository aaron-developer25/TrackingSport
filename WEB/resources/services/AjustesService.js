function getAllAjustes(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://sistemadeportes.azurewebsites.net/api/Ajustes", true);
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

function getAjusteById(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://sistemadeportes.azurewebsites.net/api/Ajustes/${id}`, true);
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

function createAjuste(partidoActual, porcentajeRegular, porcentajeBueno, porcentajeMuyBueno, porcentajeExcelente, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sistemadeportes.azurewebsites.net/api/Ajustes", true);
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

    const ajusteData = {
        porcentajeRegular: porcentajeRegular,
        partidoActual: partidoActual,
        porcentajeBueno: porcentajeBueno,
        porcentajeMuyBueno: porcentajeMuyBueno,
        porcentajeExcelente: porcentajeExcelente
    };

    xhr.send(JSON.stringify(ajusteData));
}

function updateAjuste(ajusteId, partidoActual, porcentajeRegular, porcentajeBueno, porcentajeMuyBueno, porcentajeExcelente, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://sistemadeportes.azurewebsites.net/api/Ajustes/${ajusteId}`, true);
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

    const ajusteData = {
        ajusteId: ajusteId,
        partidoActual: partidoActual,
        porcentajeRegular: porcentajeRegular,
        porcentajeBueno: porcentajeBueno,
        porcentajeMuyBueno: porcentajeMuyBueno,
        porcentajeExcelente: porcentajeExcelente
    };

    xhr.send(JSON.stringify(ajusteData));
}

function deleteAjuste(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://sistemadeportes.azurewebsites.net/api/Ajustes/${id}`, true);
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

function createOrUpdateAjuste(ajusteId, partidoActual, porcentajeRegular, porcentajeBueno, porcentajeMuyBueno, porcentajeExcelente, callback) {
    if (ajusteId <= 0) {
        createAjuste(partidoActual, porcentajeRegular, porcentajeBueno, porcentajeMuyBueno, porcentajeExcelente, callback);
    } else {
        updateAjuste(ajusteId, partidoActual, porcentajeRegular, porcentajeBueno, porcentajeMuyBueno, porcentajeExcelente, callback);
    }
}
