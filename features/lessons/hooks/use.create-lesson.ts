import { useCreateLessonMutation } from '../api/lesson.api';
import { LessonRequest } from '../types/types';

export const useCreateLessonMutationAction = () => {
  const [trigger, result] = useCreateLessonMutation();

  const createLesson = async (data: LessonRequest) => {
    await trigger(data).unwrap();
  };

  return {
    createLesson,
    ...result,
  };
};
