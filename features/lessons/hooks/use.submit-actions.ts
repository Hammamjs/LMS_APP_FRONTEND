import { UseFormSetValue } from 'react-hook-form';
import {
  TUpdateLessonSchema,
  UpdateLessonSchema,
} from '../schema/update-lesson.schema';
import { useLessonUpdateAction } from './use.lesson-update-action';
import { useToast } from '@/shared/hooks';
import { Lesson } from '../types/types';
import { convertTime } from '../lib/convert-time.helper';
import { useLessonDeleteAction } from './use.lesson-delete-action';

type Props = {
  setValue: UseFormSetValue<TUpdateLessonSchema>;
  lesson: Lesson | undefined;
};

export const useOnSubmitActions = ({ setValue, lesson }: Props) => {
  const { toast } = useToast();

  const { update, isLoading } = useLessonUpdateAction();

  const onSubmit = async (values: TUpdateLessonSchema) => {
    const result = UpdateLessonSchema.safeParse(values);
    if (!lesson) return;

    if (setValue) {
      setValue('id', lesson.id);
      setValue('courseId', lesson.courseId);
    }

    if (!result.success) {
      result.error.issues.map((e) => {
        toast({ title: e.message });
      });
      return;
    }

    try {
      const { minutes } = convertTime(values.duration);
      await update({
        ...values,
        duration: minutes,
      });
      toast({ title: 'Lesson updated successfuly' });
    } catch (err) {
      console.log(err);
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update lesson';
      toast({ title: errorMessage });
    }
  };

  return {
    isLessonUpdating: isLoading,
    onSubmit,
  };
};
