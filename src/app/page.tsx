import Hero from "@/components/Hero";
import Marquee from "@/components/marquee";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Marquee />
      <Hero />
    </div>
  );
}
