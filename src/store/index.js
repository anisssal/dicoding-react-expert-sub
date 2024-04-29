import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from './auth/auth_slice';
import commonReducer from './common/common_slice';
import sharedReducer from './shared/shared_slice';
import threadsReducer from './threads/threads_slice';
import detailThreadReducer from './detail_thread/detail_thread_slice';
import usersReducer from './users/users_slice';

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  shared: sharedReducer,
  users: usersReducer,
  threads: threadsReducer,
  detailThread: detailThreadReducer,
  loadingBar: loadingBarReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
