import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
} from "reactstrap";
import { registerEmployee } from "../../actions/registerEmployee";

import "../../styles/sidebar.scss";

const AddEmployeeBtn = () => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    tierLevel: null,
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const getErrors = useSelector(
    (state) => state.registerEmployeeReducer.errors
  );
  const getSuccess = useSelector(
    (state) => state.registerEmployeeReducer.success
  );
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setErrors(getErrors);
  }, [getErrors]);

  useEffect(() => {
    if (getSuccess === true) {
      setSuccess(true);
    }
  }, [getSuccess]);

  useEffect(() => {
    if (success === true) {
      setIsOpen(false);
      setErrors({});
      setSuccess(false);
      setCredentials({
        firstName: "",
        lastName: "",
        jobTitle: "",
        tierLevel: null,
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [success]);

  const toggle = () => {
    setIsOpen(!isOpen);
    setErrors({});
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerEmployee(credentials));
  };

  return (
    <div className="add-employee-div">
      <Button color="success" onClick={toggle}>
        Add Employee
      </Button>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Employee</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <div className="name-div">
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={handleChange}
                  invalid={errors.firstName ? true : false}
                />
                <FormFeedback>{errors.firstName}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={handleChange}
                  invalid={errors.lastName ? true : false}
                />
                <FormFeedback>{errors.lastName}</FormFeedback>
              </FormGroup>
            </div>
            <div className="job-info-div">
              <FormGroup className="job-title-form-group">
                <Label for="jobTitle">Job Title</Label>
                <Input
                  type="select"
                  name="jobTitle"
                  id="jobTitle"
                  onChange={handleChange}
                  invalid={errors.jobTitle ? true : false}
                >
                  <option>Select</option>
                  <option>Service Technician</option>
                  <option>Outside Sales</option>
                  <option>Service Manager</option>
                  <option>Dispatch</option>
                  <option>Office Manager</option>
                  <option>Owner</option>
                </Input>
                <FormFeedback>{errors.jobTitle}</FormFeedback>
              </FormGroup>
              <FormGroup className="tier-level-form-group">
                <Label for="tierLevel">Tier Level</Label>
                <Input
                  type="select"
                  name="tierLevel"
                  id="tierLevel"
                  onChange={handleChange}
                  invalid={errors.tierLevel ? true : false}
                >
                  <option>Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </Input>
                <FormFeedback>{errors.tierLevel}</FormFeedback>
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="phoneNumber">Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="XXX-XXX-XXXX"
                onChange={handleChange}
                invalid={errors.phoneNumber ? true : false}
              />
              <FormFeedback>{errors.phoneNumber}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                onChange={handleChange}
                invalid={errors.email ? true : false}
              />
              <FormFeedback>{errors.email}</FormFeedback>
            </FormGroup>
            <div className="password-div">
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  invalid={errors.password ? true : false}
                />
                <FormFeedback>{errors.password}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={handleChange}
                  invalid={errors.confirmPassword ? true : false}
                />
                <FormFeedback>{errors.confirmPassword}</FormFeedback>
              </FormGroup>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddEmployeeBtn;
