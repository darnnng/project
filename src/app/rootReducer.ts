import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { languageChangeReducer } from '../features/LangChange/model/languageSlice';
import { themeChangeReducer } from '../features/ThemeChange/model/themeSlice';
import { userReducer } from '../entities/user/model/userSlice';
import { notifierReducer } from '../shared/model/notifierSlice';
import { pagesChangeReducer } from '../features/Pagination/model/paginationSlice';
import { filterChangeReducer } from '../features/Sorting/model/filterSlice';

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
