const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data store for tasks
let tasks = [
  {
    id: 1,
    title: 'Finish project proposal',
    description: 'Complete the project proposal and send it to the client',
    status: 'Todo',
    dueDate: '2023-05-01'
  },
  {
    id: 2,
    title: 'Attend team meeting',
    description: 'Participate in the weekly team meeting',
    status: 'In Progress',
    dueDate: '2023-04-15'
  },
  {
    id: 3,
    title: 'Implement task API endpoints',
    description: 'Build the CRUD endpoints for the task management API',
    status: 'Todo',
    dueDate: '2023-04-30'
  }
];

// Routes
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

app.post('/tasks', (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status,
    dueDate
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const updatedTask = {
    id: tasks[taskIndex].id,
    title,
    description,
    status,
    dueDate
  };
  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json(deletedTask);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});