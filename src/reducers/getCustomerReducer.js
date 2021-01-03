import {
  GET_CUSTOMER_START,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAILURE,
} from "../actions";

const initialState = {
  customer: null,
  gettingCustomer: false,
  error: null,
};

export const getCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_START:
      return {
        ...state,
        gettingCustomer: true,
      };
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        gettingCustomer: false,
        customer: action.payload,
      };
    case GET_CUSTOMER_FAILURE:
      return {
        ...state,
        gettingCustomer: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
