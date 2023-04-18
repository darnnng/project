import { createSlice } from '@reduxjs/toolkit';
import { Languages } from '@constants/languages';
import { RootState } from '@src/redux/store';

const initialState = {
  language: Languages.EN,
};

const languageChangeSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageChangeSlice.actions;
export const selectedLanguage = (state: RootState) => state.language;
export const languageChangeReducer = languageChangeSlice.reducer;
