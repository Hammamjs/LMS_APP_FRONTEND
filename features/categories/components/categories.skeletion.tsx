'use client';

import { Card, CardContent, Skeleton } from '@/shared/ui';

export function CategoriesSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-muted/50 to-background py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <Skeleton className="mx-auto h-10 w-72 rounded-xl sm:h-12 sm:w-96" />
            <Skeleton className="mx-auto mt-4 h-5 w-full max-w-xl rounded-lg" />
            <Skeleton className="mx-auto mt-2 h-5 w-4/5 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden border-border/50"
              >
                {/* Gradient Header */}
                <div className="bg-muted/50 p-6">
                  <div className="flex items-start justify-between">
                    <Skeleton className="h-14 w-14 rounded-xl" />
                  </div>
                </div>

                <CardContent className="space-y-4 p-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-2/3 rounded-lg" />
                    <Skeleton className="h-4 w-full rounded-lg" />
                    <Skeleton className="h-4 w-5/6 rounded-lg" />
                  </div>

                  {/* Top Course */}
                  <div className="rounded-lg bg-muted/40 p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-3 w-20 rounded-md" />
                    </div>

                    <Skeleton className="h-4 w-11/12 rounded-md" />
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 pt-2">
                    <Skeleton className="h-4 w-28 rounded-md" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-border/50 bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center space-y-3">
                <Skeleton className="mx-auto h-10 w-20 rounded-xl" />
                <Skeleton className="mx-auto h-4 w-24 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}