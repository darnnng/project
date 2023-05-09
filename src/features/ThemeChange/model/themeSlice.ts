import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeLight: true,
};

const themeChangeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state) {
      state.themeLight = !state.themeLight;
    },
  },
});

export const { setTheme } = themeChangeSlice.actions;
export const selectedTheme = (state: AppState) => state.theme;
export const themeChangeReducer = themeChangeSlice.reducer;
