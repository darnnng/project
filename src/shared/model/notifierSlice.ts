import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';

interface IAlert {
  message: string;
}

interface INotifierState {
  alerts: IAlert[];
}

const initialState: INotifierState = {
  alerts: [],
};

export const notifierSlice = createSlice({
  name: 'notifier',
  initialState,
  reducers: {
    createAlert(state, action: PayloadAction<IAlert>) {
      state.alerts.push(action.payload);
    },
  },
});

export const { createAlert } = notifierSlice.actions;
export const notifications = (state: RootState) => state.notifier;
export const notifierReducer = notifierSlice.reducer;
