function guardar() {
    const tituloPartido = document.getElementById("tituloPartido").value.trim();
    const descripcionPartido = document.getElementById("descripcionPartido").value.trim();

    if (tituloPartido === "" || descripcionPartido === "") {
        notificacion('Restrincción', 'Debe completar todos los campos de forma correcta.', '', 'Advertencia');
        return;
    }
    else{
        createOrUpdatePartido(0, tituloPartido, descripcionPartido, function (error) {
            if (error) {
                notificacion('Restrincción', 'No se ha encontrado este partido, comunicate con un desarrollador.', '', 'Advertencia');
                return;
            }
            else{
                notificacion('En hora buena', 'Datos actualizados satifactoriamente.', '', 'Exito');
                window.location.replace("../");
            }
        });
    }
}