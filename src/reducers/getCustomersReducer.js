import {
  GET_CUSTOMERS_START,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,
} from "../actions";

const initialState = {
  customers: [],
  gettingCustomers: false,
  error: null,
};

export const getCustomersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_START:
      return {
        ...state,
        gettingCustomers: true,
      };
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        gettingCustomers: false,
        customers: action.payload,
      };
    case GET_CUSTOMERS_FAILURE:
      return {
        ...state,
        gettingCustomers: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
