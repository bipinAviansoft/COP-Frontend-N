"use client";

import { EvCarContext } from "@/contexts/ev-car-context";
import { formatCarMinMaxPrice } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import CarsCarousel from "../homepage/cars-carousel";
import FilterChip from "../ui/filter-chip";
import Cookies from "js-cookie";
import NoCarsFound from "../ui/no-cars-found";

const fetchFilteredEvCars = async (price, brand) => {
  const cityId = Cookies.get("city") || "";

  let url = "/ev-cars";

  if (price) {
    url += `?minPrice=${price.min}&maxPrice=${price.max}`;
  }

  if (brand?.id) {
    url += `?brand=${brand?.id}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
    {
      headers: {
        Cookie: `city=${cityId}`,
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    const { message } = error;
    throw new Error(message || `/ev-banners | API Failed!`);
  }

  const data = await response.json();
  return data;
};

export default function FilteredEVCars({ popularCars }) {
  const [cars, setCars] = useState(popularCars);

  const { price, brand, updatePrice, updateBrand } = useContext(EvCarContext);

  const filtersApplied =
    ((price?.min && price?.max) || brand?.id) !== undefined;

  const { isLoading, data, error } = useQuery({
    queryKey: ["ev-cars", { query: price || brand?.id }],
    queryFn: () => fetchFilteredEvCars(price, brand),
    enabled: filtersApplied,
  });

  useEffect(() => {
    if (data && filtersApplied) {
      setCars(data);
    } else if (filtersApplied && isLoading) {
      setCars([]);
    } else {
      setCars(popularCars);
    }
  }, [data, filtersApplied, popularCars, isLoading]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 overflow-x-auto">
        <div className="p-2 bg-ev-gradient rounded-md w-8 h-8 text-white flex justify-center items-center shrink-0">
          <span>{cars.length}</span>
        </div>
        {!price && !brand && <FilterChip text="Popular Cars" />}
        {brand && (
          <FilterChip
            text={brand.brand_name}
            onCancel={() => updateBrand(null)}
          />
        )}
        {price && (
          <FilterChip
            text={formatCarMinMaxPrice(price.min, price.max, 0)}
            onCancel={() => updatePrice(null)}
          />
        )}
      </div>
      {cars?.length > 0 ? (
        <CarsCarousel
          data={cars}
          evCarousel
          showMoreButton={false}
          options={{ align: "start" }}
        />
      ) : (
        <NoCarsFound />
      )}
    </>
  );
}
