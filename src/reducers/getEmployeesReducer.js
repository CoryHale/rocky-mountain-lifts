import {
  GET_EMPLOYEES_START,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
} from "../actions";

const initialState = {
  employees: [],
  gettingEmployees: false,
  error: null,
};

export const getEmployeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_START:
      return {
        ...state,
        gettingEmployees: true,
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        gettingEmployees: false,
        employees: action.payload,
      };
    case GET_EMPLOYEES_FAILURE:
      return {
        ...state,
        gettingEmployees: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
