const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  item: String,
  note: String,
  date: Date,
  completed: Boolean,
  updatedAt: Date,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
