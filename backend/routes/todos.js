const Todo = require("../schemas/todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ date: "desc" });
    res.send(todos);
  } catch (error) {
    console.log("error: ", error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Todo.findByIdAndDelete(id);
    res.send(data);
  } catch (error) {
    console.log("error: ", error);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { _id, item, completed, note } = req.body.todo;
    const data = await Todo.findByIdAndUpdate(
      _id,
      {
        item,
        completed,
        note,
        updatedAt: new Date(),
      },
      { new: true }
    );
    res.send(data);
  } catch (error) {
    console.log("error: ", error);
  }
};

const addTodo = async (req, res) => {
  try {
    const { item, note } = req.body.todo;
    const newTodo = new Todo({
      item: item,
      date: new Date(),
      completed: false,
      note,
    });

    const data = await newTodo.save();
    res.send(data);
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
};
