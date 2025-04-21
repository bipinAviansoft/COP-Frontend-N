"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import Button from "../ui/button";
import Link from "next/link";

export default function FindCarsByTypeTab({ carTypes }) {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleCarTypeClick = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((selectedType) => selectedType !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  let href = "advanced-search";

  if (selectedTypes.length > 0) {
    href += `?carTypes=${selectedTypes.join(",")}`;
  }
  return (
    <div className="lg:flex gap-x-4 items-center lg:px-4">
      <ul className="grid grid-cols-3 gap-y-4 sm:grid-cols-6 lg:grid-cols-5 lg:gap-x-2 py-2 lg:py-6">
        {carTypes.map((carType) => {
          const { ct_id, ct_name, ct_image } = carType;
          const isSelected = selectedTypes.includes(ct_name);
          return (
            <li
              key={ct_id}
              className="flex flex-col gap-y-2 justify-between items-center px-0 sm:px-2 p-2 cursor-pointer"
              onClick={() => handleCarTypeClick(ct_name)}
            >
              <div className="w-[72px] h-6 lg:w-20 lg:h-8 relative">
                <Image
                  src={ct_image}
                  fill
                  alt={ct_name}
                  className={cn("object-contain", {
                    "filter invert-[0.5] sepia-[1] saturate-[5] hue-rotate-[175deg]":
                      isSelected,
                  })}
                />
              </div>
              <p className="text-xs font-medium">{ct_name}</p>
            </li>
          );
        })}
        <li className="flex justify-center items-center">
          <Button
            className="lg:hidden rounded-full w-10 h-10 aspect-square p-1 shrink-0"
            size="lg"
          >
            <i className="bx bx-right-arrow-alt text-white text-2xl"></i>
          </Button>
        </li>
      </ul>
      <Button
        animated
        className="hidden lg:block shrink-0 uppercase px-8 py-3"
        asChild
      >
        <Link href={href}>Search</Link>
      </Button>
    </div>
  );
}
