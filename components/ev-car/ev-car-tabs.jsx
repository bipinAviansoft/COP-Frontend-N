"use client";

import { useState } from "react";
import Button from "../ui/button";
import FindEVCarsByBrandTab from "./find-ev-cars-by-brand-tab";
import FindEvCarsByBudgetTab from "./find-ev-cars-by-budget-tab";
import { cn } from "@/lib/utils";

const tabs = {
  PRICE: "price",
  BRAND: "brand",
};

export default function TabsCard({ brands }) {
  const [activeTab, setActiveTab] = useState(tabs.PRICE);

  return (
    <div className="lg:h-52 flex flex-col">
      <div className="grid grid-cols-2 bg-white rounded-t-xl border-b p-2 w-full md:w-fit">
        <Button
          value={tabs.PRICE}
          className={cn("bg-transparent text-theme-black py-3 rounded-lg", {
            "bg-ev-gradient text-white": activeTab === tabs.PRICE,
          })}
          onClick={() => setActiveTab(tabs.PRICE)}
        >
          Price
        </Button>
        <Button
          value="brand"
          className={cn("bg-transparent text-theme-black py-3 rounded-lg", {
            "bg-ev-gradient text-white": activeTab === tabs.BRAND,
          })}
          onClick={() => setActiveTab(tabs.BRAND)}
        >
          Brand
        </Button>
      </div>

      <div className="bg-white px-2 py-4 md:p-6 mt-0 rounded-b-xl shadow-lg md:rounded-tr-xl grow flex flex-col justify-center">
        {activeTab === tabs.PRICE && <FindEvCarsByBudgetTab />}
        {activeTab === tabs.BRAND && <FindEVCarsByBrandTab brands={brands} />}
      </div>
    </div>
  );
}
