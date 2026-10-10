import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
        BazarDor
      </p>

      <h1 className="mt-4 text-7xl font-bold text-gray-900">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি।
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        আপনি যে পেজটি খুঁজছেন, সেটি সরানো হয়েছে অথবা ঠিকানাটি ভুল। অনুগ্রহ করে
        হোম পেজে ফিরে যান।
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
