"use client";

import { formatCarMinMaxPrice } from "@/lib/utils";
import FilterChip from "../ui/filter-chip";
import Button from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { filterPageConstants } from "@/data/constants";

export default function AppliedFilters({ filters = {}, pageType }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const { minPrice, maxPrice, ...otherFilters } = filters;

  let chips = [];

  if (
    pageType === filterPageConstants.NEWLY_LAUNCHED_CARS &&
    !filters["launchMonth"]
  ) {
    chips.push({ key: "launchMonth", value: 3 });
  }

  for (let key of Object.keys(otherFilters)) {
    const values = otherFilters[key];
    const items = values.split(",");

    for (let item of items) {
      chips.push({ key, value: item });
    }
  }

  const onCancelChip = (key, valueToRemove) => {
    const params = new URLSearchParams(searchParams);

    if (!valueToRemove && key === "price") {
      params.delete("minPrice");
      params.delete("maxPrice");
    } else {
      const existingParamValues = params.get(key);
      const existingValues = existingParamValues?.split(",") || [];
      const updatedValues = existingValues?.filter(
        (value) => value !== valueToRemove
      );

      if (updatedValues.length > 0) {
        params.set(key, updatedValues);
      } else {
        params.delete(key);
      }
    }

    params.set("page", 1);

    replace(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();

    params.set("page", 1);

    replace(`${pathname}?${params.toString()}`);
  };

  if (chips.length > 0 || (minPrice && maxPrice)) {
    return (
      <ul className="flex items-center flex-wrap gap-3 lg:gap-x-4 lg:gap-y-2">
        {chips.map((chip) => {
          const { key, value } = chip;
          if (value) {
            return (
              <li key={value}>
                <FilterChip
                  text={key === "launchMonth" ? `Last ${value} months` : value}
                  onCancel={() => onCancelChip(key, value)}
                />
              </li>
            );
          }
        })}
        {minPrice &&
          parseInt(minPrice) &&
          !isNaN(parseInt(minPrice)) &&
          maxPrice &&
          parseInt(maxPrice) &&
          !isNaN(parseInt(maxPrice)) && (
            <FilterChip
              text={formatCarMinMaxPrice(
                parseInt(minPrice),
                parseInt(maxPrice),
                0
              )}
              onCancel={() => onCancelChip("price")}
            />
          )}
        {(chips.length > 0 || (minPrice && maxPrice)) && (
          <li>
            <Button
              className="bg-primary-lighter text-white"
              onClick={clearAllFilters}
            >
              Clear all filters
            </Button>
          </li>
        )}
      </ul>
    );
  }
}
