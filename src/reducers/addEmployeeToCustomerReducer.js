import {
  ADD_EMPLOYEE_START,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
} from "../actions";

const initialState = {
  editing: false,
  success: false,
  errors: null,
};

export const addEmployeeToCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE_START:
      return {
        ...state,
        editing: true,
      };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        editing: false,
        success: true,
      };
    case ADD_EMPLOYEE_FAILURE:
      return {
        ...state,
        editing: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};
