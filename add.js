import { addTask } from "./utils.js";

const render = () => {
    const formulario = document.querySelector('#newTask');

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = e.target.taskName.value;

        try {
            await addTask(name);
            alert('Tarea agregada exitosamente');
            window.location.href = './index.html';
        } catch (error) {
            alert(error.message);   
        }
    });
};

document.addEventListener('DOMContentLoaded', render);