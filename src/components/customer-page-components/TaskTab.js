import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Table,
  Card,
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
import { getUsers } from "../../actions/getUsers";
import { getCustomerTasks } from "../../actions/getCustomerTasks";
import { addTask } from "../../actions/addTask";
import { editTask } from "../../actions/editTask";
import { deleteTask } from "../../actions/deleteTask";

import "../../styles/customer.scss";

const TaskTab = () => {
  const [tasks, setTasks] = useState([]);
  const getTasksFromState = useSelector(
    (state) => state.getCustomerTasksReducer.tasks
  );
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState({
    taskDate: "",
    taskTime: "",
    taskDescription: "",
    customerId: "",
    employeeId: "",
  });
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [currentTask, setCurrentTask] = useState()
  const success = useSelector((state) => state.addTaskReducer.success);
  const [errors, setErrors] = useState({});
  const getErrors = useSelector((state) => state.addTaskReducer.errors);
  const [employees, setEmployees] = useState([]);
  const employeeArray = [];
  const getUsersFromState = useSelector((state) => state.getUsersReducer.users);
  const editSuccess = useSelector(state => state.editTaskReducer.success);
  const deleteSuccess = useSelector(state => state.deleteTaskReducer.success);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const customerId = pathArray[pathArray.length - 1];
    dispatch(getCustomerTasks(customerId));
    dispatch(getUsers());
    setTask({
      ...task,
      customerId: customerId
    })
  }, []);

  useEffect(() => {
    if (getTasksFromState) {
      setTasks(getTasksFromState);
    }
  }, [getTasksFromState]);

  useEffect(() => {
    if (getUsersFromState.users) {
      getUsersFromState.users.map((user) => {
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
  }, [getUsersFromState]);

  useEffect(() => {
    if (success) {
      toggle();
    }
  }, [success]);

  useEffect(() => {
    if (editSuccess || deleteSuccess) {
      toggleEdit();
    };
  }, [editSuccess, deleteSuccess]);

  useEffect(() => {
    if (getErrors) {
      setErrors(getErrors);
    }
  }, [getErrors]);

  const dateConverter = (date) => {
    const dateArray = date.split("-");
    return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
  };

  const timeConverter = (time) => {
    const timeArray = time.split(":");
    const hour = parseInt(timeArray[0]);
    let m;

    if (hour <= 11) {
      m = "AM";
    } else {
      m = "PM";
    }

    if (hour === 0) {
      const newHour = "12";
      timeArray[0] = newHour;
    } else if (hour <= 12) {
      const newHour = hour.toString();
      timeArray[0] = newHour;
    } else {
      const newHour = (hour - 12).toString();
      timeArray[0] = newHour;
    }

    return `${timeArray[0]}:${timeArray[1]} ${m}`;
  };

  const toggle = () => {
    if (isOpen) {
      setTask({
        ...task,
        taskDate: "",
        taskTime: "",
        taskDescription: "",
        employeeId: "",
      });
      setErrors({});
    }
    setIsOpen(!isOpen);
  };

  const toggleEdit = (e, task) => {
    setCurrentTask(task);
    setIsOpenEdit(!isOpenEdit);
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditChange = (e) => {
    setCurrentTask({
      ...currentTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setTask({
      ...task,
      [e.name]: e.value,
    });
  };

  const handleEditSelectChange = (e) => {
    setCurrentTask({
      ...currentTask,
      [e.name]: e.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
  };

  const handleSubmitEdit = (e, currentTask) => {
    e.preventDefault();
    dispatch(editTask(currentTask));
  };

  const handleDeleteTask = (e, currentTask) => {
    e.preventDefault();
    dispatch(deleteTask(currentTask.taskId))
  };

  return (
    <div className="customer-page-task-tab">
      <Table borderless className="task-table-header">
        <thead>
          <tr className="table-headers">
            <th>Task</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
      </Table>
      {tasks
        ? tasks.tasks
          ? tasks.tasks.map((task) => (
              <Card className="task-card" onClick={(e) => toggleEdit(e, task)}>
                <Table borderless className="task-card-table">
                  <tbody>
                    <tr className="table-data">
                      <td>{task.taskDescription}</td>
                      <td>{dateConverter(task.taskDate)}</td>
                      <td>{timeConverter(task.taskTime)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            ))
          : null
        : null}
      <Button outline color="success" onClick={toggle}>
        Add Task
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Task</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <div className="add-task-date-div">
              <FormGroup>
                <Label for="taskDate">Date</Label>
                <Input
                  type="date"
                  name="taskDate"
                  placeholder="date placeholder"
                  onChange={handleChange}
                  invalid={errors.taskDate ? true : false}
                />
                <FormFeedback>{errors.taskDate}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="taskTime">Time</Label>
                <Input
                  type="time"
                  name="taskTime"
                  placeholder="time placeholder"
                  onChange={handleChange}
                  invalid={errors.taskTime ? true : false}
                />
                <FormFeedback>{errors.taskTime}</FormFeedback>
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="taskDescription">Task Description</Label>
              <Input
                type="textarea"
                name="taskDescription"
                onChange={handleChange}
                invalid={errors.taskDescription ? true : false}
              />
              <FormFeedback>{errors.taskDescription}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="employeeId">Assigned To</Label>
              <Select
                name="employeeId"
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
      <Modal isOpen={isOpenEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>Edit Task</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmitEdit}>
            <div className="add-task-date-div">
              <FormGroup>
                <Label for="taskDate">Date</Label>
                <Input
                  type="date"
                  name="taskDate"
                  placeholder="date placeholder"
                  value={currentTask ? currentTask.taskDate : null}
                  onChange={handleEditChange}
                  invalid={errors.taskDate ? true : false}
                />
                <FormFeedback>{errors.taskDate}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="taskTime">Time</Label>
                <Input
                  type="time"
                  name="taskTime"
                  placeholder="time placeholder"
                  value={currentTask ? currentTask.taskTime : null}
                  onChange={handleEditChange}
                  invalid={errors.taskTime ? true : false}
                />
                <FormFeedback>{errors.taskTime}</FormFeedback>
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="taskDescription">Task Description</Label>
              <Input
                type="textarea"
                name="taskDescription"
                value={currentTask ? currentTask.taskDescription : null}
                onChange={handleEditChange}
                invalid={errors.taskDescription ? true : false}
              />
              <FormFeedback>{errors.taskDescription}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="employeeId">Assigned To</Label>
              <Select
                name="employeeId"
                options={employees}
                onChange={handleEditSelectChange}
                defaultValue={
                  currentTask ? { value: currentTask.employeeId } : null
                }
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
          <Button color="danger" onClick={(e) => handleSubmitEdit(e, currentTask)}>
            Edit
          </Button>
          <Button color="success" onClick={(e) => handleDeleteTask(e, currentTask)}>
            Complete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TaskTab;
