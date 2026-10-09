"use client";

import Image from "next/image";

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

  // Unit helper for standard unit translations
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
    <article className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-[#FAFBF9] p-5 shadow-xs transition duration-200 hover:shadow-md">
      {/* Top Header Section: Icon + Title/Unit */}
      <div className="flex items-center gap-3">
        {/* Product Image / Icon Box */}
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F2F5EF] text-2xl">
          {product.image && product.image.startsWith("/") ? (
            <Image
              src={product.image}
              alt={product.nameBn}
              fill
              className="object-contain p-2"
            />
          ) : (
            <span>{product.image || product.categoryIcon}</span>
          )}
        </div>

        {/* Name and Unit */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {product.nameBn}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 font-medium">
            প্রতি {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* Bottom Section: Today's Price + Change Badge */}
      <div className="mt-5 flex items-end justify-between">
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
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${
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
    </article>
  );
}
