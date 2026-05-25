import { EnrolledCourse } from '@/features/courses/types';
import { useMemo } from 'react';

type Props = {
  enrolledCourses: EnrolledCourse[];
  isLoading: boolean;
};

export const useStatsActions = ({ enrolledCourses, isLoading }: Props) => {
  const inProgressCourses = useMemo(() => {
    return enrolledCourses.filter((c) => c.status == 'ACTIVE');
  }, [enrolledCourses, isLoading]);

  const completedCourses = useMemo(() => {
    return enrolledCourses.filter((c) => c.status == 'COMPLETED');
  }, [enrolledCourses, isLoading]);

  const calcAverage = enrolledCourses.reduce(
    (cur, next) => cur + next.progressPercentage,
    0,
  );

  return {
    inProgressCourses,
    completedCourses,
    calcAverage,
  };
};
