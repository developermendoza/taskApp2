import React from "react";
import styles from "./TaskListItem.module.css";
import moment from "moment";
import { Form, Container, Row, Col } from "react-bootstrap";

import ClipLoader from "react-spinners/ClipLoader";

const TaskListItem = ({
  todo,
  handleShowEdit,
  handleTodoComplete,
  isCompleteTaskPressed,
  isTaskCompletedLoading,
}) => {
  return (
    <Container className={styles.taskListItemContainer}>
      <Row>
        <Col
          xs={10}
          className={styles.taskListItemName}
          onClick={() => handleShowEdit(todo._id)}
        >
          <div>
            <p
              key={todo._id}
              className={`${styles.taskListItem} ${
                todo.completed && styles.completed
              }`}
            >
              {todo.item}{" "}
            </p>
            <p className={styles.taskListItemDate} style={{}}>
              {moment(todo.date).format("ddd DD MMM YYYY")}
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
          <div
            style={{
              display:
                isCompleteTaskPressed[`${todo._id}`] === todo._id
                  ? "block"
                  : "none",
            }}
          >
            <ClipLoader
              cssOverride={{
                display: "block",
                margin: "0 auto",
                position: "absolute",
                top: "20px",
                borderWidth: "5px",
              }}
              size={40}
              color="dodgerblue"
              aria-label="Loading Spinner"
              data-testid={`formid${todo._id}`}
              loading={isTaskCompletedLoading}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskListItem;
