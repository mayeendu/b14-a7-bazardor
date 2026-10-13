import Hero from "@/components/Hero";
import Products from "@/components/Products";

export default function Home() {
  return (
    <main className="w-full min-w-0 flex-1">
      <Hero />
      <Products />
    </main>
  );
}
