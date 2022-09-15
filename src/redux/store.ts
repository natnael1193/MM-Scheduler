import { stationApi } from '../services/StationApi';
import { configureStore } from '@reduxjs/toolkit';
import { priceCategoryApi } from '../services/PriceCategoryApi';
import { priceClassificationApi } from '../services/PriceClassificationApi';
import { programApi } from '../services/ProgramApi';
import { scheduleApi } from '../services/ScheduleApi';
import { organizationApi } from '../services/OrganizationApi';
import { organizationTypeApi } from '../services/OrganizationTypeApi';
import { priceConfigApi } from '../services/PriceConfigApi';


export const store = configureStore({
  reducer: {
    [stationApi.reducerPath]: stationApi.reducer,
    [priceCategoryApi.reducerPath]: priceCategoryApi.reducer,
    [priceConfigApi.reducerPath]: priceConfigApi.reducer,
    [priceClassificationApi.reducerPath]: priceClassificationApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
    [organizationTypeApi.reducerPath]: organizationTypeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      stationApi.middleware,
      priceCategoryApi.middleware,
      priceConfigApi.middleware,
      priceClassificationApi.middleware,
      programApi.middleware,
      scheduleApi.middleware,
      organizationApi.middleware,
      organizationTypeApi.middleware,
    ),
});
