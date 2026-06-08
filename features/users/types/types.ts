import { Course } from '@/features/courses/types';

export type Role = 'Student' | 'Instructor' | 'Admin';

type Meta = {
  page: number;
  total: number;
  limit: number;
  lastPage: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  emailVerified?: Date;
  avatar: string | null;
  bio: string | null;
  phone?: string;
  authorCourses: Course[];
}

export type UserParams = {
  role?: Role;
  isVerified?: boolean;
};

export interface UserResponse {
  data: User[];
  meta: Meta;
}
