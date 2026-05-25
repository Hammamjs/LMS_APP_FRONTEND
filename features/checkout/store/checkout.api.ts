import { baseApi } from '@/shared/api/create-base.api';
import type {
  PaymentPaginationResponse,
  PaymentRequest,
  PaymentResponse,
  PaymentStatus,
} from '../types/types';

export const CheckoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    pay: builder.mutation<PaymentResponse, PaymentRequest>({
      query: (body) => ({
        url: '/payment',
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),

    getUserHistory: builder.query<
      PaymentPaginationResponse,
      { search?: string; status?: string }
    >({
      query: ({ search, status }) => {
        const params = new URLSearchParams();

        if (search) params.append('search', search);
        if (status) params.append('status', status);

        return {
          url: `/payment/user/payments-history?${params.toString()}`,
          credentials: 'include',
        };
      },
    }),
  }),
});

export const { usePayMutation, useGetUserHistoryQuery } = CheckoutApi;
