import { Suspense } from 'react';
import { CoursesContent } from './courses-content';
import { CoursesPageSkeleton } from './courses.skeletion';

export function CoursesComponent() {
  return (
    <Suspense fallback={<CoursesPageSkeleton />}>
      <CoursesContent />
    </Suspense>
  );
}
