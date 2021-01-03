import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const EDIT_EMPLOYEE_START = "EDIT_EMPLOYEE_START";
export const EDIT_EMPLOYEE_SUCCESS = "EDIT_EMPLOYEE_SUCCESS";
export const EDIT_EMPLOYEE_FAILURE = "EDIT_EMPLOYEE_FAILURE";

export const editEmployee = (data) => async (dispatch) => {
  dispatch({ type: EDIT_EMPLOYEE_START });

  return await axiosWithAuth()
    .put(`${dbUrl}/employee`, data)
    .then(() => {
      dispatch({
        type: EDIT_EMPLOYEE_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_EMPLOYEE_FAILURE,
        payload: err.response.data,
      });
    });
};
