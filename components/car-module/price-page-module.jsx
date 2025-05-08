"use client";
import CarHeaderData from "./car-header-data";
import CarModuleHeader from "./car-module-header";
import SimilarCarModel from "./similar-car-model";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import PriceVariantsList from "./price-variants-list";
import LatestAutomotiveNews from "../homepage/latest-automotive-news";

export default function PricePageModule({
  brandSlug,
  modelSlug,
  variantSlug,
  headerDetails,
  modelDescriptionData,
  similarModelsData,
  modelPage,
  reviewData,
  priceData,
  city,
  blogs,
}) {
  const selectedVariantSlug = modelPage
    ? `${brandSlug}/${modelSlug}`
    : `${brandSlug}/${modelSlug}/${variantSlug}`;

  const { fuel_types, variants } = priceData;

  const similarModelsCars = similarModelsData?.models;

  const similarModelBodyType = similarModelsCars?.filter(
    (item) => item?.car_type === headerDetails?.ct_name
  );

  const similarModelBudgetType = [...similarModelsCars].sort(
    (a, b) => a.min_price - b.min_price
  );

  return (
    <>
      <div className="bg-[#F3F4F9] ">
        <CarModuleHeader
          brandSlug={brandSlug}
          modelSlug={modelSlug}
          variantSlug={variantSlug}
          modelPage={modelPage}
          reviewData={reviewData?.totalRating > 0}
          headerDetails={headerDetails}
          subPage="Price"
        />
        <div className="pt-[15px] md:pt-[30px]">
          <CarHeaderData
            headerDetails={headerDetails}
            selectedVariantSlug={selectedVariantSlug}
            description={modelDescriptionData?.description}
            modelPage={modelPage}
            pageTitle={`Price`}
            reviewData={reviewData}
          />
        </div>
        {/* car spec & other design sec */}
        <div className="mt-[30px]">
          <div className="container">
            <div className="flex flex-wrap gap-[20px]">
              <div className="w-full xl:w-[calc(75%-10px)] ">
                <div className="space-y-[20px]">
                  <div className="bg-white rounded-[16px]">
                    <div className="py-[20px] md:py-[35px] px-[15px] md:px-[40px] border-b-[1px] border-[#8080808C] ">
                      <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] mb-0 ">
                        {headerDetails?.brand_name} {headerDetails?.model_name}{" "}
                        {modelPage ? "" : headerDetails?.variant_name} Price
                      </h2>
                    </div>
                    <div className="pt-[20px] md:pt-[30px] px-[15px] md:px-[40px]">
                      <div>
                        <Tabs
                          defaultValue="priceVariantTab1"
                          className="w-full flex flex-wrap relative"
                        >
                          <TabsList className="pl-[15px] md:pl-[20px] py-0 !h-[auto] w-full flex items-end justify-start gap-[35px] pr-0 bg-transparent border-b-[1px] border-[#8080808C] scroll-bar-none overflow-x-auto md:overflow-x-visible rounded-none whitespace-nowrap">
                            <TabsTrigger
                              value="priceVariantTab1"
                              className="relative group text-[#24272C] flex gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[16px] leading-[22px] font-[400] p-[5px] !shadow-none border-b-[1px] border-transparent data-[state=active]:border-[#0177AA] mb-[-1px] !rounded-none before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-7px] before:w-0 before:h-0 before:border-l-[7px] before:border-l-[transparent] before:border-r-[7px] before:border-r-[transparent] before:border-t-[7px] before:border-t-[#0177AA] data-[state=active]:before:opacity-100 before:opacity-0"
                            >
                              All
                            </TabsTrigger>
                            {fuel_types &&
                              fuel_types?.map((item, index) => {
                                return (
                                  <>
                                    <TabsTrigger
                                      value={`priceVariantTab${index + 2}`}
                                      className="relative group text-[#24272C] flex gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[16px] leading-[22px] font-[400] p-[5px] !shadow-none border-b-[1px] border-transparent data-[state=active]:border-[#0177AA] mb-[-1px] !rounded-none before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-7px] before:w-0 before:h-0 before:border-l-[7px] before:border-l-[transparent] before:border-r-[7px] before:border-r-[transparent] before:border-t-[7px] before:border-t-[#0177AA] data-[state=active]:before:opacity-100 before:opacity-0"
                                    >
                                      {item}
                                    </TabsTrigger>
                                  </>
                                );
                              })}
                          </TabsList>
                          <div className="py-[15px] md:py-[30px] w-full">
                            <TabsContent value="priceVariantTab1">
                              <div>
                                <PriceVariantsList
                                  variants={variants}
                                  selectedVariantSlug={`${brandSlug}/${modelSlug}/${variantSlug}`}
                                  modelType={headerDetails?.model_type}
                                />
                              </div>
                            </TabsContent>
                            {fuel_types &&
                              fuel_types?.map((item, index) => {
                                const VariantsType = variants.filter(
                                  (variant) => variant.fuel_type === item
                                );

                                return (
                                  <>
                                    <TabsContent
                                      value={`priceVariantTab${index + 2}`}
                                    >
                                      <div>
                                        <PriceVariantsList
                                          variants={VariantsType}
                                          selectedVariantSlug={`${brandSlug}/${modelSlug}/${variantSlug}`}
                                          modelType={headerDetails?.model_type}
                                        />
                                      </div>
                                    </TabsContent>
                                  </>
                                );
                              })}
                          </div>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                  {blogs?.length > 0 ? (
                    <div className="bg-white rounded-[16px] py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full">
                      <LatestAutomotiveNews
                        blogs={blogs}
                        title={`${headerDetails?.brand_name} ${
                          headerDetails?.model_name
                        } 
                                          ${
                                            modelPage
                                              ? ""
                                              : headerDetails?.variant_name
                                          }`}
                      />
                    </div>
                  ) : null}
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
    </>
  );
}
