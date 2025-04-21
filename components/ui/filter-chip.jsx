"use client";

import { cn } from "@/lib/utils";
import Button from "./button";

export default function FilterChip({ text, onCancel }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border bg-stone-200 text-theme-black",
        onCancel ? "p-2" : "py-2 px-4"
      )}
    >
      <p className={cn("text-sm", onCancel ? "pl-2" : "")}>{text}</p>
      {onCancel && (
        <Button
          onClick={onCancel}
          variant="icon"
          className="p-0 size-6 flex justify-center items-center bg-white rounded-full"
        >
          <i className="bx bx-x-circle text-base md:text-lg lg:text-xl !leading-none"></i>
        </Button>
      )}
    </div>
  );
}
