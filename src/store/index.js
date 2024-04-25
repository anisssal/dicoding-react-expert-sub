import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from './auth/auth_slice';
import sharedReducer from './shared/shared_slice';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  shared: sharedReducer,
  users: usersReducer,
  threads: threadsReducer,
  loadingBar: loadingBarReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
