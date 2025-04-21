"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import Button from "../ui/button";
import { Separator } from "../ui/separator";
import SpecsAccoridon from "./specs-accordion";
import SpecsDetailsList from "./specs-details-list";
import ScrollToMarginElement from "../ui/scroll-to-margin-element";

const TABS = [
  {
    key: "SPECIFICATIONS",
    value: "Specifications",
  },
  {
    key: "SAFETY",
    value: "Safety",
  },
  {
    key: "FEATURES",
    value: "Features",
  },
];

const Specifications = forwardRef(function ({ specsData, headerData }, ref) {
  const { brand_name, model_name, variant_name, brand_logo } = headerData;
  const [activeTab, setActiveTab] = useState(TABS[0].key);

  return (
    <>
      <ScrollToMarginElement id="detail" />
      <div ref={ref} className="bg-white py-4 px-3 lg:p-4 rounded-md">
        <h3 className="font-semibold md:text-xl">
          {brand_name} {model_name} {variant_name}
          {/*  - {activeTab} */}
        </h3>
        <Separator className="my-4" />
        <ul className="flex gap-x-2 mb-4">
          {TABS.map((tab) => {
            return (
              <li key={tab.key}>
                <Button
                  className={cn(
                    "text-xs md:text-sm lg:text-base bg-white text-gray-600 border",
                    {
                      "bg-primary-gradient text-white": activeTab === tab.key,
                    }
                  )}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.value}
                </Button>
              </li>
            );
          })}
        </ul>
        {TABS.map((tab) => {
          if (tab.key !== "SAFETY" && tab.key === activeTab) {
            return <SpecsAccoridon key={tab.key} data={specsData[tab.value]} />;
          } else if (tab.key === activeTab) {
            const { Safety: safetyData } = specsData[tab.value];
            return <SpecsDetailsList key={tab.key} specsDetails={safetyData} />;
          }
        })}
      </div>
    </>
  );
});

Specifications.displayName = "Specifications";

export default Specifications;
