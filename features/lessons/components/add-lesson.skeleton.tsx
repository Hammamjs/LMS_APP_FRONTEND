'use client';

import { Skeleton } from '@/shared/ui';

export function NewLessonSkeleton() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* BACK */}
      <Skeleton className="h-9 w-40 rounded-md" />

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <Skeleton className="h-8 w-60 rounded-md" />
          <Skeleton className="h-4 w-80 rounded-md" />
        </div>

        <Skeleton className="h-10 w-28 rounded-md" />
      </div>

      {/* GRID */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border bg-background">
            <div className="space-y-6 p-6">
              {/* COURSE */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              {/* TITLE */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-32 w-full rounded-md" />
              </div>

              {/* VIDEO */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="aspect-video w-full rounded-xl" />
              </div>

              {/* DURATION */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-24 rounded-md" />

                <div className="grid grid-cols-3 gap-3">
                  <Skeleton className="h-10 w-full rounded-md" />
                  <Skeleton className="h-10 w-full rounded-md" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-background p-6">
            <div className="space-y-5">
              <Skeleton className="h-5 w-32 rounded-md" />

              <div className="space-y-3">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
