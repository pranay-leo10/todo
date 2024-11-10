const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET: Retrieve all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create a new task
router.post('/', async (req, res) => {
  const task = new Task({
    text: req.body.text,
    completed: false,
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.text = req.body.text || task.text;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Search tasks by query
router.get('/search', async (req, res) => {
  const searchQuery = req.query.query || '';
  try {
    if (searchQuery.trim() === '') {
      const tasks = await Task.find();
      return res.json(tasks);
    }
    const tasks = await Task.find({
      text: { $regex: searchQuery, $options: 'i' },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;