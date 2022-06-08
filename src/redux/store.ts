import { stationApi } from '../services/StationApi';
import { configureStore } from '@reduxjs/toolkit';
import { priceCategoryApi } from '../services/PriceCategoryApi';
import { priceClassificationApi } from '../services/PriceClassificationApi';

export const store = configureStore({
  reducer: {
    [stationApi.reducerPath]: stationApi.reducer,
    [priceCategoryApi.reducerPath]: priceCategoryApi.reducer,
    [priceClassificationApi.reducerPath]: priceClassificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      stationApi.middleware,
      priceCategoryApi.middleware,
      priceClassificationApi.middleware
    ),
});
