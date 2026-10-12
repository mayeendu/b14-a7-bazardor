"use client";

import { signIn } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa"; // Or use your preferred icon imports

const SignInPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data: resdata, error } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });

    console.log("After Sign In User data is", resdata, error);
  };

  // Optional handlers for social logins if supported by your auth-client
  const handleSocialSignIn = async (provider: "google" | "github") => {
    await signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] flex flex-col items-center p-4 mt-5">
      {/* Header Title and Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">সাইন ইন</h2>
        <p className="text-sm text-gray-600">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">ইমেইল</Label>
            <Input
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </Label>
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-2 bg-[#558B43] hover:bg-[#4A7A3A] text-white font-medium py-2.5 rounded-xl transition-colors shadow-sm"
          >
            সাইন ইন
          </Button>
        </Form>

        {/* Divider */}
        <div className="relative flex py-5 items-center">
          <div className="grow border-t border-gray-200"></div>
          <span className="shrink mx-4 text-gray-400 text-xs">অথবা</span>
          <div className="grow border-t border-gray-200"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors"
          >
            <FaGoogle className="text-red-500 text-sm" />
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors"
          >
            <FaGithub className="text-gray-900 text-sm" />
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6 text-xs text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="text-green-700 font-medium hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="mt-6 text-xs text-gray-600">
        <Link href="/" className="hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
