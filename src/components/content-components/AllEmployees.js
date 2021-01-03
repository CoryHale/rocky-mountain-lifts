import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EmployeesTable from "./EmployeesTable";

import "../../styles/employee.scss";

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const getEmployees = useSelector(
    (state) => state.getEmployeesReducer.employees
  );

  useEffect(() => {
    setEmployees(getEmployees.employees);
  }, [getEmployees]);

  return (
    <div className="employees-page">
      <h1>All Employees</h1>
      <EmployeesTable props={employees} />
    </div>
  );
};

export default AllEmployees;
