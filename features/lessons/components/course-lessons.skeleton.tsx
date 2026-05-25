export function LessonsListSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-40 bg-muted rounded" />

        <div className="h-10 w-28 bg-muted rounded" />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-4 flex items-center justify-between"
          >
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <div className="h-4 w-6 bg-muted rounded" />

              <div className="space-y-2">
                <div className="h-4 w-48 bg-muted rounded" />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="h-8 w-8 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}