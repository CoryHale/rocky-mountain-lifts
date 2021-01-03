import {
    DELETE_EVENT_START,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAILURE,
  } from "../actions";
  
  const initialState = {
    deleting: false,
    success: false,
    errors: null,
  };
  
  export const deleteEventReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_EVENT_START:
        return {
          ...state,
          deleting: true,
        };
      case DELETE_EVENT_SUCCESS:
        return {
          ...state,
          deleting: false,
          success: true,
        };
      case DELETE_EVENT_FAILURE:
        return {
          ...state,
          deleting: false,
          errors: action.payload,
        };
      default:
        return state;
    }
  };