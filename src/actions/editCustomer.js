import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const EDIT_CUSTOMER_START = "EDIT_CUSTOMER_START";
export const EDIT_CUSTOMER_SUCCESS = "EDIT_CUSTOMER_SUCCESS";
export const EDIT_CUSTOMER_FAILURE = "EDIT_CUSTOMER_FAILURE";

export const editCustomer = (data) => async (dispatch) => {
  dispatch({ type: EDIT_CUSTOMER_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .put(`${dbUrl}/customer`, data)
    .then(() => {
      dispatch({
        type: EDIT_CUSTOMER_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_CUSTOMER_FAILURE,
        payload: err.response.data,
      });
    });
};
