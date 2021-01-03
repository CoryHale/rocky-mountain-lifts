import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Table,
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
import { getCustomer } from "../../actions/getCustomer";
import { addEmployeeToCustomer } from "../../actions/addEmployeeToCustomer";

import "../../styles/customer.scss";

const EmployeeTab = () => {
  const [customer, setCustomer] = useState({});
  const getCustomerFromState = useSelector(
    (state) => state.getCustomerReducer.customer
  );
  const [isOpen, setIsOpen] = useState(false);
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    officeNumber: "",
    officeExt: "",
    cellNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const customerId = pathArray[pathArray.length - 1];
    dispatch(getCustomer(customerId));
  }, []);

  useEffect(() => {
    if (getCustomerFromState) {
      setCustomer(getCustomerFromState);
    }
  }, [getCustomerFromState]);

  useEffect(() => {
    if (flag) {
      setFlag(false);
      dispatch(addEmployeeToCustomer(customer));
      toggle();
    }
  }, [flag]);

  const toggle = () => {
    if (isOpen) {
      setEmployee({
        firstName: "",
        lastName: "",
        jobTitle: "",
        officeNumber: "",
        officeExt: "",
        cellNumber: "",
        email: "",
      });
      setErrors({});
    }
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorsObject = {};

    if (employee.firstName === "") {
      errorsObject.firstName = "Must not be empty";
    }
    if (employee.lastName === "") {
      errorsObject.lastName = "Must not be empty";
    }
    if (employee.jobTitle === "") {
      errorsObject.jobTitle = "Must not be empty";
    }
    if (employee.officeNumber === "" && employee.cellNumber === "") {
      errorsObject.officeNumber = "Must not be empty";
      errorsObject.cellNumber = "Must not be empty";
    } else if (
      employee.officeNumber !== "" &&
      !employee.officeNumber.match(/^[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{4}$/)
    ) {
      errorsObject.officeNumber = "Must be a valid phone number";
    } else if (
      employee.cellNumber !== "" &&
      !employee.cellNumber.match(/^[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{4}$/)
    ) {
      errorsObject.cellNumber = "Must be a valid phone number";
    }
    if (employee.email === "") {
      errorsObject.email = "Must not be empty";
    } else if (
      !employee.email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errorsObject.email = "Must be a valid email address";
    }

    setErrors(errorsObject);

    if (Object.keys(errorsObject).length === 0) {
      if (customer.employees.length === 0) {
        setFlag(true);
        setCustomer({
          ...customer,
          employees: [employee],
        });
      } else {
        setFlag(true);
        setCustomer({
          ...customer,
          employees: [...customer.employees, employee],
        });
      }
    }
  };

  return (
    <div className="employees-tab">
      <Table size="sm" hover className="customer-page-employees-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Title</th>
            <th>Office Number</th>
            <th>Cell Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {customer.primaryContact
                ? customer.primaryContact.firstName
                : null}{" "}
              {customer.primaryContact
                ? customer.primaryContact.lastName
                : null}
            </td>
            <td>{customer.primaryJobTitle}</td>
            <td>
              <a
                href={
                  customer.primaryExt
                    ? `tel:+1-${customer.primaryOfficeNumber},${customer.primaryExt}`
                    : `tel:+1-${customer.primaryOfficeNumber}`
                }
              >
                {customer.primaryExt
                  ? `${customer.primaryOfficeNumber} ext. ${customer.primaryExt}`
                  : `${customer.primaryOfficeNumber}`}
              </a>
            </td>
            <td>
              <a href={`tel:+1-${customer.primaryCellNumber}`}>
                {customer.primaryCellNumber}
              </a>
            </td>
            <td>
              <a href={`mailto:${customer.primaryEmail}`}>
                {customer.primaryEmail}
              </a>
            </td>
          </tr>
          {customer.billingJobTitle !== "" ? (
            <tr>
              <td>
                {customer.billingContact
                  ? customer.billingContact.firstName
                  : null}{" "}
                {customer.billingContact
                  ? customer.billingContact.lastName
                  : null}
              </td>
              <td>{customer.billingJobTitle}</td>
              <td>
                <a
                  href={
                    customer.billingExt
                      ? `tel:+1-${customer.billingOfficeNumber},${customer.billingExt}`
                      : `tel:+1-${customer.billingOfficeNumber}`
                  }
                >
                  {customer.billingExt
                    ? `${customer.billingOfficeNumber} ext. ${customer.billingExt}`
                    : `${customer.billingOfficeNumber}`}
                </a>
              </td>
              <td>
                <a href={`tel:+1-${customer.billingCellNumber}`}>
                  {customer.billingCellNumber}
                </a>
              </td>
              <td>
                <a href={`mailto:${customer.billingEmail}`}>
                  {customer.billingEmail}
                </a>
              </td>
            </tr>
          ) : null}
          {customer.employees
            ? customer.employees.map((employee) => (
                <tr>
                  <td>
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td>{employee.jobTitle}</td>
                  <td>
                    <a
                      href={
                        employee.officeExt
                          ? `tel:+1-${employee.officeNumber},${employee.officeExt}`
                          : `tel:+1-${employee.officeNumber}`
                      }
                    >
                      {employee.officeExt
                        ? `${employee.officeNumber} ext. ${employee.officeExt}`
                        : `${employee.officeNumber}`}
                    </a>
                  </td>
                  <td>
                    <a href={`tel:+1-${employee.cellNumber}`}>
                      {employee.cellNumber}
                    </a>
                  </td>
                  <td>
                    <a href={`mailto:${employee.email}`}>{employee.email}</a>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
      <div className="add-employee-div">
        <Button outline color="success" onClick={toggle}>
          Add Employee
        </Button>
      </div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Employee</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <div className="add-employee-name-div">
              <FormGroup>
                <Label for="employeeFirstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  invalid={errors.firstName ? true : false}
                />
                <FormFeedback>{errors.firstName}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="employeeLastName">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  invalid={errors.lastName ? true : false}
                />
                <FormFeedback>{errors.lastName}</FormFeedback>
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="employeeJobTitle">Job Title</Label>
              <Input
                type="text"
                name="jobTitle"
                onChange={handleChange}
                invalid={errors.jobTitle ? true : false}
              />
              <FormFeedback>{errors.jobTitle}</FormFeedback>
            </FormGroup>
            <div className="employee-phone-div">
              <FormGroup className="employee-office-number">
                <Label for="employeeOfficeNumber">Office Phone Number</Label>
                <Input
                  type="text"
                  name="officeNumber"
                  placeholder="XXX-XXX-XXXX"
                  onChange={handleChange}
                  invalid={errors.officeNumber ? true : false}
                />
                <FormFeedback>{errors.officeNumber}</FormFeedback>
              </FormGroup>
              <FormGroup className="employee-office-ext">
                <Label for="employeeOfficeExt">ext.</Label>
                <Input type="text" name="officeExt" onChange={handleChange} />
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="employeeCellNumber">Cell Phone Number</Label>
              <Input
                type="text"
                name="cellNumber"
                placeholder="XXX-XXX-XXXX"
                onChange={handleChange}
                invalid={errors.cellNumber ? true : false}
              />
              <FormFeedback>{errors.cellNumber}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="employeeEmail">Email</Label>
              <Input
                type="text"
                name="email"
                placeholder="example@example.com"
                onChange={handleChange}
                invalid={errors.email ? true : false}
              />
              <FormFeedback>{errors.email}</FormFeedback>
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

export default EmployeeTab;
