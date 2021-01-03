import {
  REGISTER_EMPLOYEE_START,
  REGISTER_EMPLOYEE_SUCCESS,
  REGISTER_EMPLOYEE_FAILURE,
} from "../actions";

const initialState = {
  registering: false,
  success: false,
  errors: null,
};

export const registerEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_EMPLOYEE_START:
      return {
        ...state,
        registering: true,
      };
    case REGISTER_EMPLOYEE_SUCCESS:
      return {
        ...state,
        registering: false,
        success: true,
      };
    case REGISTER_EMPLOYEE_FAILURE:
      return {
        ...state,
        registering: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};
