import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// USER REDUCERS
import { getCurrentUserReducer } from "./getCurrentUserReducer";
import { getUsersReducer } from "./getUsersReducer";

// TASK REDUCERS
import { taskToggleReducer } from "./taskToggleReducer";
import { addTaskReducer } from "./addTaskReducer";
import { getTasksReducer } from "./getTasksReducer";
import { editTaskReducer } from "./editTaskReducer";
import { deleteTaskReducer } from "./deleteTaskReducer";

// EVENT REDUCERS
import { addEventReducer } from "./addEventReducer";
import { getEventsReducer } from "./getEventsReducer";
import { deleteEventReducer } from "./deleteEventReducer";

// WORK ORDER REDUCERS
import { workOrderToggleReducer } from "./workOrderToggleReducer";
import { addWorkOrderReducer } from "./addWorkOrderReducer";
import { getWorkOrdersReducer } from "./getWorkOrdersReducer";
import { getWorkOrderReducer } from "./getWorkOrderReducer";
import { editWorkOrderReducer } from "./editWorkOrderReducer";

// JOB REDUCERS
import { jobToggleReducer } from "./jobToggleReducer";

// CUSTOMER REDUCERS
import { registerCustomerReducer } from "./registerCustomerReducer";
import { getCustomersReducer } from "./getCustomersReducer";
import { getCustomerReducer } from "./getCustomerReducer";
import { editCustomerReducer } from "./editCustomerReducer";
import { getCustomerTasksReducer } from "./getCustomerTasksReducer";
import { getCustomerNotesReducer } from "./getCustomerNotesReducer";
import { addEmployeeToCustomerReducer } from "./addEmployeeToCustomerReducer";

// NOTE REDUCERS
import { addNoteReducer } from "./addNoteReducer";

// EMPLOYEE REDUCERS
import { employeesToggleReducer } from "./employeesToggleReducer";
import { registerEmployeeReducer } from "./registerEmployeeReducer";
import { getEmployeesReducer } from "./getEmployeesReducer";
import { editEmployeeReducer } from "./editEmployeeReducer";
import { changeEmployeeStatusReducer } from "./changeEmployeeStatusReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["getCurrentUserReducer"],
};

const rootReducer = combineReducers({
  getCurrentUserReducer,
  getUsersReducer,
  taskToggleReducer,
  addTaskReducer,
  getTasksReducer,
  editTaskReducer,
  deleteTaskReducer,
  addEventReducer,
  getEventsReducer,
  deleteEventReducer,
  workOrderToggleReducer,
  addWorkOrderReducer,
  getWorkOrdersReducer,
  getWorkOrderReducer,
  editWorkOrderReducer,
  jobToggleReducer,
  registerCustomerReducer,
  getCustomersReducer,
  getCustomerReducer,
  editCustomerReducer,
  getCustomerTasksReducer,
  getCustomerNotesReducer,
  addEmployeeToCustomerReducer,
  addNoteReducer,
  employeesToggleReducer,
  registerEmployeeReducer,
  getEmployeesReducer,
  editEmployeeReducer,
  changeEmployeeStatusReducer,
});

export default persistReducer(persistConfig, rootReducer);
