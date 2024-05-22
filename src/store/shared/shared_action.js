import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../data/network-api';
import { receiveThreads } from '../threads/threads_slice';
import { hideGlobalLoading, showGlobalLoading } from '../common/common_slice';
import { receiveUsers } from '../users/users_slice';

export const asyncPopulateUsersAndThreads = createAsyncThunk('shared/populateUserAndThreads', async (_, { dispatch, rejectWithValue }) => {
  dispatch(showGlobalLoading());
  try {
    const result = await Promise.all([api.getAllUsers(), api.getAllThreads()]);
    dispatch(receiveUsers(result[0]));
    dispatch(receiveThreads(result[1]));
  } catch (error) {
    dispatch(hideGlobalLoading());
    return rejectWithValue(error.message);
  }
  dispatch(hideGlobalLoading());
  return null;
});
