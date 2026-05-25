'use client';

import { useSelector } from 'react-redux';
import { useGetCourseByIdQuery } from '../hooks/use.course-by-id';
import { CourseFormComponent } from './course-form.component';
import { selectCurrentUser } from '@/features/auth/store/sign-in.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const EditCourseComponent = ({ id }: { id: string }) => {
  const { course, isLoading } = useGetCourseByIdQuery(id);

  const user = useSelector(selectCurrentUser);

  const router = useRouter();

  const isForibidden = !!course && !!user && user.id !== course.instructor.id;

  useEffect(() => {
    if (!isLoading && isForibidden)
      router.replace(`/instructor/${user?.id}/me`);
  }, [isForibidden, user?.id, router, isLoading]);

  if (isLoading) return <>Updateing page loading ... </>;

  if (!course) return <div>Course not found</div>;

  return <CourseFormComponent mode="edit" course={course} />;
};
