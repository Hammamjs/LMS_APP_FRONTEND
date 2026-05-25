import { type User } from '@/features/users';

export enum Level {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

// Course filter
export interface CourseFiltersProps {
  selectedCategory: string | null;
  selectedLevel: Level | null;
  selectedPrice: string | null;
  onCategoryChange: (category: string | null) => void;
  onLevelChange: (level: Level | null) => void;
  onPriceChange: (price: string | null) => void;
  onClearAll: () => void;
}

export interface Course {
  id: string;
  title: string;
  originalPrice: number;
  discountPrice: number;
  level: Level;
  duration: number;
  slug: string;
  description: string;
  rating: number;
  subtitle: string;
  purchaseCount: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  instructor: User;

  requirements: string[];
  language: string;
  whatYouLearn: string[];
  targetAudience: string[];

  lessonCount: number;
}

export interface CourseRequest {
  title: string;
  originalPrice: number;
  discountPrice: number;
  level: Level;
  duration: number;
  description: string;
  image: string;
  category: string;
  requirements: string[];
  language: string;
  whatYouLearn: string[];
  targetAudience: string[];
}

export interface UpdateCourseRequest extends CourseRequest {
  id: string;
}

export type Status = 'ACTIVE' | 'COMPLETED' | 'REFUND';

export interface EnrolledCourse {
  id: string;
  userId: string;
  courseId: string;
  totalLessonsCount: number;
  completedLessonsIds: string[];
  progressPercentage: number;
  enrolledAt: Date;
  status: Status;
  createdAt: Date;
  course: {
    id: string;
    image: string | null;
    title: string;
    duration: number;

    instructor: {
      id: string | null;
      username: string | null;
      avatar: string | null;
      bio: string | null;
    } | null;
  } | null;
}
