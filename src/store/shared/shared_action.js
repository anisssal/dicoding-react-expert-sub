import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../data/network-api';
import { receiveThreads } from '../threads/threads_slice';
import { receiveUsersActionCreator } from '../users/action';
import { hideGlobalLoading, showGlobalLoading } from '../common/common_slice';

export const asyncPopulateUsersAndThreads = createAsyncThunk(
    'shared/populateUserAndThreads',
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(showGlobalLoading());
        try {
            const users = await api.getAllUsers();
            const threads = await api.getAllThreads();
            dispatch(receiveUsersActionCreator(users));
            dispatch(receiveThreads(threads));
        } catch (error) {
            rejectWithValue(error.message);
        }
        dispatch(hideGlobalLoading());
    }
);

