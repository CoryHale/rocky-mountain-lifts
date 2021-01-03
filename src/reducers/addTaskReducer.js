import { ADD_TASK_START, ADD_TASK_SUCCESS, ADD_TASK_FAILURE } from "../actions";

const initialState = {
  adding: false,
  success: false,
  errors: null,
};

export const addTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_START:
      return {
        ...state,
        adding: true,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        adding: false,
        success: true,
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
        adding: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};
