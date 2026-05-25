import { z } from 'zod';
import { LessonFormSchema } from './lesson-form.schema';

export const AddLessonSchema = LessonFormSchema;

export type TAddLessonSchema = z.infer<typeof AddLessonSchema>;
