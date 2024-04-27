import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../data/network-api';

export const postThread = createAsyncThunk(
  'auth/register',
  async ({ title, body, category }, { rejectWithValue }) => {
    try {
      return await api.createThread({ title, body, category });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

