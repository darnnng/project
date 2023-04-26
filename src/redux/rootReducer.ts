import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { languageChangeReducer } from './slices/languageSlice';
import { persistConfig } from './utils/persistConfig';
import { themeChangeReducer } from './slices/themeSlice';
import { userReducer } from './slices/userSlice';
import { notifierReducer } from './slices/notifierSlice';
import { pagesChangeReducer } from './slices/paginationSlice';

const rootReducer = combineReducers({
  language: languageChangeReducer,
  theme: themeChangeReducer,
  user: userReducer,
  notifier: notifierReducer,
  pages: pagesChangeReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
