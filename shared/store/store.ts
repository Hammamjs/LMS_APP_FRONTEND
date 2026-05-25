import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/create-base.api';
import { AuthReducer } from '@/features/auth/store';
import { EnrollmentReducer } from '@/features/courses/store';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: AuthReducer,
    enrollment: EnrollmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  // devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
