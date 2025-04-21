import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Button from "../ui/button";
import CarsCarousel from "./cars-carousel";
import { fetchData } from "@/lib/fetch";

export default async function CarsByBudget() {
  const carsByBudgetData = await fetchData("/home/cars-by-budget", true);
  const tabsList = Object.keys(carsByBudgetData);

  return (
    <>
      <div className="flex justify-between items-center mb-3 lg:mb-4">
        <h2 className="uppercase text-white text-xl lg:text-2xl font-medium">
          Cars By Budget
        </h2>
        <Button
          className="uppercase bg-white/10 text-xs md:text-sm lg:text-base tracking-wider h-auto lg:hidden"
          animated
        >
          View More
        </Button>
      </div>
      <Tabs defaultValue={tabsList[0]}>
        <TabsList className="w-full bg-transparent justify-start p-0 gap-x-2 md:gap-x-4">
          {tabsList.map((tab) => {
            return (
              <TabsTrigger
                key={tab}
                className="bg-[#018ac53d] data-[state=active]:text-primary-lighter font-semibold rounded-md text-white px-3 md:px-4 py-2.5 text-xs md:text-sm border border-transparent hover:border-white"
                value={tab}
              >
                {tab}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {tabsList.map((tab) => {
          return (
            <TabsContent key={tab} value={tab}>
              <CarsCarousel
                data={carsByBudgetData[tab]}
                options={{ align: "start" }}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
}
