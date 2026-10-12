"use client";

import { useEffect, useState } from "react";

export default function HeaderDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDate(
        new Date().toLocaleDateString("bn-BD", {
          dateStyle: "full",
        }),
      );
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="mt-0.5 text-sm font-medium text-gray-600">
      {date || "\u00A0"}
    </p>
  );
}
