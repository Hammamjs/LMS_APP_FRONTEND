import { baseApi } from '@/shared/api/create-base.api';
import { AuthState } from '../types';
import { setSessionStorage } from '@/shared/lib/session-storage.helper';
import { setCredentials } from '../store';

export const VerifyEmailApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resendCode: builder.mutation<{ message: string }, { email: string }>({
      query: (email) => ({
        url: '/auth/resend-code',
        method: 'POST',
        body: email,
      }),
    }),

    verifyEmail: builder.mutation<AuthState, { code: string; email: string }>({
      query: ({ code, email }) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: { code, email },
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

export const { useResendCodeMutation, useVerifyEmailMutation } = VerifyEmailApi;
