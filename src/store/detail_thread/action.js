import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../data/network-api';
import { hideGlobalLoading, showGlobalLoading } from '../common/common_slice';
import {
  toggleDownVoteThreadDetail,
  toggleUpVoteThreadDetail,
} from './detail_thread_slice';

export const asyncGetDetailThread = createAsyncThunk(
  'threadDetail/show',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showGlobalLoading());
      const thread = await api.getThreadDetail(id);
      dispatch(hideGlobalLoading());
      return thread;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncToggleUpVotedThreadDetail = createAsyncThunk(
  'threadDetail/upVote',
  async ({ authUserId }, { dispatch, getState, rejectWithValue }) => {
    const { thread } = getState().detailThread;
    const isUpVoted = thread.upVotesBy.includes(authUserId);
    const isDownVoted = thread.downVotesBy.includes(authUserId);
    try {
      dispatch(toggleUpVoteThreadDetail({ authUserId }));
      if (isDownVoted) {
        dispatch(toggleDownVoteThreadDetail({ authUserId }));
      }

      if (!isUpVoted) {
        await api.upVoteThread(thread.id);
      } else {
        await api.neutralVoteThread(thread.id);
      }
      return null;
    } catch (error) {
      dispatch(toggleUpVoteThreadDetail({ authUserId }));
      if (isDownVoted) {
        dispatch(toggleDownVoteThreadDetail({ authUserId }));
      }
      return rejectWithValue(error.message);
    }
  }
);

export const asyncToggleDownVotedThreadDetail = createAsyncThunk(
  'threadDetail/downVote',
  async ({ authUserId }, { dispatch, getState, rejectWithValue }) => {
    const { thread } = getState().detailThread;
    const isUpVoted = thread.upVotesBy.includes(authUserId);
    const isDownVoted = thread.downVotesBy.includes(authUserId);
    try {
      dispatch(toggleDownVoteThreadDetail({ authUserId }));
      if (isUpVoted) {
        dispatch(toggleUpVoteThreadDetail({ authUserId }));
      }

      if (!isDownVoted) {
        await api.downVoteThread(thread.id);
      } else {
        await api.neutralVoteThread(thread.id);
      }
      return null;
    } catch (error) {
      dispatch(toggleDownVoteThreadDetail({ authUserId }));
      if (isUpVoted) {
        dispatch(toggleUpVoteThreadDetail({ authUserId }));
      }
      return rejectWithValue(error.message);
    }
  }
);

export const asyncPostCommentThread = createAsyncThunk(
  'threadDetail/comment',
  async ({ content }, { rejectWithValue, getState }) => {
    try {
      const state = getState().detailThread;
      const { id } = state.thread;
      return await api.createComment({ threadId: id, content });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
