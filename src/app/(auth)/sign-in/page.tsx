"use client";

import { signIn } from "@/lib/auth-client";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SignInPage = () => {
  // Email and password sign-in
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("SIGN-IN SUBMIT HANDLER CALLED");

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") ?? "").trim();

    const password = String(formData.get("password") ?? "");

    console.log("Email detected:", Boolean(email));
    console.log("Password detected:", Boolean(password));

    // Check empty fields
    if (!email || !password.trim()) {
      toast.error("ফর্মের তথ্য ঠিক করে আবার চেষ্টা করুন।");
      return;
    }

    // Basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন।");
      return;
    }

    try {
      const { data, error } = await signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        console.error("Sign-in error:", error);
        toast.error(error.message || "সাইন ইন করা যায়নি!");
        return;
      }

      console.log("Signed-in user:", data);

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
    } catch (error) {
      console.error("Unexpected sign-in error:", error);

      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  // Google and GitHub sign-in
  const handleSocialSignUp = async (provider: "google" | "github") => {
    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        console.error(`${provider} login error:`, error);

        toast.error(error.message || `${provider} দিয়ে সাইন ইন করা যায়নি!`);
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);

      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="mt-5 flex min-h-screen flex-col items-center bg-[#F4F6F4] p-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="mb-1 text-2xl font-bold text-gray-800">সাইন ইন</h2>

        <p className="text-sm text-gray-600">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Sign-in Card */}
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <form className="flex flex-col gap-4" noValidate onSubmit={onSubmit}>
          {/* Email */}
          <TextField name="email" type="email">
            <Label className="text-sm font-medium text-gray-700">ইমেইল</Label>

            <Input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600"
            />

            <FieldError className="mt-1 text-xs text-red-500" />
          </TextField>

          {/* Password */}
          <TextField name="password" type="password">
            <Label className="text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </Label>

            <Input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600"
            />

            <FieldError className="mt-1 text-xs text-red-500" />
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            className="mt-2 w-full rounded-xl bg-[#558B43] py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-[#4A7A3A]"
          >
            সাইন ইন
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center py-5">
          <div className="grow border-t border-gray-200" />

          <span className="mx-4 shrink text-xs text-gray-400">অথবা</span>

          <div className="grow border-t border-gray-200" />
        </div>

        {/* Social Sign-in */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignUp("google")}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            <FaGoogle className="text-sm text-red-500" />
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignUp("github")}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            <FaGithub className="text-sm text-gray-900" />
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Sign-up Link */}
        <div className="mt-6 text-center text-xs text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-green-700 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      {/* Back to Home */}
      <div className="mt-6 text-xs text-gray-600">
        <Link href="/" className="hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
