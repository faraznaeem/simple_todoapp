// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listners so that we listen for any change
loadEventListners();

function loadEventListners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // looking for a submit
    form.addEventListener('submit', addTask)

    // delete a task
    taskList.addEventListener('click', removeTask)

    // Clear tasks
    clearBtn.addEventListener('click', clearTasks)

    // filter tasks
    filter.addEventListener('keyup', filterTask)
}

function getTasks(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');

        li.className = 'collection-item'
        li.appendChild(document.createTextNode(task));
    
        const link = document.createElement('a');
            link.className = 'delete-item secondary-content'
            link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link)
        taskList.appendChild(li);

    });
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    } else {
        const li = document.createElement('li');

        li.className = 'collection-item'
        li.appendChild(document.createTextNode(taskInput.value));
    
        const link = document.createElement('a');
            link.className = 'delete-item secondary-content'
            link.innerHTML = '<i class="fa fa-remove"></i>';
    
        li.appendChild(link)
        taskList.appendChild(li);
    
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = '';
    
        e.preventDefault();
    }
    
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task ){
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearTasks(e) {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLocaleLowerCase().indexOf(text) != -1){
                task.style.display = 'block'
            } else {
                task.style.display = 'none'
            }
        }
    );
}

