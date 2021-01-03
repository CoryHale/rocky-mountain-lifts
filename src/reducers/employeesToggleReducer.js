import { CURRENT_EMPLOYEES, ALL_EMPLOYEES } from "../actions";

const initialState = {
  all: false,
};

export const employeesToggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_EMPLOYEES:
      return {
        ...state,
        all: false,
      };
    case ALL_EMPLOYEES:
      return {
        ...state,
        all: true,
      };
    default:
      return state;
  }
};
