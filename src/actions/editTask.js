import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const EDIT_TASK_START = "EDIT_TASK_START";
export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
export const EDIT_TASK_FAILURE = "EDIT_TASK_FAILURE";

export const editTask = (data) => async (dispatch) => {
  dispatch({ type: EDIT_TASK_START });

  console.log(data)

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .put(`${dbUrl}/task`, data)
    .then(() => {
      dispatch({
        type: EDIT_TASK_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_TASK_FAILURE,
        payload: err.response.data,
      });
    });
};