import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { add, meals } from './mealAPI';

export interface MealState {
  meals: any[];
  loading: boolean;
  message: string;
}

const initialState: MealState = {
  meals: [],
  loading: false,
  message: '',
};

export const addMeal = createAsyncThunk(
  'meal/add',
  async (meal: any, { rejectWithValue }) => {
    try {
      const { data } = await add(meal);
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getMeals = createAsyncThunk(
  'meal/all',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await meals();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMeal.pending, (state) => {
        state.loading = true;
        state.message = '';
      })
      .addCase(addMeal.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      })
      .addCase(addMeal.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      })
      .addCase(getMeals.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.meals = [];
      })
      .addCase(getMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.message = '';
        state.meals = action.payload.reduce((acc: any, meal: any) => {
          const mealDate = moment(meal.date).format('DD-MMM-YY');
          acc[mealDate] = acc[mealDate] || [];
          acc[mealDate].push(meal);
          return acc;
        }, {});
      })
      .addCase(getMeals.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
  },
});

export const { } = mealSlice.actions;

export default mealSlice.reducer;
