import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const EDIT_WORK_ORDER_START = "EDIT_WORK_ORDER_START";
export const EDIT_WORK_ORDER_SUCCESS = "EDIT_WORK_ORDER_SUCCESS";
export const EDIT_WORK_ORDER_FAILURE = "EDIT_WORK_ORDER_FAILURE";

export const editWorkOrder = (data) => async (dispatch) => {
  dispatch({ type: EDIT_WORK_ORDER_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .put(`${dbUrl}/work_order`, data)
    .then(() => {
      dispatch({
        type: EDIT_WORK_ORDER_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_WORK_ORDER_FAILURE,
        payload: err.response.data,
      });
    });
};