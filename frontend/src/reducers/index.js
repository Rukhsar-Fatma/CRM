// import counterReducer from "./counter";
import loginReducer from "./loginReducer";
import orgRegisterReducer from "./orgRegisterReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  // counter_reducer: counterReducer,
  login_reducer : loginReducer,
  org_reg_reducer : orgRegisterReducer
});

export default allReducers;
