// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listners so that we listen for any change
loadEventListners();

function loadEventListners() {
    // looking for a submit
    form.addEventListener('submit', addTask)

    // remove an event
    taskList.addEventListener('click', removeTask)
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    const li = document.createElement('li');

    li.className = 'collection-item'
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link)
    taskList.appendChild(li);
    taskInput.value = '';

    e.preventDefault();
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
        }
    }
}