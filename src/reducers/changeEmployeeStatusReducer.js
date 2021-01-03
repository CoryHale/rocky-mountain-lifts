import {
  CHANGE_EMPLOYEE_STATUS_START,
  CHANGE_EMPLOYEE_STATUS_SUCCESS,
  CHANGE_EMPLOYEE_STATUS_FAILURE,
} from "../actions";

const initialState = {
  changingStatus: false,
  success: false,
  errors: null,
};

export const changeEmployeeStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EMPLOYEE_STATUS_START:
      return {
        ...state,
        changingStatus: true,
      };
    case CHANGE_EMPLOYEE_STATUS_SUCCESS:
      return {
        ...state,
        changingStatus: false,
        success: true,
      };
    case CHANGE_EMPLOYEE_STATUS_FAILURE:
      return {
        ...state,
        changingStatus: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};
