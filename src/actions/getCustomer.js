import { dbUrl } from './index';
import axiosWithAuth from '../contexts/withAuth';

export const GET_CUSTOMER_START = 'GET_CUSTOMER_START';
export const GET_CUSTOMER_SUCCESS = 'GET_CUSTOMER_SUCCESS';
export const GET_CUSTOMER_FAILURE = 'GET_CUSTOMER_FAILURE';

export const getCustomer = customerId => async dispatch => {
    dispatch({ type: GET_CUSTOMER_START });

    const axiosAuth = await axiosWithAuth();

    return axiosAuth
        .get(`${dbUrl}/customer/${customerId}`)
        .then(res => {
            dispatch({
                type: GET_CUSTOMER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_CUSTOMER_FAILURE,
                payload: err
            });
        });
};