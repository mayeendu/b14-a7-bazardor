import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
export const instant = false;

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

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
  markets?: Market[];
};

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) => price.toLocaleString("bn-BD");

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

  const isPriceUp = product.change.dir === "up";
  const isPriceDown = product.change.dir === "down";
  const isPriceSame = product.change.dir === "same" || product.change.pct === 0;

  const changeLabel = isPriceSame
    ? "দাম অপরিবর্তিত"
    : isPriceUp
      ? "বেড়েছে"
      : "কমেছে";

  // Calculate overall min, max, and avg prices from markets if available
  const allMins = product.markets?.map((m) => m.min) || [product.today];
  const allMaxs = product.markets?.map((m) => m.max) || [product.today];
  const minPrice = Math.min(...allMins);
  const maxPrice = Math.max(...allMaxs);
  const avgPrice = Math.round(
    allMins.reduce((a, b) => a + b, 0) / allMins.length,
  );

  return (
    <main className="min-h-screen bg-[#FAFBF9]">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Breadcrumb navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-6"
        >
          <Link href="/" className="transition-colors hover:text-[#4a8b51]">
            হোম
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/category/${product.category}`}
            className="transition-colors hover:text-[#4a8b51]"
          >
            {product.categoryNameBn}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-gray-800">{product.nameBn}</span>
        </nav>

        {/* Main product card layout matching reference */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 sm:p-8 gap-6">
            <div className="flex items-center gap-5">
              {/* Product icon/image */}
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl bg-[#F2F5EF] p-4">
                {product.image && product.image.startsWith("/") ? (
                  <div className="relative h-16 w-16">
                    <Image
                      src={product.image}
                      alt={product.nameBn}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span
                    className="text-4xl"
                    role="img"
                    aria-label={product.nameBn}
                  >
                    {product.image || product.categoryIcon}
                  </span>
                )}
              </div>

              {/* Product title & subtitles */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                  {product.nameBn}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {formatUnit(product.unit)} · {product.categoryNameBn}
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-600">
                  গতকালের তুলনায় আজ দাম{" "}
                  <span
                    className={
                      isPriceUp
                        ? "text-red-600 font-semibold"
                        : isPriceDown
                          ? "text-emerald-600 font-semibold"
                          : "text-gray-600"
                    }
                  >
                    {changeLabel}
                  </span>{" "}
                  · {formatPrice(product.change.pct)} টাকা
                </p>
              </div>
            </div>

            {/* Today's Price Badge */}
            <div className="w-full md:w-auto bg-[#F7F8F6] border border-gray-100 rounded-2xl p-4 text-center md:text-right min-w-[160px]">
              <p className="text-xs font-medium text-gray-500">আজকের দাম</p>
              <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
                {formatPrice(product.today)}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                টাকা / {formatUnit(product.unit)}
              </p>
              <div
                className={`mt-1.5 inline-flex items-center justify-center gap-1 text-xs font-bold ${isPriceUp ? "text-red-600" : isPriceDown ? "text-emerald-600" : "text-gray-600"}`}
              >
                <span>{isPriceUp ? "▲" : isPriceDown ? "▼" : ""}</span>
                <span>{formatPrice(product.change.pct)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Historical prices / Price Summary Cards */}
        <div className="mt-8 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-[#FAFBF9] p-5">
              <p className="text-sm font-medium text-gray-500">সর্বনিম্ন দাম</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {formatPrice(minPrice)} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-[#FAFBF9] p-5">
              <p className="text-sm font-medium text-gray-500">সর্বাধিক দাম</p>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {formatPrice(maxPrice)} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-[#FAFBF9] p-5">
              <p className="text-sm font-medium text-gray-500">গড় দাম</p>
              <p className="mt-2 text-2xl font-bold text-emerald-700">
                {formatPrice(avgPrice)} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                প্রতি {formatUnit(product.unit)}-এর হিসাবে
              </p>
            </div>
          </div>
        </div>

        {/* Market-wise prices table */}
        {product.markets && product.markets.length > 0 && (
          <div className="mt-8 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="mt-5 overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-[#F2F5EF] text-gray-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">বাজার</th>
                    <th className="px-5 py-4 font-semibold">বিভাগ</th>
                    <th className="px-5 py-4 font-semibold">সর্বনিম্ন</th>
                    <th className="px-5 py-4 font-semibold">সর্বাধিক</th>
                    <th className="px-5 py-4 font-semibold">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {product.markets.map((market, index) => {
                    const averagePrice = (market.min + market.max) / 2;
                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="px-5 py-4 font-medium text-gray-900">
                          {market.market}
                        </td>
                        <td className="px-5 py-4 text-gray-600">
                          {market.division}
                        </td>
                        <td className="px-5 py-4 font-semibold text-gray-800">
                          {formatPrice(market.min)} টাকা
                        </td>
                        <td className="px-5 py-4 font-semibold text-gray-800">
                          {formatPrice(market.max)} টাকা
                        </td>
                        <td className="px-5 py-4 font-bold text-gray-900">
                          {formatPrice(averagePrice)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Back Links */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center justify-center rounded-xl bg-[#4a8b51] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3b7241]"
          >
            একই বিভাগের পণ্য দেখুন
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            ← হোম পেজ
          </Link>
        </div>
      </section>
    </main>
  );
}
