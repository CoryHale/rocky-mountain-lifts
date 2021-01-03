import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openJobs, closeJobs } from "../../actions/jobToggle";
import { Button, ButtonGroup } from "reactstrap";

import "../../styles/sidebar.scss";

const JobToggle = () => {
  const open = useSelector((state) => state.jobToggleReducer.open);
  const dispatch = useDispatch();

  return (
    <div className="task-btns">
      <ButtonGroup>
        <Button onClick={() => dispatch(openJobs())} active={open === true}>
          Open
        </Button>
        <Button onClick={() => dispatch(closeJobs())} active={open === false}>
          Closed
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default JobToggle;
