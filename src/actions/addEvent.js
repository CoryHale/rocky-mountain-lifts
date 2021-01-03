import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const ADD_EVENT_START = "ADD_EVENT_START";
export const ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS";
export const ADD_EVENT_FAILURE = "ADD_EVENT_FAILURE";

export const addEvent = (event) => async (dispatch) => {
  dispatch({ type: ADD_EVENT_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .post(`${dbUrl}/events`, event)
    .then(() => {
      dispatch({
        type: ADD_EVENT_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_EVENT_FAILURE,
        payload: err.response.data,
      });
    });
};