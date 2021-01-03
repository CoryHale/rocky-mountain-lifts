import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const DELETE_TASK_START = "DELETE_TASK_START";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAILURE = "DELETE_TASK_FAILURE";

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch({ type: DELETE_TASK_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .delete(`${dbUrl}/task/${taskId}`)
    .then(() => {
      dispatch({
        type: DELETE_TASK_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_TASK_FAILURE,
        payload: err.response.data,
      });
    });
};