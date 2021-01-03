import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const REGISTER_EMPLOYEE_START = "REGISTER_EMPLOYEE_START";
export const REGISTER_EMPLOYEE_SUCCESS = "REGISTER_EMPLOYEE_SUCCESS";
export const REGISTER_EMPLOYEE_FAILURE = "REGISTER_EMPLOYEE_FAILURE";

export const registerEmployee = (creds) => async (dispatch) => {
  dispatch({ type: REGISTER_EMPLOYEE_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .post(`${dbUrl}/e_register`, creds)
    .then(() => {
      dispatch({
        type: REGISTER_EMPLOYEE_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_EMPLOYEE_FAILURE,
        payload: err.response.data,
      });
    });
};
