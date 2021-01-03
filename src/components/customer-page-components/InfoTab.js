import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Form,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { getCustomer } from "../../actions/getCustomer";
import { editCustomer } from "../../actions/editCustomer";

import "../../styles/customer.scss";

const InfoTab = () => {
  const [customer, setCustomer] = useState({});
  const getCustomerFromState = useSelector(
    (state) => state.getCustomerReducer.customer
  );
  const [isOpen, setIsOpen] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({
    businessName: "",
    industry: "",
    primaryContact: {
      firstName: "",
      lastName: "",
    },
    billingContact: {
      firstName: "",
      lastName: "",
    },
    primaryOfficeNumber: "",
    primaryExt: "",
    primaryCellNumber: "",
    primaryEmail: "",
    primaryJobTitle: "",
    billingOfficeNumber: "",
    billingExt: "",
    billingCellNumber: "",
    billingEmail: "",
    billingJobTitle: "",
    shopAddress: {
      address: "",
      city: "",
      state: "",
      zipcode: "",
    },
    billingAddress: {
      address: "",
      city: "",
      state: "",
      zipcode: "",
    },
    noBillingContact: false,
  });
  const success = useSelector((state) => state.editCustomerReducer.success);
  const [errors, setErrors] = useState({});
  const getErrorsFromState = useSelector(
    (state) => state.editCustomerReducer.errors
  );
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
    if (success) {
      setErrors({});
      toggle();
    }
  }, [success]);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setErrors(getErrorsFromState);
  }, [getErrorsFromState]);

  const toggle = () => {
    if (!isOpen) {
      setEditedCustomer({
        businessName: customer.businessName,
        industry: customer.industry,
        primaryContact: {
          firstName: customer.primaryContact.firstName,
          lastName: customer.primaryContact.lastName,
        },
        billingContact: {
          firstName: customer.billingContact.firstName,
          lastName: customer.billingContact.lastName,
        },
        primaryOfficeNumber: customer.primaryOfficeNumber,
        primaryExt: customer.primaryExt,
        primaryCellNumber: customer.primaryCellNumber,
        primaryEmail: customer.primaryEmail,
        primaryJobTitle: customer.primaryJobTitle,
        billingOfficeNumber: customer.billingOfficeNumber,
        billingExt: customer.billingExt,
        billingCellNumber: customer.billingCellNumber,
        billingEmail: customer.billingEmail,
        billingJobTitle: customer.billingJobTitle,
        shopAddress: {
          address: customer.shopAddress.address,
          city: customer.shopAddress.city,
          state: customer.shopAddress.state,
          zipcode: customer.shopAddress.zipcode,
        },
        billingAddress: {
          address: customer.billingAddress.address,
          city: customer.billingAddress.city,
          state: customer.billingAddress.state,
          zipcode: customer.billingAddress.zipcode,
        },
        userId: customer.userId,
      });
    }
    if (isOpen) {
      setEditedCustomer({
        businessName: "",
        industry: "",
        primaryContact: {
          firstName: "",
          lastName: "",
        },
        billingContact: {
          firstName: "",
          lastName: "",
        },
        primaryOfficeNumber: "",
        primaryExt: "",
        primaryCellNumber: "",
        primaryEmail: "",
        primaryJobTitle: "",
        billingOfficeNumber: "",
        billingExt: "",
        billingCellNumber: "",
        billingEmail: "",
        billingJobTitle: "",
        shopAddress: {
          address: "",
          city: "",
          state: "",
          zipcode: "",
        },
        billingAddress: {
          address: "",
          city: "",
          state: "",
          zipcode: "",
        },
        noBillingContact: false,
      });
      setErrors({});
    }
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setEditedCustomer({
      ...editedCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrimaryContactChange = (e) => {
    setEditedCustomer({
      ...editedCustomer,
      primaryContact: {
        ...editedCustomer.primaryContact,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleBillingContactChange = (e) => {
    setEditedCustomer({
      ...editedCustomer,
      billingContact: {
        ...editedCustomer.billingContact,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleShopAddressChange = (e) => {
    setEditedCustomer({
      ...editedCustomer,
      shopAddress: {
        ...editedCustomer.shopAddress,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleBillingAddressChange = (e) => {
    setEditedCustomer({
      ...editedCustomer,
      billingAddress: {
        ...editedCustomer.billingAddress,
        [e.target.name]: e.target.value,
      },
    });
  };

  const toggleBillingContact = (e) => {
    setEditedCustomer({
      ...editedCustomer,
      noBillingContact: !editedCustomer.noBillingContact,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editCustomer(editedCustomer));
  };

  return (
    <div className="customer-info-page-div">
      <Form className="customer-page-info-tab">
        <div className="customer-page-contacts">
          <FormGroup>
            <h3>Primary Contact</h3>
            <div>
              <p>
                Name:{" "}
                <span>
                  {customer.primaryContact
                    ? customer.primaryContact.firstName
                    : null}{" "}
                  {customer.primaryContact
                    ? customer.primaryContact.lastName
                    : null}
                </span>
              </p>
              <p>
                Job Title: <span>{customer.primaryJobTitle}</span>
              </p>
              <p>
                Office:{" "}
                <a
                  href={
                    customer.primaryExt
                      ? `tel:+1-${customer.primaryOfficeNumber},${customer.primaryExt}`
                      : `tel:+1-${customer.primaryOfficeNumber}`
                  }
                >
                  {customer.primaryExt
                    ? `${customer.primaryOfficeNumber}, .ext ${customer.primaryExt}`
                    : `${customer.primaryOfficeNumber}`}
                </a>
              </p>
              <p>
                Cell:{" "}
                <a href={`tel:+1-${customer.primaryCellNumber}`}>
                  {customer.primaryCellNumber}
                </a>
              </p>
              <p>
                Email:{" "}
                <a href={`mailto:${customer.primaryEmail}`}>
                  {customer.primaryEmail}
                </a>
              </p>
            </div>
          </FormGroup>
          <FormGroup>
            <h3>Billing Contact</h3>
            <div>
              <p>
                Name:{" "}
                <span>
                  {customer.billingContact
                    ? customer.billingContact.firstName
                    : null}{" "}
                  {customer.billingContact
                    ? customer.billingContact.lastName
                    : null}
                </span>
              </p>
              <p>
                Job Title: <span>{customer.billingJobTitle}</span>
              </p>
              <p>
                Office:{" "}
                <a
                  href={
                    customer.billingExt
                      ? `tel:+1-${customer.billingOfficeNumber},${customer.billingExt}`
                      : `tel:+1-${customer.billingOfficeNumber}`
                  }
                >
                  {customer.billingExt
                    ? `${customer.billingOfficeNumber}, .ext ${customer.billingExt}`
                    : `${customer.billingOfficeNumber}`}
                </a>
              </p>
              <p>
                Cell:{" "}
                <a href={`tel:+1-${customer.billingCellNumber}`}>
                  {customer.billingCellNumber}
                </a>
              </p>
              <p>
                Email:{" "}
                <a href={`mailto:${customer.billingEmail}`}>
                  {customer.billingEmail}
                </a>
              </p>
            </div>
          </FormGroup>
        </div>
        <div className="customer-page-addresses">
          <FormGroup>
            <h3>Shop Address</h3>
            <a
              href={`http://maps.google.com/?q=${
                customer.shopAddress ? customer.shopAddress.address : null
              }, ${customer.shopAddress ? customer.shopAddress.city : null}, ${
                customer.shopAddress ? customer.shopAddress.state : null
              } ${customer.shopAddress ? customer.shopAddress.zipcode : null}`}
              target="_blank"
              rel="noopener noreferrer"
              className="address-link"
            >
              <p>
                {customer.shopAddress ? customer.shopAddress.address : null},
              </p>
              <p>
                {customer.shopAddress ? customer.shopAddress.city : null},{" "}
                {customer.shopAddress ? customer.shopAddress.state : null}
              </p>
              <p>
                {customer.shopAddress ? customer.shopAddress.zipcode : null}
              </p>
            </a>
          </FormGroup>
          <FormGroup>
            <h3>Billing Address</h3>
            <a
              href={`http://maps.google.com/?q=${
                customer.billingAddress ? customer.billingAddress.address : null
              }, ${
                customer.billingAddress ? customer.billingAddress.city : null
              }, ${
                customer.billingAddress ? customer.billingAddress.state : null
              } ${
                customer.billingAddress ? customer.billingAddress.zipcode : null
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="address-link"
            >
              <p>
                {customer.billingAddress
                  ? customer.billingAddress.address
                  : null}
                ,
              </p>
              <p>
                {customer.billingAddress ? customer.billingAddress.city : null},{" "}
                {customer.billingAddress ? customer.billingAddress.state : null}
              </p>
              <p>
                {customer.billingAddress
                  ? customer.billingAddress.zipcode
                  : null}
              </p>
            </a>
          </FormGroup>
        </div>
      </Form>
      <Button
        outline
        color="success"
        className="info-edit-button"
        onClick={toggle}
      >
        <i className="fad fa-pen" /> Edit
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Customer</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit} className="add-customer-form">
            <FormGroup>
              <Label for="businessName">Business Name</Label>
              <Input
                type="text"
                name="businessName"
                onChange={handleChange}
                value={editedCustomer.businessName}
                invalid={errors.businessName ? true : false}
              />
              <FormFeedback>{errors.businessName}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="industry">Industry</Label>
              <Input
                type="text"
                name="industry"
                onChange={handleChange}
                value={editedCustomer.industry}
                invalid={errors.industry ? true : false}
              />
              <FormFeedback>{errors.industry}</FormFeedback>
            </FormGroup>
            <Label for="primary-contact" className="form-label">
              Primary Contact
            </Label>
            <div className="primary-contact-name">
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  onChange={handlePrimaryContactChange}
                  value={
                    editedCustomer.primaryContact
                      ? editedCustomer.primaryContact.firstName
                      : null
                  }
                  invalid={
                    errors.primaryContact
                      ? errors.primaryContact.firstName
                        ? true
                        : false
                      : false
                  }
                />
                <FormFeedback>
                  {errors.primaryContact
                    ? errors.primaryContact.firstName
                      ? errors.primaryContact.firstName
                      : null
                    : null}
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  onChange={handlePrimaryContactChange}
                  value={
                    editedCustomer.primaryContact
                      ? editedCustomer.primaryContact.lastName
                      : null
                  }
                  invalid={
                    errors.primaryContact
                      ? errors.primaryContact.lastName
                        ? true
                        : false
                      : false
                  }
                />
                <FormFeedback>
                  {errors.primaryContact
                    ? errors.primaryContact.lastName
                      ? errors.primaryContact.lastName
                      : null
                    : null}
                </FormFeedback>
              </FormGroup>
            </div>
            <div className="primary-phone-div">
              <div className="primary-office-phone-div">
                <FormGroup className="primary-number">
                  <Label for="primaryOfficeNumber">Office Phone Number</Label>
                  <Input
                    type="text"
                    name="primaryOfficeNumber"
                    placeholder="XXX-XXX-XXXX"
                    onChange={handleChange}
                    value={editedCustomer.primaryOfficeNumber}
                    invalid={errors.primaryOfficeNumber ? true : false}
                  />
                  <FormFeedback>{errors.primaryOfficeNumber}</FormFeedback>
                </FormGroup>
                <FormGroup className="primary-ext">
                  <Label for="primaryExt">ext.</Label>
                  <Input
                    type="text"
                    name="primaryExt"
                    onChange={handleChange}
                    value={editedCustomer.primaryExt}
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <Label for="primaryCellNumber">Cell Phone Number</Label>
                <Input
                  type="text"
                  name="primaryCellNumber"
                  placeholder="XXX-XXX-XXXX"
                  onChange={handleChange}
                  value={editedCustomer.primaryCellNumber}
                  invalid={errors.primaryCellNumber ? true : false}
                />
                <FormFeedback>{errors.primaryCellNumber}</FormFeedback>
              </FormGroup>
            </div>
            <div className="primary-email-jobTitle-div">
              <FormGroup>
                <Label for="primaryEmail">Email</Label>
                <Input
                  type="text"
                  name="primaryEmail"
                  placeholder="example@example.com"
                  onChange={handleChange}
                  value={editedCustomer.primaryEmail}
                  invalid={errors.primaryEmail ? true : false}
                />
                <FormFeedback>{errors.primaryEmail}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="primaryJobTitle">Job Title</Label>
                <Input
                  type="text"
                  name="primaryJobTitle"
                  onChange={handleChange}
                  value={editedCustomer.primaryJobTitle}
                  invalid={errors.primaryJobTitle ? true : false}
                />
                <FormFeedback>{errors.primaryJobTitle}</FormFeedback>
              </FormGroup>
            </div>
            <Label for="shop-address" className="form-label">
              Shop Address
            </Label>
            <div className="shop-address">
              <div className="shop-address-city-div">
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    type="text"
                    name="address"
                    onChange={handleShopAddressChange}
                    value={
                      editedCustomer.shopAddress
                        ? editedCustomer.shopAddress.address
                        : null
                    }
                    invalid={
                      errors.shopAddress
                        ? errors.shopAddress.address
                          ? true
                          : false
                        : false
                    }
                  />
                  <FormFeedback>
                    {errors.shopAddress
                      ? errors.shopAddress.address
                        ? errors.shopAddress.address
                        : null
                      : null}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    type="text"
                    name="city"
                    onChange={handleShopAddressChange}
                    value={
                      editedCustomer.shopAddress
                        ? editedCustomer.shopAddress.city
                        : null
                    }
                    invalid={
                      errors.shopAddress
                        ? errors.shopAddress.city
                          ? true
                          : false
                        : false
                    }
                  />
                  <FormFeedback>
                    {errors.shopAddress
                      ? errors.shopAddress.city
                        ? errors.shopAddress.city
                        : null
                      : null}
                  </FormFeedback>
                </FormGroup>
              </div>
              <div className="shop-state-zipcode-div">
                <FormGroup>
                  <Label for="state">State</Label>
                  <Input
                    type="text"
                    name="state"
                    onChange={handleShopAddressChange}
                    value={
                      editedCustomer.shopAddress
                        ? editedCustomer.shopAddress.state
                        : null
                    }
                    invalid={
                      errors.shopAddress
                        ? errors.shopAddress.state
                          ? true
                          : false
                        : false
                    }
                  />
                  <FormFeedback>
                    {errors.shopAddress
                      ? errors.shopAddress.state
                        ? errors.shopAddress.state
                        : null
                      : null}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="zipcode">Zip Code</Label>
                  <Input
                    type="text"
                    name="zipcode"
                    onChange={handleShopAddressChange}
                    value={
                      editedCustomer.shopAddress
                        ? editedCustomer.shopAddress.zipcode
                        : null
                    }
                    invalid={
                      errors.shopAddress
                        ? errors.shopAddress.zipcode
                          ? true
                          : false
                        : false
                    }
                  />
                  <FormFeedback>
                    {errors.shopAddress
                      ? errors.shopAddress.zipcode
                        ? errors.shopAddress.zipcode
                        : null
                      : null}
                  </FormFeedback>
                </FormGroup>
              </div>
            </div>
            <Label for="billing-contact" className="form-label">
              Billing Contact
            </Label>
            <div className="billing-contact-name">
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  onChange={handleBillingContactChange}
                  value={
                    editedCustomer.billingContact
                      ? editedCustomer.billingContact.firstname
                      : null
                  }
                  invalid={
                    errors.billingContact
                      ? errors.billingContact.firstName
                        ? true
                        : false
                      : false
                  }
                />
                <FormFeedback>
                  {errors.billingContact
                    ? errors.billingContact.firstName
                      ? errors.billingContact.firstName
                      : null
                    : null}
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  onChange={handleBillingContactChange}
                  value={
                    editedCustomer.billingContact
                      ? editedCustomer.billingContact.lastName
                      : null
                  }
                  invalid={
                    errors.billingContact
                      ? errors.billingContact.lastName
                        ? true
                        : false
                      : false
                  }
                />
                <FormFeedback>
                  {errors.billingContact
                    ? errors.billingContact.lastName
                      ? errors.billingContact.lastName
                      : null
                    : null}
                </FormFeedback>
              </FormGroup>
            </div>
            <div className="billing-phone-div">
              <div className="billing-office-phone-div">
                <FormGroup className="billing-number">
                  <Label for="billingOfficeNumber">Office Phone Number</Label>
                  <Input
                    type="text"
                    name="billingOfficeNumber"
                    placeholder="XXX-XXX-XXXX"
                    onChange={handleChange}
                    value={editedCustomer.billingOfficeNumber}
                    invalid={errors.billingOfficeNumber ? true : false}
                  />
                  <FormFeedback>{errors.billingOfficeNumber}</FormFeedback>
                </FormGroup>
                <FormGroup className="billing-ext">
                  <Label for="billingExt">ext.</Label>
                  <Input
                    type="text"
                    name="billingExt"
                    onChange={handleChange}
                    value={editedCustomer.billingExt}
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <Label for="billingCellNumber">Cell Phone Number</Label>
                <Input
                  type="text"
                  name="billingCellNumber"
                  placeholder="XXX-XXX-XXXX"
                  onChange={handleChange}
                  value={editedCustomer.billingCellNumber}
                  invalid={errors.billingCellNumber ? true : false}
                />
                <FormFeedback>{errors.billingCellNumber}</FormFeedback>
              </FormGroup>
            </div>
            <div className="billing-email-jobTitle-div">
              <FormGroup>
                <Label for="billingEmail">Email</Label>
                <Input
                  type="text"
                  name="billingEmail"
                  placeholder="example@example.com"
                  onChange={handleChange}
                  value={editedCustomer.billingEmail}
                  invalid={errors.billingEmail ? true : false}
                />
                <FormFeedback>{errors.billingEmail}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="billingJobTitle">Job Title</Label>
                <Input
                  type="text"
                  name="billingJobTitle"
                  onChange={handleChange}
                  value={editedCustomer.billingJobTitle}
                  invalid={errors.billingJobTitle ? true : false}
                />
                <FormFeedback>{errors.billingJobTitle}</FormFeedback>
              </FormGroup>
            </div>
            <Label for="billing-address" className="form-label">
              Billing Address
            </Label>
            <div className="billing-address">
              <div className="billing-address-city-div">
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    type="text"
                    name="address"
                    onChange={handleBillingAddressChange}
                    value={
                      editedCustomer.billingAddress
                        ? editedCustomer.billingAddress.address
                        : null
                    }
                    invalid={
                      errors.billingAddress
                        ? errors.billingAddress.address
                          ? true
                          : false
                        : false
                    }
                  />
                  <FormFeedback>
                    {errors.billingAddress
                      ? errors.billingAddress.address
                        ? errors.billingAddress.address
                        : null
                      : null}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    type="text"
                    name="city"
                    onChange={handleBillingAddressChange}
                    value={
                      editedCustomer.billingAddress
                        ? editedCustomer.billingAddress.city
                        : null
                    }
                    invalid={
                      errors.billingAddress
                        ? errors.billingAddress.city
                          ? true
                          : false
                        : false
                    }
                  />
                  <FormFeedback>
                    {errors.billingAddress
                      ? errors.billingAddress.city
                        ? errors.billingAddress.city
                        : null
                      : null}
                  </FormFeedback>
                </FormGroup>
              </div>
              <div className="billing-state-zipcode-div">
                <FormGroup>
                  <Label for="state">State</Label>
                  <Input
                    type="text"
                    name="state"
                    onChange={handleBillingAddressChange}
                    value={
                      editedCustomer.billingAddress
                        ? editedCustomer.billingAddress.state
                        : null
                    }
                    invalid={
                      errors.billingAddress
                        ? errors.billingAddress.state
                          ? true
                          : false
                        : false
                    }
                  />
                  <FormFeedback>
                    {errors.billingAddress
                      ? errors.billingAddress.state
                        ? errors.billingAddress.state
                        : null
                      : null}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="zipcode">Zip Code</Label>
                  <Input
                    type="text"
                    name="zipcode"
                    onChange={handleBillingAddressChange}
                    value={
                      editedCustomer.billingAddress
                        ? editedCustomer.billingAddress.zipcode
                        : null
                    }
                    invalid={
                      errors.billingAddress
                        ? errors.billingAddress.zipcode
                          ? true
                          : false
                        : false
                    }
                  />
                  <FormFeedback>
                    {errors.billingAddress
                      ? errors.billingAddress.zipcode
                        ? errors.billingAddress.zipcode
                        : null
                      : null}
                  </FormFeedback>
                </FormGroup>
              </div>
            </div>
            <FormGroup className="checkbox-div">
              <Label check>
                <Input
                  type="checkbox"
                  value={editedCustomer.noBillingContact}
                  onClick={toggleBillingContact}
                />{" "}
                No Billing Contact
              </Label>
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

export default InfoTab;
