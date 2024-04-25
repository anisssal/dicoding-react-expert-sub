import { createSlice } from '@reduxjs/toolkit';
import { asyncPreloadProcess } from './shared_action';

const initialState = {
  isPreload: true,
  globalLoading: false,
};
const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    showGlobalLoading: (state, _action) => {
      state.globalLoading = true;
    },
    hideGlobalLoading: (state, _action) => {
      state.globalLoading = false;
    }
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
export const { showGlobalLoading, hideGlobalLoading } = sharedSlice.actions;


export default sharedSlice.reducer;
