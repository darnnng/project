import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { languageChangeReducer } from './slices/languageSlice';
import { persistConfig } from './utils/persistConfig';
import { themeChangeReducer } from './slices/themeSlice';
import { userReducer } from './slices/userSlice';
import { notifierReducer } from './slices/notifierSlice';

const rootReducer = combineReducers({
  language: languageChangeReducer,
  theme: themeChangeReducer,
  user: userReducer,
  notifier: notifierReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
