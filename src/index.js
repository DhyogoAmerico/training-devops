const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
];

app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  res.status(200).json(task);
});

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = { app, server };