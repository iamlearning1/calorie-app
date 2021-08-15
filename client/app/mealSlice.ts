import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

import {
  add, meals, remove, meal, update,
} from './mealAPI';

export interface MealState {
  meals: any[];
  loading: boolean;
  message: string;
  meal: any;
}

const initialState: MealState = {
  meals: [],
  loading: false,
  message: '',
  meal: null,
};

export const addMeal = createAsyncThunk(
  'meal/add',
  async (mealData: any, { rejectWithValue }) => {
    try {
      const { data } = await add(mealData);
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteMeal = createAsyncThunk(
  'meal/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await remove(id);
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getMeal = createAsyncThunk(
  'meal/details',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await meal(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const updateMeal = createAsyncThunk(
  'meal/update',
  async (mealData: any, { rejectWithValue }) => {
    try {
      const { data } = await update(mealData);
      return data;
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

const rejected = (state: MealState, action: PayloadAction<any>) => {
  state.message = action.payload as string;
  state.loading = false;
};

export const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = '';
    },
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
      .addCase(addMeal.rejected, rejected)
      .addCase(getMeals.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.meals = [];
      })
      .addCase(getMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.message = '';
        state.meals = action.payload.reduce((acc: any, m: any) => {
          const mealDate = moment(m.date).format('DD-MMM-YY');
          acc[mealDate] = acc[mealDate] || [];
          acc[mealDate].push(meal);
          return acc;
        }, {});
      })
      .addCase(getMeals.rejected, rejected)
      .addCase(deleteMeal.pending, (state) => {
        state.message = '';
      })
      .addCase(deleteMeal.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(deleteMeal.rejected, rejected)
      .addCase(getMeal.pending, (state) => {
        state.loading = true;
        state.meal = null;
        state.message = '';
      })
      .addCase(getMeal.fulfilled, (state, action) => {
        state.meal = action.payload;
        state.loading = false;
        state.message = '';
      })
      .addCase(getMeal.rejected, rejected)
      .addCase(updateMeal.pending, (state) => {
        state.loading = true;
        state.meal = null;
        state.message = '';
      })
      .addCase(updateMeal.fulfilled, (state, action) => {
        state.meal = action.payload;
        state.loading = false;
        state.message = 'Success';
      })
      .addCase(updateMeal.rejected, rejected);
  },
});

export const { resetMessage } = mealSlice.actions;

export default mealSlice.reducer;
