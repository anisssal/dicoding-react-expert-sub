import { createSlice } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../../utils/toast';
import { asyncPostThread, asyncToggleDownVotedThread, asyncToggleUpVotedThread } from './action';

const initialState = {
  threads: [],
  filterCategory: null,
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
      state.postThreadLoading = false;
      state.postThreadSuccess = false;
    },
    setFilterCategory: (state, action) => {
      if (state.filterCategory && state.filterCategory === action.payload) {
        state.filterCategory = null;
      } else {
        state.filterCategory = action.payload;
      }
    },
    toggleUpVoteThread: (state, action) => {
      const { id, authUserId } = action.payload;
      const threadIndex = state.threads.findIndex((t) => t.id === id);
      const thread = state.threads[threadIndex];
      const isUpVoted = thread.upVotesBy.includes(authUserId);

      if (!isUpVoted) {
        thread.upVotesBy.push(authUserId);
      } else {
        thread.upVotesBy = thread.upVotesBy.filter((t) => t !== authUserId);
      }
    },
    toggleDownVoteThread: (state, action) => {
      const { id, authUserId } = action.payload;
      const threadIndex = state.threads.findIndex((t) => t.id === id);
      const thread = state.threads[threadIndex];
      const isDownVoted = thread.downVotesBy.includes(authUserId);
      if (!isDownVoted) {
        thread.downVotesBy.push(authUserId);
      } else {
        thread.downVotesBy = thread.downVotesBy.filter((t) => t !== authUserId);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncPostThread.pending, (state) => {
      state.postThreadLoading = true;
      state.postThreadSuccess = false;
    });
    builder.addCase(asyncPostThread.fulfilled, (state, { _payload }) => {
      state.postThreadSuccess = true;
      state.postThreadLoading = false;
      toastSuccess('Success posting new thread!');
    });
    builder.addCase(asyncPostThread.rejected, (state, { payload }) => {
      state.postThreadLoading = false;
      state.postThreadSuccess = false;
      toastError(payload);
    });
    builder.addCase(asyncToggleUpVotedThread.rejected, (state, { payload }) => {
      toastError(payload);
    });
    builder.addCase(asyncToggleDownVotedThread.rejected, (state, { payload }) => {
      toastError(payload);
    });
  },
});
export const { receiveThreads, resetPostThread, toggleUpVoteThread, toggleDownVoteThread, setFilterCategory } = threadsSlice.actions;

export default threadsSlice.reducer;
