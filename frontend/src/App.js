import { useEffect, useState } from "react";
import "./App.css";
import TaskAppTitle from "./components/TaskAppTitle";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoLoading, setTodoLoading] = useState(false);
  useEffect(() => {
    setTodoLoading(true);
    fetch("https://task-app123465.herokuapp.com/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => setTodoList(data))
      .catch((error) => console.log("error: ", error))
      .finally(() => setTodoLoading(false));
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <div className="d-flex justify-content-center">
        <div className="taskApp">
          <h1
            style={{
              textAlign: "center",
              paddingBottom: "20px",
              color: "white",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontFamily: "monospace",
              paddingTop: "20px",
            }}
          >
            <TaskAppTitle title="My Todo List" />
          </h1>
          <div>
            <TaskList
              todoList={todoList}
              setTodoList={setTodoList}
              todoLoading={todoLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
