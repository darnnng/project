import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  email: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const currentUser = (state: RootState) => state.user;
export const userReducer = userSlice.reducer;
