import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { Languages } from '@constants/languages';
import { RootState } from '@src/redux/store';
import i18n from '@src/i18n/i18n';
import { persistConfig } from './persistConfig';

const initialState = {
  language: Languages.EN,
};

const languageChangeSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action) {
      i18n.changeLanguage(action.payload);
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageChangeSlice.actions;
export const selectedLanguage = (state: RootState) => state.language;
// export const languageChangeReducer = persistReducer(persistConfig, languageChangeSlice.reducer);
export const languageChangeReducer = languageChangeSlice.reducer;
export const persistedLangReducer = persistReducer(persistConfig, languageChangeReducer);
