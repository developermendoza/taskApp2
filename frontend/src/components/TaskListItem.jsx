import React from "react";
import styles from "./TaskListItem.module.css";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

const TaskListItem = ({ todo, handleShowEdit, handleTodoComplete }) => {
  return (
    <Container className={styles.taskListItem}>
      <Row>
        <Col
          xs={10}
          className={styles.taskListItemName}
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => handleShowEdit(todo._id)}
        >
          <div
            key={todo._id}
            style={{
              textDecoration: todo.completed && "line-through",
              color: todo.completed && "#e2e2e2",
              fontWeight: "700",
            }}
            className="d-flex"
          >
            {todo.item}{" "}
          </div>
        </Col>
        <Col xs={2} style={{ textAlign: "center" }}>
          <Form.Group controlId={`formid${todo._id}`}>
            <Form.Check
              name={`formid${todo._id}`}
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleTodoComplete(todo)}
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskListItem;
