import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@src/redux/store';
import { IListItem } from './../../components/pages/CatalogPage/CatalogPage.interface';

interface IFavsState {
  favs: IListItem[];
}
//TO-DO DELETE THIS FILE
const initialState: IFavsState = {
  favs: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites(state, action) {
      const newItem = action.payload;
      const checkIfExists = state.favs.some((elem) => elem.id === newItem.id);
      if (!checkIfExists) {
        state.favs.push(action.payload);
      }
    },
    deleteFromFavourites(state, action) {
      state.favs = state.favs.filter((elem) => elem.id !== action.payload);
    },
  },
});

export const { addToFavourites, deleteFromFavourites } = favouritesSlice.actions;
export const arrayOfFavs = (state: RootState) => state.favs;
export const favsReducer = favouritesSlice.reducer;
