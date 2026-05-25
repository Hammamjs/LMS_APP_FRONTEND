export function InstructorCoursesSkeleton() {
  return (
    <div className="container mx-auto py-6 space-y-6 animate-pulse">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-4 w-72 bg-muted rounded" />
        </div>

        <div className="h-10 w-36 bg-muted rounded" />
      </div>

      {/* FILTERS */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="h-10 w-full sm:max-w-sm bg-muted rounded" />
        <div className="h-10 w-44 bg-muted rounded" />
      </div>

      {/* GRID */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card overflow-hidden">
            {/* IMAGE */}
            <div className="h-40 w-full bg-muted" />

            <div className="p-4 space-y-3">
              {/* TITLE */}
              <div className="h-4 w-3/4 bg-muted rounded" />

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-muted rounded" />
                <div className="h-3 w-5/6 bg-muted rounded" />
              </div>

              {/* STATS */}
              <div className="flex items-center justify-between pt-2">
                <div className="h-4 w-16 bg-muted rounded" />
                <div className="h-4 w-12 bg-muted rounded" />
              </div>

              {/* BUTTON / ACTION */}
              <div className="flex justify-between items-center pt-2">
                <div className="h-6 w-20 bg-muted rounded" />
                <div className="h-8 w-8 bg-muted rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
