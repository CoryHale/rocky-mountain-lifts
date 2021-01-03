import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Task from "../content-components/Task";
import Calendar from "../content-components/Calendar";
import OpenWorkOrders from "../content-components/OpenWorkOrders";
import ClosedWorkOrders from "../content-components/ClosedWorkOrders";
import WorkOrder from "../content-components/WorkOrder";
import Customers from "../content-components/Customers";
import Customer from "../content-components/Customer";
import CurrentEmployees from "../content-components/CurrentEmployees";
import AllEmployees from "../content-components/AllEmployees";

import "../../styles/content.scss";

const Content = () => {
  const taskView = useSelector((state) => state.taskToggleReducer.calendarView);
  const openWorkOrders = useSelector(
    (state) => state.workOrderToggleReducer.open
  );
  const allEmployees = useSelector((state) => state.employeesToggleReducer.all);

  return (
    <div className="content">
      <Switch>
        <Route exact path="/dashboard">
          {!taskView ? <Task /> : <Calendar />}
        </Route>
        <Route exact path="/dashboard/workorders">
          {openWorkOrders ? <OpenWorkOrders /> : <ClosedWorkOrders />}
        </Route>
        <Route exact path="/dashboard/workorders/:id">
          <WorkOrder />
        </Route>
        <Route exact path="/dashboard/customers">
          <Customers />
        </Route>
        <Route exact path="/dashboard/customers/:id">
          <Customer />
        </Route>
        <Route exact path="/dashboard/employees">
          {!allEmployees ? <CurrentEmployees /> : <AllEmployees />}
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
