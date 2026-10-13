"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useSession, updateUser } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { Button, Input, Label, TextField } from "@heroui/react";
import { FloppyDisk } from "@gravity-ui/icons";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Store the edited name separately from the session name.
  const [editedName, setEditedName] = useState<string | null>(null);
  const [savedNameOverride, setSavedNameOverride] = useState<string | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);

  const currentName = user?.name ?? "";
  const savedName = savedNameOverride ?? currentName;
  const displayName = editedName ?? savedName;

  // Save profile changes.
  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = displayName.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName.length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে।");
      return;
    }

    if (trimmedName === savedName.trim()) {
      toast("আপনার প্রোফাইলে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await updateUser({
        name: trimmedName,
      });

      if (error) {
        console.error("Profile update error:", error);
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      // Keep the updated name visible even before the session refreshes.
      setSavedNameOverride(trimmedName);
      setEditedName(null);

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      console.error("Unexpected profile error:", error);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSaving(false);
    }
  };

  // Discard unsaved edits.
  const handleCancel = () => {
    setEditedName(null);
    toast("পরিবর্তন বাতিল করা হয়েছে।");
  };

  // Loading state.
  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F4F6F4] px-4">
        <div className="text-center">
          <div
            className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#558B43]"
            role="status"
            aria-label="লোড হচ্ছে"
          />
          <p className="text-sm text-gray-600">প্রোফাইল লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  // User is not signed in.
  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F4F6F4] px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF2E6] text-2xl">
            👤
          </div>

          <h1 className="mb-2 text-xl font-bold text-gray-800">
            আপনার প্রোফাইল
          </h1>

          <p className="mb-6 text-sm leading-6 text-gray-600">
            প্রোফাইল দেখতে ও পরিবর্তন করতে প্রথমে আপনার অ্যাকাউন্টে সাইন ইন
            করুন।
          </p>

          <Link
            href="/signin"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#558B43] px-4 py-3 font-medium text-white transition-colors hover:bg-[#4A7A3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#558B43] focus-visible:ring-offset-2"
          >
            সাইন ইন করুন
          </Link>

          <Link
            href="/"
            className="mt-4 inline-block text-sm text-gray-500 hover:text-[#558B43]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const initial = (displayName.trim() || "U").charAt(0).toUpperCase();

  return (
    <main className="min-h-screen w-full min-w-0 bg-[#F4F6F4] px-3 py-6 sm:px-5 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-5xl min-w-0">
        {/* Page heading */}
        <div className="mb-6 sm:mb-8">
          <p className="mb-2 text-sm font-medium text-[#558B43]">
            BazarDor / অ্যাকাউন্ট
          </p>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
            আপনার ব্যক্তিগত তথ্য দেখুন এবং প্রয়োজনে আপডেট করুন।
          </p>
        </div>

        <div className="grid min-w-0 grid-cols-1 items-start gap-5 sm:gap-6 md:grid-cols-3">
          {/* Profile summary */}
          <section className="min-w-0 md:col-span-1">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#558B43] text-3xl font-bold text-white shadow-sm">
                  {initial}
                </div>

                <h2 className="mt-4 max-w-full wrap-break-words text-lg font-bold text-gray-900">
                  {displayName || "আপনার নাম"}
                </h2>

                <p className="mt-1 max-w-full break-all text-sm text-gray-500">
                  {user.email}
                </p>

                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#EAF2E6] px-3 py-1.5 text-xs font-medium text-[#3F7133]">
                  <span
                    className="h-2 w-2 rounded-full bg-[#558B43]"
                    aria-hidden="true"
                  />
                  BazarDor সদস্য
                </span>
              </div>
            </div>

            <div className="mt-4 text-center sm:mt-6">
              <Link
                href="/"
                className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-[#558B43] transition-colors hover:underline"
              >
                <span aria-hidden="true">←</span>
                হোম পেজে ফিরে যান
              </Link>
            </div>
          </section>

          {/* Edit profile */}
          <section className="min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:col-span-2 lg:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                ব্যক্তিগত তথ্য
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
              </p>
            </div>

            <form
              className="flex min-w-0 flex-col gap-5"
              noValidate
              onSubmit={handleUpdateUser}
            >
              {/* Name */}
              <TextField name="name">
                <Label className="mb-2 block text-sm font-medium text-gray-700">
                  সম্পূর্ণ নাম
                </Label>

                <Input
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={displayName}
                  onChange={(event) => setEditedName(event.target.value)}
                  placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                  className="w-full min-w-0 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#558B43]"
                />
              </TextField>

              {/* Read-only email */}
              <div>
                <Label className="mb-2 block text-sm font-medium text-gray-700">
                  ইমেইল ঠিকানা
                </Label>

                <Input
                  type="email"
                  value={user.email ?? ""}
                  readOnly
                  aria-readonly="true"
                  className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500"
                />

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  ইমেইল ঠিকানা এখানে পরিবর্তন করা যাবে না।
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-2 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:flex-wrap">
                <Button
                  type="submit"
                  isDisabled={
                    isSaving || displayName.trim() === savedName.trim()
                  }
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#558B43] px-5 py-3 font-medium text-white transition-colors hover:bg-[#4A7A3A] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <FloppyDisk />
                  {isSaving ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  isDisabled={isSaving || editedName === null}
                  onPress={handleCancel}
                  className="min-h-12 w-full rounded-xl border border-gray-200 px-5 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  বাতিল করুন
                </Button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
