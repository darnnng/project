import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { themeChangeReducer } from './slices/themeSlice';
import { persistedLangReducer } from './slices/languageSlice';
import { persistConfig } from './slices/persistConfig';

export const store = configureStore({
  reducer: {
    theme: themeChangeReducer,
    language: persistedLangReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
