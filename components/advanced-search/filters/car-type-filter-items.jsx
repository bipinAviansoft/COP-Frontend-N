"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CarTypeFilterItems({ items, selectedItems }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const selectedItemsList = selectedItems?.split(",") || [];

  const handleCarTypeClick = (value) => {
    const updatedItems = !selectedItemsList.includes(value)
      ? [...selectedItemsList, value]
      : selectedItemsList?.filter((item) => item !== value);

    const params = new URLSearchParams(searchParams);

    params.set("page", 1);

    if (updatedItems.length > 0) {
      params.set("carTypes", updatedItems.join(","));
    } else {
      params.delete("carTypes");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className="grid grid-cols-3">
      {items.map((item) => {
        const { name, count, image } = item;
        const isSelected = selectedItemsList.includes(name);
        return (
          <li
            key={name}
            className="flex flex-col gap-y-2 justify-between items-center p-2 cursor-pointer border"
            onClick={() => handleCarTypeClick(name)}
          >
            <div className="w-[72px] h-6 lg:w-20 lg:h-8 relative">
              <Image
                src={image}
                fill
                alt={name}
                className={cn("object-contain", {
                  "invert-[.5] sepia-[1] saturate-[500%] hue-rotate-[175deg]":
                    isSelected,
                })}
              />
            </div>
            <p className="text-sm font-medium">{name}</p>
            <span className="text-xs md:text-sm">({count})</span>
          </li>
        );
      })}
    </ul>
  );
}
