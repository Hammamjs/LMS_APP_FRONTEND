import { Card, CardContent } from '@/shared/ui';

export function CourseCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden border-border/50 bg-card animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-video bg-muted" />

      <CardContent className="p-4">
        {/* Category & Level */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-3 w-16 rounded bg-muted" />
          <div className="h-3 w-3 rounded-full bg-muted" />
          <div className="h-5 w-20 rounded-full bg-muted" />
        </div>

        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className="h-5 w-full rounded bg-muted" />
          <div className="h-5 w-3/4 rounded bg-muted" />
        </div>

        {/* Instructor */}
        <div className="h-4 w-32 rounded bg-muted mb-4" />

        {/* Rating */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-muted" />
            <div className="h-4 w-8 rounded bg-muted" />
            <div className="h-4 w-10 rounded bg-muted" />
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded-full bg-muted" />
            <div className="h-3 w-14 rounded bg-muted" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded-full bg-muted" />
            <div className="h-3 w-20 rounded bg-muted" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded-full bg-muted" />
            <div className="h-3 w-12 rounded bg-muted" />
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-20 rounded bg-muted" />
          <div className="h-4 w-16 rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
