import { baseApi } from '@/shared/api/create-base.api';
import { AuthState, ResetPasswordRequest } from '../types/types';
import { setSessionStorage } from '@/shared/lib/session-storage.helper';
import { setCredentials } from '../store';

export const ResetPasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation<AuthState, ResetPasswordRequest>({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: { data: AuthState }) => response.data,
      onQueryStarted: async (_queryArgs, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.accessToken) {
            setSessionStorage('accessToken', data.accessToken);
            dispatch(setCredentials({ ...data }));
          }
        } catch (err) {
          console.error('Login failed', err);
        }
      },
    }),
  }),
});

export const { useResetPasswordMutation } = ResetPasswordApi;
