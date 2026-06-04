import { courseKey } from '@/features/courses/constants/course.key';
import { lessonKey } from '@/features/lessons/constants/lesson.key';
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from '@/features/auth/store/sign-in.store';
import { AuthState } from '@/features/auth/types';
import { userKey } from '@/features/auth/constants/user.key';
import { notificationKey } from '@/features/notification/constants';
import { reviewKey } from '@/features/reviews/constants';

interface StateWithAuth {
  auth: AuthState;
}

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as StateWithAuth).auth.accessToken;

    if (token) headers.set('authorization', `Bearer ${token}`);

    return headers;
  },
});

const baseQueryNoAuth = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOption) => {
  let result = await baseQuery(args, api, extraOption);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQueryNoAuth(
      { url: '/auth/refresh', method: 'GET' },
      api,
      { ...extraOption, skipAuthHeader: true },
    );

    if (refreshResult.data) {
      const user = (api.getState() as StateWithAuth).auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOption);
    } else {
      if (!window.location.pathname.includes('/sign-in')) {
        console.warn(
          'Refresh token rejected or unreachable. Evicting user session.',
        );
        api.dispatch(logout());
      }
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    userKey.type,
    courseKey.type,
    lessonKey.type,
    notificationKey.type,
    reviewKey.type,
  ],
});
