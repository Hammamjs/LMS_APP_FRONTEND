import { useUserEnrollmentQuery } from '../api/courses.api';

export const useGetUserEnrollment = () => {
  return useUserEnrollmentQuery();
};
