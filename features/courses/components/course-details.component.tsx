'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { CourseLeftContent } from './course-left-content';
import { CourseRightContent } from './course-right-content';
import { CourseContent } from './course-content';
import { useGetCourseByIdQuery } from '../hooks/use.course-by-id';
import { CourseDetailsSkeleton } from './course-details.skeletion';

export function CourseDetailsComponent({ id }: { id: string }) {
  const { course, isLoading, isError, error } = useGetCourseByIdQuery(
    id as string,
  );

  useEffect(() => {
    if (isError) console.log(error);
    console.log(course);
  }, [isLoading]);

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  // Only after loading completed
  if (!course) {
    notFound();
  }

  return (
    !isLoading && (
      <div>
        {/* Hero Section */}
        <section className="bg-linear-to-b from-muted/50 to-background py-12 lg:py-16 space-y-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Left Content */}
              <CourseLeftContent course={course} />

              {/* Right Sidebar - Purchase Card */}
              <div className="w-full lg:w-95 shrink-0">
                <CourseRightContent course={course} />
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <CourseContent course={course} />
      </div>
    )
  );
}
