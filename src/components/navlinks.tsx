import Link from "next/link";

interface Category {
  slug: string;
  nameBn: string;
  icon?: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );
  const data: Category[] = await res.json();

  return (
    <div className="border-t border-gray-200">
      <div className="flex max-w-7xl mt-3 mb-3 mx-auto gap-5 justify-start ">
        {data.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="flex items-center-safe gap-2 text-gray-700 hover:text-[#4a8b51] font-medium whitespace-nowrap transition-colors"
          >
            {category.icon && <span>{category.icon}</span>}
            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;
