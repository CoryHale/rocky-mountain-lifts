import { OPEN_JOBS, CLOSE_JOBS } from "../actions";

const initialState = {
  open: true,
};

export const jobToggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_JOBS:
      return {
        ...state,
        open: true,
      };
    case CLOSE_JOBS:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};
