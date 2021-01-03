import {
  GET_WORK_ORDERS_START,
  GET_WORK_ORDERS_SUCCESS,
  GET_WORK_ORDERS_FAILURE,
} from "../actions";

const initialState = {
  workOrders: [],
  gettingWorkOrders: false,
  error: null,
};

export const getWorkOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORK_ORDERS_START:
      return {
        ...state,
        gettingWorkOrders: true,
      };
    case GET_WORK_ORDERS_SUCCESS:
      return {
        ...state,
        gettingWorkOrders: false,
        workOrders: action.payload,
      };
    case GET_WORK_ORDERS_FAILURE:
      return {
        ...state,
        gettingWorkOrders: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
