import { baseApi } from '@/shared/api/create-base.api';
import { Create, Review, ReviewResponse, Update } from '../types/review.type';
import { reviewKey } from '../constants';

export const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<
      ReviewResponse,
      { courseId: string; page?: number; limit?: number }
    >({
      query: ({ courseId, page = 1, limit = 10 }) => ({
        url: `courses/${courseId}/reviews`,
        credentials: 'include',
        params: { page, limit },
      }),

      providesTags: (_result, _error, args) => [
        reviewKey.details(args.courseId),
      ],
    }),

    addReview: builder.mutation<{ data: Review }, Create>({
      query: ({ courseId, ...body }) => ({
        url: `courses/${courseId}/reviews`,
        credentials: 'include',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, args) => [
        reviewKey.details(args.courseId),
      ],
    }),

    removeReview: builder.mutation<void, { courseId: string }>({
      query: ({ courseId }) => ({
        url: `courses/${courseId}/reviews`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: (_result, _error, args) => [
        reviewKey.details(args.courseId),
      ],
    }),

    updateReview: builder.mutation<void, Update>({
      query: ({ courseId, ...body }) => ({
        url: `courses/${courseId}/reviews`,
        method: 'PATCH',
        credentials: 'include',
        body,
      }),
      invalidatesTags: (_result, _error, args) => [
        reviewKey.details(args.courseId),
      ],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useAddReviewMutation,
  useRemoveReviewMutation,
  useUpdateReviewMutation,
} = ReviewApi;
