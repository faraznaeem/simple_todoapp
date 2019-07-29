// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listners
loadEventListners();

function loadEventListners() {
    form.addEventlistner('submit', addTask)
}

function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }
    e.preventDefault();
}