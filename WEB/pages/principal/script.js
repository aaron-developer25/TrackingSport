
document.addEventListener("DOMContentLoaded", function() {
    seleccionarOpcionMenu("dashboard");

});


function abrirMenu() {
    const drawer = document.getElementById('drawer');
    const drawerBackground = document.getElementById('drawer-background');
    drawer.classList.add('active');
    drawerBackground.classList.add('active');
}

function cerrarMenu() {
    const drawer = document.getElementById('drawer');
    const drawerBackground = document.getElementById('drawer-background');
    drawer.classList.remove('active');
    drawerBackground.classList.remove('active');
}

function seleccionarOpcionMenu(opcion) {

    if(opcion == "dashboard"){
        document.getElementById("descripcionPrincipal").textContent = "Datos recientes";
        cerrarMenu();
        document.querySelector(".content-iframe").src = "../" + opcion; 
        return; 
    }

    if(opcion == "salir"){
        cerrarMenu();
        return;
    }

    if(opcion == "informacion"){
        document.getElementById("descripcionPrincipal").textContent = "Equipo de Trabajo";
    }

    if(opcion == "metricajugadores"){
        document.getElementById("tituloPrincipal").textContent = "Metrica";
        document.getElementById("descripcionPrincipal").textContent = "Jugadores";
        cerrarMenu();
        document.querySelector(".content-iframe").src = "../" + opcion;   
        return;
    }

    if(opcion == "metricaequipos"){
        document.getElementById("tituloPrincipal").textContent = "Metrica";
        document.getElementById("descripcionPrincipal").textContent = "Equipos";
        cerrarMenu();
        document.querySelector(".content-iframe").src = "../" + opcion;   
        return;
    }

    document.getElementById("tituloPrincipal").textContent = opcion.toUpperCase();
    document.getElementById("descripcionPrincipal").textContent = "Panel de Control";

    document.querySelector(".content-iframe").src = "../" + opcion;            
    cerrarMenu();
}