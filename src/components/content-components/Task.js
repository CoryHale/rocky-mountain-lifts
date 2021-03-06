import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getTasks } from "../../actions/getTasks";
import { getEvents } from "../../actions/getEvents";
import { getWorkOrders } from "../../actions/getWorkOrders";
import { getEmployees } from "../../actions/getEmployees";
import { editTask } from "../../actions/editTask";
import { deleteTask } from "../../actions/deleteTask";

import "../../styles/task.scss";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const fetchTasks = useSelector((state) => state.getTasksReducer.tasks);
  const [workOrders, setWorkOrders] = useState([]);
  const fetchWorkOrders = useSelector(
    (state) => state.getWorkOrdersReducer.workOrders
  );
  const [employees, setEmployees] = useState();
  const fetchEmployees = useSelector(
    (state) => state.getEmployeesReducer.employees
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState();
  const [assigned, setAssigned] = useState([]);
  const editSuccess = useSelector((state) => state.editTaskReducer.success);
  const deleteSuccess = useSelector((state) => state.deleteTaskReducer.success);
  const [errors, setErrors] = useState({
    taskDescription: "",
    taskDate: "",
    taskTime: "",
    assignedTo: [],
  });
  const [curUserInfo, setCurUserInfo] = useState();
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getEvents());
    dispatch(getWorkOrders());
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    const myArray = [];

    if (fetchTasks.tasks) {
      fetchTasks.tasks.forEach((task) => {
        if (task.assignedTo.includes(currentUser.uid)) {
          myArray.push(task);
        }
      });
    }
    setMyTasks(myArray);
    setTasks(fetchTasks.tasks);
  }, [fetchTasks]);

  useEffect(() => {
    const array = [];

    if (fetchWorkOrders.workOrders) {
      fetchWorkOrders.workOrders.forEach((workOrder) => {
        if (
          workOrder.crewMembers.includes(currentUser.uid) &&
          workOrder.status === "Open"
        ) {
          array.push(workOrder);
        } else if (
          workOrder.serviceManager === currentUser.uid &&
          workOrder.status === "In Review"
        ) {
          array.push(workOrder);
        } else if (
          workOrder.officeManager === currentUser.uid &&
          workOrder.status === "In Billing"
        ) {
          array.push(workOrder);
        }
      });
    }

    setWorkOrders(array);
  }, [fetchWorkOrders]);

  useEffect(() => {
    const array = [];

    if (fetchEmployees.employees) {
      fetchEmployees.employees.forEach((employee) => {
        if (employee.active === true) {
          array.push({
            label: `${employee.firstName} ${employee.lastName}`,
            value: employee.userId,
            name: "assignedTo",
            jobTitle: employee.jobTitle,
          });
        }
        if (employee.userId === currentUser.uid) {
          setCurUserInfo(employee);
        }
      });

      setEmployees(array);
    }
  }, [fetchEmployees]);

  useEffect(() => {
    if (deleteSuccess || editSuccess) {
      setIsOpen(false);
    }
  }, [deleteSuccess, editSuccess]);

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

  const crewConverter = (array) => {
    const crewArray = [];

    for (let i = 0; i < employees.length; i++) {
      if (array.includes(employees[i].value)) {
        crewArray.push(employees[i]);
      }
    }
    console.log(crewArray)
    setAssigned(crewArray);
  };

  const toggle = (e, task) => {
    if (task) {
      crewConverter(task.assignedTo);
      setCurrentTask(task);
    }
    setIsOpen(!isOpen);
  };

  const goToWorkOrder = (e, workOrderId) => {
    history.push(`/dashboard/workorders/${workOrderId}`);
  };

  const handleChange = (e) => {
    setCurrentTask({
      ...currentTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleMultiSelectChange = (e) => {
    const members = [];

    e.map((e) => {
      members.push(e.value);
    });

    setCurrentTask({
      ...currentTask,
      assignedTo: members,
    });
  };

  const handleEditTask = (e, currentTask) => {
    e.preventDefault();
    dispatch(editTask(currentTask));
  };

  const handleDeleteTask = (e, currentTask) => {
    e.preventDefault();
    dispatch(deleteTask(currentTask.taskId));
  };

  return (
    <div className="tasks-page">
      <h1>My Tasks</h1>
      {myTasks
        ? myTasks.map((task) => (
            <Card
              onClick={(e) => toggle(e, task)}
              className="tasks-page-task-card"
            >
              <Table borderless>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{task.taskDescription}</td>
                    <td>{dateConverter(task.taskDate)}</td>
                    <td>{timeConverter(task.taskTime)}</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          ))
        : null}
      {curUserInfo && curUserInfo.tierLevel > 1 ? <h1>All Tasks</h1> : null}
      {curUserInfo && curUserInfo.tierLevel > 1
        ? tasks
          ? tasks.map((task) => (
              <Card
                onClick={(e) => toggle(e, task)}
                className="tasks-page-task-card"
              >
                <Table borderless>
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Date</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
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
      <h1>My Work Orders</h1>
      {workOrders
        ? workOrders.map((workOrder) => (
            <Card
              onClick={(e) => goToWorkOrder(e, workOrder.workOrderId)}
              className="tasks-page-task-card"
            >
              <Table borderless>
                <thead>
                  <tr>
                    <th>Work Order #</th>
                    <th>Customer</th>
                    <th>Service Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{workOrder.workOrderId}</td>
                    <td>{workOrder.customerName}</td>
                    <td>{dateConverter(workOrder.serviceDate)}</td>
                    <td>{workOrder.status}</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          ))
        : null}
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Task</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleEditTask}>
            <FormGroup>
              <Label>Task</Label>
              <Input
                type="textarea"
                name="taskDescription"
                value={currentTask ? currentTask.taskDescription : null}
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
                  value={currentTask ? currentTask.taskDate : null}
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
                  value={currentTask ? currentTask.taskTime : null}
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
                isMulti
                defaultValue={[...assigned]}
                onChange={handleMultiSelectChange}
                className={errors.assignedTo ? "invalid" : ""}
              />
              <Input
                type="hidden"
                disabled
                invalid={errors.assignedTo ? true : false}
              />
              <FormFeedback>{errors.assignedTo}</FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={(e) => handleEditTask(e, currentTask)}
          >
            Edit
          </Button>
          <Button
            color="success"
            onClick={(e) => handleDeleteTask(e, currentTask)}
          >
            Complete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Task;
