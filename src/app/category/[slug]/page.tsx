import { notFound } from "next/navigation";
import CategoryProductList from "@/components/CategoryProductList";

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

type Category = {
  slug: string;
  nameBn: string;
  icon?: string;
};

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 300 } },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

async function getCategories(): Promise<Category[]> {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    { next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const category = categories.find((item) => item.slug === slug);

  const categoryProducts = products.filter((product) => {
    return (
      product.category === slug ||
      (category !== undefined && product.categoryNameBn === category.nameBn)
    );
  });

  if (categoryProducts.length === 0) {
    notFound();
  }

  const categoryName = category?.nameBn ?? categoryProducts[0].categoryNameBn;

  const categoryIcon = category?.icon ?? categoryProducts[0].categoryIcon;

  return (
    <main className="min-h-screen w-full min-w-0 bg-white">
      <section className="mx-auto w-full max-w-7xl min-w-0 px-3 py-6 sm:px-5 sm:py-8 lg:px-8 lg:py-12">
        <div className="mb-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm sm:mb-8 sm:rounded-3xl sm:p-6 lg:p-8">
          <p className="text-sm font-medium text-green-700 sm:text-base">
            বাজার দর / পণ্যের বিভাগ
          </p>

          <h1 className="mt-2 wrap-break-words text-2xl font-bold leading-snug text-gray-900 sm:mt-3 sm:text-3xl lg:text-4xl">
            {categoryIcon} {categoryName}
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
            এই বিভাগের {categoryProducts.length.toLocaleString("bn-BD")}
            টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>

        <div className="min-w-0">
          <CategoryProductList products={categoryProducts} />
        </div>
      </section>
    </main>
  );
}
