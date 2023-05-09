import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: 'stock',
};

const filterChangeSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = filterChangeSlice.actions;
export const selectedFilter = (state: AppState) => state.filter;
export const filterChangeReducer = filterChangeSlice.reducer;
