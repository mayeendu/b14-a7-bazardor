type ProductSkeletonProps = {
  count?: number;
};

export default function ProductSkeleton({ count = 6 }: ProductSkeletonProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-8">
        <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />

        <div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded bg-gray-100" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-gray-200" />

              <div className="flex-1">
                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

                <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-100" />
              </div>
            </div>

            <div className="mt-6 h-8 w-1/2 animate-pulse rounded bg-gray-200" />

            <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-gray-100" />

            <div className="mt-6 h-10 w-full animate-pulse rounded-lg bg-gray-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
