import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@src/redux/store';

const initialState = {
  page: 0,
};

const pagesChangeSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setPage } = pagesChangeSlice.actions;
export const selectedPage = (state: RootState) => state.pages;
export const pagesChangeReducer = pagesChangeSlice.reducer;
