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

  // All products: show six initially
  const allProducts = data.slice(0, 30);

  return (
    <main className="w-full px-4 py-4 bg-[#e4ebe4] md:px-8">
      <div className="mx-auto max-w-7xl"></div>
      <div className="mx-auto max-w-7xl ">
        {/* Section 1: Increased Prices */}
        <section>
          <div className="mt-2 mb-4">
            <div className="flex items-center gap-1">
              <span className="flex h-11 w-11 items-center justify-center text-xl text-red-600">
                ▲
              </span>

              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  আজ দাম বেড়েছে
                </h2>
              </div>
            </div>
          </div>

          {increasedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {increasedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white p-6 text-gray-500">
              আজ কোনো পণ্যের দাম বাড়েনি।
            </p>
          )}
        </section>

        {/* Section 2: Decreased Prices */}
        <section>
          <div className="mt-12 mb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center text-green-700 text-xl">
                ▼
              </span>

              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  আজ দাম কমেছে
                </h2>
              </div>
            </div>
          </div>

          {decreasedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {decreasedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white p-6 text-gray-500">
              আজ কোনো পণ্যের দাম কমেনি।
            </p>
          )}
        </section>

        {/* Section 3: All Products */}
        <section id="products">
          <div className="mt-12 mb-4">
            <div className="flex items-center gap-3">
              <div>
                <div className="flex gap-1">
                  <span className="flex h-11 w-11 items-center justify-center text-2xl text-red-600 ">
                    🛒
                  </span>
                  <span className="text-2xl font-extrabold text-gray-900">
                    সব পণ্য
                  </span>
                </div>
                {data.length > 6 && (
                  <p className="mt-2 text-center text-md text-gray-500">
                    মোট {data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো
                    হচ্ছে
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
