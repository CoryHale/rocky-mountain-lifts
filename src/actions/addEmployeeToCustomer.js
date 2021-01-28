import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const ADD_EMPLOYEE_START = "ADD_EMPLOYEE_START";
export const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS";
export const ADD_EMPLOYEE_FAILURE = "ADD_EMPLOYEE_FAILURE";

export const addEmployeeToCustomer = (updatedCustomer) => async (dispatch) => {
  dispatch({ type: ADD_EMPLOYEE_START });

  console.log(updatedCustomer)

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .put(`${dbUrl}/customer-employee`, updatedCustomer)
    .then(() => {
      dispatch({
        type: ADD_EMPLOYEE_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_EMPLOYEE_FAILURE,
        payload: err.response.data,
      });
    });
};
