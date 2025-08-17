const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory data store for tasks
let tasks = [];

// Routes

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const newTask = {
    id: uuid.v4(),
    title,
    description,
    status,
    dueDate
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get a specific task
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const updatedTask = {
    id: req.params.id,
    title,
    description,
    status,
    dueDate
  };
  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});