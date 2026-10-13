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
      className="block h-full min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a8b51] focus-visible:ring-offset-2 sm:rounded-3xl"
    >
      <article className="flex h-full min-w-0 flex-col rounded-2xl border border-gray-100 bg-gray-50 p-3 shadow-sm transition duration-200 hover:border-[#DCE8D8] hover:shadow-md motion-safe:hover:-translate-y-1 sm:rounded-3xl sm:p-5">
        {/* Product image, name, and unit */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F2F5EF] text-xl sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl">
            {product.image && product.image.startsWith("/") ? (
              <Image
                src={product.image}
                alt={product.nameBn}
                fill
                sizes="(max-width: 639px) 48px, 56px"
                className="object-contain p-1.5 sm:p-2"
              />
            ) : (
              <span aria-hidden="true">
                {product.image || product.categoryIcon}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="wrap-break-words text-base font-bold leading-snug text-gray-900 sm:text-lg lg:text-xl">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
              প্রতি {formatUnit(product.unit)}
            </p>
          </div>
        </div>

        {/* Today's price and price-change indicator */}
        <div className="mt-4 flex min-w-0 flex-wrap items-end justify-between gap-x-3 gap-y-3 sm:mt-5">
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500 sm:text-sm">
              আজকের দাম
            </p>

            <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
              <span className="wrap-break-words text-xl font-black leading-tight text-gray-900 sm:text-2xl">
                {product.today.toLocaleString("bn-BD")}
              </span>

              <span className="text-sm font-bold text-gray-800 sm:text-base">
                টাকা
              </span>
            </div>
          </div>

          <span
            className={`inline-flex max-w-full shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold sm:px-3 ${
              isPriceSame
                ? "bg-gray-100 text-gray-600"
                : isPriceUp
                  ? "bg-[#F5ECEC] text-[#B03A3A]"
                  : "bg-emerald-50 text-emerald-700"
            }`}
            aria-label={
              isPriceSame
                ? "দামের পরিবর্তন নেই"
                : `দাম ${isPriceUp ? "বেড়েছে" : "কমেছে"} ${Math.abs(product.change.pct).toLocaleString("bn-BD")}%`
            }
          >
            {!isPriceSame && (
              <span aria-hidden="true" className="text-[10px]">
                {isPriceUp ? "▲" : "▼"}
              </span>
            )}
            {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
          </span>
        </div>

        {/* Product details hint */}
        <div className="mt-4 border-t border-gray-200 pt-3 text-sm font-medium text-[#4a8b51]">
          বিস্তারিত দেখুন <span aria-hidden="true">→</span>
        </div>
      </article>
    </Link>
  );
}
