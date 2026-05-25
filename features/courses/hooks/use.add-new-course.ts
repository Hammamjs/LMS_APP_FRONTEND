import { useCreateCourseMutation } from '../api/courses.api';
import { CourseRequest } from '../types/course.types';

export const useAddCourseMutationAction = () => {
  const [trigger, result] = useCreateCourseMutation();
  const createCourse = async (data: CourseRequest) => {
    await trigger(data).unwrap();
  };

  return {
    createCourse,
    ...result,
  };
};
