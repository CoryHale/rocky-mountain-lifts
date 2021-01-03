import { ADD_EVENT_START, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE } from "../actions";

const initialState = {
  adding: false,
  success: false,
  errors: null,
};

export const addEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT_START:
      return {
        ...state,
        adding: true,
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        adding: false,
        success: true,
      };
    case ADD_EVENT_FAILURE:
      return {
        ...state,
        adding: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};