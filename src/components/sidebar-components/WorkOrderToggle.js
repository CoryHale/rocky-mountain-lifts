import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openWorkOrders, closeWorkOrders } from "../../actions/workOrderToggle";
import { Button, ButtonGroup } from "reactstrap";

import "../../styles/sidebar.scss";

const WorkOrderToggle = () => {
  const open = useSelector((state) => state.workOrderToggleReducer.open);
  const dispatch = useDispatch();

  return (
    <div className="task-btns">
      <ButtonGroup>
        <Button
          onClick={() => dispatch(openWorkOrders())}
          active={open === true}
        >
          Open
        </Button>
        <Button
          onClick={() => dispatch(closeWorkOrders())}
          active={open === false}
        >
          Closed
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default WorkOrderToggle;
