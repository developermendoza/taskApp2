import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button, Form, Modal } from "react-bootstrap";
import AddTask from "./AddTask";
import TaskListItem from "./TaskListItem";
import styles from "./TaskList.module.css";
import { FaTrashAlt } from "react-icons/fa";

const TaskList = ({ todoList, setTodoList, todoLoading }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [todo, setTodo] = useState({ item: "", note: "" });
  const [isTaskCompletedLoading, setIsTaskCompletedLoading] = useState(false);

  const [isCompleteTaskPressed, setIsCompleteTaskPressed] = useState({});

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowEdit = (id) => {
    setShowEdit(true);
    const findTodoById = todoList.find((todo) => todo._id === id);
    setTodo(findTodoById);
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
    const updatedTodo = {
      ...task,
      completed: !task.completed,
    };

    setIsTaskCompletedLoading(!task.completed);
    setIsCompleteTaskPressed({
      [task._id]: task._id,
    });
    fetch("https://task-app123465.herokuapp.com/updateTodo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: updatedTodo,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
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

    if (todo.item !== "") {
      fetch("https://task-app123465.herokuapp.com/updateTodo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          const newList = todoList.map((obj) => {
            if (obj._id === data._id) {
              return {
                ...obj,
                item: data.item,
                note: data.note,
                completed: data.completed,
              };
            }
            return obj;
          });
          handleCloseEdit();
          setTodoList(newList);
        });
    }
  };
  const handleOnChangeEdit = (e) => {
    const { name, value } = e.target;

    setTodo({
      ...todo,
      [name]: value,
    });
  };
  return (
    <div>
      <ul className={styles.taskList} id="topList">
        {todoLoading &&
          [1, 2, 3, 4, 5, 6].map((item) => (
            <li
              key={item}
              style={{
                background: "white",
                padding: "15px 25px",
                borderRadius: "50px",
                boxShadow: "rgb(0 0 0 / 45%) 0px 25px 20px -20px",
                marginBottom: "25px",
              }}
            >
              <Skeleton />
              <Skeleton />
            </li>
          ))}
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
        todoItem={todo}
        todoList={todoList}
        setTodoList={setTodoList}
        setTodo={setTodo}
      />

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header style={{ borderBottom: "0" }}>
          <Button
            className={styles.deleteTaskBtn}
            onClick={() => handleDeleteItem(todo._id)}
            style={{
              background: "transparent",
              position: "absolute",
              border: "none",
              right: "20px",
              top: "20px",
              color: "lightgrey",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <FaTrashAlt />
            <p style={{ fontWeight: "bold", fontSize: "12px", color: "grey" }}>
              Delete{" "}
            </p>
          </Button>
          <Modal.Title style={{ margin: "auto" }}>Edit Todo</Modal.Title>
          {/* <p>Task Completed!</p> */}
          {/* <p onClick={handleCloseEdit}>CANCEL</p> */}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOnSubmitEdit} id="editTodoForm">
            <Form.Group role="form" className="mb-3" controlId="formText">
              <Form.Control
                className={styles.editTaskInput}
                name="item"
                placeholder={todo.item}
                onChange={handleOnChangeEdit}
                value={todo.item}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea2"
            >
              <Form.Control
                as="textarea"
                name="note"
                rows={8}
                placeholder={todo.note}
                value={todo.note}
                onChange={handleOnChangeEdit}
                className={styles.editTaskNotesInput}
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
          {/* <Button
            variant="danger"
            className={styles.editTaskDeleteBtn}
            style={{
              background: "transparent",
              color: "red",
              border: "none",
              fontWeight: "bold",
            }}
            onClick={() => handleDeleteItem(todo._id)}
          >
            DELETE
          </Button> */}

          <Button
            variant="secondary"
            className={styles.editTaskCancelBtn}
            onClick={handleCloseEdit}
          >
            CANCEL
          </Button>
          <Button
            className={styles.editTaskEditBtn}
            type="submit"
            form="editTodoForm"
          >
            EDIT TODO
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
