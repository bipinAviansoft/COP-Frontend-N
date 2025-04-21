"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LaunchMonthFilterItems({
  items,
  filters,
  selectedItem,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const onCheckChange = (checked, item) => {
    if (checked) {
      const params = new URLSearchParams(searchParams);

      params.set("page", 1);
      params.set("launchMonth", item);

      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="px-6 py-4 space-y-4">
      <ul className="flex flex-col gap-y-3 max-h-52 overflow-y-auto">
        {Object.keys(items).map((item) => {
          const isChecked = selectedItem
            ? selectedItem === item
            : parseInt(item) === 3;
          return (
            <li key={item} className="flex items-center space-x-4">
              <Checkbox
                id={item}
                className="size-5"
                value={item}
                checked={isChecked}
                onCheckedChange={(checked) => onCheckChange(checked, item)}
              />
              <Label htmlFor={item} className="text-sm md:text-base pr-4">
                Last {item} months{" "}
                <span className="text-xs md:text-sm">({items[item]})</span>
              </Label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
