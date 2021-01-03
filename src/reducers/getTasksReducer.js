import {
  GET_TASKS_START,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE,
} from "../actions";

const initialState = {
  tasks: [],
  gettingTasks: false,
  error: null,
};

export const getTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_START:
      return {
        ...state,
        gettingTasks: true,
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        gettingTasks: false,
        tasks: action.payload,
      };
    case GET_TASKS_FAILURE:
      return {
        ...state,
        gettingTasks: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
