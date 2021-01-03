import {
    EDIT_TASK_START,
    EDIT_TASK_SUCCESS,
    EDIT_TASK_FAILURE,
  } from "../actions";
  
  const initialState = {
    editing: false,
    success: false,
    errors: null,
  };
  
  export const editTaskReducer = (state = initialState, action) => {
    switch (action.type) {
      case EDIT_TASK_START:
        return {
          ...state,
          editing: true,
        };
      case EDIT_TASK_SUCCESS:
        return {
          ...state,
          editing: false,
          success: true,
        };
      case EDIT_TASK_FAILURE:
        return {
          ...state,
          editing: false,
          errors: action.payload,
        };
      default:
        return state;
    }
  };