import { useEffect, useState } from "react";
import "./App.css";
import TaskAppTitle from "./components/TaskAppTitle";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
function App() {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    fetch("https://task-app123465.herokuapp.com/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => setTodoList(data))
      .catch((error) => console.log("error: ", error));
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
            <TaskAppTitle title="My Task List" />
          </h1>
          <div>
            <TaskList todoList={todoList} setTodoList={setTodoList} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
