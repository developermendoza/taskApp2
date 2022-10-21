import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "./AddTask.module.css";

const AddTask = ({ todoItem, todoList, setTodoList, settodoItem }) => {
  const [todo, setTodo] = useState({ item: "", note: "" });
  const [show, setShow] = useState(false);
  const [didUserClickAdd, setDidUserClickAdd] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    setDidUserClickAdd(true);
    setShow(true);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (todo !== "") {
      fetch("https://task-app123465.herokuapp.com/addTodo", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          setTodoList([data, ...todoList]);
          // settodoItem("");
          setTodo({ item: "", note: "" });
          handleClose();
        });
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  return (
    <>
      <div className={styles.addTaskContainer}>
        <Button
          className={`${styles.addTask} ${
            todoList.length === 0 && !didUserClickAdd ? styles.heartbeat : ""
          } `}
          onClick={handleShow}
        >
          <AiOutlinePlus style={{ fontSize: "70px", padding: "5px 0" }} />
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ borderBottom: "0" }}>
          <Modal.Title style={{ margin: "auto" }}>New Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOnSubmit} id="addTodoForm">
            <Form.Group role="form" className="mb-3" controlId="formText">
              <Form.Control
                placeholder="Title"
                onChange={handleOnChange}
                name="item"
                value={todo.item}
                className={styles.addTaskTitleInput}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                name="note"
                rows={8}
                placeholder="Notes"
                value={todo.note}
                onChange={handleOnChange}
                className={styles.addTaskNotesInput}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.AddTaskModalFooter}>
          <Button
            className={styles.AddTaskCancelBtn}
            variant="secondary"
            onClick={handleClose}
          >
            CANCEL
          </Button>
          <Button type="submit" form="addTodoForm">
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTask;
