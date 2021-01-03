import { dbUrl } from "./index";
import axiosWithAuth from "../contexts/withAuth";

export const GET_CURRENT_USER_START = "GET_CURRENT_USER_START";
export const GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS";
export const GET_CURRENT_USER_FAILED = "GET_CURRENT_USER_FAILED";

export const getCurrentUser = (uid) => async (dispatch) => {
  dispatch({ type: GET_CURRENT_USER_START });

  const axiosAuth = await axiosWithAuth();

  return await axiosAuth
    .get(`${dbUrl}/currentUser`, uid)
    .then((res) => {
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CURRENT_USER_FAILED,
        payload: err,
      });
    });
};
