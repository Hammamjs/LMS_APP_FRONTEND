export function CourseDetailsSkeleton() {
  return (
    <div className="relative overflow-hidden bg-[#050505]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative border-b border-white/10 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* LEFT CONTENT */}
            <div className="flex-1 space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-20 animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-4 animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-32 animate-pulse rounded-full bg-white/10" />
              </div>

              {/* Title */}
              <div className="space-y-3">
                <div className="h-12 w-[90%] animate-pulse rounded-2xl bg-white/10" />

                <div className="h-12 w-[70%] animate-pulse rounded-2xl bg-white/10" />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />

                <div className="h-4 w-[95%] animate-pulse rounded-full bg-white/10" />

                <div className="h-4 w-[80%] animate-pulse rounded-full bg-white/10" />
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 pt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-32 animate-pulse rounded-xl bg-white/10"
                  />
                ))}
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="h-16 w-16 animate-pulse rounded-full bg-white/10" />

                <div className="flex-1 space-y-3">
                  <div className="h-5 w-40 animate-pulse rounded-full bg-white/10" />

                  <div className="h-4 w-64 animate-pulse rounded-full bg-white/10" />
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="w-full shrink-0 lg:w-[380px]">
              <div className="sticky top-24 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl">
                {/* Thumbnail */}
                <div className="aspect-video animate-pulse rounded-2xl bg-white/10" />

                {/* Price */}
                <div className="mt-6 space-y-3">
                  <div className="h-10 w-40 animate-pulse rounded-xl bg-white/10" />

                  <div className="flex gap-3">
                    <div className="h-5 w-20 animate-pulse rounded-full bg-white/10" />

                    <div className="h-5 w-16 animate-pulse rounded-full bg-white/10" />
                  </div>
                </div>

                {/* Button */}
                <div className="mt-6 h-14 w-full animate-pulse rounded-2xl bg-gradient-to-r from-pink-500/20 to-violet-500/20" />

                {/* Features */}
                <div className="mt-8 space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-pulse rounded-full bg-white/10" />

                      <div className="h-4 flex-1 animate-pulse rounded-full bg-white/10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE CONTENT */}
      <section className="relative py-12">
        <div className="container mx-auto space-y-8 px-4">
          {/* Tabs */}
          <div className="flex gap-4 border-b border-white/10 pb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-28 animate-pulse rounded-xl bg-white/10"
              />
            ))}
          </div>

          {/* Chapters */}
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between p-5">
                  <div className="space-y-3">
                    <div className="h-5 w-72 animate-pulse rounded-full bg-white/10" />

                    <div className="h-4 w-40 animate-pulse rounded-full bg-white/10" />
                  </div>

                  <div className="h-10 w-10 animate-pulse rounded-xl bg-white/10" />
                </div>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div className="pt-8">
            <div className="mb-6 h-10 w-60 animate-pulse rounded-xl bg-white/10" />

            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-14 w-14 animate-pulse rounded-full bg-white/10" />

                    <div className="space-y-2">
                      <div className="h-5 w-32 animate-pulse rounded-full bg-white/10" />

                      <div className="h-4 w-20 animate-pulse rounded-full bg-white/10" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />

                    <div className="h-4 w-[90%] animate-pulse rounded-full bg-white/10" />

                    <div className="h-4 w-[70%] animate-pulse rounded-full bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
