import { dbUrl } from "./index";
import axiosWithAuth from "../contexts/withAuth";

export const GET_WORK_ORDER_START = "GET_WORK_ORDER_START";
export const GET_WORK_ORDER_SUCCESS = "GET_WORK_ORDER_SUCCESS";
export const GET_WORK_ORDER_FAILURE = "GET_WORK_ORDER_FAILURE";

export const getWorkOrder = (jobId) => async (dispatch) => {
  dispatch({ type: GET_WORK_ORDER_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .get(`${dbUrl}/work_order/${jobId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_WORK_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_WORK_ORDER_FAILURE,
        payload: err,
      });
    });
};
