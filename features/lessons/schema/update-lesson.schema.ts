import { z } from 'zod';
import { AddLessonSchema } from './add-lesson.schema';

export const UpdateLessonSchema = AddLessonSchema.extend({
  id: z.string(),
});

export type TUpdateLessonSchema = z.infer<typeof UpdateLessonSchema>;

export const UPDATE_DEFAULT_VALUES: TUpdateLessonSchema = {
  courseId: '',
  description: '',
  duration: 0,
  id: '',
  isFree: false,
  title: '',
  url: '',
};
