import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const ADD_NOTE_START = "ADD_NOTE_START";
export const ADD_NOTE_SUCCESS = "ADD_NOTE_SUCCESS";
export const ADD_NOTE_FAILURE = "ADD_NOTE_FAILURE";

export const addNote = (note) => async (dispatch) => {
  dispatch({ type: ADD_NOTE_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .post(`${dbUrl}/notes`, note)
    .then(() => {
      dispatch({
        type: ADD_NOTE_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_NOTE_FAILURE,
        payload: err.response.data,
      });
    });
};