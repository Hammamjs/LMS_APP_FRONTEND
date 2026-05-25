import { z } from 'zod';

export const LessonFormSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
  description: z.string().min(2),

  isFree: z.boolean(),

  courseId: z.string(),

  duration: z.number(),
});
