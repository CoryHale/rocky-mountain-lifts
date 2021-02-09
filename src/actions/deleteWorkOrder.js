import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const DELETE_WORK_ORDER_START = "DELETE_WORK_ORDER_START";
export const DELETE_WORK_ORDER_SUCCESS = "DELETE_WORK_ORDER_SUCCESS";
export const DELETE_WORK_ORDER_FAILURE = "DELETE_WORK_ORDER_FAILURE";

export const deleteWorkOrder = (workOrderId) => async (dispatch) => {
  dispatch({ type: DELETE_WORK_ORDER_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .delete(`${dbUrl}/work_order/${workOrderId}`)
    .then(() => {
      dispatch({
        type: DELETE_WORK_ORDER_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_WORK_ORDER_FAILURE,
        payload: err.response.data,
      });
    });
};