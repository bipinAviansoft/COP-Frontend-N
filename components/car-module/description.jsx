"use client";

import { useState } from "react";
import Button from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

export default function Description({ descriptionData }) {
  const [isOpen, setIsOpen] = useState(false);
  const keys = Object.keys(descriptionData);

  return (
    <div className="bg-white px-3 py-4 rounded-md">
      <h4 className="font-semibold mb-2 lg:text-lg">Description</h4>
      <Separator className="my-2" />
      <div
        className={cn(
          "py-3 text-sm md:text-base flex flex-col gap-y-3 leading-6 overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out",
          {
            "max-h-24 md:max-h-20": !isOpen,
            "max-h-[2000px]": isOpen,
          }
        )}
      >
        {keys?.map((key) => {
          const value = descriptionData[key];
          return (
            <p key={key}>
              <strong className="font-semibold">
                {key}
                {value ? ":" : ""}&nbsp;
              </strong>
              <span>{value}</span>
            </p>
          );
        })}
      </div>
      <Separator className="my-2" />
      <Button
        className="flex gap-x-1 items-center bg-white text-primary-lighter font-semibold px-0"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>View More</span>
        <i
          className={cn(
            "bx bxs-chevron-down text-xl transition-all ease-in-out duration-400 delay-100",
            {
              "rotate-180": isOpen,
            }
          )}
        ></i>
      </Button>
    </div>
  );
}
