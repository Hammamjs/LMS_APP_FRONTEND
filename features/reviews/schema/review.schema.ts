import { z } from 'zod';

export const ReviewSchema = z.object({
  content: z
    .string()
    .trim()
    .min(3, 'Review must be at least 3 charcters')
    .max(2000, 'Review cannot exceed 2000 characters'),
  rating: z.coerce
    .number()
    .int('Rating must be a whole number')
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5'),
});

export type TReviewSchema = z.infer<typeof ReviewSchema> & {
  courseId: string;
};

export const DEFUALT_REVIEW_VALUES: TReviewSchema = {
  content: '',
  rating: 1,
  courseId: '',
};
