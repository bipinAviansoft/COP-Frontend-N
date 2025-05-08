import EvCarStations from "@/components/ev-car/ev-car-stations";
import TabsCard from "@/components/ev-car/ev-car-tabs";
import FilteredEVCars from "@/components/ev-car/filtered-cars";
import EvCarContextProvider from "@/contexts/ev-car-context";
import { fetchData, fetchMetaData } from "@/lib/fetch";
import { cookies } from "next/headers";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "ev-cars" };

  const data = await fetchMetaData(bodyData);

  // return data;
  const canonicalUrl = `${process.env.NEXT_SITE_URL}/ev-car`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ElectricCars() {
  const [popularEVCars, evBrands, evStationsCities] = await Promise.all([
    fetchData("/home/ev-cars", true),
    fetchData("/ev-cars/brands"),
    fetchData("/electric-car-charging-station/cities"),
  ]);

  return (
    <div className="bg-[#F6F2F2]">
      <EvCarContextProvider>
        <div className="relative w-full aspect-[4/3] md:aspect-[12/5] lg:aspect-[7/3]">
          <Image
            src="https://static.caronphone.com/public/Banner/32/32.webp"
            alt="Image of an electric car"
            className="object-cover"
            fill
            priority
          />
          <div className="container absolute top-6 md:top-8 lg:top-10 left-1/2 -translate-x-1/2">
            <h1 className="text-white text-2xl md:text-[26px] lg:text-3xl font-semibold">
              Electric Cars in India
            </h1>
          </div>
          <div className="hidden lg:block absolute bottom-20 w-full">
            <div className="container">
              <div className="w-[640px]">
                <TabsCard brands={evBrands} />
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-36 pb-6 md:py-6 relative">
          <div className="container md:w-full md:max-w-none md:px-0 absolute md:static -top-14 left-1/2 -translate-x-1/2 md:translate-x-0 lg:hidden">
            <TabsCard brands={evBrands} />
          </div>
        </div>
        <div className="container py-6">
          <FilteredEVCars popularCars={popularEVCars} />
        </div>
        <div className="container py-6">
          <EvCarStations cities={evStationsCities} />
        </div>
      </EvCarContextProvider>
    </div>
  );
}
