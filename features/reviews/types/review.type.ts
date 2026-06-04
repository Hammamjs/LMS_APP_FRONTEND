import { User } from '@/features/users/types';
import { Meta } from '@/shared/types';

export type Review = {
  id: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  courseId: string;
  userId: string;
};

export type Create = Pick<Review, 'content' | 'courseId' | 'rating'>;
export type Update = Pick<Review, 'content' | 'courseId' | 'rating'>;

export type ReviewResponse = {
  data: Review[];
  meta: Meta;
};
