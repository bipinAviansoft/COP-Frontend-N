"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchDataClient } from "@/lib/fetch-client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import StationAndDealerCard from "../ui/station-and-dealer-card";
import Pagination from "../ui/client-pagination";

const LIMIT = 12;

export default function DealershipCards({ brands }) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const cities =
    brands.find((brand) => brand.brand_name === selectedBrand)?.cities || [];

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setSelectedCity("");
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "dealers",
      { brand: selectedBrand, city: selectedCity, page: currentPage },
    ],
    queryFn: () =>
      fetchDataClient(
        `dealership?brand=${selectedBrand}&city=${selectedCity}&limit=${LIMIT}&page=${currentPage}`
      ),
    enabled: Boolean(selectedCity && currentPage),
  });

  return (
    <>
      <div className="flex items-start md:items-center gap-3 justify-start md:flex-nowrap flex-wrap">
        <Select value={selectedBrand} onValueChange={handleBrandChange}>
          <SelectTrigger className="w-full md:w-[300px]">
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => {
              const { id, brand_name } = brand;
              return (
                <SelectItem key={id} value={brand_name}>
                  {brand_name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-full md:w-[300px]">
            <SelectValue placeholder="Select a City" />
          </SelectTrigger>
          {cities && cities.length > 0 && (
            <SelectContent>
              {cities.map((city) => {
                const { id, city_name } = city;
                return (
                  <SelectItem key={id} value={city_name}>
                    {city_name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          )}
        </Select>
      </div>

      {data?.totalRecords && (
        <h2 className="text-black text-base md:text-xl font-medium mb-0 pl-1 pt-4 md:pl-0 md:pt-0">
          {data?.totalRecords} Authorized Dealerships in {selectedCity}
        </h2>
      )}

      {data?.data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
          {data.data.map((dealer) => {
            const { id, dealer_name, address, phone_no, map_location, email } =
              dealer;
            return (
              <StationAndDealerCard
                key={id}
                title={dealer_name}
                address={address}
                contact={phone_no}
                locationLink={map_location}
                email={email}
              />
            );
          })}
        </div>
      )}

      {data?.totalRecords > LIMIT && (
        <Pagination
          totalPages={data?.totalPages}
          currentPage={currentPage}
          setPage={setCurrentPage}
        />
      )}
    </>
  );
}
