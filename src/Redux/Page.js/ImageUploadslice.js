import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const FETCH_IMAGE_SUCCESS = 'app/ImageUploadslice.js/FETCH_IMAGE_SUCCESS';
export const ImgaeUpload = response => ({
  type: FETCH_IMAGE_SUCCESS,
  payload: { data: response.data },
});


const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

export const imageUploadIN = createAsyncThunk(
  'imageUploadIN',
  async (values, { extra: { apiClient } }) => {
    try {
      const fileBase64 = await toBase64(values.file);
      // Make a GET request to the '/adminPanel' endpoint
      const response = await apiClient.request('/api/uploadImage', 'POST', { base64: fileBase64 });
      if (response && response.data && response.data.id.data) {
        // dispatch(ImgaeUpload(response.data.id.data));
        return response.data.id.data;
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
  uploadImg:[],
}

const imageUploadINSlice = createSlice({
  name: 'imageUploadIN',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(imageUploadIN.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(imageUploadIN.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    })
    builder.addCase(imageUploadIN.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.error;
    })
  }
})

export default imageUploadINSlice.reducer;
