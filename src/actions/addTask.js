import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const ADD_TASK_START = "ADD_TASK_START";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const ADD_TASK_FAILURE = "ADD_TASK_FAILURE";

export const addTask = (task) => async (dispatch) => {
  dispatch({ type: ADD_TASK_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .post(`${dbUrl}/tasks`, task)
    .then(() => {
      dispatch({
        type: ADD_TASK_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_TASK_FAILURE,
        payload: err.response.data,
      });
    });
};
