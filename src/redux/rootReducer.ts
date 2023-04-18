import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { languageChangeReducer } from './slices/languageSlice';
import { persistConfig } from './utils/persistConfig';

const rootReducer = combineReducers({
  language: languageChangeReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
