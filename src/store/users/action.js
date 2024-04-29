import {createAsyncThunk} from "@reduxjs/toolkit";
import {hideGlobalLoading, showGlobalLoading} from "../common/common_slice";
import api from "../../data/network-api";
import {receiveUserLeaderboards} from "./users_slice";

export const asyncPopulateLeaderboard = createAsyncThunk(
    'shared/populateUserAndThreads',
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(showGlobalLoading());
        try {
            const users = await api.getLeaderboards();
            dispatch(receiveUserLeaderboards(users));
        } catch (error) {
            rejectWithValue(error.message);
        }
        dispatch(hideGlobalLoading());
    }
);
