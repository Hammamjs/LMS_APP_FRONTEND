import { z } from 'zod';
import { Level } from '../types/course.types';

export const CreateCourseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 charcters'),

  originalPrice: z
    .number()
    .min(1, 'Original price must be at least 1')
    .positive('original Price cannot be negative'),
  discountPrice: z.number().positive('original Price cannot be negative'),

  hours: z.coerce.number().int().min(0),
  minutes: z.coerce.number().min(0).max(59),
  seconds: z.coerce.number().min(0).max(59),

  subtitle: z.string().min(3, 'Subtitle must be at least 3 charcters'),

  requirements: z.array(z.string()).min(1, 'Requirement is required field'),

  whatYouLearn: z
    .array(z.string())
    .min(1, 'What you learn must have at least one item'),

  language: z.string().min(1, 'Language is required'),

  targetAudience: z
    .array(z.string())
    .min(1, 'Target audience must have at least one item'),

  description: z.string().min(1, 'Description is required'),

  image: z.string(),

  category: z.string().min(1, 'Course category is required'),

  level: z.enum([Level.Advanced, Level.Beginner, Level.Intermediate]),
});

export type TCreateCourseSchema = z.infer<typeof CreateCourseSchema>;

export const EMPTY_DEFAULTS: TCreateCourseSchema = {
  category: '',
  description: '',
  image: '',
  language: '',
  subtitle: '',
  title: '',
  discountPrice: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  originalPrice: 0,
  targetAudience: [],
  whatYouLearn: [],
  requirements: ['Basic JavaScript knowledge'],
  level: Level.Beginner,
};

export type ArrayKeys<T> = Extract<
  {
    [K in keyof T]: T[K] extends unknown[] ? K : never;
  }[keyof T],
  string
>;
