import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  email: null,
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.userId = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.userId = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const currentUser = (state: RootState) => state.user;
export const userReducer = userSlice.reducer;
