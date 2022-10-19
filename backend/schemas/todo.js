const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  item: String,
  date: String,
  completed: Boolean,
  updatedAt: String,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
