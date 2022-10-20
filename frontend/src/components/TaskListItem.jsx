import React from "react";
import styles from "./TaskListItem.module.css";
import moment from "moment";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import BeatLoader from "react-spinners/BeatLoader";

const TaskListItem = ({
  todo,
  handleShowEdit,
  handleTodoComplete,
  isTaskCompletedLoading,
}) => {
  console.log("isTaskCompletedLoading: ", isTaskCompletedLoading);
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
                left: "-105px",
                right: "5px",
                bottom: "-13px",
                textAlign: "center",
                color: "#CECECE",
                fontWeight: "bold",
              }}
            >
              {moment(todo.date).format("ddd DD MMM YYYY")}
            </p>
          </div>
        </Col>
        <Col xs={2} style={{ textAlign: "center" }}>
          {/* <div
            className="is-completed-loading"
            style={{
              display: isTaskCompletedLoading === true ? "block" : "none",
            }}
          >
            <BeatLoader
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
              loading={isTaskCompletedLoading}
              size={8}
            />
          </div> */}

          <Form.Group controlId={`formid${todo._id}`}>
            <Form.Check
              name={`formid${todo._id}`}
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleTodoComplete(todo)}
            />
            {/* <BeatLoader
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid={`loader-${todo._id}`}
              loading={isTaskCompletedLoading}
              size={9}
            /> */}
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskListItem;
