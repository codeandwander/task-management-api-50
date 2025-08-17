const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  dueDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

This database schema file defines a Mongoose schema for the Task model, which represents a task in the Task Management API. The schema includes the following fields:

1. `title`: The title of the task, required and trimmed.
2. `description`: The description of the task, required and trimmed.
3. `status`: The status of the task, required and limited to the values 'pending', 'in-progress', and 'completed', with a default of 'pending'.
4. `dueDate`: The due date of the task, required.
5. `createdAt`: The date and time the task was created, automatically set to the current date and time.
6. `updatedAt`: The date and time the task was last updated, automatically set to the current date and time.

This schema can be used to create, read, update, and delete tasks in the Task Management API.