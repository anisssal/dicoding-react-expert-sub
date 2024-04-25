import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../data/network-api';
import { setUser } from '../auth/auth_slice';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { hideGlobalLoading, showGlobalLoading } from './shared_slice';

export const asyncPreloadProcess = createAsyncThunk(
  'preloadProcess',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setUser(authUser));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncPopulateUsersAndThreads = createAsyncThunk(
    'shared/populateUserAndThreads',
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(showGlobalLoading());
        try {
            const users = await api.getAllUsers();
            const threads = await api.getAllThreads();
            dispatch(receiveUsersActionCreator(users));
            dispatch(receiveThreadsActionCreator(threads));
        } catch (error) {
            rejectWithValue(error.message);
        }
        dispatch(hideGlobalLoading());
    }
);

