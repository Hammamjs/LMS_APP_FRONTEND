import { useGetLessonByIdQuery } from '../api/lesson.api';

export const useGetLessonById = (id: string) => useGetLessonByIdQuery({ id });
