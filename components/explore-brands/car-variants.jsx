"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import ExploreBrandsCards from "./explore-brands-cards";

export const fetchModelsData = async (selectedBrandSlug, carType, page) => {
  const cityId = Cookies.get("city") || "";
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/brands/${selectedBrandSlug}?carType=${carType}&page=${page}`,
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
    throw new Error(message || ` | API Failed!`);
  }

  const data = await response.json();
  return data;
};

export default function CarVariantSection({
  selectedBrandSlug,
  selectedBrand,
  brands,
  modelsData,
}) {
  const { car_types, brand_name } = selectedBrand;
  const [carType, setCarType] = useState("all");

  const { data: models } = modelsData;

  return (
    <>
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-gray-500 text-sm md:text-base lg:text-lg xl:text-xl font-medium mb-0">
          {brand_name} Cars In India
        </h2>
        <Select defaultValue={`/${selectedBrandSlug}`}>
          <SelectTrigger className="w-[160px] bg-transparent border-gray-400 focus:ring-0 focus:ring-offset-0 lg:hidden flex">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => {
              const { brand_name, slug } = brand;

              return (
                <SelectItem key={slug} value={slug}>
                  <Link href={slug}>{brand_name}</Link>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <Tabs value={carType} onValueChange={setCarType}>
        <TabsList className="w-full bg-transparent justify-start p-0 gap-x-2 md:gap-3 py-2 lg:py-4 h-auto">
          <TabsTrigger
            value="all"
            className="bg-transparent data-[state=active]:bg-primary-gradient data-[state=active]:text-white font-medium rounded-md text-gray-500 border-gray-300 px-4 py-2 md:px-4 md:py-2 text-xs lg:text-base border data-[state=active]:border-white"
          >
            All
          </TabsTrigger>
          {car_types?.map((type) => {
            return (
              <TabsTrigger
                key={type}
                value={type}
                className="bg-transparent data-[state=active]:bg-primary-gradient data-[state=active]:text-white font-medium rounded-md text-gray-500 border-gray-300 px-4 py-2 md:px-4 md:py-2 text-xs lg:text-base border data-[state=active]:border-white"
              >
                {type}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value="all">
          <ExploreBrandsCards
            initialModels={models}
            initialPage={2}
            carType={carType}
            selectedBrandSlug={selectedBrandSlug}
          />
        </TabsContent>
        {car_types?.map((type) => {
          return (
            <TabsContent key={type} value={type}>
              <ExploreBrandsCards
                initialPage={1}
                carType={carType}
                selectedBrandSlug={selectedBrandSlug}
                enabled
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
}
