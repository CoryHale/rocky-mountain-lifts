import {
  REGISTER_CUSTOMER_START,
  REGISTER_CUSTOMER_SUCCESS,
  REGISTER_CUSTOMER_FAILURE,
} from "../actions";

const initialState = {
  registering: false,
  success: false,
  errors: null,
};

export const registerCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_CUSTOMER_START:
      return {
        ...state,
        registering: true,
      };
    case REGISTER_CUSTOMER_SUCCESS:
      return {
        ...state,
        registering: false,
        success: true,
      };
    case REGISTER_CUSTOMER_FAILURE:
      return {
        ...state,
        registering: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};
