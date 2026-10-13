"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

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
    dir: "up" | "down" | "same";
    pct: number;
  };
};

type SortOption = "default" | "price-high" | "price-low";

type Props = {
  products: Product[];
};

export default function CategoryProductList({ products }: Props) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    switch (sortBy) {
      case "price-high":
        result.sort((a, b) => b.today - a.today);
        break;

      case "price-low":
        result.sort((a, b) => a.today - b.today);
        break;

      default:
        // Preserve the original API order.
        break;
    }

    return result;
  }, [products, sortBy]);

  return (
    <div className="w-full min-w-0">
      {/* Sorting controls */}
      <div className="mb-6 flex min-w-0 flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-3 shadow-sm sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-5">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            পণ্যের তালিকা
          </h2>

          <p
            className="mt-1 text-sm leading-6 text-gray-600"
            aria-live="polite"
          >
            মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো
            হচ্ছে।
          </p>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:min-w-57.5">
          <label
            htmlFor="sortBy"
            className="text-sm font-semibold text-gray-700"
          >
            দামের ভিত্তিতে সাজান
          </label>

          <select
            id="sortBy"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            className="min-h-11 w-full min-w-0 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-[#4a8b51] focus:ring-2 focus:ring-[#4a8b51]/20"
          >
            <option value="default">ডিফল্ট ক্রম</option>
            <option value="price-high">দাম বেশি থেকে কম</option>
            <option value="price-low">দাম কম থেকে বেশি</option>
          </select>
        </div>
      </div>

      {/* Responsive product grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center sm:py-14">
          <p className="text-3xl" aria-hidden="true">
            🛒
          </p>

          <h3 className="mt-3 text-lg font-bold text-gray-800">
            কোনো পণ্য পাওয়া যায়নি
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            এই বিভাগে বর্তমানে কোনো পণ্য পাওয়া যাচ্ছে না।
          </p>
        </div>
      )}
    </div>
  );
}
