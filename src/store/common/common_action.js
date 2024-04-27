import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../data/network-api';
import { setUser } from '../auth/auth_slice';

export const asyncPreloadProcess = createAsyncThunk(
  'preloadProcess',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setUser(authUser));
      return null
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


