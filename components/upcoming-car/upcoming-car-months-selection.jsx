"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function UpcomingCarMonthsSelection({
  options,
  selectedOption = "3",
  searchOnClick,
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setValue(selectedOption);
  }, [selectedOption]);

  const [value, setValue] = useState(selectedOption);

  const handleSearchClick = () => {
    const params = new URLSearchParams(searchParams);

    params.set("page", 1);
    params.set("launchMonth", value);

    replace(`${pathname}?${params.toString()}`);
  };

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", 1);
    params.set("launchMonth", value);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Select
        value={value}
        onValueChange={(value) => {
          searchOnClick ? setValue(value) : handleChange(value);
        }}
      >
        <SelectTrigger
          className={cn("bg-[#F2F6F7] md:py-4 md:text-base min-w-52", {
            "bg-white": !searchOnClick,
          })}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options?.map((month) => {
            return (
              <SelectItem key={month} value={month.toString()}>
                {searchOnClick ? "Next" : "Launch in "} {month} months
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {searchOnClick && (
        <Button animated className="px-8" onClick={handleSearchClick}>
          Search
        </Button>
      )}
    </>
  );
}
