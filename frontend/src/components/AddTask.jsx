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
        <Modal.Header style={{ borderBottom: "0" }}>
          <Modal.Title style={{ margin: "auto" }}>New Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOnSubmit} id="addTodoForm">
            <Form.Group role="form" className="mb-3" controlId="formText">
              <Form.Control
                placeholder="Title"
                onChange={handleOnChange}
                value={todoItem}
                autoFocus
                className={styles.addTaskTitleInput}
                style={{
                  borderTop: "0",
                  borderLeft: "0",
                  borderRight: "0",
                  borderRadius: "0",
                  outline: "0",
                  width: "90%",
                  margin: "auto",
                  paddingLeft: "0",
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="Notes"
                style={{
                  borderTop: "37px solid #eee",
                  borderBottom: "37px solid #eee",
                  borderRadius: "0",
                  paddingLeft: "25px",
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
            style={{
              background: "transparent",
              color: "red",
              border: "none",
              outline: "none",
              fontWeight: "bold",
            }}
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            style={{
              background: "transparent",
              color: "grey",
              border: "none",
              outline: "none",
              fontWeight: "bold",
            }}
            type="submit"
            form="addTodoForm"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTask;
