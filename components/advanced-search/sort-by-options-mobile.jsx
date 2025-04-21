"use client";

/* import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; */

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SortByOptionsMobile({ sortByPrice }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState(sortByPrice);

  const onSortChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    params.set("sort", value);
    setSortBy(value);
    setIsOpen(false);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="bg-white py-2 w-36 flex justify-center items-center gap-x-3 text-gray-700 grow text-sm md:text-base rounded-none border-r-[0.5px] border-gray-700">
          <i className="bx bx-transfer text-2xl"></i> Sort
        </PopoverTrigger>
        <PopoverContent
          align="start"
          alignOffset={-48}
          className="shadow-2xl text-gray-700"
        >
          <RadioGroup value={sortBy} onValueChange={onSortChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ASC" id="r1" />
              <Label htmlFor="r1">Price - Low to High</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="DESC" id="r2" />
              <Label htmlFor="r2">Price - High to Low</Label>
            </div>
          </RadioGroup>
        </PopoverContent>
      </Popover>
      {/* <Dialog>
        <DialogTrigger className="bg-white flex justify-center items-center gap-x-3 text-gray-700 flex-[0_0_50%] text-base rounded-none border-r-[0.5px] border-gray-700">
          <i className="bx bx-transfer text-2xl"></i> Sort
        </DialogTrigger>
        <DialogContent className="w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-left">Sort By</DialogTitle>
            <span className="hidden">
              <DialogDescription>
                Select the option to sort by
              </DialogDescription>
            </span>
          </DialogHeader>
          <RadioGroup defaultValue="ASC">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ASC" id="r1" />
              <Label htmlFor="r1">Price - Low to High</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="DESC" id="r2" />
              <Label htmlFor="r2">Price - High to Low</Label>
            </div>
          </RadioGroup>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
