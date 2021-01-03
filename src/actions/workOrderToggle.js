export const OPEN_WORK_ORDERS = "OPEN_WORK_ORDERS";
export const CLOSE_WORK_ORDERS = "CLOSE_WORK_ORDERS";

export const openWorkOrders = () => async (dispatch) => {
  dispatch({ type: OPEN_WORK_ORDERS });
};

export const closeWorkOrders = () => async (dispatch) => {
  dispatch({ type: CLOSE_WORK_ORDERS });
};
