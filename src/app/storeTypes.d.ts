import { store } from './store';

declare global {
  type AppState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}
