import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../data/network-api';
import localData from '../../data/local-data';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const token = await api.login({ email, password });
      localData.putAccessToken(token);
      return await api.getOwnProfile();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {

    try {
      await api.register({ name, email, password });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
