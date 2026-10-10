"use client";

import Image from "next/image";
import Link from "next/link";

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

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const isPriceUp = product.change.dir === "up";

  const isPriceSame = product.change.dir === "same" || product.change.pct === 0;

  // Translate standard units into Bengali.
  const formatUnit = (unit: string) => {
    switch (unit.toLowerCase()) {
      case "kg":
        return "কেজি";
      case "liter":
      case "litre":
      case "l":
        return "লিটার";
      case "piece":
      case "pc":
        return "টি";
      case "dozen":
        return "ডজন";
      case "gram":
      case "g":
        return "গ্রাম";
      default:
        return unit;
    }
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      aria-label={`${product.nameBn} এর বিস্তারিত দাম দেখুন`}
      className="block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4a8b51]"
    >
      <article className="flex h-full flex-col justify-between rounded-3xl border border-gray-100 bg-[#FAFBF9] p-5 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-[#DCE8D8] hover:shadow-md">
        {/* Top Header Section: Icon + Title/Unit */}
        <div className="flex items-center gap-3">
          {/* Product Image / Icon Box */}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F2F5EF] text-2xl">
            {product.image && product.image.startsWith("/") ? (
              <Image
                src={product.image}
                alt={product.nameBn}
                fill
                sizes="56px"
                className="object-contain p-2"
              />
            ) : (
              <span>{product.image || product.categoryIcon}</span>
            )}
          </div>

          {/* Product Name and Unit */}
          <div className="flex min-w-0 flex-col">
            <h3 className="text-xl font-bold leading-tight text-gray-900">
              {product.nameBn}
            </h3>

            <p className="mt-0.5 text-xs font-medium text-gray-500">
              প্রতি {formatUnit(product.unit)}
            </p>
          </div>
        </div>

        {/* Bottom Section: Today's Price + Change Badge */}
        <div className="mt-5 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-gray-500">আজকের দাম</p>

            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-gray-900">
                {product.today.toLocaleString("bn-BD")}
              </span>

              <span className="text-lg font-bold text-gray-800">টাকা</span>
            </div>
          </div>

          {/* Price Change Indicator */}
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${
              isPriceSame
                ? "bg-gray-100 text-gray-600"
                : isPriceUp
                  ? "bg-[#F5ECEC] text-[#B03A3A]"
                  : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {!isPriceSame && (
              <span className="text-[10px]">{isPriceUp ? "▲" : "▼"}</span>
            )}
            {product.change.pct.toLocaleString("bn-BD")}%
          </span>
        </div>

        {/* Product Details Link Hint */}
        <div className="mt-4 border-t border-gray-100 pt-3 text-sm font-medium text-[#4a8b51]">
          বিস্তারিত দেখুন →
        </div>
      </article>
    </Link>
  );
}
