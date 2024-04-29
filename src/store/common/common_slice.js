import { createSlice } from '@reduxjs/toolkit';
import { asyncPreloadProcess } from './common_action';

const initialState = {
  isPreload: true,
  globalLoading: false,
};
const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showGlobalLoading: (state, _action) => {
      state.globalLoading = true;
    },
    hideGlobalLoading: (state, _action) => {
      state.globalLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncPreloadProcess.fulfilled, (state) => {
      state.isPreload = false;
    });
    builder.addCase(asyncPreloadProcess.rejected, (state, { _payload }) => {
      state.isPreload = false;
    });
  },
});
export const { showGlobalLoading, hideGlobalLoading } = commonSlice.actions;

export default commonSlice.reducer;
