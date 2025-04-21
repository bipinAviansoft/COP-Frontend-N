"use client";
import React from "react";
import CarHeaderData from "./car-header-data";
import CarModuleHeader from "./car-module-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import SimilarCarModel from "./similar-car-model";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/lib/utils";
import LatestAutomotiveNews from "../homepage/latest-automotive-news";

export default function SpecsModuleInteractiveWrapper({
  brandSlug,
  modelSlug,
  variantSlug,
  headerDetails,
  modelDescriptionData,
  similarModelsData,
  specificationData,
  modelPage,
  blogs,
  reviewData,
}) {
  const selectedVariantSlug = modelPage
    ? `${brandSlug}/${modelSlug}`
    : `${brandSlug}/${modelSlug}/${variantSlug}`;

  const similarModelsCars = similarModelsData?.models;

  const similarModelBodyType = similarModelsCars?.filter(
    (item) => item?.car_type === headerDetails?.ct_name
  );

  const similarModelBudgetType = [...similarModelsCars].sort(
    (a, b) => a.min_price - b.min_price
  );

  return (
    <div className="bg-[#F3F4F9] ">
      <CarModuleHeader
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        variantSlug={variantSlug}
        modelPage={modelPage}
        reviewData={reviewData?.totalRating > 0}
        headerDetails={headerDetails}
        subPage="Specifications"
      />
      <div className="pt-[15px] md:pt-[30px]">
        <CarHeaderData
          headerDetails={headerDetails}
          selectedVariantSlug={selectedVariantSlug}
          description={modelDescriptionData?.description}
          modelPage={modelPage}
          pageTitle="Specifications"
          reviewData={reviewData}
        />
      </div>
      {/* car spec & other design sec */}
      <div className="mt-[30px]">
        <div className="container">
          <div className="flex flex-wrap gap-[20px]">
            <div className="w-full xl:w-[calc(75%-10px)] ">
              <div className="space-y-[20px]">
                <div className="bg-white rounded-[16px] ">
                  <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] py-[20px] md:py-[35px] px-[15px] md:px-[40px] m-0 ">
                    {headerDetails?.brand_name} {headerDetails?.model_name}{" "}
                    {modelPage ? "" : headerDetails?.variant_name}{" "}
                    Specifications
                  </h2>
                  <div>
                    <Tabs
                      defaultValue="specTab1"
                      className="w-full flex flex-wrap relative"
                    >
                      <TabsList className="pl-[15px] md:pl-[40px] py-0 !h-[auto] w-full flex items-end justify-start gap-[25px] md:gap-[35px] pr-0 bg-transparent border-b-[1px] border-[#8080808C] scroll-bar-none overflow-x-auto md:overflow-x-visible rounded-none whitespace-nowrap">
                        {Object.keys(specificationData || {}).map(
                          (key, index) => {
                            return (
                              <TabsTrigger
                                key={`tab-trigger-${key}`}
                                value={`specTab${index + 1}`}
                                className="relative group text-[#24272C] flex gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[16px] leading-[22px] font-[400] p-[5px] !shadow-none border-b-[1px] border-transparent data-[state=active]:border-[#0177AA] mb-[-1px] !rounded-none before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-7px] before:w-0 before:h-0 before:border-l-[7px] before:border-l-[transparent] before:border-r-[7px] before:border-r-[transparent] before:border-t-[7px] before:border-t-[#0177AA] data-[state=active]:before:opacity-100 before:opacity-0"
                              >
                                {key}
                              </TabsTrigger>
                            );
                          }
                        )}
                      </TabsList>
                      <div className="py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full ">
                        {Object.keys(specificationData || {}).map(
                          (key, index) => {
                            return (
                              <TabsContent
                                key={`tab-content-${key}`}
                                className="mb-[30px]"
                                value={`specTab${index + 1}`}
                              >
                                <Accordion
                                  type="single"
                                  collapsible
                                  className="w-full bg-white space-y-[10px] md:space-y-[20px]"
                                >
                                  {Object.keys(
                                    specificationData[key] || {}
                                  ).map((keyName, idx) => {
                                    const entries = Object.entries(
                                      specificationData[key][keyName].details
                                    );

                                    const midIndex = Math.ceil(
                                      entries.length / 2
                                    );
                                    const col1 = entries.slice(0, midIndex);
                                    const col2 = entries.slice(midIndex);

                                    return (
                                      <AccordionItem
                                        key={`accordian-tab-${idx}`}
                                        value={`item-${idx}`}
                                        className="border-[1px] border-[solid] border-[#8080808C] bg-[#E3E3E333] rounded-[8px]"
                                      >
                                        <AccordionTrigger
                                          className={cn(
                                            "text-[16px] md:text-[20px] leading-[26px] font-semibold text-[#000000] items-center gap-[8px] bg-transparent [box-shadow:none] p-[16px] border-none"
                                          )}
                                          showArrow={true}
                                        >
                                          <img
                                            src={
                                              specificationData[key][keyName]
                                                .image
                                            }
                                            alt={keyName}
                                            className="max-w-[25px] md:max-w-[35px] max-h-[25px] md:max-h-[35px]"
                                          />
                                          <span className="mr-auto text-start ml-[10px]">
                                            {keyName}
                                          </span>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-[16px] bg-transparent text-theme-black text-sm md:text-base">
                                          <div className="w-full flex flex-wrap gap-y-[20px]">
                                            <div className="w-full lg:w-1/2">
                                              <ul className="space-y-[20px]">
                                                {col1.map((item, idxx) => {
                                                  return (
                                                    <li
                                                      key={`li-list-${idx}-${index}-${idxx}`}
                                                      className="text-[14px] leading-[19px] font-[400] text-[#282C2F] flex flex-wrap items-center  "
                                                    >
                                                      <span className="w-1/2 pr-2">
                                                        {item[1].features_name}
                                                      </span>
                                                      <strong className="w-1/2 pl-2">
                                                        {item[1].feature_value}
                                                      </strong>
                                                    </li>
                                                  );
                                                })}
                                              </ul>
                                            </div>
                                            <div className="w-full lg:w-1/2">
                                              <ul className="space-y-[20px]">
                                                {col2.map((item, idx) => (
                                                  <>
                                                    <li
                                                      key={idx}
                                                      className="text-[14px] leading-[19px] font-[400] text-[#282C2F] flex flex-wrap items-center  "
                                                    >
                                                      <span className="w-1/2 pr-2">
                                                        {item[1].features_name}
                                                      </span>
                                                      <strong className="w-1/2 pl-2">
                                                        {item[1].feature_value}
                                                      </strong>
                                                    </li>
                                                  </>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    );
                                  })}
                                </Accordion>
                              </TabsContent>
                            );
                          }
                        )}
                      </div>
                    </Tabs>
                  </div>
                </div>
                <div className="bg-white rounded-[16px] py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full">
                  <LatestAutomotiveNews
                    blogs={blogs}
                    title={`${headerDetails?.brand_name} ${
                      headerDetails?.model_name
                    }
                    ${modelPage ? "" : headerDetails?.variant_name} `}
                  />
                </div>
              </div>
            </div>
            <div className="w-full xl:w-[calc(25%-10px)]">
              <div className="">
                <SimilarCarModel
                  brandSlug={brandSlug}
                  similarModelsData={similarModelsData}
                  similarModelBodyType={similarModelBodyType}
                  similarModelBudgetType={similarModelBudgetType}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
