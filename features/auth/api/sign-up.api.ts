import { baseApi } from '@/shared/api/create-base.api';
import { RegisterRequest } from '../types/auth.types';

export const SignUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<{ message: string }, RegisterRequest>({
      query: (user) => ({
        url: '/auth/signup',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useSignUpMutation } = SignUpApi;
