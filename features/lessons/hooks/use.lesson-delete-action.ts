import { useDeleteLessonMutation } from '../api/lesson.api';

type DeleteProps = {
  id: string;
  courseId: string;
};

export const useLessonDeleteAction = () => {
  const [trigger, result] = useDeleteLessonMutation();

  const deleteLesson = async (data: DeleteProps) => {
    return await trigger(data).unwrap();
  };

  return {
    deleteLesson,
    ...result,
  };
};
