'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import {
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { useParams } from 'next/navigation';
import useCourseResult from '@/features/courses/hooks/use.get.courses';
import React, { useState } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { CourseList } from './course-list';
import CourseCardInstructorSkeleton from './course-card.instructor.skeletion';
import { InstructorCoursesSkeleton } from './instructor-courses.skeleton';

export function InstructorCoursesComponent() {
  // we need to get instructor courses
  const { instructorId } = useParams<{ instructorId: string }>();
  const [search, setSearch] = useState<string>('');
  const searchDebounce = useDebounce(search, 300);

  const { courses, isLoading, isFetching } = useCourseResult({
    instructorId,
    page: 1,
    search: searchDebounce,
  });

  if (isLoading) return <InstructorCoursesSkeleton />;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">
            Manage, edit and track performance of all your courses.
          </p>
        </div>

        <Button asChild>
          <Link href="instructor-courses/new">
            <Plus className="mr-2 h-4 w-4" />
            New Course
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search your courses…"
          className="sm:max-w-sm"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <Select defaultValue="all">
          <SelectTrigger className="sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isFetching ? (
          Array.from({ length: 5 }).map((_, i) => (
            <CourseCardInstructorSkeleton key={i} />
          ))
        ) : courses?.length ? (
          <CourseList courses={courses || []} />
        ) : (
          <div className="py-10 text-center text-zinc-400">
            No courses found.
          </div>
        )}
      </div>
    </div>
  );
}
