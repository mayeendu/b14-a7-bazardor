import Image from "next/image";
import Link from "next/link";
import NavLinks from "./navlinks";
import HeaderDate from "./HeaderDate";
import AuthLinks from "./AuthLinks";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-[#f8f9fa]">
      {/* Logo, website name, and authentication */}
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-3 py-3 sm:px-5 sm:py-4 lg:px-6">
        {/* Logo and website name */}
        <Link
          href="/"
          aria-label="বাজার দর হোম পেজ"
          className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4a8b51] sm:h-12 sm:w-12 sm:rounded-2xl">
            <Image
              src="/logo-icon.png"
              width={28}
              height={28}
              alt="BazarDor Logo"
              priority
              className="h-6 w-6 object-contain invert brightness-200 sm:h-7 sm:w-7"
            />
          </div>

          <div className="flex min-w-0 flex-col justify-center">
            <h2 className="text-lg font-bold leading-tight text-gray-900 sm:text-xl">
              বাজার দর
            </h2>

            <div className="text-xs text-gray-600 sm:text-sm">
              <HeaderDate />
            </div>
          </div>
        </Link>

        {/* Authentication links */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <AuthLinks />
        </div>
      </div>

      {/* Category navigation */}
      <NavLinks />
    </header>
  );
};

export default Header;
