import { useGetCourseLessonsByIdQuery } from '../api/lesson.api';

export const useGetCourseLessons = (courseId: string) =>
  useGetCourseLessonsByIdQuery({ courseId });
