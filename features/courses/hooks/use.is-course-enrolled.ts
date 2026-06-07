import { useIsUserEnrolledQuery } from '../api/courses.api';

export const useUserEnrolled = (courseId: string, userId: string) => {
  const {
    data: enrollment,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useIsUserEnrolledQuery(
    { courseId, userId },
    { skip: !userId || !courseId },
  );

  return {
    isEnrolled: !!(isSuccess && enrollment && enrollment.courseId === courseId),
    isCheckingUserEnrollment: isLoading,
    isSuccess,
    isFetching,
    refetch,
  };
};
