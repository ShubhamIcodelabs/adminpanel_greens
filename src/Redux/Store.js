import { configureStore } from '@reduxjs/toolkit';

import { apiClientRequest } from "./util/api";
import { RootReducer } from "./RootReducer";

// Added a middleware called ApiClient which will go as a second extra argument createAsyncThunk function inside REDUX -> slice files.

export const store = configureStore({
  reducer: {
    RootReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { apiClient: apiClientRequest() }
      }
    })
});