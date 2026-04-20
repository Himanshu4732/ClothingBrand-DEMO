import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/api';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
