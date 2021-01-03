import { ADD_NOTE_START, ADD_NOTE_SUCCESS, ADD_NOTE_FAILURE } from "../actions";

const initialState = {
  adding: false,
  success: false,
  errors: null,
};

export const addNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE_START:
      return {
        ...state,
        adding: true,
      };
    case ADD_NOTE_SUCCESS:
      return {
        ...state,
        adding: false,
        success: true,
      };
    case ADD_NOTE_FAILURE:
      return {
        ...state,
        adding: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};