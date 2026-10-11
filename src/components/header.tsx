import Image from "next/image";
import NavLinks from "./navlinks";
import Link from "next/link";

const Header = async () => {
  "use cache";

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full bg-[#f8f9fa] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href={"http://localhost:3000/"}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#4a8b51] rounded-2xl flex items-center justify-center shrink-0">
              <Image
                src="/logo-icon.png"
                width={28}
                height={28}
                alt="Logo"
                className="object-contain filter invert brightness-200"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                বাজার দর
              </h2>
              <p className="text-sm text-gray-600 font-medium mt-0.5">{date}</p>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-4">


          <Link href="/SignIn">
            <button className="btn btn-ghost">সাইন ইন</button>
          </Link>

          <Link href="/SignUp">
            <button className="btn bg-[#4a8b51] text-white rounded-[10]">
              সাইন আপ
            </button>
          </Link>
        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;
