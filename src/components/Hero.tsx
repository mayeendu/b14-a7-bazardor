"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Hero() {
  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    });

    setToday(date.format(new Date()));
  }, []);

  return (
    <section className="w-full px-4 py-4 bg-[#e4ebe4] md:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-[#f5f8f5] px-6 py-1 md:px-6 md:py-2 lg:px-6">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 lg:gap-12">
          {/* Left Content */}
          <div className="md:col-span-7 lg:col-span-8">
            {/* Today's Date Badge */}
            <div className="mb-4 inline-block">
              <span className="inline-flex items-center rounded-full bg-[#e7f0e8] px-4 py-2 font-semibold text-[#05893E]">
                {today}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl font-extrabold leading-tight text-[#1c1f1d] sm:text-4xl md:text-5xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button */}
            <button onClick={() => toast.success("স্বাগতম, সব পন্যের সমারোহে")}>
              <div className="mt-8">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center rounded-md bg-[#42884f] px-6 py-3 text-base font-semibold text-white shadow-md shadow-green-900/10 transition-all duration-200 hover:bg-[#367241]"
                >
                  সব পণ্য দেখুন
                </a>
              </div>
            </button>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:col-span-5 md:justify-end lg:col-span-4">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-full">
              <Image
                src="/bazar-hero.png"
                alt="আজকের বাজারের পণ্য"
                width={400}
                height={350}
                priority
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
