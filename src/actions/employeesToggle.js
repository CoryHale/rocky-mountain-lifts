export const CURRENT_EMPLOYEES = "CURRENT_EMPLOYEES";
export const ALL_EMPLOYEES = "ALL_EMPLOYEES";

export const toggleCurrentEmployees = () => async (dispatch) => {
  dispatch({ type: CURRENT_EMPLOYEES });
};

export const toggleAllEmployees = () => async (dispatch) => {
  dispatch({ type: ALL_EMPLOYEES });
};
