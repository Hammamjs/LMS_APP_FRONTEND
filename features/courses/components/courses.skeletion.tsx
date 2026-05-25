export function CoursesPageSkeleton() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-10 space-y-8">
        {/* HEADER */}
        <div className="space-y-3">
          <div className="h-10 w-64 animate-pulse rounded-2xl bg-white/10" />
          <div className="h-5 w-96 animate-pulse rounded-full bg-white/10" />
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="h-12 w-full md:w-96 animate-pulse rounded-2xl bg-white/10" />
          <div className="flex gap-3">
            <div className="h-10 w-24 animate-pulse rounded-xl bg-white/10" />
            <div className="h-10 w-24 animate-pulse rounded-xl bg-white/10" />
            <div className="h-10 w-24 animate-pulse rounded-xl bg-white/10" />
          </div>
        </div>

        {/* ACTIVE FILTERS */}
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-28 animate-pulse rounded-full bg-white/10"
            />
          ))}
        </div>

        {/* BODY */}
        <div className="flex gap-8">
          {/* SIDEBAR */}
          <div className="hidden lg:block w-72 space-y-4">
            <div className="h-10 w-40 animate-pulse rounded-xl bg-white/10" />

            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-full animate-pulse rounded-full bg-white/10"
              />
            ))}
          </div>

          {/* GRID */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                >
                  {/* thumbnail */}
                  <div className="aspect-video animate-pulse bg-white/10" />

                  {/* content */}
                  <div className="p-4 space-y-3">
                    <div className="h-5 w-3/4 animate-pulse rounded-full bg-white/10" />
                    <div className="h-4 w-1/2 animate-pulse rounded-full bg-white/10" />

                    <div className="flex justify-between pt-2">
                      <div className="h-4 w-20 animate-pulse rounded-full bg-white/10" />
                      <div className="h-4 w-16 animate-pulse rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* infinite scroll loader */}
            <div className="mt-10 flex items-center justify-center">
              <div className="h-10 w-40 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
