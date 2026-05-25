'use client';

import { Card, CardContent, Skeleton, Badge } from '@/shared/ui';

export function CategoryCoursesBySlugSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Header Section */}
      <section className="bg-linear-to-b from-muted/50 to-background py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Skeleton className="mb-6 h-4 w-32 rounded-md" />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content */}
            <div className="flex items-start gap-4">
              <Skeleton className="h-16 w-16 rounded-xl" />

              <div className="space-y-3">
                <Skeleton className="h-10 w-64 rounded-xl" />
                <Skeleton className="h-4 w-105 max-w-full rounded-lg" />
                <Skeleton className="h-4 w-[320px] max-w-[80%] rounded-lg" />
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-2 text-center">
                  <Skeleton className="mx-auto h-8 w-14 rounded-lg" />
                  <Skeleton className="mx-auto h-4 w-16 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Courses */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="mb-6 flex flex-col gap-4 rounded-xl border border-border/50 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <Skeleton className="h-10 w-full max-w-sm rounded-lg" />

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-10 w-36 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-44 rounded-lg" />

              <div className="hidden sm:flex items-center gap-1 rounded-md border border-border p-1">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Skeleton className="h-4 w-24 rounded-md" />

            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-24 rounded-full" />
            ))}
          </div>

          {/* Results Count */}
          <Skeleton className="mb-6 h-4 w-72 rounded-md" />

          {/* Course Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="overflow-hidden border-border/50">
                {/* Thumbnail */}
                <Skeleton className="aspect-video w-full rounded-none" />

                <CardContent className="space-y-4 p-5">
                  {/* Category Badge */}
                  <Skeleton className="h-5 w-20 rounded-full" />

                  {/* Title */}
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full rounded-md" />
                    <Skeleton className="h-5 w-4/5 rounded-md" />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-5/6 rounded-md" />
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center gap-3 pt-2">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 rounded-md" />
                      <Skeleton className="h-3 w-16 rounded-md" />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3">
                    <Skeleton className="h-6 w-20 rounded-lg" />
                    <Skeleton className="h-8 w-24 rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Explore Other Categories */}
          <div className="mt-12 border-t border-border/50 pt-8">
            <Skeleton className="mb-4 h-6 w-56 rounded-lg" />

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-28 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
