"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  slug: string;
  nameBn: string;
  icon?: string;
}

interface CategoryNavItemsProps {
  categories: Category[];
}

const CategoryNavItems = ({ categories }: CategoryNavItemsProps) => {
  const pathname = usePathname();

  return (
    <>
      {categories.map((category) => {
        const href = `/category/${category.slug}`;

        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={category.slug}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`
              flex min-h-10 shrink-0 items-center justify-center
              gap-1.5 whitespace-nowrap rounded-lg
              px-3 py-2 text-sm font-medium
              transition-colors duration-150
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#4a8b51]
              focus-visible:ring-offset-2
              sm:min-h-11 sm:gap-2 sm:px-4 sm:text-base
              ${
                isActive
                  ? "bg-[#4a8b51] text-white shadow-sm"
                  : "text-gray-700 hover:bg-[#4a8b51] hover:text-white"
              }
            `}
          >
            {category.icon && (
              <span aria-hidden="true" className="shrink-0">
                {category.icon}
              </span>
            )}

            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </>
  );
};

export default CategoryNavItems;
