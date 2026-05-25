import { baseApi } from '@/shared/api/create-base.api';
import { Lesson, LessonRequest, LessonResponse } from '../types/types';
import { lessonKey } from '../constants/lesson.key';
import { TUpdateLessonSchema } from '../schema/update-lesson.schema';

export const LessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourseLessonsById: builder.query<LessonResponse, { courseId: string }>({
      query: ({ courseId }) => ({
        url: `/lessons`,
        params: { courseId },
        credentials: 'include',
      }),
      providesTags: [lessonKey.list()],
      transformResponse: (response: LessonResponse): LessonResponse => {
        return {
          ...response,
          data: [...response.data].sort((a, b) => a.order - b.order),
        };
      },
    }),
    createLesson: builder.mutation<Lesson, LessonRequest>({
      query: (data) => ({
        url: '/lessons',
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
    }),
    getLessonById: builder.query<Lesson, { id: string }>({
      query: ({ id }) => ({
        url: `/lessons/${id}`,
        credentials: 'include',
      }),
    }),

    updateLesson: builder.mutation<void, TUpdateLessonSchema>({
      query: ({ id, ...body }) => ({
        url: `lessons/${id}`,
        credentials: 'include',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, args) => [
        lessonKey.details(args.id),
        lessonKey.list(),
      ],
    }),
    deleteLesson: builder.mutation<void, { id: string; courseId: string }>({
      query: ({ id }) => ({
        url: `lessons/${id}`,
        credentials: 'include',
        method: 'DELETE',
      }),

      async onQueryStarted(queryArgs, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          LessonApi.util.updateQueryData(
            'getCourseLessonsById',
            { courseId: queryArgs.courseId },
            (draft) => {
              const index = draft.data.findIndex((l) => l.id === queryArgs.id);
              if (index != -1) {
                draft.data.splice(index, 1);
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: (_result, _error, args) => [
        lessonKey.details(args.id),
        lessonKey.list(),
      ],
    }),
  }),
});

export const {
  useGetCourseLessonsByIdQuery,
  useCreateLessonMutation,
  useGetLessonByIdQuery,
  useDeleteLessonMutation,
  useUpdateLessonMutation,
} = LessonApi;
