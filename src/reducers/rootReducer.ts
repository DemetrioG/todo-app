import { combineReducers } from "redux";
import taskReducer from "../features/tasks/taskSlice";

const rootReducer = combineReducers({
  tasks: taskReducer,
});

export default rootReducer;
