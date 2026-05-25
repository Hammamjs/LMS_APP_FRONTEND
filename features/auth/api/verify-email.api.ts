import { baseApi } from '@/shared/api/create-base.api';
import { ResetPasswordRequest } from '../types/types';

export const VerifyEmailApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resendCode: builder.mutation<{ message: string }, { email: string }>({
      query: (email) => ({
        url: '/auth/resend-code',
        method: 'POST',
        body: email,
      }),
    }),

    verifyEmail: builder.mutation<
      { message: string },
      { code: string; email: string }
    >({
      query: ({ code, email }) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: { code, email },
      }),
    }),
  }),
});

export const { useResendCodeMutation, useVerifyEmailMutation } = VerifyEmailApi;
