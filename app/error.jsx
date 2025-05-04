"use client"; // Error boundaries must be Client Components

import Button from "@/components/ui/button";
// app/not-found.js or app/not-found.tsx
import { redirect } from "next/navigation";

export default function Error({ error, reset }) {
  // redirect("/"); // Redirect to homepage
  return (
    <div className="min-h-80 flex flex-col justify-center items-center bg-rose-100">
      <h2 className="text-3xl font-semibold text-rose-500">
        An error ocurred! 🥺
      </h2>
      <code className="my-4 px-2 py-1 rounded-md bg-white/30">
        {error.message ||
          `Please check logs with a digest ID of ${error.digest}`}
      </code>
      {/* <Button onClick={() => reset()}>Try again</Button> */}
    </div>
  );
}
