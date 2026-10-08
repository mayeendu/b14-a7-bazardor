import Link from "next/link";

interface Category {
  slug: string;
  nameBn: string;
  icon?: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );
  const data: Category[] = await res.json();

  console.log(data);
  return (
    <div className="flex gap-5 justify-center">
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
  );
};

export default NavLinks;
