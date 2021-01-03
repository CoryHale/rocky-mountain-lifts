import axiosWithAuth from '../contexts/withAuth';
import { dbUrl } from './index';

export const CHANGE_EMPLOYEE_STATUS_START = 'CHANGE_EMPLOYEE_STATUS_START';
export const CHANGE_EMPLOYEE_STATUS_SUCCESS = 'CHANGE_EMPLOYEE_STATUS_SUCCESS';
export const CHANGE_EMPLOYEE_STATUS_FAILURE = 'CHANGE_EMPLOYEE_STATUS_FAILURE';

export const changeEmployeeStatus = data => async dispatch => {
    dispatch({ type: CHANGE_EMPLOYEE_STATUS_START });

    return await axiosWithAuth()
        .put(`${dbUrl}/employee/status`, data)
        .then(() => {
            dispatch({ 
                type: CHANGE_EMPLOYEE_STATUS_SUCCESS,
                payload: 'SUCCESS'
            });
        })
        .catch(err => {
            dispatch({
                type: CHANGE_EMPLOYEE_STATUS_FAILURE,
                payload: err.response.data
            });
        });
};