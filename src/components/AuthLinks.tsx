"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthLinks = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      console.error("Sign out failed:", error);
      return;
    }

    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return <div className="flex items-center gap-4" />;
  }

  return (
    <div className="flex items-center gap-4">
      {session?.user ? (
        <>
          <span className="text-sm font-medium text-gray-700">
            স্বাগতম, {session.user.name || "ব্যবহারকারী"}
          </span>

          <button
            type="button"
            onClick={handleSignOut}
            className="btn rounded-[10px] border border-gray-300 bg-green-700 text-white hover:bg-green-600"
          >
            সাইন আউট
          </button>
        </>
      ) : (
        <>
          <Link href="/sign-in" className="btn btn-ghost">
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="btn rounded-[10px] bg-[#4a8b51] text-white"
          >
            সাইন আপ
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
