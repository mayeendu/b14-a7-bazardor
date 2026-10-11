const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 py-10 px-4">
      {/* Top Header & Subtitle */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-base-content">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-base-content/60 mt-1">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <form className="w-full max-w-sm">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-6 shadow-md">
          {/* Name Field */}
          <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/70">
            নাম
          </label>
          <input
            type="text"
            className="input input-bordered w-full mb-3"
            placeholder="যেমন: রহিম উদ্দিন"
          />

          {/* Email Field */}
          <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/70">
            ইমেইল
          </label>
          <input
            type="email"
            className="input input-bordered w-full mb-3"
            placeholder="you@example.com"
          />

          {/* Password Field */}
          <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/70">
            পাসওয়ার্ড
          </label>
          <input
            type="password"
            className="input input-bordered w-full mb-3"
            placeholder="কমপক্ষে ৮ অক্ষর"
          />

          {/* Confirm Password Field */}
          <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/70">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            type="password"
            className="input input-bordered w-full mb-4"
            placeholder="আবার লিখুন"
          />

          {/* Submit Button */}
          <button className="btn bg-emerald-700 hover:bg-emerald-800 text-white w-full border-none mt-2">
            অ্যাকাউন্ট তৈরি করুন
          </button>

          {/* Divider */}
          <div className="divider text-xs text-base-content/50 my-4">অথবা</div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="btn btn-outline btn-sm font-normal text-xs h-10"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
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
              Google দিয়ে চালিয়ে যান
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm font-normal text-xs h-10"
            >
              <svg
                className="w-4 h-4 mr-1 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Already have an account link */}
          <div className="text-center mt-4 text-xs text-base-content/70">
            অ্যাকাউন্ট আছে?{' '}
            <a href="/login" className="text-emerald-700 font-semibold hover:underline">
              সাইন ইন করুন
            </a>
          </div>
        </fieldset>
      </form>

      {/* Back to Home Link */}
      <div className="mt-6 text-center">
        <a
          href="/"
          className="text-xs text-base-content/60 hover:text-base-content transition"
        >
          ← হোম পেজে ফিরে যান
        </a>
      </div>
    </div>
  );
};

export default SignUpPage;