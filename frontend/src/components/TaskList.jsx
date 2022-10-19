import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import AddTask from "./AddTask";
import TaskListItem from "./TaskListItem";

const TaskList = ({ todoList, setTodoList }) => {
  const [todoItemEdit, settodoItemEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [todoItem, settodoItem] = useState("");
  const [editItem, setEditItem] = useState("");

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowEdit = (id) => {
    setShowEdit(true);
    console.log(id);
    const editItem = todoList.filter((todo) => todo._id === id);
    console.log(editItem);
    settodoItemEdit(editItem);
  };

  const handleDeleteItem = (id) => {
    if (id !== "") {
      fetch("https://task-app123465.herokuapp.com/deleteTodo", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          const newTodoList = todoList.filter((item) => item._id !== data._id);
          setTodoList(newTodoList);
          setShowEdit(false);
        });
    }
  };
  const handleTodoComplete = (task) => {
    const isTaskCompleted = !task.completed;
    console.log("isTaskCompleted: ", isTaskCompleted);
    fetch("https://task-app123465.herokuapp.com/updateTodo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: task._id,
        item: task.item,
        completed: isTaskCompleted,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log("data from the completed task: ", data);
        const newList = todoList.map((obj) => {
          if (obj._id === data._id) {
            return { ...obj, completed: data.completed };
          }
          return obj;
        });
        console.log("newList: ", newList);
        setTodoList(newList);
      });
  };

  const handleOnSubmitEdit = (e) => {
    e.preventDefault();

    if (editItem !== "") {
      fetch("https://task-app123465.herokuapp.com/updateTodo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: todoItemEdit[0]._id,
          item: editItem,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          const newList = todoList.map((obj) => {
            if (obj._id === data._id) {
              return { ...obj, item: editItem };
            }
            return obj;
          });
          setTodoList(newList);
          settodoItemEdit("");
          setEditItem("");
          handleCloseEdit();
        });
    }
  };
  const handleOnChangeEdit = (e) => {
    if (e.target.value !== "") {
      setEditItem(e.target.value);
    }
  };
  return (
    <div>
      <ul
        style={{
          paddingLeft: "0",
          marginLeft: "20px",
          marginRight: "20px",
          overflowY: "auto",
          height: "75vh",
          paddingTop: "20px",
          maxWidth: "350px",
        }}
      >
        {todoList.map((todo) => (
          <li key={todo._id} className="d-flex">
            <TaskListItem
              todo={todo}
              handleShowEdit={handleShowEdit}
              handleDeleteItem={handleDeleteItem}
              handleTodoComplete={handleTodoComplete}
            />
          </li>
        ))}
      </ul>
      <AddTask
        todoItem={todoItem}
        todoList={todoList}
        setTodoList={setTodoList}
        settodoItem={settodoItem}
      />

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit List Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOnSubmitEdit} id="addTodoForm">
            <Form.Group role="form" className="mb-3" controlId="formText">
              <Form.Control
                style={{ fontStyle: "italic" }}
                placeholder={todoItemEdit[0]?.item}
                onChange={handleOnChangeEdit}
                value={editItem}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => handleDeleteItem(todoItemEdit[0]?._id)}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button type="submit" form="addTodoForm">
            Save To Do
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
