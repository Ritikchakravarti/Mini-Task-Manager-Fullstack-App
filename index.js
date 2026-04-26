const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory task storage
let tasks = [];
let nextId = 1;

// GET /tasks - Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const newTask = {
    id: nextId++,
    text,
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE /tasks/:id - Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const initialLength = tasks.length;
  
  tasks = tasks.filter(task => task.id !== id);
  
  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.status(200).json({ message: 'Task deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
