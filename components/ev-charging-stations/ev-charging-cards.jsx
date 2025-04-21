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
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ClientPagination from "../ui/client-pagination";
import InputWithIcon from "../ui/input-with-icon";
import StationAndDealerCard from "../ui/station-and-dealer-card";

const LIMIT = 12;

export default function EvChargingStation({ cities }) {
  const [selectedCity, setSelectedCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const timerRef = useRef();

  const { city } = useSelector((state) => state.city);

  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    setCurrentPage(1);
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };

  useEffect(() => {
    setSelectedCity(city || cities[0]?.id);
  }, [city]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [searchTerm]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "ev-station",
      { city: selectedCity, page: currentPage, search: debouncedSearchTerm },
    ],
    queryFn: () =>
      fetchDataClient(
        `electric-car-charging-station?city=${selectedCity}&limit=${LIMIT}&page=${currentPage}&search=${debouncedSearchTerm}`
      ),
    enabled: Boolean(selectedCity && currentPage),
  });

  const selectedCityName = cities?.find(
    (city) => city.id === selectedCity
  )?.city_name;

  return (
    <>
      <Select value={selectedCity} onValueChange={handleCityChange}>
        <SelectTrigger className="w-full md:w-[300px] h-[40px] focus:ring-0 focus:ring-offset-0 ">
          <SelectValue placeholder="Select a City" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => {
            const { id, city_name } = city;
            return (
              <SelectItem key={id} value={id}>
                {city_name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <div className="flex items-start md:items-center md:justify-between justify-start md:flex-nowrap flex-wrap md:flex-row flex-col-reverse">
        <h2 className="text-black text-base md:text-xl font-medium">
          {data?.totalRecords} EV Charging Station in {selectedCityName}
        </h2>
        <div>
          <InputWithIcon
            iconClass="bx bx-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data?.map((dealer) => {
          const { id, evs_name, evs_address, evs_location } = dealer;
          return (
            <StationAndDealerCard
              key={id}
              title={evs_name}
              address={evs_address}
              locationLink={evs_location}
            />
          );
        })}
      </div>

      {data?.totalRecords > LIMIT && (
        <ClientPagination
          totalPages={data?.totalPages}
          currentPage={currentPage}
          setPage={setCurrentPage}
        />
      )}
    </>
  );
}
