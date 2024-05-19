import { Tarea, getTareas, generateCounters } from './utils.js';

const render = async () => {
    // Agregamos tareas y sus estados
    const tareas = await getTareas();    
    
    // Generamos los contadores
    generateCounters();
    // Agregamos tareas al DOM
    const tasks = document.querySelector('#tasks');
    for (const tarea of tareas){
        tasks.appendChild(tarea.renderTareas());
        tarea.addEventListeners();
    }
}

document.addEventListener('DOMContentLoaded', render);