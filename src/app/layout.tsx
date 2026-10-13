import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import Footer from "@/components/Footer";
import Marquee from "@/components/marquee";
import ToastProvider from "@/components/ToastProvider";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর | প্রয়োজনীয় পণ্যের দাম",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখুন।",
  applicationName: "বাজার দর",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${hindSiliguri.className} min-h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col overflow-x-clip bg-[#F4F6F4] text-gray-900">
        <ToastProvider />

        <Header />

        <Marquee />

        <main className="w-full min-w-0 flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
