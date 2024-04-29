import { createSlice } from '@reduxjs/toolkit';

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
});

export const { receiveUsers,receiveUserLeaderboards } = usersSlice.actions;
export default usersSlice.reducer;
