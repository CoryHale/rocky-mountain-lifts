import {
  GET_CUSTOMER_NOTES_START,
  GET_CUSTOMER_NOTES_SUCCESS,
  GET_CUSTOMER_NOTES_FAILURE,
} from "../actions";

const initialState = {
  notes: [],
  gettingNotes: false,
  error: null,
};

export const getCustomerNotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_NOTES_START:
      return {
        ...state,
        gettingNotes: true,
      };
    case GET_CUSTOMER_NOTES_SUCCESS:
      return {
        ...state,
        gettingNotes: false,
        notes: action.payload,
      };
    case GET_CUSTOMER_NOTES_FAILURE:
      return {
        ...state,
        gettingNotes: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
