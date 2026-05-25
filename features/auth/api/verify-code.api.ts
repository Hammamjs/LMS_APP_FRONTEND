import { baseApi } from '@/shared/api/create-base.api';

export const VerifyResetPasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyResetPassword: builder.mutation<
      void,
      { code: string; email: string }
    >({
      query: (body) => ({
        url: '/auth/verify-resetcode',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useVerifyResetPasswordMutation } = VerifyResetPasswordApi;
