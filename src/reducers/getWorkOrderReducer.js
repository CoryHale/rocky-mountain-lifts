import {
  GET_WORK_ORDER_START,
  GET_WORK_ORDER_SUCCESS,
  GET_WORK_ORDER_FAILURE,
} from "../actions";

const initialState = {
  workOrder: null,
  users: [],
  gettingWorkOrder: false,
  error: null,
};

export const getWorkOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORK_ORDER_START:
      return {
        ...state,
        gettingWorkOrder: true,
      };
    case GET_WORK_ORDER_SUCCESS:
      return {
        ...state,
        gettingWorkOrder: false,
        workOrder: action.payload.workOrder,
        users: action.payload.responseArray,
      };
    case GET_WORK_ORDER_FAILURE:
      return {
        ...state,
        gettingWorkOrder: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
