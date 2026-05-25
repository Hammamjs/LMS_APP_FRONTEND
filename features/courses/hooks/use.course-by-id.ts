import { useCourseByIdQuery } from '../api/courses.api';

export const useGetCourseByIdQuery = (id?: string) => {
  const skip = !id;

  const {
    data: course,
    isSuccess,
    error,
    isError,
    isLoading,
    refetch,
  } = useCourseByIdQuery(
    { id: id! },
    {
      skip,
    },
  );

  return { course, isSuccess, error, isError, isLoading, refetch };
};
