import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchData } from "@/lib/fetch";
import { cn } from "@/lib/utils";
import CarsCarousel from "./cars-carousel";
import { Suspense } from "react";
import CarsList from "../ui/skeletons/cars-list";

const TRENDING_CARS_TABS = [
  {
    title: "Popular Cars",
    value: "popularCars",
    modelType: 0,
  },
  {
    title: "EV Cars",
    value: "evCars",
    modelType: 1,
    href: "/ev-car",
  },
  {
    title: "New Launched Cars",
    value: "newLaunchedCars",
  },
];

async function PopularCarsContent() {
  const popularCars = await fetchData("/home/popular-cars", true);
  return (
    <CarsCarousel
      data={popularCars}
      options={{ align: "start" }}
      exploreMoreHref="/"
    />
  );
}

async function EVCarsContent() {
  const evCars = await fetchData("/home/ev-cars", true);
  return (
    <CarsCarousel
      data={evCars}
      options={{ align: "start" }}
      evCarousel
      exploreMoreHref="/ev-car"
    />
  );
}

async function UpcomingCarsContent() {
  const newLaunchedCars = await fetchData("/home/upcoming-cars", true);
  return (
    <CarsCarousel
      data={newLaunchedCars}
      options={{ align: "start" }}
      exploreMoreHref="/"
    />
  );
}

export default async function TrendingCars() {
  return (
    <>
      <h2 className="uppercase text-white text-xl lg:text-2xl font-medium mb-2 lg:mb-4">
        Trending
      </h2>
      <Tabs defaultValue={TRENDING_CARS_TABS[0].value}>
        <TabsList className="w-full bg-transparent justify-start p-0 gap-x-4">
          {TRENDING_CARS_TABS.map((tab) => {
            const { title, value, modelType } = tab;
            const isEv = modelType;
            return (
              <TabsTrigger
                key={value}
                className={cn(
                  "bg-[#018ac53d] data-[state=active]:text-primary-lighter font-semibold rounded-md text-white px-4 py-2.5 text-xs md:text-sm border border-transparent hover:border-white",
                  {
                    "data-[state=active]:bg-ev-gradient data-[state=active]:text-white":
                      isEv,
                  }
                )}
                value={value}
              >
                {title}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="popularCars">
          <Suspense fallback={<CarsList number={4} />}>
            <PopularCarsContent />
          </Suspense>
        </TabsContent>

        <TabsContent value="evCars">
          <Suspense fallback={<CarsList number={4} />}>
            <EVCarsContent />
          </Suspense>
        </TabsContent>
        <TabsContent value="newLaunchedCars">
          <Suspense fallback={<CarsList number={4} />}>
            <UpcomingCarsContent />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
}
