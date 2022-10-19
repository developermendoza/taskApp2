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

app.get("/", urlencodedParser, getTodos);

app.listen(port, () => console.log(`server running in port ${port}`));
