import { createSlice } from '@reduxjs/toolkit';
import { asyncPopulateUsersAndThreads } from './shared_action';
import { toastError } from '../../utils/toast';

const initialState = {};
const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      asyncPopulateUsersAndThreads.rejected,
      (state, { payload }) => {
        toastError(payload);
      }
    );
  },
});

export default sharedSlice.reducer;
