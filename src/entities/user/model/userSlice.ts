import { createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '@entities/cartItem/model/types';

interface IUserState {
  email: string | null;
  userId: string | null;
  cartItems: Record<string, ICartItem> | Record<string, never>;
  address: {
    city: string;
    street: string;
    house: string;
  };
}

const initialState: IUserState = {
  email: null,
  userId: null,
  cartItems: {},
  address: {
    city: '',
    street: '',
    house: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.userId = action.payload.id;
    },
    setCartItems(state, action) {
      const items = action.payload;
      if (items) {
        state.cartItems = items;
      }
    },
    setAddress(state, action) {
      console.log(action.payload);
      state.address = action.payload;
    },
    removeUser(state) {
      state.email = null;
      state.userId = null;
      state.cartItems = {};
      state.address = {
        city: '',
        street: '',
        house: '',
      };
    },
  },
});

export const { setUser, removeUser, setCartItems, setAddress } = userSlice.actions;
export const currentUser = (state: AppState) => state.user;
export const userReducer = userSlice.reducer;
