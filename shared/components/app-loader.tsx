export const AppLoader = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar skeleton */}
      <div className="hidden w-64 flex-col gap-4 border-r bg-muted/30 p-4 md:flex">
        <div className="h-6 w-32 animate-pulse rounded bg-muted" />

        <div className="mt-6 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-full animate-pulse rounded bg-muted"
            />
          ))}
        </div>

        <div className="mt-auto space-y-2">
          <div className="h-10 animate-pulse rounded bg-muted" />
          <div className="h-10 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex h-14 items-center border-b px-4">
          <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        </div>

        {/* Page content */}
        <div className="flex-1 space-y-6 p-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="h-6 w-64 animate-pulse rounded bg-muted" />
            <div className="h-4 w-96 animate-pulse rounded bg-muted" />
          </div>

          {/* Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>

          {/* Table */}
          <div className="rounded-lg border p-4">
            <div className="mb-4 h-5 w-48 animate-pulse rounded bg-muted" />

            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 animate-pulse rounded bg-muted" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
