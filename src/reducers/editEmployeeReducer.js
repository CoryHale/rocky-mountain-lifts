import {
  EDIT_EMPLOYEE_START,
  EDIT_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_FAILURE,
} from "../actions";

const initialState = {
  editing: false,
  success: false,
  errors: null,
};

export const editEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_EMPLOYEE_START:
      return {
        ...state,
        editing: true,
      };
    case EDIT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        editing: false,
        success: true,
      };
    case EDIT_EMPLOYEE_FAILURE:
      return {
        ...state,
        editing: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};
