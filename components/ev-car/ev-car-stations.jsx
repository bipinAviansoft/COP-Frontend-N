"use client";

import Button from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StationAndDealerCard from "@/components/ui/station-and-dealer-card";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DevBug from "../ui/dev-bug";
import Link from "next/link";
import Cookies from "js-cookie";
import { fetchDataClient } from "@/lib/fetch-client";
import { useSelector } from "react-redux";

export default function EvCarStations({ cities = [] }) {
  const [city, setCity] = useState("");
  const { city: storeCity } = useSelector((state) => state.city);

  const { data } = useQuery({
    queryKey: ["ev-stations", { city }],
    queryFn: () =>
      fetchDataClient(`electric-car-charging-station?limit=3&city=${city}`),
    enabled: Boolean(city),
  });

  const selectedCity =
    cities.find((cityObj) => cityObj.id === city)?.city_name ||
    cities[0]?.city_name;

  useEffect(() => {
    const city =
      cities.find((city) => city.id === storeCity)?.id || cities[0]?.id;

    if (city) {
      setCity(city);
    }
  }, [storeCity]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-4 items-center">
          <h4 className="text-theme-black font-medium md:text-base shrink-0">
            Change City
          </h4>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="min-w-40">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities?.map((city) => {
                const { id, city_name } = city;
                return (
                  <SelectItem key={id} value={id}>
                    {city_name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <Link href="/electric-car-charging-station">
          <Button className="flex gap-x-2 items-center bg-white text-primary-darker md:text-base hover:shadow transition-shadow delay-100">
            View All
          </Button>
        </Link>
      </div>
      <h3 className="text-theme-black font-semibold md:text-base">
        {data?.totalRecords} EV Charging Stations in {selectedCity}
      </h3>
      <div className="flex lg:grid lg:grid-cols-3 gap-x-4 overflow-x-auto">
        {data?.data?.map((station, index) => {
          const { evs_name, evs_address, evs_location } = station;
          return (
            <div
              key={index}
              className="flex-[0_0_70%] md:flex-[0_0_40%] flex flex-col"
            >
              <StationAndDealerCard
                title={evs_name}
                address={evs_address}
                locationLink={evs_location}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
