import { useEffect, useState } from "react";
import "./App.css";

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
    <div className="App">
      <ul>
        {todoList.map((todo) => (
          <li key={todo._id}>{todo.item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
