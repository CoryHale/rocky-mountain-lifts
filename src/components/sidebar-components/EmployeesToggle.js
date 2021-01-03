import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCurrentEmployees,
  toggleAllEmployees,
} from "../../actions/employeesToggle";
import { Button, ButtonGroup } from "reactstrap";

import "../../styles/sidebar.scss";

const EmployeesToggle = () => {
  const all = useSelector((state) => state.employeesToggleReducer.all);
  const dispatch = useDispatch();

  return (
    <div className="task-btns">
      <ButtonGroup>
        <Button
          onClick={() => dispatch(toggleCurrentEmployees())}
          active={all === false}
        >
          Current
        </Button>
        <Button
          onClick={() => dispatch(toggleAllEmployees())}
          active={all === true}
        >
          All
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default EmployeesToggle;
