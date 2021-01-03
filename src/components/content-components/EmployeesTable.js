import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
} from "reactstrap";
import { editEmployee } from "../../actions/editEmployee";
import { changeEmployeeStatus } from "../../actions/changeEmployeeStatus";

import "../../styles/employee.scss";

const EmployeesTable = (props) => {
  const [curEmployee, setCurEmployee] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    tierLevel: undefined,
    phoneNumber: "",
    email: "",
    userId: "",
    active: undefined,
  });
  const [errorsOne, setErrorsOne] = useState({});
  const [successOne, setSuccessOne] = useState(false);
  const getErrorsOne = useSelector((state) => state.editEmployeeReducer.errors);
  const getSuccessOne = useSelector(
    (state) => state.editEmployeeReducer.success
  );
  const [isOpenModalOne, setIsOpenModalOne] = useState(false);
  const [successTwo, setSuccessTwo] = useState(false);
  const getSuccessTwo = useSelector(
    (state) => state.changeEmployeeStatusReducer.success
  );
  const [isOpenModalTwo, setIsOpenModalTwo] = useState(false);
  const dispatch = useDispatch();

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setErrorsOne(getErrorsOne);
  }, [getErrorsOne]);

  useEffect(() => {
    if (getSuccessOne === true) {
      setSuccessOne(true);
    }
    if (getSuccessTwo === true) {
      setSuccessTwo(true);
    }
  }, [getSuccessOne, getSuccessTwo]);

  useEffect(() => {
    if (successOne === true) {
      setIsOpenModalOne(false);
      setErrorsOne({});
      setSuccessOne(false);
      setCurEmployee({
        firstName: "",
        lastName: "",
        jobTitle: "",
        tierLevel: undefined,
        phoneNumber: "",
        email: "",
        userId: "",
        active: undefined,
      });
    }
    if (successTwo === true) {
      setIsOpenModalTwo(false);
      setSuccessTwo(false);
      setCurEmployee({
        firstName: "",
        lastName: "",
        jobTitle: "",
        tierLevel: undefined,
        phoneNumber: "",
        email: "",
        userId: "",
        active: undefined,
      });
    }
  }, [successOne, successTwo]);

  const toggleOne = (e, employee) => {
    if (!isOpenModalOne) {
      setCurEmployee({
        firstName: employee.firstName,
        lastName: employee.lastName,
        jobTitle: employee.jobTitle,
        tierLevel: employee.tierLevel,
        phoneNumber: employee.phoneNumber,
        email: employee.email,
        userId: employee.userId,
        active: employee.active,
      });
    } else if (isOpenModalOne) {
      setCurEmployee({
        firstName: "",
        lastName: "",
        jobTitle: "",
        tierLevel: null,
        phoneNumber: "",
        email: "",
        userId: "",
        active: undefined,
      });
    }
    setIsOpenModalOne(!isOpenModalOne);
    setErrorsOne({});
  };

  const toggleTwo = (e, employee) => {
    if (!isOpenModalTwo) {
      setCurEmployee({
        firstName: employee.firstName,
        lastName: employee.lastName,
        jobTitle: employee.jobTitle,
        tierLevel: employee.tierLevel,
        phoneNumber: employee.phoneNumber,
        email: employee.email,
        userId: employee.userId,
        active: employee.active,
      });
    } else if (isOpenModalTwo) {
      setCurEmployee({
        firstName: "",
        lastName: "",
        jobTitle: "",
        tierLevel: null,
        phoneNumber: "",
        email: "",
        userId: "",
        active: undefined,
      });
    }
    setIsOpenModalTwo(!isOpenModalTwo);
  };

  const handleChange = (e) => {
    setCurEmployee({
      ...curEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOne = (e) => {
    e.preventDefault();
    dispatch(editEmployee(curEmployee));
  };

  const handleSubmitTwo = (e) => {
    e.preventDefault();
    dispatch(changeEmployeeStatus(curEmployee));
  };

  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Title</th>
            <th>Tier Level</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th></th> {/*This empty header is for the edit button*/}
            <th></th> {/*This empty header is for the change status button*/}
          </tr>
        </thead>
        <tbody>
          {props
            ? props.props.map((employee) => (
                <tr>
                  <th
                    scope="row"
                    className={employee.active ? "" : "text-muted"}
                  >
                    {employee.firstName} {employee.lastName}
                  </th>
                  <td className={employee.active ? "" : "text-muted"}>
                    {employee.jobTitle}
                  </td>
                  <td
                    className={`tier-level-col ${
                      employee.active ? "" : "text-muted"
                    }`}
                  >
                    {employee.tierLevel}
                  </td>
                  <td>
                    <a
                      className={employee.active ? "" : "text-muted"}
                      href={`tel:+1-${employee.phoneNumber}`}
                    >
                      {employee.phoneNumber}
                    </a>
                  </td>
                  <td className={employee.active ? "" : "text-muted"}>
                    {employee.email}
                  </td>
                  <td
                    className={employee.active ? "" : "text-muted"}
                    onClick={(e) => toggleOne(e, employee)}
                  >
                    <i className="fad fa-pen" />
                  </td>
                  <td
                    className={employee.active ? "" : "text-muted"}
                    onClick={(e) => toggleTwo(e, employee)}
                  >
                    <i className="fad fa-trash" />
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
      <Modal isOpen={isOpenModalOne} toggle={toggleOne}>
        <ModalHeader toggle={toggleOne}>Edit Employee</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmitOne}>
            <div className="name-div">
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={handleChange}
                  value={curEmployee.firstName}
                  invalid={errorsOne.firstName ? true : false}
                />
                <FormFeedback>{errorsOne.firstName}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={handleChange}
                  value={curEmployee.lastName}
                  invalid={errorsOne.lastName ? true : false}
                />
                <FormFeedback>{errorsOne.lastName}</FormFeedback>
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
                  value={curEmployee.jobTitle}
                  invalid={errorsOne.jobTitle ? true : false}
                >
                  <option>Select</option>
                  <option>Service Technician</option>
                  <option>Outside Sales</option>
                  <option>Service Manager</option>
                  <option>Dispatch</option>
                  <option>Office Manager</option>
                  <option>Owner</option>
                </Input>
                <FormFeedback>{errorsOne.jobTitle}</FormFeedback>
              </FormGroup>
              <FormGroup className="tier-level-form-group">
                <Label for="tierLevel">Tier Level</Label>
                <Input
                  type="select"
                  name="tierLevel"
                  id="tierLevel"
                  onChange={handleChange}
                  value={curEmployee.tierLevel}
                  invalid={errorsOne.tierLevel}
                >
                  <option>Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </Input>
                <FormFeedback>{errorsOne.tierLevel}</FormFeedback>
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
                value={curEmployee.phoneNumber}
                invalid={errorsOne.phoneNumber}
              />
              <FormFeedback>{errorsOne.phoneNumber}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                disabled
                value={curEmployee.email}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit" onClick={handleSubmitOne}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isOpenModalTwo} toggle={toggleTwo}>
        <ModalHeader toggle={toggleTwo}>
          {curEmployee.active
            ? "Set Employee as Inactive"
            : "Set Employee as Active"}
        </ModalHeader>
        <ModalBody>
          {curEmployee.active
            ? `Would you like to set ${curEmployee.firstName}'s status as inactive?`
            : `Would you like to set ${curEmployee.firstName}'s status as active?`}
        </ModalBody>
        <ModalFooter className="modal-two-footer">
          <Button
            color="success"
            type="submit"
            className="modal-two-btn"
            onClick={handleSubmitTwo}
          >
            YES
          </Button>
          <Button color="danger" className="modal-two-btn" onClick={toggleTwo}>
            NO
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EmployeesTable;
