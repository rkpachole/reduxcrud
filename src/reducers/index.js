import { combineReducers } from 'redux';
// import paymentReducer from './paymentReducer';
import { users } from "./user.reducer";

const rootReducer = combineReducers({
  // payments: paymentReducer
  users
});

export default rootReducer;