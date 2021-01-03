import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCalendarView, toggleListView } from "../../actions/taskToggle";
import { Button, ButtonGroup } from "reactstrap";

import "../../styles/sidebar.scss";

const TaskToggle = () => {
  const calendarView = useSelector(state => state.taskToggleReducer.calendarView);
  const dispatch = useDispatch();

  const toggleList = () => {
    dispatch(toggleListView())
  };

  const toggleCalendar = () => {
    dispatch(toggleCalendarView());
  };

  return (
    <div className="task-btns">
      <ButtonGroup>
        <Button onClick={toggleList} active={calendarView === false}>
          List
        </Button>
        <Button
          onClick={toggleCalendar}
          active={calendarView === true}
        >
          Calendar
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TaskToggle;
