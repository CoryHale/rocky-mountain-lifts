import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "../actions";

const initialState = {
  users: [],
  gettingUsers: false,
  error: null,
};

export const getUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_START:
      return {
        ...state,
        gettingUsers: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        gettingUsers: false,
        users: action.payload,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        gettingUsers: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
