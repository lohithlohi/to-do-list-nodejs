const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Sample tasks
let tasks = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Build a To-Do App", completed: false },
];

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// ------------------------------------------------------------------------
// API Endpoints

// get all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});


// adding a new task
app.post('/tasks', (req, res) => {
    const newTask = {
      id: tasks.length + 1,
      title: req.body.title,
      completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// completed status update of task
// :id -> path parameter
app.put('/tasks/:id', (req, res) => {
    let tid = parseInt(req.params.id);
    let task = tasks.find(t => t.id === tid);

    if (!task) {
        res.status(404).json({error: "task not found"})
    }
    task.completed = true;
    res.json(task);
});

// delete the task
app.delete('/tasks/:id', (req, res) => {

    let tid = parseInt(req.params.id);
    let task = tasks.find(t => t.id === tid);
    if (!task) {
        res.status(404).json({error: "task not found"})
    }

    tasks = tasks.filter(t => t.id != tid);
    res.status(200).json({"task": "deleted successfully"});
});


// ----------------------------------------------------------------------------