import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const ADD_WORK_ORDER_START = "ADD_WORK_ORDER_START";
export const ADD_WORK_ORDER_SUCCESS = "ADD_WORK_ORDER_SUCCESS";
export const ADD_WORK_ORDER_FAILURE = "ADD_WORK_ORDER_FAILURE";

export const addWorkOrder = (workOrder) => async (dispatch) => {
  dispatch({ type: ADD_WORK_ORDER_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .post(`${dbUrl}/work_orders`, workOrder)
    .then(() => {
      dispatch({
        type: ADD_WORK_ORDER_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_WORK_ORDER_FAILURE,
        payload: err.response.data,
      });
    });
};
