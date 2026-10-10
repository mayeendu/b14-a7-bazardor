import { notFound } from "next/navigation";
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

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const products = await getProducts();

  const categoryProducts = products.filter(
    (product) => product.category === slug,
  );

  // Unknown category? Display the custom 404 page.
  if (categoryProducts.length === 0) {
    notFound();
  }

  const categoryName = categoryProducts[0].categoryNameBn;

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-green-600">
            বাজার দর / পণ্যের বিভাগ
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            {categoryProducts[0].categoryIcon} {categoryName}
          </h1>

          <p className="mt-2 text-gray-500">
            এই বিভাগের {categoryProducts.length}টি পণ্যের বর্তমান দাম দেখুন।
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
