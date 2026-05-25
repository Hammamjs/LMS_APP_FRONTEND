import { baseApi } from '@/shared/api/create-base.api';
import { courseKey } from '../constants/course.key';
import {
  Course,
  CourseRequest,
  EnrolledCourse,
  UpdateCourseRequest,
} from '../types/course.types';
import { Result } from '@/shared/types';
import { setEnrollment } from '../store/enrollment.store';
type Meta = {
  page: number;
  total: number;
  limit: number;
  lastPage: number;
  hasNext: boolean;
  hasPrev: boolean;
};

type CourseResponse = { data: Course[]; meta: Meta };

type CourseQuery = {
  page: number;
  category?: string;
  instructorId?: string;
  search?: string;
};

const defaultObject: CourseQuery = {
  page: 1,
  category: '',
  instructorId: '',
  search: '',
};

export const CoursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Getter -> public route
    courses: builder.query<CourseResponse, CourseQuery>({
      query: ({ page, category, instructorId, search } = defaultObject) => ({
        url: 'courses',
        params: { page, category, instructorId, search },
      }),

      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}-${queryArgs.category}-${queryArgs.instructorId}-${queryArgs.search}`,

      merge: (currentCache, newItems) => {
        if (newItems.meta.page == 1) {
          currentCache.data = newItems.data;
        } else {
          currentCache.data.push(...newItems.data);
        }

        currentCache.meta = newItems.meta;
      },

      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page ||
        currentArg?.search !== previousArg?.search ||
        currentArg?.category !== previousArg?.category ||
        currentArg?.instructorId !== previousArg?.instructorId,

      providesTags: [courseKey.list()],
    }),

    courseById: builder.query<Course, { id: string }>({
      query: ({ id }) => ({
        url: `courses/${id}`,
        credentials: 'include',
      }),

      providesTags: (_result, _error, { id }) => [courseKey.details(id)],
    }),

    courseCategories: builder.query<string[], void>({
      query: () => '/courses/categories',
    }),

    createCourse: builder.mutation<Course, CourseRequest>({
      query: (course) => ({
        url: '/courses',
        credentials: 'include',
        method: 'POST',
        body: course,
      }),
    }),

    updateCourse: builder.mutation<Course, UpdateCourseRequest>({
      query: ({ id, ...body }) => ({
        url: `/courses/${id}`,
        credentials: 'include',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, args) => [
        courseKey.details(args.id),
        courseKey.list(),
      ],
    }),

    deleteCourse: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/course/${id}`,
        credentials: 'include',
        method: 'DELETE',
      }),

      invalidatesTags: (_result, _error, args) => [
        courseKey.details(args.id),
        courseKey.list(),
      ],
    }),

    userEnrollment: builder.query<{ data: EnrolledCourse[] }, void>({
      query: () => ({
        url: '/enrollment/user',
        credentials: 'include',
      }),
    }),
    isUserEnrolled: builder.query<
      EnrolledCourse | null,
      { courseId: string; userId: string }
    >({
      query: ({ courseId, userId }) => ({
        url: '/enrollment',
        params: { courseId, userId },
        credentials: 'include',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const checkAccess = data ? data.courseId === args.courseId : false;
          dispatch(setEnrollment({ isEnrolled: checkAccess }));
        } catch (err) {
          console.log(err);
          dispatch(setEnrollment({ isEnrolled: false }));
        }
      },
    }),
  }),
});

export const {
  useCoursesQuery,
  useCourseByIdQuery,
  useUserEnrollmentQuery,
  useIsUserEnrolledQuery,
  useCourseCategoriesQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = CoursesApi;
