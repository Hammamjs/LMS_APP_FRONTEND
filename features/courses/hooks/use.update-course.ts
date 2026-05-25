import { useUpdateCourseMutation } from '../api/courses.api';
import { UpdateCourseRequest } from '../types/course.types';

export const useUpdateCourseMutationAction = () => {
  const [trigger, result] = useUpdateCourseMutation();

  const update = async (data: UpdateCourseRequest) => {
    return await trigger(data).unwrap();
  };

  return {
    update,
    ...result,
  };
};
