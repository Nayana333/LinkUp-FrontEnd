import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminAuthReducer from './adminAuthSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  adminAuth: adminAuthReducer,
});

export default rootReducer;