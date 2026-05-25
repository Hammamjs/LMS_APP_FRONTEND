export function EditLessonSkeleton() {
  return (
    <div className="container mx-auto space-y-6 py-6 animate-pulse">
      {/* BACK */}
      <div className="h-8 w-40 rounded bg-muted" />

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="h-8 w-60 rounded bg-muted" />
          <div className="h-4 w-40 rounded bg-muted" />
        </div>

        <div className="flex gap-2">
          <div className="h-10 w-28 rounded bg-muted" />
          <div className="h-10 w-36 rounded bg-muted" />
        </div>
      </div>

      {/* STATUS */}
      <div className="flex gap-2">
        <div className="h-6 w-28 rounded-full bg-muted" />
        <div className="h-4 w-40 rounded bg-muted" />
      </div>

      {/* FORM CARD */}
      <div className="rounded-lg border bg-card p-6 space-y-6">
        {/* TITLE */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded" />
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <div className="h-4 w-28 bg-muted rounded" />
          <div className="h-24 w-full bg-muted rounded" />
        </div>

        {/* URL */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded" />
        </div>

        {/* VIDEO PREVIEW */}
        <div className="h-56 w-full bg-muted rounded-xl" />

        {/* DURATION */}
        <div className="grid md:grid-cols-1 gap-4">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded" />
          </div>
        </div>

        {/* CHECKBOX */}
        <div className="flex items-center gap-3 rounded-lg border p-4">
          <div className="h-4 w-4 bg-muted rounded" />
          <div className="space-y-2">
            <div className="h-4 w-28 bg-muted rounded" />
            <div className="h-3 w-64 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
