import {
  EDIT_CUSTOMER_START,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_FAILURE,
} from "../actions";

const initialState = {
  editing: false,
  success: false,
  errors: null,
};

export const editCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_CUSTOMER_START:
      return {
        ...state,
        editing: true,
      };
    case EDIT_CUSTOMER_SUCCESS:
      return {
        ...state,
        editing: false,
        success: true,
      };
    case EDIT_CUSTOMER_FAILURE:
      return {
        ...state,
        editing: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};
