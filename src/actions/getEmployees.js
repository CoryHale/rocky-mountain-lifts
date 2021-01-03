import { dbUrl } from "./index";
import axiosWithAuth from "../contexts/withAuth";

export const GET_EMPLOYEES_START = "GET_EMPLOYEES_START";
export const GET_EMPLOYEES_SUCCESS = "GET_EMPLOYEES_SUCCESS";
export const GET_EMPLOYEES_FAILURE = "GET_EMPLOYEES_FAILURE";

export const getEmployees = () => async (dispatch) => {
  dispatch({ type: GET_EMPLOYEES_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .get(`${dbUrl}/employees`)
    .then((res) => {
      dispatch({
        type: GET_EMPLOYEES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_EMPLOYEES_FAILURE,
        payload: err,
      });
    });
};
