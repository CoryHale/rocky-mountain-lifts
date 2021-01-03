import { CALENDAR_VIEW, LIST_VIEW } from "../actions";

const initialState = {
  calendarView: false,
};

export const taskToggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALENDAR_VIEW:
      return {
        ...state,
        calendarView: true,
      };
    case LIST_VIEW:
      return {
        ...state,
        calendarView: false,
      };
    default:
      return state;
  }
};
