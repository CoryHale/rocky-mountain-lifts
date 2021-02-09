// USER ACTIONS

export {
  GET_CURRENT_USER_START,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILED,
  getCurrentUser,
} from "./getCurrentUser";

export {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  getUsers,
} from "./getUsers";

// TASK ACTIONS

export {
  CALENDAR_VIEW,
  LIST_VIEW,
  toggleCalendarView,
  toggleListView,
} from "./taskToggle";

export {
  ADD_TASK_START,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  addTask,
} from "./addTask";

export {
  GET_TASKS_START,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE,
  getTasks,
} from "./getTasks";

export {
  EDIT_TASK_START,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAILURE,
  editTask,
} from "./editTask";

export {
  DELETE_TASK_START,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  deleteTask,
} from "./deleteTask";

// EVENT ACTIONS

export {
  ADD_EVENT_START,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  addEvent,
} from "./addEvent";

export {
  GET_EVENTS_START,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  getEvents,
} from "./getEvents";

export {
  DELETE_EVENT_START,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  deleteEvent,
} from "./deleteEvent";

// WORK ORDER ACTIONS

export {
  OPEN_WORK_ORDERS,
  CLOSE_WORK_ORDERS,
  openWorkOrders,
  closeWorkOrders,
} from "./workOrderToggle";

export {
  ADD_WORK_ORDER_START,
  ADD_WORK_ORDER_SUCCESS,
  ADD_WORK_ORDER_FAILURE,
  addWorkOrder,
} from "./addWorkOrder";

export {
  GET_WORK_ORDERS_START,
  GET_WORK_ORDERS_SUCCESS,
  GET_WORK_ORDERS_FAILURE,
  getWorkOrders,
} from "./getWorkOrders";

export {
  GET_WORK_ORDER_START,
  GET_WORK_ORDER_SUCCESS,
  GET_WORK_ORDER_FAILURE,
  getWorkOrder,
} from "./getWorkOrder";

export {
  EDIT_WORK_ORDER_START,
  EDIT_WORK_ORDER_SUCCESS,
  EDIT_WORK_ORDER_FAILURE,
  editWorkOrder,
} from "./editWorkOrder";

export {
  DELETE_WORK_ORDER_START,
  DELETE_WORK_ORDER_SUCCESS,
  DELETE_WORK_ORDER_FAILURE,
  deleteWorkOrder,
} from "./deleteWorkOrder";

// JOB ACTIONS

export { OPEN_JOBS, CLOSE_JOBS, openJobs, closeJobs } from "./jobToggle";

// CUSTOMER ACTIONS

export {
  REGISTER_CUSTOMER_START,
  REGISTER_CUSTOMER_SUCCESS,
  REGISTER_CUSTOMER_FAILURE,
  registerCustomer,
} from "./registerCustomer";

export {
  GET_CUSTOMERS_START,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,
  getCustomers,
} from "./getCustomers";

export {
  GET_CUSTOMER_START,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAILURE,
  getCustomer,
} from "./getCustomer";

export {
  EDIT_CUSTOMER_START,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_FAILURE,
  editCustomer,
} from "./editCustomer";

export {
  GET_CUSTOMER_TASKS_START,
  GET_CUSTOMER_TASKS_SUCCESS,
  GET_CUSTOMER_TASKS_FAILURE,
  getCustomerTasks,
} from "./getCustomerTasks";

export {
  ADD_EMPLOYEE_START,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  addEmployeeToCustomer,
} from "./addEmployeeToCustomer";

export {
  GET_CUSTOMER_NOTES_START,
  GET_CUSTOMER_NOTES_SUCCESS,
  GET_CUSTOMER_NOTES_FAILURE,
  getCustomerNotes,
} from "./getCustomerNotes";

// NOTE ACTIONS

export {
  ADD_NOTE_START,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE,
  addNote,
} from "./addNote";

// EMPLOYEE ACTIONS

export {
  CURRENT_EMPLOYEES,
  ALL_EMPLOYEES,
  toggleCurrentEmployees,
  toggleAllEmployees,
} from "./employeesToggle";

export {
  REGISTER_EMPLOYEE_START,
  REGISTER_EMPLOYEE_SUCCESS,
  REGISTER_EMPLOYEE_FAILURE,
  registerEmployee,
} from "./registerEmployee";

export {
  GET_EMPLOYEES_START,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
  getEmployees,
} from "./getEmployees";

export {
  EDIT_EMPLOYEE_START,
  EDIT_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_FAILURE,
  editEmployee,
} from "./editEmployee";

export {
  CHANGE_EMPLOYEE_STATUS_START,
  CHANGE_EMPLOYEE_STATUS_SUCCESS,
  CHANGE_EMPLOYEE_STATUS_FAILURE,
  changeEmployeeStatus,
} from "./changeEmployeeStatus";

// const dbUrl =
//   "http://localhost:5000/rocky-mountain-lifts-crm-db/us-central1/api"; // Development URL
const dbUrl = 'https://us-central1-rocky-mountain-lifts-crm-db.cloudfunctions.net/api'; // Production URL

export { dbUrl };
