import { createSlice } from '@reduxjs/toolkit';
import {toastError} from "../../utils/toast";
import {asyncPopulateLeaderboard} from "./action";

const initialState = {
  users: [],
  leaderboards : []
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    receiveUsers: (state, action) => {
      state.users = action.payload;
    },
    receiveUserLeaderboards : (state,action) => {
      state.leaderboards = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
        asyncPopulateLeaderboard.rejected,
        (state, { payload }) => {
          toastError(payload);
        }
    );
  }
});

export const { receiveUsers,receiveUserLeaderboards } = usersSlice.actions;
export default usersSlice.reducer;
