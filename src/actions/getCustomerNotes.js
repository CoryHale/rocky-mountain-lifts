import { dbUrl } from "./index";
import axiosWithAuth from "../contexts/withAuth";

export const GET_CUSTOMER_NOTES_START = "GET_CUSTOMER_NOTES_START";
export const GET_CUSTOMER_NOTES_SUCCESS = "GET_CUSTOMER_NOTES_SUCCESS";
export const GET_CUSTOMER_NOTES_FAILURE = "GET_CUSTOMER_NOTES_FAILURE";

export const getCustomerNotes = (customerId) => async (dispatch) => {
  dispatch({ type: GET_CUSTOMER_NOTES_START });

  const axiosAuth = await axiosWithAuth();

  return axiosAuth
    .get(`${dbUrl}/notes/${customerId}`)
    .then((res) => {
      dispatch({
        type: GET_CUSTOMER_NOTES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CUSTOMER_NOTES_FAILURE,
        payload: err,
      });
    });
};
