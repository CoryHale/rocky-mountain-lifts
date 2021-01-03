export const CALENDAR_VIEW = "CALENDAR_VIEW";
export const LIST_VIEW = "LIST_VIEW";

export const toggleCalendarView = () => async (dispatch) => {
  dispatch({ type: CALENDAR_VIEW });
};

export const toggleListView = () => async (dispatch) => {
  dispatch({ type: LIST_VIEW });
};
