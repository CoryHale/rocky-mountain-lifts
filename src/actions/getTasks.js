import { dbUrl } from "./index";
import axiosWithAuth from "../contexts/withAuth";

export const GET_TASKS_START = "GET_TASKS_START";
export const GET_TASKS_SUCCESS = "GET_TASKS_SUCCESS";
export const GET_TASKS_FAILURE = "GET_TASKS_FAILURE";

export const getTasks = () => async (dispatch) => {
  dispatch({ type: GET_TASKS_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .get(`${dbUrl}/tasks`)
    .then((res) => {
      dispatch({
        type: GET_TASKS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_TASKS_FAILURE,
        payload: err,
      });
    });
};
