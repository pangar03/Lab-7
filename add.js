import { addTask } from "./utils.js";

const render = () => {
    const formulario = document.querySelector('#newTask');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target.taskName.value)
        const name = e.target.taskName.value;

        try {
            addTask(name);
            alert('Tarea agregada exitosamente');
            // window.location.href = './index.html';
        } 
        catch (error) {
            alert(error.message);   
        }
    });
};

document.addEventListener('DOMContentLoaded', render);