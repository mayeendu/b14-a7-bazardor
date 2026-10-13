export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-3 py-5 sm:px-5 sm:py-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:px-8">
        <p className="min-w-0 text-center text-sm leading-6 text-gray-700 md:text-left">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="min-w-0 text-center text-xs leading-6 text-gray-500 sm:text-sm md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
