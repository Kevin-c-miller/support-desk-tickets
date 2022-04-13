import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notesService from './notesService';

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// get ticket notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunkAPI) => {
    try {
      // getting token
      const token = thunkAPI.getState().auth.user.token;

      // from ticketService file
      return await notesService.getNotes(ticketId, token);
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

// add ticket notes
export const addNotes = createAsyncThunk(
  'notes/add',
  async (ticketId, thunkAPI) => {
    try {
      // getting token
      const token = thunkAPI.getState().auth.user.token;

      // from ticketService file
      return await notesService.addNotes(ticketId, token);
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

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
