import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// create new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      // getting token
      const token = thunkAPI.getState().auth.user.token;

      // from ticketService file
      return await ticketService.createNewTicket(ticketData, token);
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

// get user tickets
export const getTickets = createAsyncThunk(
  'tickets/get-all',
  async (_, thunkAPI) => {
    try {
      // getting token
      const token = thunkAPI.getState().auth.user.token;

      // from ticketService file
      return await ticketService.getTickets(token);
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

// get user ticket
export const getTicket = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    try {
      // getting token
      const token = thunkAPI.getState().auth.user.token;

      // from ticketService file
      return await ticketService.getTicket(ticketId, token);
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

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
