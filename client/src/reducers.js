import { combineReducers } from "redux";
import taskReducer from "./Tasks/taskReducer";
import errorReducer from "./Error/errorReducer";
import authReducer from "./Auth/authReducer";

export default combineReducers({
  tasks: taskReducer,
  error: errorReducer,
  auth: authReducer,
});
