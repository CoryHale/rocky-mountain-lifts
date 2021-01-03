export const OPEN_JOBS = "OPEN_JOBS";
export const CLOSE_JOBS = "CLOSE_JOBS";

export const openJobs = () => async (dispatch) => {
  dispatch({ type: OPEN_JOBS });
};

export const closeJobs = () => async (dispatch) => {
  dispatch({ type: CLOSE_JOBS });
};