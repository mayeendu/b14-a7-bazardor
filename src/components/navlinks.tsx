import Link from "next/link";
import { Suspense } from "react";
import CategoryNavItems from "@/components/CategoryNavItems";

interface Category {
  slug: string;
  nameBn: string;
  icon?: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: Category[] = await res.json();

  return (
    <nav
      aria-label="প্রধান নেভিগেশন"
      className="w-full min-w-0 border-t border-gray-200 bg-[#f8f9fa]"
    >
      <div
        className="mx-auto flex w-full max-w-7xl min-w-0 items-center gap-1.5 overflow-x-auto overscroll-x-contain px-3 py-2 sm:gap-2 sm:px-5 sm:py-3 lg:px-6"
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Home link */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-[#4a8b51] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a8b51] focus-visible:ring-offset-2 sm:gap-2 sm:px-4 sm:text-base"
        >
          <span aria-hidden="true">🏠</span>
          <span>হোম</span>
        </Link>

        {/* Category links */}
        <Suspense
          fallback={
            <div className="shrink-0 whitespace-nowrap px-3 py-2 text-sm text-gray-500 sm:text-base">
              ক্যাটাগরি লোড হচ্ছে...
            </div>
          }
        >
          <CategoryNavItems categories={data} />
        </Suspense>
      </div>
    </nav>
  );
};

export default NavLinks;
