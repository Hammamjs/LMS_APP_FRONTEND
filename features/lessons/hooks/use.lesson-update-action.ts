import { useUpdateLessonMutation } from '../api/lesson.api';
import { TUpdateLessonSchema } from '../schema/update-lesson.schema';

export const useLessonUpdateAction = () => {
  const [trigger, result] = useUpdateLessonMutation();

  const update = async (data: TUpdateLessonSchema) => {
    return await trigger(data).unwrap();
  };

  return {
    update,
    ...result,
  };
};
