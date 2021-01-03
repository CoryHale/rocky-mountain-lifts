import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import Select from "react-select";
import { addTask } from "../../actions/addTask";
import { getUsers } from "../../actions/getUsers";

import "../../styles/sidebar.scss";

const AddTaskBtn = () => {
  const [task, setTask] = useState({
    taskDescription: "",
    taskDate: "",
    taskTime: "",
    employeeId: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const employeeArray = [];
  const [employees, setEmployees] = useState([]);
  const getEmployees = useSelector((state) => state.getUsersReducer.users);
  const [errors, setErrors] = useState({});
  const getErrors = useSelector((state) => state.addTaskReducer.errors);
  const success = useSelector((state) => state.addTaskReducer.success);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (getEmployees.users) {
      getEmployees.users.map((user) => {
        if (user.userType === "employee" && user.active === true) {
          employeeArray.push({
            label: `${user.firstName} ${user.lastName}`,
            value: user.userId,
            name: "employeeId",
            jobTitle: user.jobTitle,
          });
        }
      });

      setEmployees(employeeArray);
    }
  }, [getEmployees]);

  useEffect(() => {
    if (getErrors) {
      setErrors(getErrors);
    }
  }, [getErrors]);

  useEffect(() => {
    if (success) {
      toggle();
    }
  }, [success]);

  const toggle = () => {
    if (isOpen) {
      setTask({
        taskDescription: "",
        taskDate: "",
        taskTime: "",
        employeeId: "",
      });
    }
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setTask({
      ...task,
      [e.name]: e.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
  };

  return (
    <div className="add-task-div">
      <Button color="success" onClick={toggle}>
        Add Task
      </Button>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Task</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Task</Label>
              <Input
                type="textarea"
                name="taskDescription"
                onChange={handleChange}
                invalid={errors.taskDescription ? true : false}
              />
              <FormFeedback>{errors.taskDescription}</FormFeedback>
            </FormGroup>
            <div>
              <FormGroup>
                <Label>Date</Label>
                <Input
                  type="date"
                  placeholder="date placeholder"
                  name="taskDate"
                  onChange={handleChange}
                  invalid={errors.taskDate ? true : false}
                />
                <FormFeedback>{errors.taskDate}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>Time</Label>
                <Input
                  type="time"
                  placeholder="time placeholder"
                  name="taskTime"
                  onChange={handleChange}
                  invalid={errors.taskTime ? true : false}
                />
                <FormFeedback>{errors.taskTime}</FormFeedback>
              </FormGroup>
            </div>
            <FormGroup>
              <Label>Assigned To</Label>
              <Select
                options={employees}
                onChange={handleSelectChange}
                className={errors.employeeId ? "invalid" : ""}
              />
              <Input
                type="hidden"
                disabled
                invalid={errors.employeeId ? true : false}
              />
              <FormFeedback>{errors.employeeId}</FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddTaskBtn;
