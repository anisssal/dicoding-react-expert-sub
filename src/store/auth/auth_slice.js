import { createSlice } from '@reduxjs/toolkit';
import localData from '../../data/local-data';
import {loginUser, registerUser} from './auth_action';
import { toastError } from '../../utils/toast';

const initialState = {
  authUser: null,
  loginLoading: false,
  loginSuccess: false,
  registerLoading :false,
  registerSuccess: false,
};
const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signOut: (state) => {
      state.authUser = null;
      state.loginSuccess = false;
      state.registerSuccess = false;
      localData.putAccessToken('');
    },
    setUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.loginSuccess = false;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.authUser = payload;
      state.loginSuccess = true;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.loginSuccess = false;
      toastError(payload);
    });

    builder.addCase(registerUser.pending, (state) => {
      state.registerLoading = true;
      state.registerSuccess = false;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.authUser = payload;
      state.registerLoading = false;
      state.registerSuccess = true;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.registerLoading = false;
      state.registerSuccess = false;
      toastError(payload);
    });
  },
});

export const { setUser, signOut } = authSlice.actions;

export default authSlice.reducer;
