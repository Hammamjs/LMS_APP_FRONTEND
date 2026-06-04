'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui';
import { CourseCard } from '@/features/courses/components';
import useCourseResult from '@/features/courses/hooks/use.get.courses';

export function CourseGrid() {
  const { courses } = useCourseResult({ page: 1 });
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Popular Courses
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore our most sought-after courses chosen by thousands of
              learners
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/courses" className="flex items-center gap-2">
              View All Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Course Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses &&
            courses
              .slice(0, 6)
              .map((course) => <CourseCard key={course.id} course={course} />)}
        </div>
      </div>
    </section>
  );
}
