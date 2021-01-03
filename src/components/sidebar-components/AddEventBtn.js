import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
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
import { addEvent } from "../../actions/addEvent";

import "../../styles/sidebar.scss";

const AddEventBtn = () => {
  const [event, setEvent] = useState({
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    allDay: false,
    recurring: false,
    daysOfWeek: [],
    extendedProps: {
      location: "",
      invitees: [],
      description: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [employees, setEmployees] = useState();
  const fetchUsers = useSelector((state) => state.getUsersReducer.users);
  const success = useSelector((state) => state.addEventReducer.success);
  const [errors, setErrors] = useState({});
  const fetchErrors = useSelector((state) => state.addEventReducer.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    const array = [
      {
        label: "Everyone",
        value: "Everyone",
      },
    ];

    if (fetchUsers.users) {
      fetchUsers.users.forEach((user) => {
        if (user.userType === "employee" && user.active === true) {
          array.push({
            label: `${user.firstName} ${user.lastName}`,
            value: user.userId,
          });
        }
      });
    }

    setEmployees(array);
  }, [fetchUsers]);

  useEffect(() => {
    if (success) {
      toggle();
    }
  }, [success]);

  useEffect(() => {
    if (fetchErrors) {
      setErrors(fetchErrors);
    }
  }, [fetchErrors]);

  const toggle = () => {
    if (isOpen) {
      setErrors({});
      setEvent({
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        allDay: false,
        recurring: false,
        daysOfWeek: [],
        extendedProps: {
          location: "",
          invitees: [],
          description: "",
        },
      });
    }

    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleExtendedChange = (e) => {
    setEvent({
      ...event,
      extendedProps: {
        ...event.extendedProps,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleRecurringChange = (e) => {
    setEvent({
      ...event,
      recurring: !event.recurring,
    });
  };

  const handleDaysChange = (e) => {
    let array = event.daysOfWeek;
    let temp = [];

    const day = parseInt(e.target.value);

    if (array.includes(day)) {
      temp = array.filter((i) => i !== day);
      array = temp;
    } else {
      array.push(day);
    }

    array.sort();
    setEvent({
      ...event,
      daysOfWeek: array,
    });
    console.log(array);
  };

  const handleSelectChange = (e) => {
    const invitees = [];

    e.forEach((e) => {
      invitees.push(e.value);
    });

    setEvent({
      ...event,
      extendedProps: {
        ...event.extendedProps,
        invitees: invitees,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEvent(event));
  };

  return (
    <div className="add-event-div">
      <Button color="danger" onClick={toggle}>
        Add Event
      </Button>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Event</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                onChange={handleChange}
                invalid={errors.title ? true : false}
              />
              <FormFeedback>{errors.title}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                onChange={handleExtendedChange}
                invalid={errors.location ? true : false}
              />
              <FormFeedback>{errors.location}</FormFeedback>
            </FormGroup>
            <div className="start-end-date-div">
              <FormGroup>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  placeholder="date placeholder"
                  name="startDate"
                  onChange={handleChange}
                  invalid={errors.startDate ? true : false}
                />
                <FormFeedback>{errors.startDate}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>End Date</Label>
                <Input
                  type="date"
                  placeholder="date placeholder"
                  name="endDate"
                  onChange={handleChange}
                  invalid={errors.endDate ? true : false}
                />
                <FormFeedback>{errors.endDate}</FormFeedback>
              </FormGroup>
            </div>
            <div className="start-end-time-div">
              <FormGroup>
                <Label>Start Time</Label>
                <Input
                  type="time"
                  placeholder="time placeholder"
                  name="startTime"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>End Time</Label>
                <Input
                  type="time"
                  placeholder="time placeholder"
                  name="endTime"
                  onChange={handleChange}
                  invalid={errors.endTime ? true : false}
                />
                <FormFeedback>{errors.endTime}</FormFeedback>
              </FormGroup>
            </div>
            <FormGroup>
              <Label>Description</Label>
              <Input
                type="textarea"
                name="description"
                onChange={handleExtendedChange}
              />
            </FormGroup>
            <div className="recurring-div">
              <FormGroup inline check>
                <Label inline check>
                  Is this a recurring event?{" "}
                  <Input
                    type="checkbox"
                    name="recurring"
                    onChange={handleRecurringChange}
                  />
                </Label>
              </FormGroup>
              {event.recurring ? (
                <div>
                  <Label>Which days should this event recur?</Label>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="daysOfWeek"
                        value="0"
                        onChange={handleDaysChange}
                      />{" "}
                      Sunday
                    </Label>
                    <br />
                    <Label check>
                      <Input
                        type="checkbox"
                        name="daysOfWeek"
                        value="1"
                        onChange={handleDaysChange}
                      />{" "}
                      Monday
                    </Label>
                    <br />
                    <Label check>
                      <Input
                        type="checkbox"
                        name="daysOfWeek"
                        value="2"
                        onChange={handleDaysChange}
                      />{" "}
                      Tuesday
                    </Label>
                    <br />
                    <Label check>
                      <Input
                        type="checkbox"
                        name="daysOfWeek"
                        value="3"
                        onChange={handleDaysChange}
                      />{" "}
                      Wednesday
                    </Label>
                    <br />
                    <Label check>
                      <Input
                        type="checkbox"
                        name="daysOfWeek"
                        value="4"
                        onChange={handleDaysChange}
                      />{" "}
                      Thursday
                    </Label>
                    <br />
                    <Label check>
                      <Input
                        type="checkbox"
                        name="daysOfWeek"
                        value="5"
                        onChange={handleDaysChange}
                      />{" "}
                      Friday
                    </Label>
                    <br />
                    <Label check>
                      <Input
                        type="checkbox"
                        name="daysOfWeek"
                        value="6"
                        onChange={handleDaysChange}
                      />{" "}
                      Saturday
                    </Label>
                  </FormGroup>
                </div>
              ) : null}
            </div>
            <FormGroup>
              <Label>Invitees</Label>
              <Select
                isMulti
                name="invitees"
                options={employees}
                onChange={handleSelectChange}
                className={errors.invitees ? "invalid" : ""}
              />
              <Input
                type="hidden"
                disabled
                invalid={errors.invitees ? true : false}
              />
              <FormFeedback>{errors.invitees}</FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleSubmit}>Submit</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddEventBtn;
