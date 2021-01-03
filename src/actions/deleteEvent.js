import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const DELETE_EVENT_START = "DELETE_EVENT_START";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const DELETE_EVENT_FAILURE = "DELETE_EVENT_FAILURE";

export const deleteEvent = (eventId) => async (dispatch) => {
  dispatch({ type: DELETE_EVENT_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .delete(`${dbUrl}/event/${eventId}`)
    .then(() => {
      dispatch({
        type: DELETE_EVENT_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_EVENT_FAILURE,
        payload: err.response.data,
      });
    });
};