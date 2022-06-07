import { stationApi } from '../services/StationApi';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [stationApi.reducerPath]: stationApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stationApi.middleware),
});
