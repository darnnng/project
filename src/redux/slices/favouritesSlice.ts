import { createSlice } from '@reduxjs/toolkit';
import { ref } from 'firebase/database';
import { db } from '@src/firebase';

interface FavoriteState {
  favoritesList: string[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  favoritesList: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavoritesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addToFavoritesSuccess: (state, action) => {
      state.loading = false;
      state.favoritesList = [...state.favoritesList, action.payload];
    },
    addToFavoritesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const addToFavorites = (userId: number, productId: number) => async (dispatch) => {
  dispatch(addToFavoritesStart());
  try {
    await db.ref(`users/${userId}/favorites`).push(productId);
    dispatch(addToFavoritesSuccess(productId));
  } catch (error) {
    dispatch(addToFavoritesFailure(error.message));
  }
};

// await set(ref(db, `images/${imageId}`), {
//     userId,
//     imageId,
//     image,
//   });

export const {
  addToFavoritesStart,
  addToFavoritesSuccess,
  addToFavoritesFailure,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
