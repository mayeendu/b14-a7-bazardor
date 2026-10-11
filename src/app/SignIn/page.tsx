import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f2f5f2] py-10 px-4">
      {/* Header & Subtitle */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-wide text-gray-800">
          সাইন ইন
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <form>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-800 mb-2">
              ইমেইল
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-emerald-600 text-gray-700 placeholder-gray-400 bg-white"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-800 mb-2">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-emerald-600 text-gray-700 placeholder-gray-400 bg-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#4a8346] hover:bg-[#3d6e3a] text-white font-bold py-3 rounded-lg shadow-sm transition duration-200"
          >
            সাইন ইন
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-5 items-center my-2">
          <div className="grow border-t border-gray-200"></div>
          <span className="shrink mx-4 text-xs font-semibold text-gray-600">
            অথবা
          </span>
          <div className="grow border-t border-gray-200"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* Google Button */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-800 rounded-lg py-2 px-3 hover:bg-gray-50 transition"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.2 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.8 7.3l3.7 2.9C6.4 7.2 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.5 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.8 7.3C.7 9.5 0 12 0 14.7s.7 5.2 1.8 7.4l3.7-2.9c-.2-.6-.3-1.4-.3-2.2z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.6-2.2-6.5-5.2L1.8 16c1.9 3.7 5.7 7 10.2 7z"
              />
            </svg>
            <span className="text-xs font-bold text-gray-800 leading-tight text-center">
              Google দিয়ে
              <br />
              চালিয়ে যান
            </span>
          </button>

          {/* GitHub Button */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-800 rounded-lg py-2 px-3 hover:bg-gray-50 transition"
          >
            <svg
              className="w-4 h-4 shrink-0 fill-current text-gray-800"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="text-xs font-bold text-gray-800 leading-tight text-center">
              GitHub দিয়ে
              <br />
              চালিয়ে যান
            </span>
          </button>
        </div>

        {/* Footer Link Inside Card */}
        <div className="text-center mt-6 text-sm text-gray-700">
          অ্যাকাউন্ট নেই?{" "}
          <a
            href="/signup"
            className="text-[#4a8346] font-bold underline hover:text-[#3d6e3a]"
          >
            সাইন আপ করুন
          </a>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm text-gray-600 underline hover:text-gray-800 transition"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
