import { stationApi } from '../services/StationApi';
import { configureStore } from '@reduxjs/toolkit';
import { priceCategoryApi } from '../services/PriceCategoryApi';

export const store = configureStore({
  reducer: {
    [stationApi.reducerPath]: stationApi.reducer,
    [priceCategoryApi.reducerPath]: priceCategoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stationApi.middleware, priceCategoryApi.middleware),
});
