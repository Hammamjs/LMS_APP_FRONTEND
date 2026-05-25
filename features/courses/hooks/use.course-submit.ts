import { useToast } from '@/shared/hooks';
import {
  CreateCourseSchema,
  TCreateCourseSchema,
} from '../schema/create.course.schema';
import { useAddCourseMutationAction } from './use.add-new-course';
import { useUpdateCourseMutationAction } from './use.update-course';
import { Course } from '../types/course.types';

type Props = {
  course?: Course;
  isEdit: boolean;
  imageUrl: string;
};

export const useCourseSubmit = ({ imageUrl, isEdit, course }: Props) => {
  const { createCourse, isLoading: isCourseAdding } =
    useAddCourseMutationAction();
  const { update, isLoading: isCourseUpdating } =
    useUpdateCourseMutationAction();
  const { toast } = useToast();

  const onSubmit = async (data: TCreateCourseSchema) => {
    const result = CreateCourseSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((e) => {
        toast({ title: e.message, variant: 'destructive' });
      });

      return;
    }

    try {
      const totalDuration =
        (data.hours || 0) * 3600 +
        (data.minutes || 0) * 60 +
        (data.seconds || 0);

      const { hours, minutes, seconds, ...obj } = data;

      if (!isEdit) {
        await createCourse({
          ...obj,
          duration: totalDuration,
          image: imageUrl,
        });
      } else if (isEdit && course) {
        await update({
          ...obj,
          duration: totalDuration,
          image: imageUrl,
          id: course.id,
        });
      }

      toast({
        title: isEdit
          ? 'Course updating successfuly'
          : 'Course added successfuly',
      });
    } catch (err) {
      toast({
        title:
          err instanceof Error
            ? err.message
            : `${isEdit ? 'Failed update course' : 'Create new course was failed'}`,
      });
      console.log('Create new course was failed', err);
    }
  };

  return {
    onSubmit,
    isLoading: isCourseAdding || isCourseUpdating,
  };
};
