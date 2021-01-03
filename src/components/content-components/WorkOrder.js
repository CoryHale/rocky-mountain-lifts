import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import SignatureCanvas from "react-signature-canvas";
import { useAuth } from "../../contexts/AuthContext";
import { getWorkOrder } from "../../actions/getWorkOrder";
import { getUsers } from "../../actions/getUsers";
import { editWorkOrder } from "../../actions/editWorkOrder";
import app from "../../firebase";

import "../../styles/workorder.scss";

const WorkOrder = () => {
  const [workOrder, setWorkOrder] = useState({});
  const [customer, setCustomer] = useState({});
  const [mapsAddress, setMapsAddress] = useState("");
  const [employees, setEmployees] = useState([]);
  const getWorkOrderFromState = useSelector(
    (state) => state.getWorkOrderReducer.workOrder
  );
  const fetchUsers = useSelector((state) => state.getWorkOrderReducer.users);
  const [allEmployees, setAllEmployees] = useState();
  const fetchAllUsers = useSelector((state) => state.getUsersReducer.users);
  const [isOpenServiceModal, setIsOpenServiceModal] = useState(false);
  const [service, setService] = useState({
    make: "",
    type: "",
    model: "",
    serialNumber: "",
    bayNumber: "",
    serviceDone: "",
    billableHours: null,
    partsUsed: [],
    partsNeeded: [],
    images: [],
  });
  const [serviceErrors, setServiceErrors] = useState({});
  const [partUsed, setPartUsed] = useState({
    quantity: "",
    partDescription: "",
    partNumber: "",
    images: [],
  });
  const [partUsedErrors, setPartUsedErrors] = useState({});
  const [partNeeded, setPartNeeded] = useState({
    quantity: "",
    partDescription: "",
    partNumber: "",
    images: [],
  });
  const [partNeededErrors, setPartNeededErrors] = useState({});
  const [isOpenPartUsed, setIsOpenPartUsed] = useState(false);
  const [isOpenPartNeeded, setIsOpenPartNeeded] = useState(false);
  const [hideOfficeNotes, setHideOfficeNotes] = useState(false);
  const [hideSignaturePad, setHideSignaturePad] = useState(true);
  const [hideEditButton, setHideEditButton] = useState(false);
  const [
    hideSubmitForSignatureButton,
    setHideSubmitForSignatureButton,
  ] = useState(false);
  const [hideSubmitForReviewButton, setHideSubmitForReviewButton] = useState(
    true
  );
  const [hideSubmitForBillingButton, setHideSubmitForBillingButton] = useState(
    true
  );
  let sigPad = {};
  const [reviewFlag, setReviewFlag] = useState(false); // Flags when submitted for review
  const [flag, setFlag] = useState(false); // Flags when submitted for billing or closed
  const { currentUser } = useAuth();
  const [editPunchOpen, setEditPunchOpen] = useState(false);
  const [currentPunch, setCurrentPunch] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [editServiceOpen, setEditServiceOpen] = useState(false);
  const [currentService, setCurrentService] = useState();
  const [editPartUsed, setEditPartUsed] = useState(false);
  const [currentPartUsed, setCurrentPartUsed] = useState();
  const [editPartNeeded, setEditPartNeeded] = useState(false);
  const [currentPartNeeded, setCurrentPartNeeded] = useState();
  const [inspectionForm, setInspectionForm] = useState();
  const [rmlTrainingForm, setRmlTrainingForm] = useState();
  const [skTrainingForm, setSkTrainingForm] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const jobId = pathArray[pathArray.length - 1];
    dispatch(getWorkOrder(jobId));
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    const storage = app.storage();
    const storageRef = storage.ref();
    storageRef
      .child("inspectionForms/inspection-fake.pdf")
      .getDownloadURL()
      .then((url) => {
        setInspectionForm(url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const storage = app.storage();
    const storageRef = storage.ref();
    storageRef
      .child("trainingForms/rml-training-fake.pdf")
      .getDownloadURL()
      .then((url) => {
        setRmlTrainingForm(url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const storage = app.storage();
    const storageRef = storage.ref();
    storageRef
      .child("trainingForms/sk-training-fake.pdf")
      .getDownloadURL()
      .then((url) => {
        setSkTrainingForm(url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (getWorkOrderFromState) {
      setWorkOrder(getWorkOrderFromState);
    }
  }, [getWorkOrderFromState]);

  useEffect(() => {
    let crewMembers = [];

    if (fetchUsers) {
      fetchUsers.forEach((user) => {
        if (user.userType === "customer") {
          setCustomer(user);
        } else {
          crewMembers.push(user);
        }
      });
      setEmployees(crewMembers);
    }
  }, [fetchUsers]);

  useEffect(() => {
    const array = [];

    if (fetchAllUsers.users) {
      fetchAllUsers.users.forEach((user) => {
        if (user.userType === "employee") {
          array.push(user);
        }
      });
    }
    setAllEmployees(array);
  }, [fetchAllUsers]);

  useEffect(() => {
    if (customer) {
      addressConverter(customer);
    }
  }, [customer]);

  useEffect(() => {
    if (reviewFlag) {
      dispatch(editWorkOrder(workOrder));
      setHideOfficeNotes(false);
      setReviewFlag(false);
      history.push("/dashboard");
    }
  }, [reviewFlag]);

  useEffect(() => {
    if (flag) {
      dispatch(editWorkOrder(workOrder));
      setHideOfficeNotes(false);
    }
    setFlag(false);
  }, [flag]);

  const typeConverter = (types) => {
    if (types) {
      if (types.length === 1) {
        return types;
      } else {
        return types.join(", ");
      }
    }
  };

  const dateConverter = (date) => {
    if (date) {
      const dateArray = date.split("-");
      return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    }
  };

  const timeConverter = (time) => {
    if (time) {
      const timeArray = time.split(":");
      const hour = parseInt(timeArray[0]);
      let m;

      if (hour <= 11) {
        m = "AM";
      } else {
        m = "PM";
      }

      if (hour <= 12) {
        const newHour = hour.toString();
        timeArray[0] = newHour;
      } else {
        const newHour = (hour - 12).toString();
        timeArray[0] = newHour;
      }

      return `${timeArray[0]}:${timeArray[1]} ${m}`;
    }
  };

  const addressConverter = (customer) => {
    if (customer.shopAddress) {
      const address = customer.shopAddress.address;
      const city = customer.shopAddress.city;
      const state = customer.shopAddress.state;
      const zipcode = customer.shopAddress.zipcode;

      let newAddress = "";
      let newCity = "";

      if (address) {
        newAddress = address.split(" ").join("+");
      }
      if (city) {
        newCity = city.split(" ").join("+");
      }

      const searchableAddress = `${newAddress},+${newCity},+${state}+${zipcode}`;
      setMapsAddress(searchableAddress);
    }
  };

  const crewConverter = (members) => {
    let crewNames = [];

    if (members) {
      members.forEach((member) => {
        crewNames.push(`${member.firstName} ${member.lastName}`);
      });

      if (crewNames.length === 1) {
        return crewNames;
      } else {
        return crewNames.join(", ");
      }
    }
  };

  const crewMemberConverter = (crewId) => {
    var name;

    allEmployees.forEach((employee) => {
      if (employee.userId === crewId) {
        name = `${employee.firstName} ${employee.lastName}`;
      }
    });
    return name;
  };

  const clockIn = () => {
    const date = new Date();
    const time = date.getTime();

    const punches = workOrder.crewPunches;

    if (punches.length === 0) {
      punches.push({
        crewId: currentUser.uid,
        timeAccrued: 0,
        clockIn: time,
      });
    } else {
      punches.forEach((punch) => {
        if (punch.crewId === currentUser.uid) {
          if (punch.clockIn === null) {
            punch.clockIn = time;
          } else {
            alert("Already clocked in");
          }
        } else {
          punches.push({
            crewId: currentUser.uid,
            timeAccrued: 0,
            clockIn: time,
          });
        }
      });
    }

    setWorkOrder({
      ...workOrder,
      crewPunches: punches,
    });
  };

  const clockOut = () => {
    const date = new Date();
    const time = date.getTime();

    const punches = workOrder.crewPunches;

    if (punches.length === 0) {
      alert("Please clock in first");
    } else {
      punches.forEach((punch) => {
        if (punch.crewId === currentUser.uid) {
          if (punch.clockIn === null) {
            alert("Please clock in first");
          } else {
            punch.timeAccrued += time - punch.clockIn;
            punch.clockIn = null;
          }
        }
      });
    }

    setWorkOrder({
      ...workOrder,
      crewPunches: punches,
    });
  };

  const totalTime = (crewPunches) => {
    const array = [];
    const reducer = (acc, curVal) => acc + curVal;
    var total, answer;

    if (crewPunches.length === 0) {
      answer = jobTimeConverter(0);
    } else {
      crewPunches.forEach((punch) => {
        array.push(punch.timeAccrued);
      });

      total = array.reduce(reducer);
      answer = jobTimeConverter(total);
    }
    return answer;
  };

  const jobTimeConverter = (timeAccrued) => {
    if (timeAccrued === 0) {
      return 0 + ":" + 0 + ":" + 0;
    }

    const seconds = Math.floor((timeAccrued / 1000) % 60);
    const minutes = Math.floor((timeAccrued / (1000 * 60)) % 60);
    const hours = Math.floor((timeAccrued / (1000 * 60 * 60)) % 24);

    const trueHours = hours < 10 ? "0" + hours : hours;
    const trueMinutes = minutes < 10 ? "0" + minutes : minutes;
    const trueSeconds = seconds < 10 ? "0" + seconds : seconds;

    return trueHours + ":" + trueMinutes + ":" + trueSeconds;
  };

  const handleChange = (e) => {
    setWorkOrder({
      ...workOrder,
      [e.target.name]: e.target.value,
    });
  };

  const toggleServiceModal = () => {
    if (isOpenServiceModal) {
      setServiceErrors({});
    }
    setIsOpenServiceModal(!isOpenServiceModal);
  };

  const handleChangeService = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitService = (e) => {
    e.preventDefault();
    const errors = {};

    if (service.make.trim() === "") {
      errors.make = "Must not be empty";
    }
    if (service.type.trim() === "") {
      errors.type = "Must not be empty";
    }
    if (service.model.trim() === "") {
      errors.model = "Must not be empty";
    }
    if (service.serialNumber.trim() === "") {
      errors.serialNumber = "Must not be empty";
    }
    if (service.serviceDone.trim() === "") {
      errors.serviceDone = "Must not be empty";
    }
    if (service.billableHours === null) {
      errors.billableHours = "Must not be empty";
    } else if (service.billableHours.trim() === "") {
      errors.billableHours = "Must not be empty";
    } else if (service.billableHours % 0.5 !== 0 || service.billableHours < 0) {
      errors.billableHours =
        "Billable hours must be priced to the next half hour";
    }

    if (Object.keys(errors).length !== 0) {
      setServiceErrors(errors);
    } else {
      if (!workOrder.serviceDone) {
        setWorkOrder({
          ...workOrder,
          serviceDone: [service],
        });
      } else {
        setWorkOrder({
          ...workOrder,
          serviceDone: [...workOrder.serviceDone, service],
        });
      }

      setService({
        make: "",
        type: "",
        model: "",
        serialNumber: "",
        bayNumber: "",
        serviceDone: "",
        billableHours: null,
        partsUsed: [],
        partsNeeded: [],
        images: [],
      });

      setIsOpenServiceModal(false);
      setServiceErrors({});
    }
  };

  const togglePartUsed = () => {
    setIsOpenPartUsed(!isOpenPartUsed);
  };

  const togglePartNeeded = () => {
    setIsOpenPartNeeded(!isOpenPartNeeded);
  };

  const handleChangePartUsed = (e) => {
    setPartUsed({
      ...partUsed,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitPartUsed = (e) => {
    e.preventDefault();
    const errors = {};

    if (partUsed.quantity.trim() === "") {
      errors.quantity = "Must not be empty";
    }
    if (partUsed.partDescription.trim() === "") {
      errors.partDescription = "Must not be empty";
    }
    if (partUsed.partNumber.trim() === "") {
      errors.partNumber = "Must not be empty";
    }

    if (Object.keys(errors).length !== 0) {
      setPartUsedErrors(errors);
    } else {
      setService({
        ...service,
        partsUsed: [...service.partsUsed, partUsed],
      });

      setPartUsed({
        quantity: "",
        partDescription: "",
        partNumber: "",
        images: [],
      });

      setIsOpenPartUsed(false);
      setPartUsedErrors({});
    }
  };

  const handleChangePartNeeded = (e) => {
    setPartNeeded({
      ...partNeeded,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitPartNeeded = (e) => {
    e.preventDefault();
    const errors = {};

    if (partNeeded.quantity.trim() === "") {
      errors.quantity = "Must not be empty";
    }
    if (partNeeded.partDescription.trim() === "") {
      errors.partDescription = "Must not be empty";
    }
    if (partNeeded.partNumber.trim() === "") {
      errors.partNumber = "Must not be empty";
    }

    if (Object.keys(errors).length !== 0) {
      setPartNeededErrors(errors);
    } else {
      setService({
        ...service,
        partsNeeded: [...service.partsNeeded, partNeeded],
      });

      setPartNeeded({
        quantity: "",
        partDescription: "",
        partNumber: "",
        images: [],
      });

      setIsOpenPartNeeded(false);
      setPartNeededErrors({});
    }
  };

  const goToInspection = () => {
    window.open(inspectionForm);
  };

  const goToTraining = () => {
    window.open(rmlTrainingForm);
  };

  const handleSubmitForSignature = (e) => {
    e.preventDefault();
    setHideOfficeNotes(true);
    setHideSignaturePad(false);
    setHideEditButton(true);
    setHideSubmitForSignatureButton(true);
    setHideSubmitForReviewButton(false);
  };

  const clearSignaturePad = (e) => {
    sigPad.clear();
  };

  const handleEditWorkOrder = (e) => {
    e.preventDefault();
    dispatch(editWorkOrder(workOrder));
  };

  const handleSubmitForReview = (e) => {
    e.preventDefault();
    setWorkOrder({
      ...workOrder,
      signature: sigPad.getTrimmedCanvas().toDataURL("image/png"),
      status: "In Review",
    });
    setReviewFlag(true);
  };

  const handleSubmitForBilling = (e) => {
    e.preventDefault();
    setWorkOrder({
      ...workOrder,
      status: "In Billing",
    });
    setFlag(true);
  };

  const handleCloseWorkOrder = (e) => {
    e.preventDefault();
    setWorkOrder({
      ...workOrder,
      status: "Closed",
    });
    setFlag(true);
  };

  const toggleEditPunch = (e, punch) => {
    console.log(punch);
    if (workOrder.serviceManager === currentUser.uid) {
      if (editPunchOpen) {
        setCurrentPunch({
          crewId: "",
          clockIn: "",
          timeAccrued: null,
        });
      } else {
        setCurrentPunch(punch);
      }
      setEditPunchOpen(!editPunchOpen);
    }
  };

  const handleHourChange = (e) => {
    setHours(e.target.value);
  };

  const handleMinuteChange = (e) => {
    setMinutes(e.target.value);
  };

  const submitTimeChange = (e) => {
    const h = hours;
    const m = minutes;

    const minToSec = m * 60;
    const hourToSec = h * 60 * 60;

    const totalSec = minToSec + hourToSec;
    const totalMilliSec = totalSec * 1000;

    const crewPunches = workOrder.crewPunches;

    const array = [];
    crewPunches.forEach((punch) => {
      if (punch.crewId !== currentPunch.crewId) {
        array.push(punch);
      }
    });

    array.push({
      crewId: currentPunch.crewId,
      clockIn: null,
      timeAccrued: totalMilliSec,
    });

    setWorkOrder({
      ...workOrder,
      crewPunches: array,
    });

    toggleEditPunch(false);
  };

  const toggleEditService = (e, service) => {
    if (
      workOrder.status === "Open" ||
      (workOrder.status === "In Review" &&
        workOrder.serviceManager === currentUser.uid)
    ) {
      if (editServiceOpen) {
        setCurrentService({
          make: "",
          type: "",
          model: "",
          serialNumber: "",
          bayNumber: "",
          serviceDone: "",
          billableHours: null,
          partsUsed: [],
          partsNeeded: [],
          images: [],
        });
      } else {
        setCurrentService(service);
      }
      setEditServiceOpen(!editServiceOpen);
    }
    console.log(service);
  };

  const handleServiceEditChange = (e) => {
    setCurrentService({
      ...currentService,
      [e.target.name]: e.target.value,
    });
  };

  const submitServiceEditChange = e => {
    
  }

  return (
    <div className="work-order-page">
      {workOrder ? (
        <div className="work-order-page-content">
          <h1>{`Work Order #${workOrder.workOrderId}`}</h1>
          <Form className="work-order-info">
            <FormGroup>
              <Label for="customerName">Customer Name</Label>
              <Input disabled value={customer.businessName} />
            </FormGroup>
            <FormGroup>
              <Label for="customerAddress">Customer Address</Label>
              <a
                href={`http://maps.google.com/maps?q=${mapsAddress}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Input
                  disabled
                  value={`${
                    customer.shopAddress ? customer.shopAddress.address : null
                  }, ${
                    customer.shopAddress ? customer.shopAddress.city : null
                  }, ${
                    customer.shopAddress ? customer.shopAddress.state : null
                  } ${
                    customer.shopAddress ? customer.shopAddress.zipcode : null
                  }`}
                />
              </a>
            </FormGroup>
            <FormGroup className="type-input">
              <Label for="serviceType">Service Type(s)</Label>
              <Input disabled value={typeConverter(workOrder.serviceType)} />
            </FormGroup>
            <div className="date-div">
              <FormGroup>
                <Label for="serviceDate">Service Date</Label>
                <Input disabled value={dateConverter(workOrder.serviceDate)} />
              </FormGroup>
              <FormGroup>
                <Label for="serviceStartTime">Service Start Time</Label>
                <Input
                  disabled
                  value={timeConverter(workOrder.serviceStartTime)}
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="crewMembers">Crew Members</Label>
              <Input disabled value={crewConverter(employees)} />
            </FormGroup>
            <FormGroup className="description-input">
              <Label for="serviceDescription">Service Description</Label>
              <Input
                disabled
                type="textarea"
                value={workOrder.serviceDescription}
              />
            </FormGroup>
            <FormGroup>
              <Label for="crewPunches">Crew Punches</Label>
              {workOrder.crewPunches &&
                workOrder.crewPunches.map((punch) => (
                  <p onClick={(e) => toggleEditPunch(e, punch)}>
                    {crewMemberConverter(punch.crewId)}:{" "}
                    {jobTimeConverter(punch.timeAccrued)}
                  </p>
                ))}
              {workOrder.crewPunches ? (
                <p>
                  <strong>
                    Total Time Accrued: {totalTime(workOrder.crewPunches)}
                  </strong>
                </p>
              ) : null}
            </FormGroup>
            <div className="button-div">
              {workOrder.status === "Open" ||
              (workOrder.serviceManager === currentUser.uid &&
                workOrder.status === "In Review") ? (
                <div className="secondary-button-div">
                  <FormGroup>
                    <Button color="primary" onClick={clockIn}>
                      Clock In
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    <Button color="primary" onClick={clockOut}>
                      Clock Out
                    </Button>
                  </FormGroup>
                </div>
              ) : null}
              {workOrder.serviceDone ? (
                workOrder.serviceDone.length > 0 ? (
                  <div className="service-table">
                    <h5>Services</h5>
                    <Table hover size="sm">
                      <thead>
                        <th>Service Type</th>
                        <th>Service Description</th>
                        <th>Parts Needed</th>
                      </thead>
                      <tbody>
                        {workOrder.serviceDone.map((service) => (
                          <tr onClick={(e) => toggleEditService(e, service)}>
                            <td scope="row">{service.type}</td>
                            <td>{service.serviceDone}</td>
                            <td>
                              {service.partsNeeded.length > 0 ? "Y" : "N"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : null
              ) : null}
              {workOrder.status === "Open" ||
              (workOrder.serviceManager === currentUser.uid &&
                workOrder.status === "In Review") ? (
                <FormGroup>
                  <Button outline color="success" onClick={toggleServiceModal}>
                    Add Service
                  </Button>
                </FormGroup>
              ) : null}
              {workOrder.status === "Open" ||
              (workOrder.serviceManager === currentUser.uid &&
                workOrder.status === "In Review") ? (
                <div className="secondary-button-div">
                  <FormGroup>
                    <Button outline color="info" onClick={goToInspection}>
                      Add Inspection
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    <Button
                      outline
                      color="warning"
                      className="training-button"
                      onClick={goToTraining}
                    >
                      Add Training
                    </Button>
                  </FormGroup>
                </div>
              ) : null}
            </div>
            <div className="travel-div">
              <FormGroup>
                <Label for="travelTime">Travel Time (Roundtrip)</Label>
                <Input
                  type="text"
                  name="travelTime"
                  disabled={
                    workOrder.status === "Closed" ||
                    workOrder.status === "In Billing" ||
                    (workOrder.status === "In Review" &&
                      workOrder.serviceManager !== currentUser.uid)
                  }
                  value={workOrder.travelTime ? workOrder.travelTime : null}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="travelMileage">Travel Mileage (Roundtrip)</Label>
                <Input
                  type="text"
                  name="travelMileage"
                  disabled={
                    workOrder.status === "Closed" ||
                    workOrder.status === "In Billing" ||
                    (workOrder.status === "In Review" &&
                      workOrder.serviceManager !== currentUser.uid)
                  }
                  value={
                    workOrder.travelMileage ? workOrder.travelMileage : null
                  }
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="notes">Notes</Label>
              <Input
                type="textarea"
                name="notes"
                disabled={
                  workOrder.status === "In Review" ||
                  workOrder.status === "In Billing" ||
                  workOrder.status === "Closed"
                }
                value={workOrder.notes ? workOrder.notes : null}
                onChange={handleChange}
              />
            </FormGroup>
            {hideOfficeNotes ? null : (
              <FormGroup>
                <Label for="officeNotes">Office Notes (NOT FOR CUSTOMER)</Label>
                <Input
                  type="textarea"
                  name="officeNotes"
                  disabled={
                    (workOrder.serviceManager !== currentUser.uid &&
                      workOrder.status === "In Review") ||
                    (workOrder.officeManager !== currentUser.uid &&
                      workOrder.status === "In Billing")
                  }
                  value={workOrder.officeNotes ? workOrder.officeNotes : null}
                  onChange={handleChange}
                />
              </FormGroup>
            )}
            {!workOrder.signature ? (
              hideSignaturePad ? null : (
                <FormGroup>
                  <div className="signature-pad-header">
                    <Label for="signature">Signature</Label>
                    <Button
                      outline
                      color="danger"
                      className="clear-button"
                      onClick={clearSignaturePad}
                    >
                      <i className="far fa-times" />
                    </Button>
                  </div>
                  {workOrder.status !== "In Review" ? (
                    <SignatureCanvas
                      canvasProps={{ className: "signature-pad" }}
                      ref={(ref) => {
                        sigPad = ref;
                      }}
                    />
                  ) : (
                    <img src={workOrder.signature} alt="Signature" />
                  )}
                </FormGroup>
              )
            ) : null}
            {!workOrder.signature ? (
              hideEditButton ? null : (
                <FormGroup className="submit-button edit-button">
                  <Button outline color="success" onClick={handleEditWorkOrder}>
                    Save Work Order
                  </Button>
                </FormGroup>
              )
            ) : null}
            {!workOrder.signature ? (
              hideSubmitForSignatureButton ? null : (
                <FormGroup className="submit-button">
                  <Button color="success" onClick={handleSubmitForSignature}>
                    Submit for Signature
                  </Button>
                </FormGroup>
              )
            ) : null}
            {!workOrder.signature ? (
              hideSubmitForReviewButton ? null : (
                <FormGroup className="submit-button">
                  <Button color="success" onClick={handleSubmitForReview}>
                    Submit for Review
                  </Button>
                </FormGroup>
              )
            ) : null}
            {workOrder.signature ? (
              <FormGroup>
                <Label for="signature">Signature</Label>
                <img
                  src={workOrder.signature}
                  alt="Signature"
                  className="signature-img"
                />
              </FormGroup>
            ) : null}
            {workOrder.signature ? (
              workOrder.serviceManager === currentUser.uid ? (
                workOrder.status === "In Review" ? (
                  <FormGroup className="submit-button edit-button">
                    <Button
                      outline
                      color="success"
                      onClick={handleEditWorkOrder}
                    >
                      Save Work Order
                    </Button>
                  </FormGroup>
                ) : null
              ) : null
            ) : null}
            {workOrder.signature ? (
              workOrder.serviceManager === currentUser.uid ? (
                workOrder.status === "In Review" ? (
                  <FormGroup className="submit-button">
                    <Button color="success" onClick={handleSubmitForBilling}>
                      Submit for Billing
                    </Button>
                  </FormGroup>
                ) : null
              ) : null
            ) : null}
            {workOrder.signature ? (
              workOrder.officeManager === currentUser.uid ? (
                workOrder.status === "In Billing" ? (
                  <FormGroup className="submit-button edit-button">
                    <Button
                      outline
                      color="success"
                      onClick={handleEditWorkOrder}
                    >
                      Save Work Order
                    </Button>
                  </FormGroup>
                ) : null
              ) : null
            ) : null}
            {workOrder.signature ? (
              workOrder.officeManager === currentUser.uid ? (
                workOrder.status === "In Billing" ? (
                  <FormGroup className="submit-button">
                    <Button color="success" onClick={handleCloseWorkOrder}>
                      Close Work Order
                    </Button>
                  </FormGroup>
                ) : null
              ) : null
            ) : null}
          </Form>
        </div>
      ) : null}
      <Modal isOpen={isOpenServiceModal} toggle={toggleServiceModal}>
        <ModalHeader toggle={toggleServiceModal}>Add Service</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmitService}>
            <div className="equipment-div">
              <FormGroup>
                <Label for="make">Make</Label>
                <Input
                  type="text"
                  name="make"
                  onChange={handleChangeService}
                  invalid={serviceErrors.make ? true : false}
                />
                <FormFeedback>{serviceErrors.make}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  type="text"
                  name="type"
                  onChange={handleChangeService}
                  invalid={serviceErrors.type ? true : false}
                />
                <FormFeedback>{serviceErrors.type}</FormFeedback>
              </FormGroup>
            </div>
            <div className="equipment-div">
              <FormGroup>
                <Label for="model">Model</Label>
                <Input
                  type="text"
                  name="model"
                  onChange={handleChangeService}
                  invalid={serviceErrors.model ? true : false}
                />
                <FormFeedback>{serviceErrors.model}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="serialNumber">Serial Number</Label>
                <Input
                  type="text"
                  name="serialNumber"
                  onChange={handleChangeService}
                  invalid={serviceErrors.serialNumber ? true : false}
                />
                <FormFeedback>{serviceErrors.serialNumber}</FormFeedback>
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="bayNumber">Bay Number</Label>
              <Input
                type="text"
                name="bayNumber"
                onChange={handleChangeService}
              />
            </FormGroup>
            <FormGroup>
              <Label for="serviceDone">What work was done?</Label>
              <Input
                type="textarea"
                name="serviceDone"
                onChange={handleChangeService}
                invalid={serviceErrors.serviceDone ? true : false}
              />
              <FormFeedback>{serviceErrors.serviceDone}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="billableHours">Billable Hours</Label>
              <Input
                type="number"
                min="0"
                max="100"
                step="0.5"
                name="billableHours"
                onChange={handleChangeService}
                invalid={serviceErrors.billableHours ? true : false}
              />
              <FormFeedback>{serviceErrors.billableHours}</FormFeedback>
            </FormGroup>
            {service.partsUsed.length > 0 ? (
              <div className="part-div">
                <h5>Parts Used</h5>
                <Table hover size="sm" className="part-table">
                  <thead>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Part Number</th>
                    <th>Images</th>
                  </thead>
                  <tbody>
                    {service.partsUsed.map((part) => (
                      <tr>
                        <td scope="row">{part.quantity}</td>
                        <td>{part.partDescription}</td>
                        <td>{part.partNumber}</td>
                        <td>{part.images}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : null}
            {service.partsNeeded.length > 0 ? (
              <div className="part-div">
                <h5>Parts Needed</h5>
                <Table hover size="sm" className="part-table">
                  <thead>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Part Number</th>
                    <th>Images</th>
                  </thead>
                  <tbody>
                    {service.partsNeeded.map((part) => (
                      <tr>
                        <td scope="row">{part.quantity}</td>
                        <td>{part.partDescription}</td>
                        <td>{part.partNumber}</td>
                        <td>{part.images}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : null}
            <FormGroup className="parts-group">
              <Button outline color="success" onClick={togglePartUsed}>
                Add Part Used
              </Button>
              <Button outline color="danger" onClick={togglePartNeeded}>
                Add Part Needed
              </Button>
            </FormGroup>
            <FormGroup>
              <Label>Picture(s)</Label>
              <Input
                multiple
                type="file"
                accept="image/*"
                capture="environment"
                name="images"
                onChange={handleChangeService}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleSubmitService}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isOpenPartUsed} toggle={togglePartUsed}>
        <ModalHeader toggle={togglePartUsed}>Add Part Used</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmitPartUsed}>
            <FormGroup>
              <Label>Quantity</Label>
              <Input
                type="text"
                name="quantity"
                onChange={handleChangePartUsed}
                invalid={partUsedErrors.quantity ? true : false}
              />
              <FormFeedback>{partUsedErrors.quantity}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Part Description</Label>
              <Input
                type="text"
                name="partDescription"
                onChange={handleChangePartUsed}
                invalid={partUsedErrors.partDescription ? true : false}
              />
              <FormFeedback>{partUsedErrors.partDescription}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Part Number</Label>
              <Input
                type="text"
                name="partNumber"
                onChange={handleChangePartUsed}
                invalid={partUsedErrors.partNumber ? true : false}
              />
              <FormFeedback>{partUsedErrors.partNumber}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Picture(s)</Label>
              <Input
                multiple
                type="file"
                accept="image/*"
                capture="environment"
                name="images"
                onChange={handleChangePartUsed}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleSubmitPartUsed}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isOpenPartNeeded} toggle={togglePartNeeded}>
        <ModalHeader toggle={togglePartNeeded}>Add Part Needed</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmitPartNeeded}>
            <FormGroup>
              <Label>Quantity</Label>
              <Input
                type="text"
                name="quantity"
                onChange={handleChangePartNeeded}
                invalid={partNeededErrors.quantity ? true : false}
              />
              <FormFeedback>{partNeededErrors.quantity}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Part Description</Label>
              <Input
                type="text"
                name="partDescription"
                onChange={handleChangePartNeeded}
                invalid={partNeededErrors.partDescription ? true : false}
              />
              <FormFeedback>{partNeededErrors.partDescription}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Part Number</Label>
              <Input
                type="text"
                name="partNumber"
                onChange={handleChangePartNeeded}
                invalid={partNeededErrors.partNumber ? true : false}
              />
              <FormFeedback>{partNeededErrors.partNumber}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Picture(s)</Label>
              <Input
                multiple
                type="file"
                accept="image/*"
                capture="environment"
                name="images"
                onChange={handleChangePartNeeded}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleSubmitPartNeeded}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={editPunchOpen} toggle={toggleEditPunch}>
        <ModalHeader toggle={toggleEditPunch}>Edit Time</ModalHeader>
        <ModalBody>
          <Form onSubmit={submitTimeChange}>
            <Label>Edit to correct total time accrued on job</Label>
            <div>
              <FormGroup>
                <Label>Hours</Label>
                <Input
                  type="number"
                  name="hours"
                  min="0"
                  max="100"
                  step="1"
                  onChange={handleHourChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Minutes</Label>
                <Input
                  type="number"
                  name="minutes"
                  min="0"
                  max="59"
                  step="1"
                  onChange={handleMinuteChange}
                />
              </FormGroup>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={submitTimeChange}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={editServiceOpen} toggle={toggleEditService}>
        <ModalHeader toggle={toggleEditService}>Edit Service</ModalHeader>
        <ModalBody>
          <Form onSubmit={submitServiceEditChange}>
            <div className="equipment-div">
              <FormGroup>
                <Label for="make">Make</Label>
                <Input
                  type="text"
                  name="make"
                  value={currentService && currentService.make}
                  onChange={handleServiceEditChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  type="text"
                  name="type"
                  value={currentService && currentService.type}
                  onChange={handleServiceEditChange}
                />
              </FormGroup>
            </div>
            <div className="equipment-div">
              <FormGroup>
                <Label for="model">Model</Label>
                <Input
                  type="text"
                  name="model"
                  value={currentService && currentService.model}
                  onChange={handleServiceEditChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="serialNumber">Serial Number</Label>
                <Input
                  type="text"
                  name="serialNumber"
                  value={currentService && currentService.serialNumber}
                  onChange={handleServiceEditChange}
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="bayNumber">Bay Number</Label>
              <Input
                type="text"
                name="bayNumber"
                value={currentService && currentService.bayNumber}
                onChange={handleServiceEditChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="serviceDone">What work was done?</Label>
              <Input
                type="textarea"
                name="serviceDone"
                value={currentService && currentService.serviceDone}
                onChange={handleServiceEditChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="billableHours">Billable Hours</Label>
              <Input
                type="number"
                min="0"
                max="100"
                step="0.5"
                name="billableHours"
                value={currentService && currentService.billableHours}
                onChange={handleServiceEditChange}
              />
            </FormGroup>
            {service.partsUsed.length > 0 ? (
              <div className="part-div">
                <h5>Parts Used</h5>
                <Table hover size="sm" className="part-table">
                  <thead>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Part Number</th>
                    <th>Images</th>
                  </thead>
                  <tbody>
                    {service.partsUsed.map((part) => (
                      <tr>
                        <td scope="row">{part.quantity}</td>
                        <td>{part.partDescription}</td>
                        <td>{part.partNumber}</td>
                        <td>{part.images}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : null}
            {service.partsNeeded.length > 0 ? (
              <div className="part-div">
                <h5>Parts Needed</h5>
                <Table hover size="sm" className="part-table">
                  <thead>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Part Number</th>
                    <th>Images</th>
                  </thead>
                  <tbody>
                    {service.partsNeeded.map((part) => (
                      <tr>
                        <td scope="row">{part.quantity}</td>
                        <td>{part.partDescription}</td>
                        <td>{part.partNumber}</td>
                        <td>{part.images}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : null}
            <FormGroup className="parts-group">
              <Button outline color="success" onClick={togglePartUsed}>
                Add Part Used
              </Button>
              <Button outline color="danger" onClick={togglePartNeeded}>
                Add Part Needed
              </Button>
            </FormGroup>
            <FormGroup>
              <Label>Picture(s)</Label>
              <Input
                multiple
                type="file"
                accept="image/*"
                capture="environment"
                name="images"
                value={currentService && currentService.images}
                onChange={handleServiceEditChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={submitServiceEditChange}>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default WorkOrder;
