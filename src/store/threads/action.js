import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../data/network-api';

import { toggleDownVoteThread, toggleUpVoteThread } from './threads_slice';

export const asyncPostThread = createAsyncThunk(
  'thread/new',
  async ({ title, body, category }, { rejectWithValue }) => {
    try {
      return await api.createThread({ title, body, category });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncToggleUpVotedThread = createAsyncThunk(
  'thread/upVote',
  async ({ id, authUserId }, { dispatch, getState, rejectWithValue }) => {
    const threadsState = getState().threads;
    const thread = threadsState.threads.find((t) => t.id === id);
    const isUpVoted = thread.upVotesBy.includes(authUserId);
    const isDownVoted = thread.downVotesBy.includes(authUserId);
    try {
      dispatch(toggleUpVoteThread({ id, authUserId }));
      if (isDownVoted) {
        dispatch(toggleDownVoteThread({ id, authUserId }));
      }

      if (!isUpVoted) {
        await api.upVoteThread(id);
      } else {
        await api.neutralVoteThread(id);
      }
      return null;
    } catch (error) {
      dispatch(toggleUpVoteThread({ id, authUserId }));
      if (isDownVoted) {
        dispatch(toggleDownVoteThread({ id, authUserId }));
      }

      return rejectWithValue(error.message);
    }
  }
);

export const asyncToggleDownVotedThread = createAsyncThunk(
  'thread/downVote',
  async ({ id, authUserId }, { dispatch, getState, rejectWithValue }) => {
    const threadsState = getState().threads;
    const thread = threadsState.threads.find((t) => t.id === id);
    const isUpVoted = thread.upVotesBy.includes(authUserId);
    const isDownVoted = thread.downVotesBy.includes(authUserId);
    try {
      dispatch(toggleDownVoteThread({ id, authUserId }));
      if (isUpVoted) {
        dispatch(toggleUpVoteThread({ id, authUserId }));
      }

      if (!isDownVoted) {
        await api.downVoteThread(id);
      } else {
        await api.neutralVoteThread(id);
      }
      return null;
    } catch (error) {
      dispatch(toggleDownVoteThread({ id, authUserId }));
      if (isUpVoted) {
        dispatch(toggleUpVoteThread({ id, authUserId }));
      }

      return rejectWithValue(error.message);
    }
  }
);
