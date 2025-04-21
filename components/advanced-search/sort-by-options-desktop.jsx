"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

export default function SortByOptionsDesktop({ sortByPrice }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [sortBy, setSortBy] = useState(sortByPrice);

  const onSortChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    params.set("sort", value);
    setSortBy(value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={sortBy} onValueChange={onSortChange}>
      <SelectTrigger className="w-60 text-gray-600">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ASC">Price - Low to High</SelectItem>
        <SelectItem value="DESC">Price - High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
}
