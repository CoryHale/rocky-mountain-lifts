import {
    DELETE_WORK_ORDER_START,
    DELETE_WORK_ORDER_SUCCESS,
    DELETE_WORK_ORDER_FAILURE,
  } from "../actions";
  
  const initialState = {
    deleting: false,
    success: false,
    errors: null,
  };
  
  export const deleteWorkOrderReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_WORK_ORDER_START:
        return {
          ...state,
          deleting: true,
        };
      case DELETE_WORK_ORDER_SUCCESS:
        return {
          ...state,
          deleting: false,
          success: true,
        };
      case DELETE_WORK_ORDER_FAILURE:
        return {
          ...state,
          deleting: false,
          errors: action.payload,
        };
      default:
        return state;
    }
  };