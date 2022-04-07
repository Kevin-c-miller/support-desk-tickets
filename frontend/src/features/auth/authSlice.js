import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// get user from localstorage
const user = JSON.parse(localStorage.getItem('user'));

// initial state
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// register new user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      // from authService.js file
      return await authService.register(user);
    } catch (error) {
      // error message from backend
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user);
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.message = action.payload;
        state.isError = true;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
