import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import AddTask from "./AddTask";
import TaskListItem from "./TaskListItem";
import styles from "./TaskList.module.css";

const TaskList = ({ todoList, setTodoList }) => {
  const [todoItemEdit, settodoItemEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [todoItem, settodoItem] = useState("");
  const [editItem, setEditItem] = useState("");
  const [isTaskCompletedLoading, setIsTaskCompletedLoading] = useState(false);

  const [isCompleteTaskPressed, setIsCompleteTaskPressed] = useState({});

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
    setIsTaskCompletedLoading(!task.completed);
    setIsCompleteTaskPressed({
      [task._id]: task._id,
    });
    fetch("https://task-app123465.herokuapp.com/updateTodo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: task._id,
        item: task.item,
        completed: !task.completed,
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

        setTodoList(newList);
      })
      .finally(() => {
        setIsTaskCompletedLoading(false);
        setIsCompleteTaskPressed({});
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
  console.log("todoList: ", todoList);
  return (
    <div>
      <ul className={styles.taskList} id="topList">
        {todoList.map((todo) => (
          <li key={todo._id} className="d-flex">
            <TaskListItem
              todo={todo}
              handleShowEdit={handleShowEdit}
              handleDeleteItem={handleDeleteItem}
              handleTodoComplete={handleTodoComplete}
              isTaskCompletedLoading={isTaskCompletedLoading}
              isCompleteTaskPressed={isCompleteTaskPressed}
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
        <Modal.Header style={{ borderBottom: "0" }}>
          <Modal.Title style={{ margin: "auto" }}>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOnSubmitEdit} id="editTodoForm">
            <Form.Group role="form" className="mb-3" controlId="formText">
              <Form.Control
                style={{
                  fontStyle: "italic",
                  borderRadius: "0",
                  borderTop: "0",
                  borderLeft: "0",
                  borderRight: "0",
                  width: "90%",
                  margin: "auto",
                  boxShadow: "none",
                }}
                placeholder={todoItemEdit[0]?.item}
                onChange={handleOnChangeEdit}
                value={editItem}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea2"
            >
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="Notes"
                style={{
                  borderTop: "37px solid #eee",
                  borderBottom: "37px solid #eee",
                  borderRadius: "0",
                  paddingLeft: "30px",
                  boxShadow: "none",
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            borderTop: "0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="danger"
            style={{
              background: "transparent",
              color: "red",
              border: "none",
              fontWeight: "bold",
            }}
            onClick={() => handleDeleteItem(todoItemEdit[0]?._id)}
          >
            DELETE
          </Button>
          <Button
            type="submit"
            form="editTodoForm"
            style={{
              background: "transparent",
              color: "ORANGE",
              border: "none",
              fontWeight: "bold",
            }}
          >
            EDIT TODO
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
