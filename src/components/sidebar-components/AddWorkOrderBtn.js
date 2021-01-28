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
import Select from "react-select";
import { addWorkOrder } from "../../actions/addWorkOrder";

import "../../styles/sidebar.scss";

const AddWorkOrderBtn = () => {
  const [workOrder, setWorkOrder] = useState({
    customer: "",
    contactName: "",
    contactNumber: "",
    serviceDate: "",
    serviceStartTime: "",
    serviceEndTime: "",
    serviceDescription: "",
    serviceType: [],
    dispatcher: "",
    serviceManager: "",
    officeManager: "",
    crewMembers: [],
    jobNumber: "",
    notes: "",
    officeNotes: "",
    quote: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const getErrors = useSelector((state) => state.addWorkOrderReducer.errors);
  const getSuccess = useSelector((state) => state.addWorkOrderReducer.success);
  const [employees, setEmployees] = useState([]);
  const [serviceManagers, setServiceManagers] = useState([]);
  const [officeManagers, setOfficeManagers] = useState([]);
  const employeesArray = [];
  const serviceManagersArray = [];
  const officeManagersArray = [];
  const [customers, setCustomers] = useState([]);
  const customersArray = [];
  const getUsers = useSelector((state) => state.getUsersReducer.users);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCheck, setIsOpenCheck] = useState(false);
  const [warnings, setWarnings] = useState({});
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
      setWorkOrder({
        ...workOrder,
        customer: "",
        contactName: "",
        contactNumber: "",
        serviceDate: "",
        serviceStartTime: "",
        serviceEndTime: "",
        serviceDescription: "",
        serviceType: [],
        dispatch: "",
        crewMembers: [],
        jobNumber: "",
        notes: "",
        officeNotes: "",
        quote: "",
      });
    }
  }, [success, workOrder]);

  useEffect(() => {
    if (getUsers.users) {
      getUsers.users.forEach((user) => {
        if (user.userType === "employee" && user.active) {
          employeesArray.push({
            label: `${user.firstName} ${user.lastName}`,
            value: user.userId,
            name: "crewMembers",
            jobTitle: user.jobTitle,
          });
        } else {
          customersArray.push({
            label: user.businessName,
            value: user.userId,
            name: "customer",
            contactName: `${user.primaryContact && user.primaryContact.firstName} ${user.primaryContact && user.primaryContact.lastName}`,
            contactNumber: user.primaryOfficeNumber
          });
        }
      });
    }

    employeesArray.push({
      label: "General Contractor",
      value: "General Contractor",
    });

    setEmployees(employeesArray);
    setCustomers(customersArray);

    let serviceManagerId = "";
    let officeManagerId = "";

    employeesArray.forEach((employee) => {
      if (employee.jobTitle === "Service Manager") {
        employee.name = "serviceManager";
        serviceManagersArray.push(employee);
        if (employee.value === "uXwUIQNHljckMtq4AR57zMBExhd2") {
          serviceManagerId = employee.value;
        }
      } else if (employee.jobTitle === "Office Manager") {
        employee.name = "officeManager";
        officeManagersArray.push(employee);
        if (employee.value === "P8NOWpsqBTV8OrO5ICZSYAdPrx22") {
          officeManagerId = employee.value;
        }
      }
    });

    setServiceManagers(serviceManagersArray);
    setOfficeManagers(officeManagersArray);

    setWorkOrder({
      ...workOrder,
      serviceManager: serviceManagerId,
      officeManager: officeManagerId,
    });
  }, [getUsers]);

  const toggle = (e) => {
    setIsOpen(!isOpen);
    setErrors({});
    setWarnings({});

    if (!isOpen) {
      setWorkOrder({
        ...workOrder,
        customer: "",
        contactName: "",
        contactNumber: "",
        serviceDate: "",
        serviceStartTime: "",
        serviceEndTime: "",
        serviceDescription: "",
        serviceType: [],
        dispatcher: "",
        crewMembers: [],
        jobNumber: "",
        notes: "",
        officeNotes: "",
        quote: "",
      });
    }
  };

  const toggleCheck = (e) => {
    if (isOpenCheck) {
      setWarnings({});
    }
    setIsOpenCheck(!isOpenCheck);
  };

  const handleChange = (e) => {
    setWorkOrder({
      ...workOrder,
      [e.target.name]: e.target.value,
    });
  };

  const handleCustomerChange = (e) => {
    setWorkOrder({
      ...workOrder,
      [e.name]: e.value,
      contactName: e.contactName,
      contactNumber: e.contactNumber
    });
  };

  const handleSelectChange = (e) => {
    setWorkOrder({
      ...workOrder,
      [e.name]: e.value,
    });
  };

  const handleServiceTypeChange = (e) => {
    const services = [];

    e.forEach((e) => {
      services.push(e.value);
    });

    setWorkOrder({
      ...workOrder,
      serviceType: services,
    });
  };

  const handleCrewMembersChange = (e) => {
    const members = [];

    e.forEach((e) => {
      members.push(e.value);
    });

    setWorkOrder({
      ...workOrder,
      crewMembers: members,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const valid = warningCheck();

    if (valid) {
      dispatch(addWorkOrder(workOrder));
    } else {
      toggleCheck();
    }
  };

  const warningCheck = (e) => {
    let warningsObject = {};

    if (workOrder.jobNumber.trim() === "") {
      warningsObject.jobNumber = "Job Number";
    }
    if (workOrder.notes.trim() === "") {
      warningsObject.notes = "Notes";
    }
    if (workOrder.officeNotes.trim() === "") {
      warningsObject.officeNotes = "Office Notes";
    }
    if (workOrder.quote.trim() === "") {
      warningsObject.quote = "Quote";
    }

    if (Object.keys(warningsObject).length === 0) {
      return true;
    } else {
      setWarnings(warningsObject);
      return false;
    }
  };

  const handleSubmitCheck = (e) => {
    e.preventDefault();
    setWarnings({});
    dispatch(addWorkOrder(workOrder));
    toggleCheck();
  };

  return (
    <div className="add-work-order-div">
      <Button color="success" onClick={toggle}>
        Create Work Order
      </Button>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Work Order</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="customer">Customer</Label>
              <Select
                options={customers}
                name="customer"
                onChange={handleCustomerChange}
                className={errors.customer ? "invalid" : ""}
              />
              <Input
                type="hidden"
                disabled
                invalid={errors.customer ? true : false}
              />
              <FormFeedback>{errors.customer}</FormFeedback>
            </FormGroup>
            <div className="contact-div">
              <FormGroup>
                <Label for="contact-name">Contact Name</Label>
                <Input
                  type="text"
                  name="contactName"
                  id="contactName"
                  value={workOrder.contactName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="contact-number">Contact Number</Label>
                <Input
                  type="text"
                  name="contactNumber"
                  id="contactNumber"
                  placeholder="XXX-XXX-XXXX"
                  value={workOrder.contactNumber}
                  onChange={handleChange}
                  invalid={errors.contactNumber ? true : false}
                />
                <FormFeedback>{errors.contactNumber}</FormFeedback>
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="serviceDate"
                id="serviceDate"
                placeholder="date placeholder"
                onChange={handleChange}
                invalid={errors.serviceDate ? true : false}
              />
              <FormFeedback>{errors.serviceDate}</FormFeedback>
            </FormGroup>
            <div className="time-div">
              <FormGroup>
                <Label for="startTime">Start Time</Label>
                <Input
                  type="time"
                  name="serviceStartTime"
                  id="serviceStartTime"
                  placeholder="time placeholder"
                  onChange={handleChange}
                  invalid={errors.serviceStartTime ? true : false}
                />
                <FormFeedback>{errors.serviceStartTime}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="endTime">End Time</Label>
                <Input
                  type="time"
                  name="serviceEndTime"
                  id="serviceEndTime"
                  placeholder="time placeholder"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="serviceDescription">Service Description</Label>
              <Input
                type="textarea"
                name="serviceDescription"
                id="serviceDescription"
                onChange={handleChange}
                invalid={errors.serviceDescription ? true : false}
              />
              <FormFeedback>{errors.serviceDescription}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="serviceType">Service Type</Label>
              <Select
                isMulti
                options={serviceTypes.map((type) => ({
                  label: type,
                  value: type,
                  name: "serviceType",
                }))}
                name="serviceType"
                onChange={handleServiceTypeChange}
                className={errors.serviceType ? "invalid" : ""}
              />
              <Input
                type="hidden"
                disabled
                invalid={errors.serviceType ? true : false}
              />
              <FormFeedback>{errors.serviceType}</FormFeedback>
            </FormGroup>
            <div className="manager-div">
              <FormGroup>
                <Label for="serviceManager">Service Manager</Label>
                <Select
                  options={serviceManagers}
                  defaultValue={serviceManagers[0]}
                  name="serviceManager"
                  onChange={handleSelectChange}
                  className={errors.serviceManager ? "invalid" : ""}
                />
                <Input
                  type="hidden"
                  disabled
                  invalid={errors.serviceManager ? true : false}
                />
                <FormFeedback>{errors.serviceManager}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="officeManager">Billing Manager</Label>
                <Select
                  options={officeManagers}
                  defaultValue={officeManagers[0]}
                  name="officeManager"
                  onChange={handleSelectChange}
                  className={errors.officeManager ? "invalid" : ""}
                />
                <Input
                  type="hidden"
                  disabled
                  invalid={errors.officeManager ? true : false}
                />
                <FormFeedback>{errors.officeManager}</FormFeedback>
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="crewMembers">Crew Members</Label>
              <Select
                isMulti
                options={employees}
                name="crewMembers"
                onChange={handleCrewMembersChange}
                className={errors.crewMembers ? "invalid" : ""}
              />
              <Input
                type="hidden"
                disabled
                invalid={errors.crewMembers ? true : false}
              />
              <FormFeedback>{errors.crewMembers}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="prevJobNumber">Job Number</Label>
              <Input
                type="text"
                name="jobNumber"
                id="jobNumber"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="notes">Notes</Label>
              <Input
                type="textarea"
                name="notes"
                id="notes"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="officeNotes">Office Notes</Label>
              <Input
                type="textarea"
                name="officeNotes"
                id="officeNotes"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="quote">Quote</Label>
              <Input
                type="file"
                name="file"
                id="file"
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isOpenCheck} toggle={toggleCheck}>
        <ModalHeader toggle={toggleCheck}>Warning</ModalHeader>
        <ModalBody>
          <span>The following fields were left blank:</span>
          <ul>
            {warnings
              ? Object.values(warnings).map((warning) => <li>{warning}</li>)
              : null}
          </ul>
          <span>Are you sure you want to continue?</span>
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit" onClick={handleSubmitCheck}>
            YES
          </Button>
          <Button color="danger" onClick={toggleCheck}>
            NO
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddWorkOrderBtn;

const serviceTypes = [
  "Install",
  "Service",
  "Training",
  "Inspection",
  "Warranty",
];
