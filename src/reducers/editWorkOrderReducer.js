import {
    EDIT_WORK_ORDER_START,
    EDIT_WORK_ORDER_SUCCESS,
    EDIT_WORK_ORDER_FAILURE,
  } from "../actions";
  
  const initialState = {
    editing: false,
    success: false,
    errors: null,
  };
  
  export const editWorkOrderReducer = (state = initialState, action) => {
    switch (action.type) {
      case EDIT_WORK_ORDER_START:
        return {
          ...state,
          editing: true,
        };
      case EDIT_WORK_ORDER_SUCCESS:
        return {
          ...state,
          editing: false,
          success: true,
        };
      case EDIT_WORK_ORDER_FAILURE:
        return {
          ...state,
          editing: false,
          errors: action.payload,
        };
      default:
        return state;
    }
  };