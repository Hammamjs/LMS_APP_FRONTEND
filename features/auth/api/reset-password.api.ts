import { baseApi } from '@/shared/api/create-base.api';
import { ResetPasswordRequest } from '../types/types';

export const ResetPasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = ResetPasswordApi;
