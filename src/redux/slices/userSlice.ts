import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  email: null,
  id: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.isAuth = true;
    },
    removeUser(state) {
      state.email = null;
      state.id = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const currentUser = (state: RootState) => state.user;
export const userReducer = userSlice.reducer;
