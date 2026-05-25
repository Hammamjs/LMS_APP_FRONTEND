'use client';

import { Card, CardContent, Skeleton } from '@/shared/ui';

export function DashboardSkeleton() {
  return (
    <div className="container mx-auto animate-pulse px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8 space-y-3">
        <Skeleton className="h-10 w-72 rounded-xl" />
        <Skeleton className="h-5 w-105 max-w-full rounded-lg" />
      </div>

      {/* Stats Grid */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className="border-border/50 bg-card/60 backdrop-blur-sm"
          >
            <CardContent className="flex items-center gap-4 p-6">
              <Skeleton className="h-12 w-12 rounded-xl" />

              <div className="space-y-2">
                <Skeleton className="h-8 w-16 rounded-lg" />
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue Learning Skeleton */}
      <section className="mb-10">
        <div className="mb-5 flex items-center justify-between">
          <Skeleton className="h-7 w-52 rounded-lg" />
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden border-border/50">
              {/* Thumbnail */}
              <Skeleton className="aspect-video w-full rounded-none" />

              <CardContent className="space-y-4 p-5">
                {/* Title */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full rounded-md" />
                  <Skeleton className="h-5 w-4/5 rounded-md" />
                </div>

                {/* Instructor */}
                <Skeleton className="h-4 w-32 rounded-md" />

                {/* Progress */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-4 w-10 rounded-md" />
                  </div>

                  <Skeleton className="h-2.5 w-full rounded-full" />
                </div>

                {/* Button */}
                <Skeleton className="mt-4 h-10 w-full rounded-xl" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Completed Courses */}
      <section className="mb-10">
        <div className="mb-5 flex items-center justify-between">
          <Skeleton className="h-7 w-52 rounded-lg" />
          <Skeleton className="h-5 w-24 rounded-md" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden border-border/50">
              {/* Thumbnail */}
              <div className="relative">
                <Skeleton className="aspect-video w-full rounded-none" />

                {/* Completed Badge */}
                <div className="absolute right-3 top-3">
                  <Skeleton className="h-7 w-24 rounded-full" />
                </div>
              </div>

              <CardContent className="space-y-4 p-5">
                {/* Title */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full rounded-md" />
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                </div>

                {/* Instructor */}
                <Skeleton className="h-4 w-28 rounded-md" />

                {/* Button */}
                <Skeleton className="mt-4 h-10 w-full rounded-xl" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Optional Bottom CTA Skeleton */}
      <div className="rounded-2xl border border-border/50 bg-muted/30 p-8">
        <div className="flex flex-col items-center text-center">
          <Skeleton className="mb-4 h-16 w-16 rounded-full" />

          <div className="space-y-3">
            <Skeleton className="mx-auto h-7 w-48 rounded-lg" />
            <Skeleton className="mx-auto h-4 w-80 max-w-full rounded-md" />
            <Skeleton className="mx-auto h-10 w-40 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
