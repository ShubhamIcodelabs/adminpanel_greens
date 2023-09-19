
import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const collectionIN = createAsyncThunk(
  'collectionIN',
  async (values, { extra: { apiClient } }) => {
    try {
      // Make a GET request to the '/adminPanel' endpoint
      const response = await apiClient.request('/api/collection', 'POST', values);
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

const collectionINSlice = createSlice({
  name: 'collectionIN',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(collectionIN.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(collectionIN.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    })
    builder.addCase(collectionIN.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.error;
    })
  }
})

export default collectionINSlice.reducer;
