import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { languageChangeReducer } from './slices/languageSlice';
import { persistConfig } from './utils/persistConfig';
import { themeChangeReducer } from './slices/themeSlice';

const rootReducer = combineReducers({
  language: languageChangeReducer,
  theme: themeChangeReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
