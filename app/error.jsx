"use client";
import Button from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Error({ error, reset }) {
  // redirect("/"); // Redirect to homepage
  return (
    <div className="min-h-80 flex flex-col justify-center text-center items-center py-10 px-4 bg-white">
      <img
        src="/images/404.png"
        alt="Error image"
        className="max-h-[300px] max-w-[100%]"
      />
      <h2 className="text-2xl lg:text-3xl font-semibold text-[#00B6FE] mb-2">
        Ooops, This page not found! 🥺
      </h2>
      <p className="mb-5">
        The page you are looking for doesn’t exist or an other erro occurred.
      </p>
      <Button
        animated
        className="uppercase text-xs md:text-sm lg:text-base tracking-wider h-auto self-center"
      >
        <Link href="/">Go to home</Link>
      </Button>
    </div>
  );
}
