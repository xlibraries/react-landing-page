const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  id: String,
  title: String,
  description: String,
  dueDate: Date,
  status: String,
  priority: Number,
  creationDate: Date,
});

module.exports = mongoose.model('Task', taskSchema);
