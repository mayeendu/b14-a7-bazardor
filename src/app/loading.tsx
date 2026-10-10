import ProductSkeleton from "@/components/ProductSkeleton";

export default function HomeLoading() {
  return (
    <main>
      <section className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8">
        <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />

        <div className="mt-5 h-10 w-full max-w-xl animate-pulse rounded bg-gray-200" />

        <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-gray-100" />

        <div className="mt-3 h-5 w-full max-w-lg animate-pulse rounded bg-gray-100" />
      </section>

      <ProductSkeleton count={6} />
    </main>
  );
}
