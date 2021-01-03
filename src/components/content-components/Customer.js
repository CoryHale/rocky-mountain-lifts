import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import InfoTab from "../customer-page-components/InfoTab";
import TaskTab from "../customer-page-components/TaskTab";
import AppointmentTab from "../customer-page-components/AppointmentTab";
import NoteTab from "../customer-page-components/NoteTab";
import EmployeeTab from "../customer-page-components/EmployeeTab";
import LiftTab from "../customer-page-components/LiftTab";
import DocumentTab from "../customer-page-components/DocumentTab";
import { getCustomer } from "../../actions/getCustomer";

import "../../styles/customer.scss";
import classnames from "classnames";

const CustomerPage = () => {
  const [customer, setCustomer] = useState({});
  const getCustomerFromState = useSelector(
    (state) => state.getCustomerReducer.customer
  );
  const [activeTab, setActiveTab] = useState("1");
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

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="customer-page customer-page-content">
      <h1>{customer.businessName}</h1>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggleTab("1");
            }}
          >
            Info
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggleTab("2");
            }}
          >
            Tasks
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggleTab("3");
            }}
          >
            Appointments
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggleTab("4");
            }}
          >
            Notes
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggleTab("5");
            }}
          >
            Employees
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "6" })}
            onClick={() => {
              toggleTab("6");
            }}
          >
            Lifts
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "7" })}
            onClick={() => {
              toggleTab("7");
            }}
          >
            Documents
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <InfoTab />
        </TabPane>
        <TabPane tabId="2">
          <TaskTab />
        </TabPane>
        <TabPane tabId="3">
          <AppointmentTab />
        </TabPane>
        <TabPane tabId="4">
          <NoteTab />
        </TabPane>
        <TabPane tabId="5">
          <EmployeeTab />
        </TabPane>
        <TabPane tabId="6">
          <LiftTab />
        </TabPane>
        <TabPane tabId="7">
          <DocumentTab />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default CustomerPage;
