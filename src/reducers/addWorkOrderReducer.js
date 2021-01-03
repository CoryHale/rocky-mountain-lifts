import {
  ADD_WORK_ORDER_START,
  ADD_WORK_ORDER_SUCCESS,
  ADD_WORK_ORDER_FAILURE,
} from "../actions";

const initialState = {
  adding: false,
  success: false,
  errors: null,
};

export const addWorkOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORK_ORDER_START:
      return {
        ...state,
        adding: true,
      };
    case ADD_WORK_ORDER_SUCCESS:
      return {
        ...state,
        adding: false,
        success: true,
      };
    case ADD_WORK_ORDER_FAILURE:
      return {
        ...state,
        adding: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};
