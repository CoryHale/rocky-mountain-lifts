import {
    GET_EVENTS_START,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAILURE,
  } from "../actions";
  
  const initialState = {
    events: [],
    gettingEvents: false,
    error: null,
  };
  
  export const getEventsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_EVENTS_START:
        return {
          ...state,
          gettingEvents: true,
        };
      case GET_EVENTS_SUCCESS:
        return {
          ...state,
          gettingEvents: false,
          events: action.payload,
        };
      case GET_EVENTS_FAILURE:
        return {
          ...state,
          gettingEvents: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };