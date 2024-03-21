const tareas = [];
const isPending = [];

// Agregamos tareas y sus estados
tareas.push("Hacer la cama", "Hacer la comida", "Hacer la cena", "Hacer la compra", "Hacer la colada", "Hacer la tarea", "Ir al doctor", "Ir al gimnasio", "Ir al trabajo", "Conseguir medicina");
isPending.push(true, true, false, false, true, true, false, false, false, true);

const agregarTareas = (nombreTarea, estado) => {
    // Creamos un div para la tarea
    const tarea = document.createElement('div');
    tarea.classList.add("tasks__item");
    
    // Agregamos el nombre de la tarea
    const nombre = document.createElement('h3');
    nombre.innerHTML = nombreTarea;
    tarea.appendChild(nombre);

    // Creamos un icono para el estado de la tarea
    const checkIcon = document.createElement('i');
    if(estado){;
        checkIcon.innerHTML = '<i class="fa-solid fa-circle-check item__icon--pending"></i>';
    }
    else{
        checkIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    }

    // Agregamos el icono
    tarea.appendChild(checkIcon);

    // Retornamos la tarea
    return tarea;
};

// Funcion para devolver la cantidad de pendientes
const numeroPendientes = (pendingList) => {
    let pendientes = 0;
    for (estado of pendingList){
        if (estado === true){
            pendientes++;
        }
    }
    return pendientes;
};

// Creamos los elementos para mostrar la informacion
const tareasPendientes = document.createElement("h2");
const tareasCompletas = document.createElement("h2");

// Variable para mostrar las completas
const completas = tareas.length -  numeroPendientes(isPending);

// Agregamos los textos a los h2
tareasPendientes.innerHTML = "Tareas pendientes: " + numeroPendientes(isPending);
tareasCompletas.innerHTML = "Tareas completas: "  + completas;

// Agregamos los h2 al div
const info = document.querySelector("#tasks__info");
info.appendChild(tareasPendientes);
info.appendChild(tareasCompletas);

const tasks = document.querySelector('#tasks');
for (let i = 0; i < tareas.length; i++){
    tasks.appendChild(agregarTareas(tareas[i], isPending[i]));
}