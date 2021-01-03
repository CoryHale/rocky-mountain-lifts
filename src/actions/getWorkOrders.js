import { dbUrl } from "./index";
import axiosWithAuth from "../contexts/withAuth";

export const GET_WORK_ORDERS_START = "GET_WORK_ORDERS_START";
export const GET_WORK_ORDERS_SUCCESS = "GET_WORK_ORDERS_SUCCESS";
export const GET_WORK_ORDERS_FAILURE = "GET_WORK_ORDERS_FAILURE";

export const getWorkOrders = () => async (dispatch) => {
  dispatch({ type: GET_WORK_ORDERS_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .get(`${dbUrl}/work_orders`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_WORK_ORDERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_WORK_ORDERS_FAILURE,
        payload: err,
      });
    });
};
