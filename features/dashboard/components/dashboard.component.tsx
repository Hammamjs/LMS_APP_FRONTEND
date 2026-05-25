'use client';

import Link from 'next/link';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, Button } from '@/shared/ui';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/store/sign-in.store';
import { useGetUserEnrollment } from '@/features/courses/hooks/use.user.enrollment';
import { DashboardSkeleton } from './dashboard.skeletion';
import { ContinueLearning } from './continue-learning';
import CompletedCourses from './completed-courses';
import { useGetCourses } from '@/features/courses/hooks';
import { useStatsActions } from '../hooks/use.stats.actions';

export function DashboardComponent() {
  const user = useSelector(selectCurrentUser);

  const { data: enrollment, isLoading } = useGetUserEnrollment();

  const { courses, isLoading: isCourseLoading } = useGetCourses({ page: 1 });

  const enrolledCourses = enrollment?.data ?? [];

  const { calcAverage, completedCourses, inProgressCourses } = useStatsActions({
    enrolledCourses,
    isLoading,
  });

  if (isLoading || isCourseLoading) return <DashboardSkeleton />;

  const stats = [
    {
      icon: BookOpen,
      label: 'Enrolled Courses',
      value: enrolledCourses.length,
      color: 'text-primary',
    },
    {
      icon: Clock,
      label: 'Hours Watched',
      value: 0,
      color: 'text-emerald-500',
    },
    {
      icon: Award,
      label: 'Certificates Earned',
      value: 0,
      color: 'text-amber-500',
    },
    {
      icon: TrendingUp,
      label: 'Avg. Progress',
      value: calcAverage / enrolledCourses.length,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.username.split(' ')[0]}!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Continue where you left off and track your learning progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted ${stat.color}`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue Learning */}
      <ContinueLearning inProgressCourses={inProgressCourses} />

      {/* Completed Courses */}

      <CompletedCourses
        completedCourses={completedCourses}
        courses={courses ?? []}
      />

      {/* Empty State */}
      {enrolledCourses.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
          <div className="mb-4 rounded-full bg-muted p-4">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">No courses yet</h3>
          <p className="mb-4 text-center text-muted-foreground">
            Start your learning journey by enrolling in a course
          </p>
          <Button asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
