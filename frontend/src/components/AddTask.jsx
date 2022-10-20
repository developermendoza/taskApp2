import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "./AddTask.module.css";

const AddTask = ({ todoItem, todoList, setTodoList, settodoItem }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (todoItem !== "") {
      fetch("https://task-app123465.herokuapp.com/addTodo", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todoItem,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          setTodoList([data, ...todoList]);
          settodoItem("");
          handleClose();
        });
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    settodoItem(value);
  };

  return (
    <>
      <div className={styles.addTaskContainer}>
        <Button className={styles.addTask} onClick={handleShow}>
          <AiOutlinePlus style={{ fontSize: "70px", padding: "5px 0" }} />
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOnSubmit} id="addTodoForm">
            <Form.Group role="form" className="mb-3" controlId="formText">
              <Form.Control
                placeholder="e.x. Go to the gym"
                onChange={handleOnChange}
                value={todoItem}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" form="addTodoForm">
            <a href="#topList"></a>
            Save To Do
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTask;
