import axiosWithAuth from "../contexts/withAuth";
import { dbUrl } from "./index";

export const REGISTER_CUSTOMER_START = "REGISTER_CUSTOMER_START";
export const REGISTER_CUSTOMER_SUCCESS = "REGISTER_CUSTOMER_SUCCESS";
export const REGISTER_CUSTOMER_FAILURE = "REGISTER_CUSTOMER_FAILURE";

export const registerCustomer = (creds) => async (dispatch) => {
  dispatch({ type: REGISTER_CUSTOMER_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .post(`${dbUrl}/c_register`, creds)
    .then(() => {
      dispatch({
        type: REGISTER_CUSTOMER_SUCCESS,
        payload: "SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_CUSTOMER_FAILURE,
        payload: err.response.data,
      });
    });
};
