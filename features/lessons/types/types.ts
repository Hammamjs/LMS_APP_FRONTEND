export interface Lesson {
  id: string;
  title: string;
  url: string;
  order: number;
  rating: string;
  duration: number;
  description: string;
  isFree: boolean;
  courseId: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonRequest {
  title: string;
  url: string;
  description: string;
  duration: number;
  isFree: boolean;
  courseId: string;
}

type Meta = {
  page: number;
  total: number;
  limit: number;
  lastPage: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type LessonResponse = {
  data: Lesson[];
  meta: Meta;
};

export type YouTubeMeta = {
  title: string;
  thumbnail: string;
  author_name: string;
};

export type Mode = 'upload' | 'link';
