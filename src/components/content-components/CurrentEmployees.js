import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeesTable from "./EmployeesTable";
import { getEmployees } from "../../actions/getEmployees";

import '../../styles/employee.scss';

const CurrentEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployees, setCurrentEmployees] = useState([]);
  const fetchEmployees = useSelector(
    (state) => state.getEmployeesReducer.employees
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    setEmployees(fetchEmployees.employees);
  }, [fetchEmployees]);

  useEffect(() => {
    const activeEmployees = [];

    if (employees) {
      employees.filter((employee) => {
        if (employee.active === true) {
          activeEmployees.push(employee);
        }
      });
    }

    setCurrentEmployees(activeEmployees);
  }, [employees]);

  return (
    <div className="employees-page">
      <h1>Current Employees</h1>
      <EmployeesTable props={currentEmployees} />
    </div>
  );
};

export default CurrentEmployees;
