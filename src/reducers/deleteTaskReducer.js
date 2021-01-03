import {
    DELETE_TASK_START,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE,
  } from "../actions";
  
  const initialState = {
    deleting: false,
    success: false,
    errors: null,
  };
  
  export const deleteTaskReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_TASK_START:
        return {
          ...state,
          deleting: true,
        };
      case DELETE_TASK_SUCCESS:
        return {
          ...state,
          deleting: false,
          success: true,
        };
      case DELETE_TASK_FAILURE:
        return {
          ...state,
          deleting: false,
          errors: action.payload,
        };
      default:
        return state;
    }
  };