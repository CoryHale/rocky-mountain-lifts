import { dbUrl } from "./index";
import axiosWithAuth from "../contexts/withAuth";

export const GET_CUSTOMERS_START = "GET_CUSTOMERS_START";
export const GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS";
export const GET_CUSTOMERS_FAILURE = "GET_CUSTOMERS_FAILURE";

export const getCustomers = () => async (dispatch) => {
  dispatch({ type: GET_CUSTOMERS_START });

  const axiosAuth = await axiosWithAuth()

  return axiosAuth
    .get(`${dbUrl}/customers`)
    .then((res) => {
      dispatch({
        type: GET_CUSTOMERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CUSTOMERS_FAILURE,
        payload: err,
      });
    });
};
