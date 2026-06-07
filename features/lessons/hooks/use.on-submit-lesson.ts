import { useToast } from '@/shared/hooks';
import { AddLessonSchema, TAddLessonSchema } from '../schema/add-lesson.schema';
import { convertTime } from '../lib/convert-time.helper';
import { useCreateLessonMutationAction } from './use.create-lesson';

export const useOnSubmitLesson = () => {
  const { createLesson, isLoading } = useCreateLessonMutationAction();

  const { toast } = useToast();
  const onSubmit = async (data: TAddLessonSchema) => {
    const result = AddLessonSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((e) => {
        toast({ title: e.message, variant: 'destructive' });
      });
      return;
    }

    const { minutes } = convertTime(data.duration);

    try {
      await createLesson({ ...data, duration: minutes });
      toast({ title: 'Lesson created successfully' });
    } catch (err) {
      toast({ title: 'Failed to add lesson' });
      console.log('Error', err);
    }
  };

  return {
    onSubmit,
    isLoading,
  };
};
