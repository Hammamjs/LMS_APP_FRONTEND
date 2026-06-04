import { useDeleteCourseMutation } from '../api/courses.api';

export const useDeleteCourseMutationAction = () => {
  const [trigger, result] = useDeleteCourseMutation();

  const deleteCourse = async (id: string) => {
    return trigger({ id }).unwrap();
  };

  return {
    deleteCourse,
    ...result,
  };
};
