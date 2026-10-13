"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";

// Format today's date in Bangla using Bangladesh time.
const getFormattedDate = () => {
  try {
    return new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(new Date());
  } catch {
    return "";
  }
};

export default function Hero() {
  // Compute the date once on the client.
  const [today] = useState(getFormattedDate);

  return (
    <section className="w-full min-w-0 bg-gray-50 px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl bg-[#f5f8f5] px-4 py-6 sm:rounded-3xl sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <div className="grid min-w-0 grid-cols-1 items-center gap-6 sm:gap-8 md:grid-cols-12 lg:gap-10">
          {/* Left content */}
          <div className="min-w-0 md:col-span-7 lg:col-span-8">
            {/* Today's date */}
            <div className="mb-4">
              <span className="inline-flex max-w-full items-center rounded-full bg-[#e7f0e8] px-3 py-2 text-sm font-semibold leading-relaxed text-[#05893E] sm:px-4 sm:text-base">
                {today || "লোড হচ্ছে..."}
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-2xl font-extrabold leading-snug text-[#1c1f1d] sm:text-3xl sm:leading-tight md:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:mt-5 sm:text-base sm:leading-8 lg:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Call to action */}
            <div className="mt-6 sm:mt-8">
              <a
                href="#products"
                onClick={() => toast.success("স্বাগতম, সব পণ্যের সমারোহে!")}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#42884f] px-6 py-3 text-base font-semibold text-white shadow-md shadow-green-900/10 transition-colors duration-200 hover:bg-[#367241] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42884f] focus-visible:ring-offset-2 sm:w-auto"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="flex min-w-0 justify-center md:col-span-5 md:justify-end lg:col-span-4">
            <div className="relative w-full max-w-55 sm:max-w-xs md:max-w-full">
              <Image
                src="/bazar-hero.png"
                alt="আজকের বাজারের পণ্য"
                width={400}
                height={350}
                priority
                sizes="(max-width: 639px) 220px, (max-width: 767px) 320px, (max-width: 1023px) 35vw, 400px"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
