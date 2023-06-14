import { createSlice } from '@reduxjs/toolkit';

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
export const selectedPage = (state: AppState) => state.pages;
export const pagesChangeReducer = pagesChangeSlice.reducer;
