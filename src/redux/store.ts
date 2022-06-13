import { stationApi } from '../services/StationApi';
import { configureStore } from '@reduxjs/toolkit';
import { priceCategoryApi } from '../services/PriceCategoryApi';
import { priceClassificationApi } from '../services/PriceClassificationApi';
import { programApi } from '../services/ProgramApi';
import { scheduleApi } from '../services/ScheduleApi';


export const store = configureStore({
  reducer: {
    [stationApi.reducerPath]: stationApi.reducer,
    [priceCategoryApi.reducerPath]: priceCategoryApi.reducer,
    [priceClassificationApi.reducerPath]: priceClassificationApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      stationApi.middleware,
      priceCategoryApi.middleware,
      priceClassificationApi.middleware,
      programApi.middleware,
      scheduleApi.middleware
    ),
});
