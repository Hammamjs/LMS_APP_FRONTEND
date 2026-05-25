import { Status } from '@/features/courses/types/course.types';

export type PaymentMethod = 'BANK' | 'STRIPE';
export type PaymentStatus = 'SUCCESS' | 'FAILED' | 'PENDING';

type Meta = {
  page: number;
  total: number;
  limit: number;
  lastPage: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type PaymentRequest = {
  amount: number;
  courseId: string;
  currency: string;
  provider: PaymentMethod;
  source: string;
};

export type PaymentResponse = {
  id: string;
  userId: string;
  status: PaymentStatus;
  provider: string;
  amount: number;
  course: {
    id: string;
    title: string;
    enrollment: {
      status: Status;
    };
  };
  transactionId: string;
  createdAt: Date;
};

export type PaymentPaginationResponse = {
  meta: Meta;
  data: PaymentResponse[];
};
