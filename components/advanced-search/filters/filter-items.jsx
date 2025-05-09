"use client";

import { Checkbox } from "@/components/ui/checkbox";
import InputWithIcon from "@/components/ui/input-with-icon";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterItems({
  queryKey,
  items,
  selectedItems,
  searchFilter = false,
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const onCheckChange = (checked, value) => {
    const updatedItems = checked
      ? [...selectedItemsList, value]
      : selectedItemsList.filter((item) => item !== value);

    const params = new URLSearchParams(searchParams);

    params.set("page", 1);

    if (updatedItems.length > 0) {
      params.set(queryKey, updatedItems.join(","));
    } else {
      params.delete(queryKey);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const [input, setInput] = useState("");

  const selectedItemsList = selectedItems?.split(",") || [];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="px-6 py-4 space-y-4">
      {searchFilter && (
        <InputWithIcon
          iconClass="bx bx-search text-xl"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      )}
      <ul className="flex flex-col gap-y-3 max-h-52 overflow-y-auto">
        {filteredItems.map((item) => {
          const { name, count } = item;
          return (
            <li key={name} className="flex items-center space-x-4">
              <Checkbox
                id={name}
                className="size-5"
                value={name}
                checked={selectedItemsList.includes(name)}
                onCheckedChange={(checked) => onCheckChange(checked, name)}
              />
              <Label htmlFor={name} className="text-sm md:text-base pr-4">
                {name} <span className="text-xs md:text-sm">({count})</span>
              </Label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
