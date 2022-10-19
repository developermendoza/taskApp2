const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());

require("./db/conn");

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const getTodos = require("./routes/todos").getTodos;
const addTodo = require("./routes/todos").addTodo;
const deleteTodo = require("./routes/todos").deleteTodo;
const updateTodo = require("./routes/todos").updateTodo;

app.get("/", urlencodedParser, getTodos);
app.post("/addTodo", jsonParser, addTodo);
app.delete("/deleteTodo", jsonParser, deleteTodo);
app.patch("/updateTodo", jsonParser, updateTodo);

app.listen(port, () => console.log(`server running in port ${port}`));
