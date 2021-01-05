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
import { registerCustomer } from "../../actions/registerCustomer";

import "../../styles/sidebar.scss";

const AddCustomerBtn = () => {
  const [customer, setCustomer] = useState({
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
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const getErrors = useSelector(
    (state) => state.registerCustomerReducer.errors
  );
  const getSuccess = useSelector(
    (state) => state.registerCustomerReducer.success
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
      setCustomer({
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
    }
  }, [success]);

  const toggle = () => {
    if (isOpen) {
      setCustomer({
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
    }
    setIsOpen(!isOpen);
    setErrors({});
  };

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setCustomer({
      ...customer,
      [e.name]: e.value,
    });
  };

  const handlePrimaryContactChange = (e) => {
    setCustomer({
      ...customer,
      primaryContact: {
        ...customer.primaryContact,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleBillingContactChange = (e) => {
    setCustomer({
      ...customer,
      billingContact: {
        ...customer.billingContact,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleShopAddressChange = (e) => {
    setCustomer({
      ...customer,
      shopAddress: {
        ...customer.shopAddress,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleBillingAddressChange = (e) => {
    setCustomer({
      ...customer,
      billingAddress: {
        ...customer.billingAddress,
        [e.target.name]: e.target.value,
      },
    });
  };

  const toggleBillingContact = (e) => {
    setCustomer({
      ...customer,
      noBillingContact: !customer.noBillingContact,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerCustomer(customer));
  };

  return (
    <div className="add-customer-div">
      <Button color="success" onClick={toggle}>
        Add Customer
      </Button>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Customer</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit} className="add-customer-form">
            <FormGroup>
              <Label for="businessName">Business Name</Label>
              <Input
                type="text"
                name="businessName"
                onChange={handleChange}
                invalid={errors.businessName ? true : false}
              />
              <FormFeedback>{errors.businessName}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="industry">Industry</Label>
              <Select
                options={options}
                name="industry"
                onChange={handleSelectChange}
              />
              <Input
                type="hidden"
                disabled
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
                <Input type="checkbox" onClick={toggleBillingContact} /> No
                Billing Contact
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

export default AddCustomerBtn;

const options = [
  {
    label: "Light Duty Auto Shop",
    value: "Light Duty Auto Shop",
  },
  {
    label: "Heavy Duty Auto Shop",
    value: "Heavy Duty Auto Shop",
  },
  {
    label: "Paint Suppliers",
    value: "Paint Suppliers",
  },
  {
    label: "Collision/Auto Body",
    value: "Collision/Auto Body",
  },
  {
    label: "Industrial Equipment",
    value: "Industrial Equipment",
  },
  {
    label: "Residential",
    value: "Heavy Duty",
  },
  {
    label: "Residential",
    value: "Heavy Duty",
  },
  {
    label: "Automobiles and Parts",
    value: "Automobiles and Parts",
  },
  {
    label: "Aerospace and Defense",
    value: "Aerospace and Defense",
  },
  {
    label: "Light Duty Dealership",
    value: "Light Duty Dealership",
  },
];
