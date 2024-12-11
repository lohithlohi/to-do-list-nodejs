const API_URL = 'http://localhost:3000/tasks';

async function fetchTasks() {
  const response = await fetch(API_URL);   // GET call
  const tasks = await response.json();
  const tasksList = document.getElementById('tasks');
  tasksList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = `${task.title} - ${task.completed ? 'Completed' : 'Pending'}`;
    tasksList.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const newTask = { title: input.value };
  await fetch(API_URL, {      // POST call
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  });
  input.value = '';
  fetchTasks();
}

fetchTasks();
