import Image from "next/image";
import Link from "next/link";
import NavLinks from "./navlinks";
import HeaderDate from "./HeaderDate";
import AuthLinks from "./AuthLinks";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-[#f8f9fa]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo and website name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4a8b51]">
            <Image
              src="/logo-icon.png"
              width={28}
              height={28}
              alt="BazarDor Logo"
              className="object-contain invert brightness-200"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-bold leading-tight text-gray-900">
              বাজার দর
            </h2>

            <HeaderDate />
          </div>
        </Link>

        {/* Authentication links */}
        <AuthLinks />
      </div>

      {/* Category navigation */}
      <NavLinks />
    </header>
  );
};

export default Header;
