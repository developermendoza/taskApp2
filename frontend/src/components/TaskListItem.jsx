import React from "react";
import styles from "./TaskListItem.module.css";
import moment from "moment";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

const TaskListItem = ({ todo, handleShowEdit, handleTodoComplete }) => {
  return (
    <Container className={styles.taskListItem}>
      <Row>
        <Col
          xs={10}
          className={styles.taskListItemName}
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
          onClick={() => handleShowEdit(todo._id)}
        >
          <div>
            <p
              key={todo._id}
              style={{
                textDecoration: todo.completed && "line-through",
                color: todo.completed && "#e2e2e2",
                fontWeight: "700",
              }}
              className="d-flex"
            >
              {todo.item}{" "}
            </p>
            <p
              style={{
                fontSize: "11px",
                position: "absolute",
                left: "40px",
                right: "5px",
                bottom: "-25px",
                textAlign: "center",
                color: "#CECECE",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              Added on {moment(todo.date).format("ddd MM-DD-YYYY")}
            </p>
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
