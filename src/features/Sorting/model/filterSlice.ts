import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';

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
export const selectedFilter = (state: RootState) => state.filter;
export const filterChangeReducer = filterChangeSlice.reducer;
