import { dbUrl } from "./index";
import axiosWithAuth from "../contexts/withAuth";

export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS_START });

  const axiosAuth = await axiosWithAuth();

  return await axiosAuth
    .get(`${dbUrl}/users`)
    .then((res) => {
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_USERS_FAILURE,
        payload: err,
      });
    });
};
