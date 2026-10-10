"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

function AuthToastListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const reason = searchParams.get("reason");

    if (!reason) return;

    switch (reason) {
      case "auth-required":
        toast.error("এই পেজটি দেখতে লগইন করুন।");
        break;

      case "session-expired":
        toast.error("আপনার সেশন শেষ হয়েছে। আবার লগইন করুন।");
        break;

      case "login-success":
        toast.success("সফলভাবে লগইন হয়েছে!");
        break;

      case "logout-success":
        toast.success("আপনি সফলভাবে লগআউট করেছেন।");
        break;

      case "login-failed":
        toast.error("লগইন করা যায়নি। তথ্যগুলো আবার যাচাই করুন।");
        break;

      default:
        return;
    }

    // Remove the reason parameter after showing the toast.
    // Preserve other query parameters, such as "next".
    const params = new URLSearchParams(searchParams.toString());
    params.delete("reason");

    const query = params.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;

    router.replace(newUrl, { scroll: false });
  }, [pathname, searchParams, router]);

  return null;
}

export default function ToastProvider() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "10px",
            background: "#1f2937",
            color: "#ffffff",
            padding: "14px 18px",
          },
          success: {
            iconTheme: {
              primary: "#16a34a",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <Suspense fallback={null}>
        <AuthToastListener />
      </Suspense>
    </>
  );
}
