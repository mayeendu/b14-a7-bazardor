import Link from "next/link";

const AuthLinks = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href="/sign-in" className="btn btn-ghost">
        সাইন ইন
      </Link>

      <Link
        href="/sign-up"
        className="btn rounded-[10px] bg-[#4a8b51] text-white"
      >
        সাইন আপ
      </Link>
    </div>
  );
};

export default AuthLinks;
