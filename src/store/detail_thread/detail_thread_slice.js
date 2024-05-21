import { createSlice } from '@reduxjs/toolkit';
import { toastError } from '../../utils/toast';
import {
  asyncGetDetailThread,
  asyncPostCommentThread,
  asyncToggleDownVotedThreadComment,
  asyncToggleDownVotedThreadDetail,
  asyncToggleUpVotedThreadComment,
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
      state.thread = null;
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
        state.thread.upVotesBy = state.thread.upVotesBy.filter((t) => t !== authUserId);
      }
    },
    toggleDownVoteThreadDetail: (state, action) => {
      const { authUserId } = action.payload;
      const isDownVoted = state.thread.downVotesBy.includes(authUserId);
      if (!isDownVoted) {
        state.thread.downVotesBy.push(authUserId);
      } else {
        state.thread.downVotesBy = state.thread.downVotesBy.filter((t) => t !== authUserId);
      }
    },

    toggleUpVoteComment: (state, action) => {
      const { commentId, authUserId } = action.payload;
      const commentIndex = state.thread.comments.findIndex((t) => t.id === commentId);
      const comment = state.thread.comments[commentIndex];
      const isUpVoted = comment.upVotesBy.includes(authUserId);

      if (!isUpVoted) {
        comment.upVotesBy.push(authUserId);
      } else {
        comment.upVotesBy = comment.upVotesBy.filter((t) => t !== authUserId);
      }
    },
    toggleDownVoteComment: (state, action) => {
      const { commentId, authUserId } = action.payload;
      const commentIndex = state.thread.comments.findIndex((c) => c.id === commentId);
      const comment = state.thread.comments[commentIndex];
      const isDownVoted = comment.downVotesBy.includes(authUserId);
      if (!isDownVoted) {
        comment.downVotesBy.push(authUserId);
      } else {
        comment.downVotesBy = comment.downVotesBy.filter((t) => t !== authUserId);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetDetailThread.fulfilled, (state, { payload }) => {
      state.thread = payload;
    });
    builder.addCase(asyncGetDetailThread.rejected, (state, { payload }) => {
      toastError(payload);
      state.getDetailThreadError = true;
    });
    builder.addCase(asyncPostCommentThread.pending, (state) => {
      state.postCommentSuccess = false;
      state.postCommentLoading = true;
    });
    builder.addCase(asyncPostCommentThread.fulfilled, (state, { payload }) => {
      state.thread.comments.unshift(payload);
      state.postCommentSuccess = true;
      state.postCommentLoading = false;
    });
    builder.addCase(asyncPostCommentThread.rejected, (state, { payload }) => {
      toastError(payload);
      state.postCommentLoading = false;
    });

    builder.addCase(asyncToggleUpVotedThreadDetail.rejected, (state, { payload }) => {
      toastError(payload);
    });
    builder.addCase(asyncToggleDownVotedThreadDetail.rejected, (state, { payload }) => {
      toastError(payload);
    });

    builder.addCase(asyncToggleUpVotedThreadComment.rejected, (state, { payload }) => {
      toastError(payload);
    });
    builder.addCase(asyncToggleDownVotedThreadComment.rejected, (state, { payload }) => {
      toastError(payload);
    });
  },
});
export const { toggleDownVoteThreadDetail, resetDetailThreadState, toggleUpVoteThreadDetail, toggleDownVoteComment, toggleUpVoteComment } = detailThreadSlice.actions;

export default detailThreadSlice.reducer;
