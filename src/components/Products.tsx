import ProductCard from "./ProductCard";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  unit: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
};

const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";

export default async function Products() {
  const res = await fetch(API_URL, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const data: Product[] = await res.json();

  // Products whose prices increased
  const increasedProducts = data
    .filter((product) => product.change.dir === "up")
    .slice(0, 6);

  // Products whose prices decreased
  const decreasedProducts = data
    .filter((product) => product.change.dir === "down")
    .slice(0, 6);

  // Show up to 33 products in the all-products section
  const allProducts = data.slice(0, 33);

  return (
    <section className="w-full min-w-0 bg-[#e4ebe4] px-3 py-6 sm:px-5 sm:py-8 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        {/* Section 1: Increased prices */}
        <section className="mb-10 sm:mb-12">
          <div className="mb-4 flex items-center gap-3 sm:mb-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-xl text-red-600 sm:h-12 sm:w-12">
              ▲
            </div>

            <h2 className="text-xl font-extrabold leading-snug text-gray-900 sm:text-2xl lg:text-3xl">
              আজ দাম বেড়েছে
            </h2>
          </div>

          {increasedProducts.length > 0 ? (
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {increasedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white p-4 text-sm text-gray-600 sm:p-6 sm:text-base">
              আজ কোনো পণ্যের দাম বাড়েনি।
            </p>
          )}
        </section>

        {/* Section 2: Decreased prices */}
        <section className="mb-10 sm:mb-12">
          <div className="mb-4 flex items-center gap-3 sm:mb-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-xl text-green-700 sm:h-12 sm:w-12">
              ▼
            </div>

            <h2 className="text-xl font-extrabold leading-snug text-gray-900 sm:text-2xl lg:text-3xl">
              আজ দাম কমেছে
            </h2>
          </div>

          {decreasedProducts.length > 0 ? (
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {decreasedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white p-4 text-sm text-gray-600 sm:p-6 sm:text-base">
              আজ কোনো পণ্যের দাম কমেনি।
            </p>
          )}
        </section>

        {/* Section 3: All products */}
        <section id="products" className="scroll-mt-6">
          <div className="mb-4 flex items-start gap-3 sm:mb-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl sm:h-12 sm:w-12 sm:text-2xl">
              🛒
            </div>

            <div className="min-w-0">
              <h2 className="text-xl font-extrabold leading-snug text-gray-900 sm:text-2xl lg:text-3xl">
                সব পণ্য
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-600 sm:text-base">
                মোট {data.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে
              </p>
              <p className="text-xs text-gray-500 sm:text-sm">
                এই অংশে {allProducts.length.toLocaleString("bn-BD")}টি পণ্য
                দেখানো হচ্ছে
              </p>
            </div>
          </div>

          {allProducts.length > 0 ? (
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white p-4 text-sm text-gray-600 sm:p-6 sm:text-base">
              এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </section>
  );
}
