'use client';

import { selectCurrentUser } from '@/features/auth/store/sign-in.store';
import useCourseResult from '@/features/courses/hooks/use.get.courses';
import { useSelector } from 'react-redux';
import { LessonProvider } from './lesson.context.provider';
import { NewLessonContent } from './add-lesson.content';
import { NewLessonSkeleton } from './add-lesson.skeleton';

export const AddLessonComponent = () => {
  const user = useSelector(selectCurrentUser);

  const { courses, isLoading } = useCourseResult({
    instructorId: user?.id,
    page: 1,
  });

  if (isLoading) return <NewLessonSkeleton />;

  return (
    <LessonProvider>
      <NewLessonContent courses={courses ?? []} />
    </LessonProvider>
  );
};
