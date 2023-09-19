
import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteIN = createAsyncThunk(
  'deleteIN',
  async (id, { extra: { apiClient } }) => {
    console.log(id, '^^^^ ^^^^ => id');
    
    try {
      // Make a GET request to the '/adminPanel' endpoint
      const response = await apiClient.request('/api/closedlisting', 'POST', {
        data: { id }
    });
      if (response && response.data && response.data.data) {
        return response.data.data;
      }
      return response;
    } catch (e) {
      return { message: e.message };
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
}

const deleteINSlice = createSlice({
  name: 'deleteIN',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteIN.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(deleteIN.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    })
    builder.addCase(deleteIN.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.error;
    })
  }
})

export default deleteINSlice.reducer;
