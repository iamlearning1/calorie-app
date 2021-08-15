import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { details, login } from './authAPI';

export interface User {
  name: string;
  email: string;
  role: string;
  _id: string;
}

export interface UserState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  user: null,
  authenticated: false,
  loading: false,
  error: '',
};

export const userLogin = createAsyncThunk(
  'user/login',
  async (creds: {email: string, password: string}, { rejectWithValue }) => {
    try {
      const { data } = await login(creds.email, creds.password);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const userDetails = createAsyncThunk(
  'user/details',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await details();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.authenticated = false;
      state.user = null;
      state.error = '';
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.authenticated = false;
        state.user = null;
        state.error = '';
        localStorage.removeItem('token');
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authenticated = true;
        state.error = '';
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authenticated = true;
        state.error = '';
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
