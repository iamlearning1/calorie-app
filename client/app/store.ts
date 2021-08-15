import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import mealSlice from './mealSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    meal: mealSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
