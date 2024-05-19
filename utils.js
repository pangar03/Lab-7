const TAREAS_KEY = "tareas";

export const getTareas = async () => {
    const tareas = localStorage.getItem(TAREAS_KEY);

    if(!tareas){
        const response = await fetch(
            "https://raw.githubusercontent.com/pangar03/Lab-7/main/data.json"
        );
        const data = await response.json();
        localStorage.setItem(TAREAS_KEY, JSON.stringify(data));
        
        const listaTareas = data.map((tarea) => new Tarea(tarea.name, tarea.isPending));
        return listaTareas;
    }

    const listaTareas = JSON.parse(tareas).map((tarea) => new Tarea(tarea.name, tarea.isPending));
    return listaTareas;
};

export class Tarea {
    name;
    isPending;
    #finishNode;
    #nameNode;

    constructor(name, isPending) {
        this.name = name;
        this.isPending = isPending;
    }

    renderTareas() {
        // Creamos un div para la tarea
        const tarea = document.createElement("div");
        tarea.classList.add("tasks__item");

        // Agregamos el nombre de la tarea
        const nombre = document.createElement("h3");
        nombre.innerHTML = this.name;
        this.#nameNode = nombre;

        // Creamos un icono para el estado de la tarea
        const checkIcon = document.createElement("i");
        if (this.isPending) {
            checkIcon.classList.add(
                "fa-solid",
                "fa-circle-check",
                "item__icon--pending"
            );
        } else {
            checkIcon.classList.add(
                "fa-solid",
                "fa-circle-check",
                "item__icon--completed"
            );
            nombre.classList.add("tasks__item--completed");
            (",");
        }
        this.#finishNode = checkIcon;

        // Agregamos el icono y la tarea al div
        tarea.appendChild(nombre);
        tarea.appendChild(checkIcon);

        // Retornamos la tarea
        return tarea;
    }

    // Funcion para devolver la cantidad de pendientes
    numeroPendientes() {
        if (this.isPending) {
            return 1;
        }

        return 0;
    }

    addEventListeners() {
        this.#finishNode.addEventListener("click", () => {
            this.isPending = !this.isPending;
            this.#finishNode.classList.toggle("item__icon--completed");
            this.#finishNode.classList.toggle("item__icon--pending");
            this.#nameNode.classList.toggle("tasks__item--completed");
            changeTaskState(this);
        });
    }
}

export const generateCounters = async () => {
    const tareas = await getTareas();

    let completas = tareas.length;
    let pendientes = 0;

    for (const tarea of tareas) {
        pendientes += tarea.numeroPendientes();
        completas -= tarea.numeroPendientes();
    }

    const tareasPendientes = document.querySelector(".info__pending-tasks");
    const tareasCompletas = document.querySelector(".info__completed-tasks");

    tareasPendientes.innerHTML = "Tareas pendientes: " + pendientes;
    tareasCompletas.innerHTML = "Tareas completas: "  + completas;

    const info = document.querySelector("#tasks__info");
    info.appendChild(tareasPendientes);
    info.appendChild(tareasCompletas);
};

const changeTaskState = (tarea) => {
    const tareas = JSON.parse(localStorage.getItem(TAREAS_KEY));
    const index = tareas.findIndex((t) => t.name === tarea.name);

    tareas[index].isPending = tarea.isPending;
    localStorage.setItem(TAREAS_KEY, JSON.stringify(tareas));
    generateCounters();
};

export const addTask = async (name) => {
    const listaTareas = await getTareas();
    console.log(listaTareas);
    listaTareas.forEach(element => {
        if(element.name === name){
            throw new Error("La tarea ya existe");
            return;
        }
    });

    const tareas = JSON.parse(localStorage.getItem(TAREAS_KEY));
    const newTarea = new Tarea(name, true);
    newTarea.renderTareas();
    newTarea.addEventListeners();
    
    tareas.push(newTarea);
    localStorage.setItem(TAREAS_KEY, JSON.stringify(tareas));
};