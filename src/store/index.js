import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/enter';
import trackReducer from './trackSlice';
export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    storage: trackReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
