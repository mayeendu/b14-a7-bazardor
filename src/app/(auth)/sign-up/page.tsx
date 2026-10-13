"use client";

import React from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SignUpPage = () => {
  // Email and password sign-up
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("SIGN-UP SUBMIT HANDLER CALLED");

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    console.log("Name detected:", Boolean(name));
    console.log("Email detected:", Boolean(email));
    console.log("Password detected:", Boolean(password));
    console.log("Confirm password detected:", Boolean(confirmPassword));

    // Check all required fields
    if (!name || !email || !password.trim() || !confirmPassword.trim()) {
      toast.error("ফর্মের তথ্য ঠিক করে আবার চেষ্টা করুন।");
      return;
    }

    // Validate name
    if (name.length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে।");
      return;
    }

    // Validate email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন।");
      return;
    }

    // Validate password
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("পাসওয়ার্ডে অন্তত একটি বড় হাতের ইংরেজি অক্ষর দিন।");
      return;
    }

    if (!/[0-9]/.test(password)) {
      toast.error("পাসওয়ার্ডে অন্তত একটি সংখ্যা দিন।");
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    try {
      const { data, error } = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        console.error("Email signup error:", error);

        toast.error(error.message || "সাইন আপ করা যায়নি।");
        return;
      }

      console.log("Signup successful:", data);

      toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!");
    } catch (error) {
      console.error("Unexpected signup error:", error);

      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  // Google and GitHub sign-up/sign-in
  const handleSocialSignUp = async (provider: "google" | "github") => {
    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        console.error(`${provider} authentication error:`, error);

        toast.error(error.message || `${provider} দিয়ে সাইন আপ করা যায়নি।`);
      }
    } catch (error) {
      console.error(`${provider} authentication error:`, error);

      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="mt-5 flex min-h-screen flex-col items-center bg-[#F4F6F4] p-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="mb-1 text-2xl font-bold text-gray-800">
          অ্যাকাউন্ট তৈরি করুন
        </h2>

        <p className="text-sm text-gray-600">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Sign-up Card */}
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <form className="flex flex-col gap-4" noValidate onSubmit={onSubmit}>
          {/* Name */}
          <TextField name="name">
            <Label className="text-sm font-medium text-gray-700">নাম</Label>

            <Input
              name="name"
              type="text"
              autoComplete="name"
              placeholder="যেমন: রহিম উদ্দিন"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600"
            />

            <FieldError className="mt-1 text-xs text-red-500" />
          </TextField>

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
              autoComplete="new-password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600"
            />

            <FieldError className="mt-1 text-xs text-red-500" />
          </TextField>

          {/* Confirm Password */}
          <TextField name="confirmPassword" type="password">
            <Label className="text-sm font-medium text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>

            <Input
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="আবার লিখুন"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600"
            />

            <FieldError className="mt-1 text-xs text-red-500" />
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            className="mt-2 w-full rounded-xl bg-[#558B43] py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-[#4A7A3A]"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center py-5">
          <div className="grow border-t border-gray-200" />

          <span className="mx-4 shrink text-xs text-gray-400">অথবা</span>

          <div className="grow border-t border-gray-200" />
        </div>

        {/* Social Sign-up */}
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

        {/* Sign-in Link */}
        <div className="mt-6 text-center text-xs text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-green-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>

      {/* Home Link */}
      <div className="mt-6 text-xs text-gray-600">
        <Link href="/" className="hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
