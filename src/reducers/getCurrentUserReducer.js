import {
  GET_CURRENT_USER_START,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILED,
} from "../actions";

const initialState = {
  currentUser: null,
  gettingCurrentUser: false,
  error: null,
};

export const getCurrentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_START:
      return {
        ...state,
        gettingCurrentUser: true,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        gettingCurrentUser: false,
        currentUser: action.payload,
      };
    case GET_CURRENT_USER_FAILED:
      return {
        ...state,
        gettingCurrentUser: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
