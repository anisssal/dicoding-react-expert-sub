import { createSlice } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../../utils/toast';
import {
  asyncGetDetailThread,
  asyncPostCommentThread,
  asyncToggleDownVotedThreadDetail,
  asyncToggleUpVotedThreadDetail,
} from './action';

const initialState = {
  thread: null,
  postCommentLoading: false,
  postCommentSuccess: false,
  getDetailThreadError: false,
};
const detailThreadSlice = createSlice({
  name: 'detailThread',
  initialState,
  reducers: {
    resetDetailThreadState: (state, _action) => {
      state.detailThread = null;
      state.postCommentLoading = false;
      state.postCommentSuccess = false;
      state.getDetailThreadError = false;
    },
    toggleUpVoteThreadDetail: (state, action) => {
      const { authUserId } = action.payload;
      const isUpVoted = state.thread.upVotesBy.includes(authUserId);
      if (!isUpVoted) {
        state.thread.upVotesBy.push(authUserId);
      } else {
        state.thread.upVotesBy = state.thread.upVotesBy.filter(
          (t) => t !== authUserId
        );
      }
    },
    toggleDownVoteThreadDetail: (state, action) => {
      const { authUserId } = action.payload;
      const isDownVoted = state.thread.downVotesBy.includes(authUserId);
      if (!isDownVoted) {
        state.thread.downVotesBy.push(authUserId);
      } else {
        state.thread.downVotesBy = state.thread.downVotesBy.filter(
          (t) => t !== authUserId
        );
      }
    },

    toggleUpVoteComments: (state, action) => {
      const { commentsId, authUserId } = action.payload;
      const threadIndex = state.threads.findIndex((t) => t.id === commentsId);
      const thread = state.threads[threadIndex];
      const isUpVoted = thread.upVotesBy.includes(authUserId);

      if (!isUpVoted) {
        thread.upVotesBy.push(authUserId);
      } else {
        thread.upVotesBy = thread.upVotesBy.filter((t) => t !== authUserId);
      }
    },
    toggleDownVoteComments: (state, action) => {
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
    builder.addCase(asyncGetDetailThread.fulfilled, (state, { payload }) => {
      state.thread = payload;
    });
    builder.addCase(asyncPostCommentThread.pending, (state) => {
      state.postCommentSuccess = false;
      state.postCommentLoading = true;
    });
    builder.addCase(asyncPostCommentThread.fulfilled, (state, { payload }) => {
      state.thread.comments.unshift(payload);
      state.postCommentSuccess = true;
      state.postCommentLoading = false;
      toastSuccess('Success submitting comment!');
    });

    builder.addCase(asyncGetDetailThread.rejected, (state, { payload }) => {
      toastError(payload);
      state.getDetailThreadError = true;
    });
    builder.addCase(
      asyncToggleUpVotedThreadDetail.rejected,
      (state, { payload }) => {
        toastError(payload);
      }
    );
    builder.addCase(
      asyncToggleDownVotedThreadDetail.rejected,
      (state, { payload }) => {
        toastError(payload);
      }
    );
    builder.addCase(asyncPostCommentThread.rejected, (state, { payload }) => {
      toastError(payload);
    });
  },
});
export const {
  toggleDownVoteComments,
  toggleUpVoteComments,
  toggleUpVoteThreadDetail,
  toggleDownVoteThreadDetail,
  resetDetailThreadState,
} = detailThreadSlice.actions;

export default detailThreadSlice.reducer;
