import { OPEN_WORK_ORDERS, CLOSE_WORK_ORDERS } from "../actions";

const initialState = {
  open: true,
};

export const workOrderToggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_WORK_ORDERS:
      return {
        ...state,
        open: true,
      };
    case CLOSE_WORK_ORDERS:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};
