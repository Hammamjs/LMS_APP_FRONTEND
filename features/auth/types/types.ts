import { Course } from '@/features/courses';
import { Role, User } from '@/features/users';

export interface SignInResponse {
  id: string;
  email: string;
  username: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  password: string;
  emailVerified?: Date;
  avatar: string | null;
  phone?: string;
  passwordUpdatedAt: Date;
  isPasswordCodeVerified: boolean;
  authorCourses: Course[];
}

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string | null;
};

export interface AuthState {
  user: User | null;
  accessToken: string | null;
}

export type ResetPasswordRequest = {
  confirmPassword: string;
  newPassword: string;
  email: string;
};
