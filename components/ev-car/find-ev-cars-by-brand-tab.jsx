"use client";

import { useContext, useState } from "react";
import Button from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EvCarContext } from "@/contexts/ev-car-context";

export default function FindEVCarsByBrandTab({ brands }) {
  const [brandId, setBrandId] = useState("");

  const { updateBrand } = useContext(EvCarContext);

  const handleSearchClick = () => {
    const brand = brands?.filter((brand) => brand.id === brandId)[0];
    updateBrand(brand);
  };

  return (
    <div className="w-full flex items-center gap-x-4 py-3">
      <div className="grow flex flex-col md:flex-row md:gap-x-5 gap-y-3">
        <div className="grow flex flex-col gap-y-2">
          <Select value={brandId} onValueChange={setBrandId}>
            <SelectTrigger className="bg-[#F2F6F7] border-0">
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => {
                const { brand_name, id } = brand;
                return (
                  <SelectItem key={id} value={id}>
                    {brand_name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        className="md:hidden rounded-full w-10 h-10 aspect-square p-1 shrink-0"
        size="lg"
        variant="ev-gradient"
        disabled={!brandId}
        onClick={handleSearchClick}
      >
        <i className="bx bx-right-arrow-alt text-white text-2xl"></i>
      </Button>
      <Button
        animated
        className="hidden md:block shrink-0 uppercase px-10 py-3 mt-auto"
        variant="ev-gradient"
        disabled={!brandId}
        onClick={handleSearchClick}
      >
        Search
      </Button>
    </div>
  );
}
