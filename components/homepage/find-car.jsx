import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FindCarByBrandTab from "./find-car-by-brand-tab";
import FindCarsByTypeTab from "./find-cars-by-type-tab";
import FindCarsByBudgetTab from "./find-cars-by-budget-tab";

const TABS = [
  { label: "By Budget", value: "budget" },
  { label: "Car Type", value: "car-type" },
  { label: "By Brand", value: "by-brand" },
];

export default function FindCar({ carTypes, brandModels }) {
  return (
    <div className="w-full relative mt-[-30px] bottom-0 lg:absolute lg:bottom-16">
      <div className="container">
        <div className="bg-white lg:bg-transparent lg:w-2/3  xl:w-1/2 rounded-3xl py-4 px-6 lg:p-0 lg:shadow-none shadow-lg">
          <h1 className="text-theme-black lg:text-white text-xl md:text-[22px] lg:text-[28px] font-semibold mb-2 md:mb-4">
            Find Your Best Car
          </h1>
          <Tabs
            defaultValue="budget"
            className="lg:rounded-2xl lg:overflow-hidden"
          >
            <TabsList className="p-0 items-stretch lg:rounded-none h-auto">
              {TABS.map((tab) => {
                const { label, value } = tab;
                return (
                  <TabsTrigger
                    key={value}
                    className="grow rounded-lg data-[state=active]:bg-primary-darker lg:bg-[#486D83] lg:data-[state=active]:bg-white data-[state=active]:text-white lg:text-white lg:data-[state=active]:text-primary-darker text-xs md:text-sm lg:rounded-none py-2 sm:py-3 lg:py-4 lg:h-auto border-white"
                    value={value}
                  >
                    {label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <TabsContent
              value="budget"
              className="bg-white py-2 lg:p-6 lg:rounded-none lg:mt-0 lg:min-h-36"
            >
              <FindCarsByBudgetTab />
            </TabsContent>
            <TabsContent
              value="car-type"
              className="bg-white w-full lg:rounded-none lg:mt-0 lg:min-h-36"
            >
              <FindCarsByTypeTab carTypes={carTypes} />
            </TabsContent>
            <TabsContent
              value="by-brand"
              className="bg-white w-full lg:rounded-none lg:mt-0 py-3 lg:px-4 lg:py-6 lg:min-h-36"
            >
              <FindCarByBrandTab brandModels={brandModels} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
