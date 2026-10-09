import Hero from "@/components/Hero";
import Marquee from "@/components/marquee";
import Products from "@/components/Products";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Marquee />
      <Hero />
      <Products />
    </div>
  );
}
