"use client";

import { toast } from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthLinks = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();

      if (error) {
        console.error("Sign out failed:", error);
        toast.error(error.message || "সাইন আউট করা যায়নি!");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Unexpected sign out error:", error);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
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

          <Link href="/profile" className="btn btn-ghost">
            প্রোফাইল
          </Link>

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
