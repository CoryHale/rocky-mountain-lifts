import { dbUrl } from "./index";
import axiosWithAuth from "../contexts/withAuth";

export const GET_EVENTS_START = "GET_EVENTS_START";
export const GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS";
export const GET_EVENTS_FAILURE = "GET_EVENTS_FAILURE";

export const getEvents = () => async (dispatch) => {
  dispatch({ type: GET_EVENTS_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .get(`${dbUrl}/events`)
    .then((res) => {
      dispatch({
        type: GET_EVENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_EVENTS_FAILURE,
        payload: err,
      });
    });
};