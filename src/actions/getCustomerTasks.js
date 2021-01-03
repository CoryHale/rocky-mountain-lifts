import { dbUrl } from "./index";
import axiosWithAuth from "../contexts/withAuth";

export const GET_CUSTOMER_TASKS_START = "GET_CUSTOMER_TASKS_START";
export const GET_CUSTOMER_TASKS_SUCCESS = "GET_CUSTOMER_TASKS_SUCCESS";
export const GET_CUSTOMER_TASKS_FAILURE = "GET_CUSTOMER_TASKS_FAILURE";

export const getCustomerTasks = (customerId) => async (dispatch) => {
  dispatch({ type: GET_CUSTOMER_TASKS_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .get(`${dbUrl}/customer_tasks/${customerId}`)
    .then((res) => {
      dispatch({
        type: GET_CUSTOMER_TASKS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CUSTOMER_TASKS_FAILURE,
        payload: err,
      });
    });
};
