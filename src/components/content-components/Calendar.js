import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
} from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { deleteEvent } from "../../actions/deleteEvent";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "../../styles/task.scss";

const TaskCalendar = () => {
  const flag = useSelector((state) => state.taskToggleReducer.calendarView);
  const [events, setEvents] = useState([]);
  const [curEvent, setCurEvent] = useState({
    title: "",
    extendedProps: {
      location: "",
      description: "",
      invitees: [],
      eventId: "",
    },
  });
  const [tasks, setTasks] = useState([]);
  const fetchTasks = useSelector((state) => state.getTasksReducer.tasks);
  const [otherEvents, setOtherEvents] = useState([]);
  const fetchEvents = useSelector((state) => state.getEventsReducer.events);
  const [workOrders, setWorkOrders] = useState([]);
  const fetchWorkOrders = useSelector(
    (state) => state.getWorkOrdersReducer.workOrders
  );
  const [employees, setEmployees] = useState();
  const fetchUsers = useSelector((state) => state.getUsersReducer.users);
  const [isOpen, setIsOpen] = useState(false);
  const success = useSelector((state) => state.deleteEventReducer.success);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (fetchTasks) {
      fetchTasks.tasks.map((task) => {
        setEvents((events) => [
          ...events,
          {
            title: task.taskDescription,
            date: task.taskDate,
          },
        ]);
      });
    }
  }, [fetchTasks]);

  useEffect(() => {
    let start = "";
    let end = "";

    if (fetchEvents) {
      const array = [];

      fetchEvents.events.map((event) => {
        // if (event.startTime === "") {
        //   let allDay = true;
        // }

        if (event.startDate !== "" && event.startTime !== "") {
          start = `${event.startDate}T${event.startTime}`;
        } else {
          start = event.startDate;
        }

        if (event.endDate === "" && event.endTime === "") {
          end = event.startDate;
        } else if (event.endDate === "" && event.endTime !== "") {
          end = `${event.startDate}T${event.endTime}`;
        } else if (event.endDate !== "" && event.endTime !== "") {
          end = `${event.endDate}T${event.endTime}`;
        } else {
          end = event.endDate;
        }

        if (event.recurring) {
          array.push({
            title: event.title,
            // allDay: allDay,
            startTime: event.startTime,
            endTime: event.endTime,
            startRecur: event.startDate,
            daysOfWeek: event.daysOfWeek,
            color: "red",
            extendedProps: {
              location: event.extendedProps.location,
              invitees: event.extendedProps.invitees,
              description: event.extendedProps.description,
              eventId: event.extendedProps.eventId,
              eventType: "event",
            },
          });
        } else {
          array.push({
            title: event.title,
            // allDay: allDay,
            start: start,
            end: end,
            color: "red",
            extendedProps: {
              location: event.extendedProps.location,
              invitees: event.extendedProps.invitees,
              description: event.extendedProps.description,
              eventId: event.extendedProps.eventId,
              eventType: "event",
            },
          });
        }
      });
      console.log(array);
      setEvents((events) => [...events, ...array]);
    }
  }, [fetchEvents]);

  useEffect(() => {
    if (fetchWorkOrders) {
      fetchWorkOrders.workOrders.map((workOrder) => {
        setEvents((events) => [
          ...events,
          {
            title: workOrder.serviceDescription,
            allDay: workOrder.allDay,
            start: `${workOrder.serviceDate}T${workOrder.serviceStartTime}`,
            end: `${workOrder.serviceDate}T${workOrder.serviceEndTime}`,
            color: "green",
            extendedProps: {
              workOrderId: workOrder.workOrderId,
            },
          },
        ]);
      });
    }
  }, [fetchWorkOrders]);

  useEffect(() => {
    const array = [];

    if (fetchUsers) {
      fetchUsers.users.map((user) => {
        if (user.userType === "employee" && user.active === true) {
          array.push({
            name: `${user.firstName} ${user.lastName}`,
            userId: user.userId,
          });
        }
      });
    }

    setEmployees(array);
  }, [fetchUsers]);

  useEffect(() => {
    if(success) {
      toggle()
    }
  }, [success]);

  const decoder = (invitees) => {
    const array = [];

    if (invitees) {
      if (invitees[0] === "Everyone") {
        return "Everyone";
      } else {
        invitees.forEach((person) => {
          employees.forEach((employee) => {
            if (person === employee.userId) {
              array.push(employee.name);
            }
          });
        });
        return array.join(", ");
      }
    }
  };

  const toggle = (event) => {
    if (isOpen) {
      setCurEvent({
        title: "",
        extendedProps: {
          location: "",
          description: "",
          invitees: [],
          eventId: "",
        },
      });
    } else {
      setCurEvent(event);
    }
    setIsOpen(!isOpen);
  };

  const handleEventClick = (event) => {
    const workOrderId = event.event._def.extendedProps.workOrderId;
    const eventType = event.event._def.extendedProps.eventType;

    if (workOrderId) {
      history.push(`/dashboard/workorders/${workOrderId}`);
    }

    if (eventType) {
      toggle(event.event._def);
    }
  };

  const handleDeleteEvent = (e, eventId) => {
    e.preventDefault();
    dispatch(deleteEvent(eventId));
  };

  return (
    <div className="calendar-page">
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          bootstrapPlugin,
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventClick={handleEventClick}
        themeSystem="bootstrap"
        height="auto"
      />

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{curEvent.title}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Description</Label>
              <Input
                type="textarea"
                disabled
                value={curEvent.extendedProps.description}
              />
            </FormGroup>
            <FormGroup>
              <Label>Location</Label>
              <Input
                type="text"
                disabled
                value={curEvent.extendedProps.location}
              />
            </FormGroup>
            <FormGroup>
              <Label>Attendees</Label>
              <Input
                type="text"
                disabled
                value={decoder(curEvent.extendedProps.invitees)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={(e) =>
              handleDeleteEvent(e, curEvent.extendedProps.eventId)
            }
          >
            Delete Event
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TaskCalendar;
