const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  item: String,
  note: String,
  date: String,
  completed: Boolean,
  updatedAt: String,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
