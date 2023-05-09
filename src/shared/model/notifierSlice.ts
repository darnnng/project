import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
export const notifications = (state: AppState) => state.notifier;
export const notifierReducer = notifierSlice.reducer;
