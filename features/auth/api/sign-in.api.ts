import { baseApi } from '@/shared/api/create-base.api';
import { SignInValidationSchemaType } from '../schema/sign-in.schema';
import { userKey } from '../constants/user.key';
import { AuthState } from '../types/types';
import { setSessionStorage } from '@/shared/lib/session-storage.helper';
import { setCredentials } from '../store/sign-in.store';
import { TUpdatePasswordSchema } from '../schema/update.password.validation';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<AuthState, SignInValidationSchemaType>({
      query: (body: SignInValidationSchemaType) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: AuthState }) => response.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
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
      invalidatesTags: [userKey.type],
    }),

    getMe: builder.query<AuthState, void>({
      query: () => '/auth/current-user',
      transformResponse: (response: { data: AuthState }) => response.data,
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const res = await queryFulfilled;
        if (res.data) {
          console.log(res.data);
          dispatch(setCredentials({ ...res.data, user: res.data.user }));
        }
      },
      providesTags: [userKey.type],
    }),

    updatePassword: builder.mutation<
      { message: string },
      TUpdatePasswordSchema
    >({
      query: (body) => ({
        url: '/auth/update-password',
        credentials: 'include',
        method: 'PATCH',
        body,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        credentials: 'include',
        method: 'Post',
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useGetMeQuery,
  useLogoutMutation,
  useUpdatePasswordMutation,
} = authApi;
