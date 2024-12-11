const express = require("express");
const app = express();

const fs = require("fs");
const filePath = "./tasks.json";

const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Sample tasks
// let tasks = [
//   { id: 1, title: "Learn Node.js", completed: false },
//   { id: 2, title: "Build a To-Do App", completed: false },
// ];

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// -------------------------------------------------------------------------
// Helper Functions: Add functions to read and write tasks from/to a file:

const readTasks = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const writeTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// ------------------------------------------------------------------------
// API Endpoints

// get all tasks
app.get("/tasks", (req, res) => {
    let tasks = readTasks();
    res.status(200).json(tasks);
});

// adding a new task
app.post("/tasks", (req, res) => {
    let tasks = readTasks();
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false,
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

// completed status update of task
// :id -> path parameter
app.put("/tasks/:id", (req, res) => {
    let tid = parseInt(req.params.id);
    let tasks = readTasks();
    let task = tasks.find((t) => t.id === tid);

    if (!task) {
        res.status(404).json({
            error: "task not found"
        });
    }
    task.completed = true;
    writeTasks(tasks);
    res.json(task);
});

// delete the task
app.delete("/tasks/:id", (req, res) => {
    let tid = parseInt(req.params.id);
    let tasks = readTasks();
    let task = tasks.find((t) => t.id === tid);

    if (!task) {
        res.status(404).json({
            error: "task not found"
        });
    }

    tasks = tasks.filter((t) => t.id != tid);
    writeTasks(tasks);
    res.status(200).json({
        task: "deleted successfully"
    });
});

// ----------------------------------------------------------------------------