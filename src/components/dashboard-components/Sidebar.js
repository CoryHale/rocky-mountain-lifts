import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Search from "../sidebar-components/Search";
import TaskToggle from "../sidebar-components/TaskToggle";
import AddTaskBtn from "../sidebar-components/AddTaskBtn";
import AddEventBtn from "../sidebar-components/AddEventBtn";
import WorkOrderToggle from "../sidebar-components/WorkOrderToggle";
import AddWorkOrderBtn from "../sidebar-components/AddWorkOrderBtn";
import JobToggle from "../sidebar-components/JobToggle";
import AddCustomerBtn from "../sidebar-components/AddCustomerBtn";
import EmployeesToggle from "../sidebar-components/EmployeesToggle";
import AddEmployeeBtn from "../sidebar-components/AddEmployeeBtn";

import "../../styles/sidebar.scss";

const Sidebar = () => {
  const calendarView = useSelector(
    (state) => state.taskToggleReducer.calendarView
  );

  return (
    <div className="sidebar">
      <Search />
      <Switch>
        <Route exact path={["/dashboard", "/dashboard/calendar"]}>
          <TaskToggle />
          <AddTaskBtn />
          {calendarView ? <AddEventBtn /> : null}
        </Route>
        <Route exact path="/dashboard/workorders">
          <WorkOrderToggle />
          <AddWorkOrderBtn />
        </Route>
        <Route exact path="/dashboard/jobs">
          <JobToggle />
        </Route>
        <Route exact path="/dashboard/customers">
          <AddCustomerBtn />
        </Route>
        <Route exact path="/dashboard/employees">
          <EmployeesToggle />
          <AddEmployeeBtn />
        </Route>
      </Switch>
    </div>
  );
};

export default Sidebar;
