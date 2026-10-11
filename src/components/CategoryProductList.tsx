
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
        dir: "up" | "down";
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
        <div>
            {/* Sorting dropdown */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div>

                    <p className="mt-1 text-sm text-gray-500">
                        মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে।
                    </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-64">
                    <label
                        htmlFor="sortBy"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        সাজান
                    </label>

                    <select
                        id="sortBy"
                        value={sortBy}
                        onChange={(event) =>
                            setSortBy(event.target.value as SortOption)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="price-high">দাম বেশি থেকে কম</option>
                        <option value="price-low">দাম কম থেকে বেশি</option>
                    </select>
                </div>
            </div>

            {/* Product grid */}
            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center text-gray-500">
                    এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
                </div>
            )}
        </div>
    );
}
