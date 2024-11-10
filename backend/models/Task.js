const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Task Model
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
