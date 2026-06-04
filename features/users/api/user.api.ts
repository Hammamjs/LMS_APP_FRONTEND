import { userKey } from '@/features/auth/constants';
import { baseApi } from '@/shared/api/create-base.api';
import { UserParams, UserResponse } from '../types/types';

export const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse, UserParams>({
      query: ({ isVerified, role }) => ({
        url: '/users',
        params: { isVerified, role },
      }),
      providesTags: [userKey.list()],
    }),
  }),
});

export const { useGetUsersQuery } = UserApi;
