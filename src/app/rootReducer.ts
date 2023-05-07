import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { languageChangeReducer } from '../redux/slices/languageSlice';
import { themeChangeReducer } from '../redux/slices/themeSlice';
import { userReducer } from '../redux/slices/userSlice';
import { notifierReducer } from '../redux/slices/notifierSlice';
import { pagesChangeReducer } from '../redux/slices/paginationSlice';
import { filterChangeReducer } from '../redux/slices/filterSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['notifier'],
};

const rootReducer = combineReducers({
  language: languageChangeReducer,
  theme: themeChangeReducer,
  user: userReducer,
  notifier: notifierReducer,
  pages: pagesChangeReducer,
  filter: filterChangeReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
