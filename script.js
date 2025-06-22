const taskInput = document.getElementById('task-input');

const addTaskBtn = document.getElementById('add-task-btn');

const taskList = document.getElementById('task-list');

const clearAllBtn = document.getElementById('clear-all-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {

  const taskText = taskInput.value.trim();

  if (taskText !== '') {

    const task = { text: taskText, completed: false };

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTasks();

    taskInput.value = '';

  }

}

function displayTasks() {

  taskList.innerHTML = '';

  tasks.forEach((task, index) => {

    const taskHTML = `

      <li class="task" id="task-${index}">

        <input type="checkbox" id="checkbox-${index}" ${task.completed ? 'checked' : ''}>

        <span>${task.text}</span>

        <button class="delete-btn" id="delete-btn-${index}">Delete</button>

      </li>

    `;

    taskList.insertAdjacentHTML('beforeend', taskHTML);

    document.getElementById(`delete-btn-${index}`).addEventListener('click', () => {

      deleteTask(index);

    });

    document.getElementById(`checkbox-${index}`).addEventListener('change', () => {

      toggleCompleted(index);

    });

  });

}

function deleteTask(index) {

  tasks.splice(index, 1);

  localStorage.setItem('tasks', JSON.stringify(tasks));

  displayTasks();

}

function toggleCompleted(index) {

  tasks[index].completed = !tasks[index].completed;

  localStorage.setItem('tasks', JSON.stringify(tasks));

  displayTasks();

}

function clearAllTasks() {

  tasks = [];

  localStorage.setItem('tasks', JSON.stringify(tasks));

  displayTasks();

}

addTaskBtn.addEventListener('click', addTask);

clearAllBtn.addEventListener('click', clearAllTasks);

displayTasks();