import { baseApi } from '@/shared/api/create-base.api';

export const ForgotPasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: email,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation } = ForgotPasswordApi;
