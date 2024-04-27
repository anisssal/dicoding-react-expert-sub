import { createSlice } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../../utils/toast';
import { postThread } from './action';

const initialState = {
  threads: [],
  postThreadLoading: false,
  postThreadSuccess: false,
};
const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    receiveThreads: (state, action) => {
      state.threads = action.payload;
    },
    resetPostThread: (state, _action) => {
      state.postThreadLoading = false
      state.postThreadSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postThread.pending, (state) => {
      state.postThreadLoading = true;
      state.postThreadSuccess = false;
    });
    builder.addCase(postThread.fulfilled, (state, { _payload }) => {
      state.postThreadSuccess = true;
      toastSuccess('Success posting new thread!');
    });
    builder.addCase(postThread.rejected, (state, { payload }) => {
      state.postThreadLoading = false;
      state.postThreadSuccess = false;
      toastError(payload);
    });
  },
});
export const { receiveThreads } = threadsSlice.actions;

export default threadsSlice.reducer;
